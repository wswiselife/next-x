import { BsHouseFill,BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"

import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import SidebarTweetButton from "./SidebarTweetButton"


const Sidebar = ()=>{

    const items = [
        {
            // label:'首页',
            label:'Home',
            href:'/',
            icon:BsHouseFill
        },
        {
            // label:'通知',
            label:'Notifications',
            href:'/notifications',
            icon:BsBellFill
        },
        {
            label:'Profile',
            href:'/users/123',
            icon:FaUser
        },
    ]


    return(
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    {/* logo */}
                    <SidebarLogo />

                    {/* item */}
                    {/* 注意这里的遍历不用{**} */}
                    {items.map((item)=>
                        <SidebarItem 
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            icon={item.icon}
                        />
                    )}

                    {/* logout */}
                    <SidebarItem icon={BiLogOut} label='Logout' onClick={()=>{}}></SidebarItem>

                    {/*  */}
                    <SidebarTweetButton />
                </div>
            </div>
           
        </div>
    )
}

export default Sidebar