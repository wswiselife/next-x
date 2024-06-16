
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

import useCurrentUser from "@/pages/hooks/useCurrentUser";
import useLoginModal from "@/pages/hooks/useLoginModal";

interface SidebarItemProps{
    label: string;
    href?: string;
    icon: IconType;
    onClick?: ()=>void;
    auth?:boolean
}

const SidebarItem:React.FC<SidebarItemProps> = ({
    label,
    href,
    icon:Icon,
    onClick,
    auth
})=>{
    const router = useRouter()
    const loginModal = useLoginModal()

    const {data:currentUser} = useCurrentUser()

    const handleClick = useCallback(()=>{
        
        if(onClick){
            return onClick()
        }

        // 如果点击了item，而没有登录，则跳转到登录
        if(auth && !currentUser){
            loginModal.onOpen()
        }else if(href){
            router.push(href)
        }

    },[onClick,router,href,loginModal,auth,currentUser])

    return (
        <div className="flex flex-row items-center" onClick={handleClick}>
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