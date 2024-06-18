import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import useCurrentUser from "@/pages/hooks/useCurrentUser";
import useLoginModal from "@/pages/hooks/useLoginModal";

import Avatar from "../Avatar";

interface PostItemProps {
    data: Record<string,any>;
    userId?:string
}

const PostItem:React.FC<PostItemProps> = ({
    data,
    userId
})=>{

    const router = useRouter()
    const {data:currentUser} = useCurrentUser()

    const loginModal = useLoginModal()

    const goToUser = useCallback((e:any)=>{
        e.stopPropagation()

        router.push(`/users/${data.user.id}`)
    },[router,data.user.id])

    const goToPost = useCallback(()=>{
        router.push(`/posts/${data.id}`)
    },[router,data.id])

    const onLike = useCallback((e:any)=>{
        e.stopPropagation()
        loginModal.onOpen()
    },[loginModal])

    const createdAt = useMemo(()=>{
        if(!data.createdAt){
            return null
        }

        return formatDistanceToNowStrict(new Date(data.createdAt))
    },[data?.createdAt])


    return (
        <div 
            onClick={goToPost}
            className="
                p-5
                border-neutral-800
                border-b-[1px]
                hover:cursor-pointer
                transition
                hover:bg-neutral-900
            "
        >
            <div className="flex flex-row items-start gap-3">

                <Avatar userId={data.user.id} />

                <div>
                    <div className="flex flex-row items-center gap-2">

                        {/* name */}
                        <p 
                            onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline"
                        >
                            {data.user.name}
                        </p>
                        {/* username */}
                        <span 
                            onClick={goToUser}
                            className="text-neutral-500 hidden md:block hover:underline cursor-pointer"
                        >
                            @{data.user.username}
                        </span>
                        {/* 发布时间 */}
                        <span className="text-neutral-500 text-sm">{createdAt}</span>

                    </div>

                    {/* body */}
                    <div className="text-white">
                        {data.body}
                    </div>

                    {/* 交互 */}
                    <div className="flex flex-row items-center mt-3 gap-10">

                        {/* comment */}
                        <div 
                            className="
                                flex
                                flex-row
                                items-center
                                gap-2
                                text-neutral-500
                                cursor-pointer
                                transition
                                hover:text-sky-500
                        ">
                            <AiOutlineMessage size={20} />
                            <p>{ data.comments?.length || 0 }</p>
                        </div>

                        <div 
                            onClick={onLike}
                            className="
                                flex
                                flex-row
                                items-center
                                gap-2
                                text-neutral-500
                                cursor-pointer
                                transition
                                hover:text-red-500
                        ">
                            <AiOutlineHeart size={20} />
                            <p>{ data.comments?.length || 0 }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem