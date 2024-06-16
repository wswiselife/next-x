import { useRouter } from "next/router"

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
        "></div>
    )
}

export default SidebarLogo