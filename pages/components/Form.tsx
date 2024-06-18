import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import useCurrentUser from "../hooks/useCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import usePosts from "../hooks/usePosts";
import useRegisterModal from "../hooks/useRegisterModal";
import Button from "./Button";
import Avatar from "./Avatar";


interface FormProps {
    placeholder:string;
    isComment?:boolean;
    postId?:string;
}

const Form:React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
})=>{
    
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const {data:currentUser} = useCurrentUser()
    const {mutate:mutatePost} = usePosts()

    const [isLoading,setIsLoading] = useState(false)
    const [body,setBody] = useState('')

    // 创建post
    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)

            await axios.post('/api/posts',{body,currentUser})

            toast.success('Created.')
            setBody('')
            // 数据刷新
            mutatePost()
        }catch(error){
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false)
        }
    },[body,mutatePost])

    // 

    return (
        <div className="px-5 py-2 border-neutral-800 border-b-[1px] ">
            {
                currentUser?(
                    // 登录之后显示posts
                    <div className="flex flex-row gap-4">
                        <div><Avatar userId={currentUser?.id} /></div>

                        {/* textarea */}
                        <div className="w-full">
                            <textarea 
                                disabled={isLoading}
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                                placeholder={placeholder}
                                className="
                                    w-full
                                    mt-3
                                    peer
                                    resize-none
                                    outline-none
                                    text-[20px]
                                    placeholder-neutral-500
                                    text-white
                                    disabled:opacity-80
                                    ring-0
                                    bg-black
                                "
                            ></textarea>
                            <hr 
                                className="
                                    opacity-0
                                    peer-focus:opacity-100
                                    h-[1px]
                                    w-full
                                    border-neutral-800
                                    transition
                                "
                            />
                            <div className="flex flex-row justify-end mt-4">
                                <Button label="Post" onClick={onSubmit} disabled={isLoading || !body} />
                            </div>
                        </div>

                    </div>
                ):(
                    // 未登录时显示登录
                    <div className="py-8">
                        <h1 className="text-center mb-4 text-white text-3xl font-bold">Wellow to X</h1>
                        <div className="flex flex-row justify-center items-center gap-4">
                            <Button label="Register" onClick={registerModal.onOpen}  secondry  />
                            <Button label="Login" onClick={loginModal.onOpen} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Form