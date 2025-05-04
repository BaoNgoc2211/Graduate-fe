import SidebarSection from "./sidebar-section";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";

import {
  Layers,
  // History,
  // Star,
  // Settings,
  // Box,
  // BookOpen,
  // Sliders,
  // PlusCircle,
  // Clock,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="border-[#00416A] w-64 h-screen bg-white text-[#00416A] p-4 space-y-6">
      {/* Company Info */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-md">
          <Layers className="text-white" size={20} />
        </div>
        <div>
          <p className="font-semibold text-sm">Acme Inc</p>
          <p className="text-xs text-gray-400">Enterprise</p>
        </div>
      </div>

      {/* Platform Section */}
      <SidebarSection title="Platform">
        <SidebarGroup
          // icon="Layers" icon: "History", icon: "Star", icon: "Settings"
          title="Thuốc kê đơn"
          items={[
            { label: "Thuốc " },
            { label: "Thuốc không kê đơn" },
            { label: "Thực phẩm chức năng" },
          ]}
        />
        <SidebarItem label="Models" expandable />
        {/* <SidebarItem icon={Box} label="Models" expandable /> */}
        <SidebarItem label="Documentation" expandable />
        <SidebarItem label="Settings" expandable />
      </SidebarSection>

      {/* Projects Section */}
      <SidebarSection title="Projects">
        <SidebarItem label="Design Engineering" />
        <SidebarItem label="Sales & Marketing" />
      </SidebarSection>
    </aside>
  );
};

export default Sidebar;
