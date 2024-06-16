import { useRouter } from "next/router"
import {BsX} from 'react-icons/bs'
const SidebarLogo = ()=>{
    const router = useRouter()

    return(
        <div className="
            founded-full
            h-14
            w-14
            p-4
            flex
            justify-center
            items-center
            hover:bg-blue-300
            hover:bg-opacity-10
            cursor-pointer
            transition
        ">
            <BsX size={28} color="white"></BsX>
        </div>
    )
}

export default SidebarLogo