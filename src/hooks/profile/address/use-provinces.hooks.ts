import { Province } from "@/interface/auth/auth.interface";
import { useQuery } from "@tanstack/react-query";

export const useProvinces = () => {
  return useQuery<Province[]>({
    queryKey: ["provinces"],
    queryFn: async () => {
      const res = await fetch("https://provinces.open-api.vn/api/?depth=1");
      const data = await res.json();
      return data.filter((p: Province) =>
        ["Hồ Chí Minh", "Đồng Nai", "Bình Dương", "Cần Thơ", "Long An", "Tiền Giang", "Bến Tre", "Vĩnh Long", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Cà Mau", "An Giang", "Kiên Giang", "Đồng Tháp"].includes(p.name)
      );
    }
  });
};
