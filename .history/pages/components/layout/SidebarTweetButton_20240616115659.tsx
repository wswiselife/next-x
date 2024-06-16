import { useRouter } from "next/router"

const SidebarTweetButton = ()=>{
    const router = useRouter()
    return(
        <div onClick={() => router.push('/')}>

            {/* 移动端lg */}
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

            </div>

        </div>
    )
}

export default SidebarTweetButton