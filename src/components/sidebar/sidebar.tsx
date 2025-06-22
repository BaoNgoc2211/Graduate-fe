import SidebarSection from "./sidebar-section";
import SidebarGroup from "./sidebar-group";
import SidebarItem from "./sidebar-item";

import { Layers } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="border-[#00416A] w-64 h-screen bg-white text-[#00416A] pt-4 space-y-6">
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
          title="Thuốc"
          items={[{ label: "Thuốc kê đơn " }, { label: "Thuốc không kê đơn" }]}
        />
        <SidebarGroup
          // icon="Layers" icon: "History", icon: "Star", icon: "Settings"
          title="Thực phẩm"
          items={[
            { label: "Thực phẩm chức năng" },
            { label: "Thuốc đông y " },
            { label: "Dược liệu" },
          ]}
        />
        {/* <SidebarItem icon={Box} label="Models" expandable /> */}
        <SidebarItem label="Thiết bị y tế" expandable />
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
