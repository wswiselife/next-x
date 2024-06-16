import useLoginModal from "@/pages/hooks/LoginModal";
import { useCallback, useState } from "react";

import Input from '@/pages/components/Input'
import Modal from "../Modal";
import useRegisterModal from "@/pages/hooks/RegisterModal";

const LoginModal = ()=>{

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit = useCallback(()=>{
        try{
            setIsLoading(true)

            // get data

            loginModal.onClose()

        }catch(error){
            console.log('error',error);
        }finally{
            setIsLoading(false)
        }
    },[loginModal])

    const onToggle =useCallback(()=>{
        if(isLoading) return

        loginModal.onClose()
        registerModal.onOpen()
    },[isLoading,loginModal,registerModal])

    const bodyContent = (
        <div className="
            flex
            flex-col
            gap-4
        ">
            <Input 
                disabled={isLoading}
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <Input 
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                First time using X?
                <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
                    Create an account
                </span>
            </p>
        </div>
    )

    return (
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal