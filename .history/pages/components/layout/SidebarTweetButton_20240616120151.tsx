import { useRouter } from "next/router"
import { FaFeather } from "react-icons/fa"

const SidebarTweetButton = ()=>{
    const router = useRouter()
    return(
        <div onClick={() => router.push('/')}>

            {/* 移动端lg 写文章 */}
            <div className="
                lg:hidden
                mt-6
                rounded-full
                h-14
                w-14
                p-4
                flex
                justify-center
                items-center
                bg-sky-500
                hover:bg-opacity-80
                transition
                cursor-pointer
            ">
                <FaFeather size={24} color="white"></FaFeather>
            </div>

            {/* 写文章 */}
            <div className="
                hidden
                lg:block
                mt-6
                bg-sky-500
                hover:bg-opacity-80
                transition
                cursor-pointer
            ">

            </div>

        </div>
    )
}

export default SidebarTweetButton