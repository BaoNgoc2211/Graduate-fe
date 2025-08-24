import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { IInfo, IProfileResponse } from '@/interface/auth/auth.interface';
import { toast } from 'sonner';
import { getProfileAPI, updateProfileAPI } from '@/api/auth/profile.api';

// Query keys
export const PROFILE_QUERY_KEYS = {
  profile: ['profile'] as const,
  provinces: ['address', 'provinces'] as const,
  districts: (provinceCode: number) => ['address', 'districts', provinceCode] as const,
  wards: (districtCode: number) => ['address', 'wards', districtCode] as const,
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

// Address hooks
export const useProvinces = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.provinces,
    queryFn: getProvincesAPI,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export const useDistricts = (provinceCode: number) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.districts(provinceCode),
    queryFn: () => getDistrictsAPI(provinceCode),
    enabled: !!provinceCode,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};

export const useWards = (districtCode: number) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.wards(districtCode),
    queryFn: () => getWardsAPI(districtCode),
    enabled: !!districtCode,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};