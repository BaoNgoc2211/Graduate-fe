import { useQuery } from "@tanstack/react-query";

export const useWards = (districtCode: number | undefined) => {
  return useQuery({
    queryKey: ["wards", districtCode],
    enabled: !!districtCode,
    queryFn: async () => {
      const res = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await res.json();
      return data.wards;
    }
  });
};
