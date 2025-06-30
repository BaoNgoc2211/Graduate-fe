// import CountrySlider from "@/components/country-slide";
"use client";
import { checkAuthAPI } from "@/api/auth.api";
import BestSeller from "@/components/home/best-seller";
import Hero from "@/components/home/hero";
import LatestCollection from "@/components/home/lastest-collection";
import OurPolicy from "@/components/home/our-policy";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthAPI();
        if (!res?.data) {
          toast.error("Bạn cần đăng nhập để truy cập trang này.");
          router.push("/auth");
        }
      } catch {
        toast.error("Chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        router.push("/auth");
      }
    };
    checkAuth();
  }, [router]);
  return (
    <div className="font-sans px-10">
      <div className="flex flex-col">
        <Hero />
        <div className="flex justify-center">
          <div className="w-full px-5 py-5">
            <LatestCollection />
            <OurPolicy />
            <BestSeller />
          </div>
        </div>
      </div>
    </div>
  );
}
