// components/NavItem.jsx
import Link from "next/link";
interface NavItemProp {
  href: string;
  label: string;
}

const NavItem = (props: NavItemProp) => {
  return (
    <ul>
      {" "}
      <li>
        <Link href={props.href} className="flex flex-col items-center gap-1">
          <p className="text-blue-900">{props.label}</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </Link>
      </li>
    </ul>
  );
};

export default NavItem;
