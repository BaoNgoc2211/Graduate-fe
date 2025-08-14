import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getProfileAPI, updateProfileAPI } from '@/api/profile.api';
import type { IInfo, IProfileResponse } from '@/interface/auth/auth.interface';
import { toast } from 'sonner';
import { getProfileAPI, updateProfileAPI } from '@/api/auth/profile.api';

// Query keys
export const PROFILE_QUERY_KEYS = {
  profile: ['profile'] as const,
  user: (userId: string) => ['profile', userId] as const,
} as const;

// Get profile hook
export const useProfile = () => {
  return useQuery<IProfileResponse>({
    queryKey: PROFILE_QUERY_KEYS.profile,
    queryFn: getProfileAPI,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Update profile hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<IProfileResponse, Error, IInfo>({
    mutationFn: updateProfileAPI,
    onMutate: async (newProfile) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: PROFILE_QUERY_KEYS.profile });

      // Snapshot previous value
      const previousProfile = queryClient.getQueryData<IProfileResponse>(
        PROFILE_QUERY_KEYS.profile
      );

      // Optimistically update cache
      if (previousProfile) {
        queryClient.setQueryData<IProfileResponse>(
          PROFILE_QUERY_KEYS.profile,
          {
            ...previousProfile,
            data: {
              ...previousProfile.data,
              info: { ...previousProfile.data.info, ...newProfile }
            }
          }
        );
      }

      return { previousProfile };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousProfile) {
        queryClient.setQueryData(PROFILE_QUERY_KEYS.profile, context.previousProfile);
      }
      
      console.error('Update profile error:', error);
      toast.error(error.message || 'Không thể cập nhật thông tin');
    },
    onSuccess: (data) => {
      // Update cache with server response
      queryClient.setQueryData(PROFILE_QUERY_KEYS.profile, data);
      toast.success('Cập nhật thông tin thành công!');
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.profile });
    },
  });
};

// Profile form hook với validation và state management
export const useProfileForm = (initialData?: IInfo) => {
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState<IProfileFormState>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    email: '', // Email không được update
    birthday: initialData?.birthday || '',
    gender: initialData?.gender || '',
    password: '', // Password reset riêng
    address: {
      province: initialData?.address?.provinceName || '',
      district: '', // Cần map từ wardId
      ward: initialData?.address?.wardName || '',
      detail: initialData?.address?.street || '',
    },
  });

  const updateMutation = useUpdateProfile();

  // Track changes
  useEffect(() => {
    if (!initialData) return;
    
    const hasChanges = (
      formData.name !== (initialData.name || '') ||
      formData.phone !== (initialData.phone || '') ||
      formData.birthday !== (initialData.birthday || '') ||
      formData.gender !== (initialData.gender || '') ||
      formData.address.province !== (initialData.address?.provinceName || '') ||
      formData.address.ward !== (initialData.address?.wardName || '') ||
      formData.address.detail !== (initialData.address?.street || '')
    );
    
    setIsChanged(hasChanges);
  }, [formData, initialData]);

  // Form handlers
  const updateField = useCallback(<K extends keyof IProfileFormState>(
    field: K,
    value: IProfileFormState[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateAddressField = useCallback((
    field: keyof IProfileFormState['address'],
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  }, []);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    try {
      // Transform form data to API format
      const apiData: IInfo = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender,
        birthday: formData.birthday,
        address: {
          provinceName: formData.address.province,
          wardName: formData.address.ward,
          street: formData.address.detail.trim(),
          // Note: Cần thêm logic để lấy provinceId và wardId
        },
      };

      // Remove empty fields
      Object.keys(apiData).forEach(key => {
        const value = apiData[key as keyof IInfo];
        if (value === '' || value === undefined || value === null) {
          delete apiData[key as keyof IInfo];
        }
      });

      await updateMutation.mutateAsync(apiData);
      setIsChanged(false);
    } catch (error) {
      console.error('Submit error:', error);
    }
  }, [formData, updateMutation]);

  // Reset form
  const resetForm = useCallback(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        phone: initialData.phone || '',
        email: '',
        birthday: initialData.birthday || '',
        gender: initialData.gender || '',
        password: '',
        address: {
          province: initialData.address?.provinceName || '',
          district: '',
          ward: initialData.address?.wardName || '',
          detail: initialData.address?.street || '',
        },
      });
      setIsChanged(false);
    }
  }, [initialData]);

  return {
    formData,
    isChanged,
    isLoading: updateMutation.isPending,
    error: updateMutation.error,
    updateField,
    updateAddressField,
    handleSubmit,
    resetForm,
  };
};