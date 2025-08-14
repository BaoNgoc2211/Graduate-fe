// api/profile.api.ts - Tách riêng profile API
// import APIConfig from "./api.config";
import type { 
  IInfo, 
  IProfileResponse, 
  IUpdateProfilePayload,
  Province,
  District,
  Ward
} from "@/interface/auth/auth.interface";
import APIConfig from "../api.config";

const PROFILE_ENDPOINTS = {
  GET_PROFILE: '/api/auth/profile',
  UPDATE_PROFILE: '/api/auth/profile',
  PROVINCES: '/api/address/provinces',
  DISTRICTS: '/api/address/districts',
  WARDS: '/api/address/wards',
} as const;

// Profile management
export const getProfileAPI = async (): Promise<IProfileResponse> => {
  try {
    const response = await APIConfig.get(PROFILE_ENDPOINTS.GET_PROFILE);
    console.log('Profile fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
};

export const updateProfileAPI = async (data: IInfo): Promise<IProfileResponse> => {
  try {
    // Validate required fields
    if (!data.name?.trim()) {
      throw new Error('Tên không được để trống');
    }
    
    if (data.phone && !/^\d{10,11}$/.test(data.phone.replace(/\s/g, ''))) {
      throw new Error('Số điện thoại không hợp lệ');
    }

    const payload: IUpdateProfilePayload = { info: data };
    
    console.log('Updating profile with data:', payload);
    
    const response = await APIConfig.put(PROFILE_ENDPOINTS.UPDATE_PROFILE, payload);
    console.log('Profile updated successfully');
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};

// Address management (nếu có API riêng)
export const getProvincesAPI = async (): Promise<{ data: Province[] }> => {
  try {
    const response = await APIConfig.get(PROFILE_ENDPOINTS.PROVINCES);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch provinces:', error);
    throw error;
  }
};

export const getDistrictsAPI = async (provinceCode: number): Promise<{ data: District[] }> => {
  try {
    const response = await APIConfig.get(`${PROFILE_ENDPOINTS.DISTRICTS}/${provinceCode}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch districts:', error);
    throw error;
  }
};

export const getWardsAPI = async (districtCode: number): Promise<{ data: Ward[] }> => {
  try {
    const response = await APIConfig.get(`${PROFILE_ENDPOINTS.WARDS}/${districtCode}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch wards:', error);
    throw error;
  }
};