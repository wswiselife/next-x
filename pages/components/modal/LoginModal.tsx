import useLoginModal from "@/pages/hooks/LoginModal";
import { useCallback, useState } from "react";

import Input from '@/pages/components/Input'
import Modal from "../Modal";

const LoginModal = ()=>{

    const LoginModal = useLoginModal()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit = useCallback(()=>{
        try{
            setIsLoading(true)

            // get data

            LoginModal.onClose()

        }catch(error){
            console.log('error',error);
        }finally{
            setIsLoading(false)
        }
    },[LoginModal])

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

    return (
        <Modal 
            disabled={isLoading}
            isOpen={LoginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={LoginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default LoginModal