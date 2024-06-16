import { BsHouseFill,BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"

import SidebarLogo from "./SidebarLogo"

const Sidebar = ()=>{

    const items = [
        {
            label:'首页',
            href:'/',
            icon:BsHouseFill
        },
        {
            label:'通知',
            href:'/notifications',
            icon:BsBellFill
        },
        {
            label:'个人中心',
            href:'/users/123',
            icon:FaUser
        },
    ]


    return(
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {/* 注意这里的遍历不用{**} */}
                    {items.map((item)=>
                        <SidebarItem 
                            key=
                        />
                    )}
                </div>
            </div>
           
        </div>
    )
}

export default Sidebar