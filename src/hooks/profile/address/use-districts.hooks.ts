import { useQuery } from "@tanstack/react-query";

export const useDistricts = (provinceCode: number | undefined) => {
  return useQuery({
    queryKey: ["districts", provinceCode],
    enabled: !!provinceCode,
    queryFn: async () => {
      const res = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await res.json();
      return data.districts;
    }
  });
};
