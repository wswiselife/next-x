import { BsHouseFill,BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
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
        <div>sidebar</div>
    )
}

export default Sidebar