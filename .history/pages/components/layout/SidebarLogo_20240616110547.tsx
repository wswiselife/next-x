import { useRouter } from "next/router"
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsTwitter } from "react-icons/bs";
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

            <FaSquareXTwitter size={28} color="white"/>
            {/* <BsTwitter size={28} color="white"/> */}
        </div>
    )
}

export default SidebarLogo