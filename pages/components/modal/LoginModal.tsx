import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/pages/hooks/useRegisterModal";
import useLoginModal from "@/pages/hooks/useLoginModal";

import Input from '@/pages/components/Input'
import Modal from "../Modal";



const LoginModal = ()=>{

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)

            // get data
            await signIn('credentials',{
                email,
                password
            })

            loginModal.onClose()

        }catch(error){
            console.log('error',error);
        }finally{
            setIsLoading(false)
        }
    },[loginModal,email,password])

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
                type="password"
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