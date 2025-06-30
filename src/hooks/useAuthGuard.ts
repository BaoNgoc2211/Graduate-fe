// ✅ src/hooks/useAuthGuard.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { checkAuthAPI } from "@/api/auth.api";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthAPI();
        if (!res?.data) {
          toast.error("Bạn cần đăng nhập để truy cập.");
          router.push("/auth");
        }
      } catch {
        toast.error("Chưa đăng nhập hoặc hết phiên đăng nhập.");
        router.push("/auth");
      }
    };
    checkAuth();
  }, [router]);
};
