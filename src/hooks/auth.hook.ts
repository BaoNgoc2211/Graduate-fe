// import { create } from "zustand";

import { updateInfo } from "@/api/auth.api";
import { IInfo } from "@/interface/auth/auth.interface";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// interface AuthStore {
//   userId: string | null;
//   setUserId: (id: string) => void;
// }

// export const useAuth = create<AuthStore>((set) => ({
//   userId: null,
//   setUserId: (id) => set({ userId: id }),
// }));
export const useUpdateInfo = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IInfo }) =>
      updateInfo(id, data),
    onSuccess: () => {
      toast.success("Cập nhật thuốc thành công!");
    },
    onError: (error) => {
      console.error("Lỗi cập nhật:", error);
      toast.error("Cập nhật thuốc thất bại!");
    },
  });
};
