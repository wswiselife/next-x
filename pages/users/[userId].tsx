import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"

import Header from "../components/Header"
import useUser from "../hooks/useUser"


const UserView = ()=>{

    const router = useRouter()
    // 根据路由获取单个userId
    const {userId} = router.query

    // 发送请求【这里可以导出loading】
    const {data:fetchedUser,isLoading} = useUser(userId as string)

    if(isLoading || !fetchedUser){
        return(
            <div className="
                flex
                justify-center
                items-center
                h-full
            ">
                {/* 加载动画 */}
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

    return(
        <>
            <Header label={fetchedUser?.name} showBackArrow/>
        </>
    )
}

export default UserView