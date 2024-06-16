import React from "react";
import { IconType } from "react-icons";

interface SidebarItemProps{
    label: string;
    href?: string;
    icon: IconType;
    onClick?: ()=>void
}

const SidebarItem:React.FC<SidebarItemProps> = ({
    label,
    href,
    icon:Icon,
    onClick
})=>{
    return (
        <div className="flex flex-row items-center">
             {/* 当小于lg时，只显示图标，大于lg时隐藏 */}
            <div className="
                realative
                rounded-full
                h-14
                w-14
                flex
                items-center
                justify-center
                p-4
                hover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer
                lg:hidden
            ">
                <Icon size={28} color="white" />
            </div>
             {/* 当小于lg时隐藏，大于时则显示 */}
            <div className="
                realative
                hidden
                lg:flex
                items-center
                gap-4
                p-4
                rounded-full
                hover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer
            ">
                <Icon size={24} color="white" />
                <p className="hidden lg:block text-xl text-white">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default SidebarItem