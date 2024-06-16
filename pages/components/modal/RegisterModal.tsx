import { useCallback, useState } from "react";

import Modal from "../Modal";
import Input from "../Input";
import useLoginModal from "@/pages/hooks/LoginModal";
import useRegisterModal from "@/pages/hooks/RegisterModal";

const RegisterModal = ()=>{

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit =  useCallback(()=>{
        try {
            setIsLoading(true)

            // todo
            registerModal.onClose()
        }catch(error) {
            console.log('error',error);
        }finally{
            setIsLoading(false)
        }
    },[registerModal])

    const onToggle = useCallback(()=>{
        if(isLoading) return

        registerModal.onClose()
        loginModal.onOpen()

    },[isLoading,registerModal,loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                disabled={isLoading}
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
                disabled={isLoading}
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <Input 
                disabled={isLoading}
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <Input 
                placeholder="Password"
                value={password}
                disabled={isLoading}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
    )

    const footerContent = (
        <div className="
            text-center
            text-neutral-400
            mt-4
        ">
            <p>Already have an account? 
                <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>Sign in</span>
            </p>
            
        </div>
    )

    return(
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            actionLabel="Register"
            title="Create an account"
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal