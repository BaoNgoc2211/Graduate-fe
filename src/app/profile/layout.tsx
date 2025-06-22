import SidebarProfile from "@/components/sidebar/sidebar-profile";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-while text-black">
      <SidebarProfile />
      <main className="flex-1">{children}</main>
    </div>
  );
}
