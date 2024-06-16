import { IconType } from "react-icons";

interface SidebarItemProps{
    label: string;
    href: string;
    icon: IconType;
    onClick: ()=>void
}