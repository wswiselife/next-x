import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import useEditModal from "@/pages/hooks/useEdit"
import useCurrentUser from "@/pages/hooks/useCurrentUser"
import useUser from "@/pages/hooks/useUser"

import Modal from "../Modal"
import Input from "../Input"


const Edit = ()=>{

    const editModal = useEditModal()
 
    const {data:currentUser} = useCurrentUser()
    const {mutate:mutateFetchedUser}= useUser(currentUser?.id)

    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [bio,setBio] = useState('')
    const [profileImage,setProfileImage] = useState('')
    const [coverImage,setCoverImage] = useState('')
    const [id,setId] = useState('')

    useEffect(()=>{
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        // /pages/api/edit 获取 currentUser.id失败，转由此处传入id-20240617
        setId(currentUser?.id)
    },[currentUser])

    const [isLoading,setIsLoading] = useState(false)

    
    const onSubmit = useCallback(async()=>{
        try{
            setIsLoading(true)

            await axios.patch('/api/edit',{
                name,
                username,
                bio,
                coverImage,
                profileImage,
                id
            })

            // 持久化处理数据发送问题
            mutateFetchedUser()

            toast.success('updated success.')

            editModal.onClose()

        }catch(error){
            console.log('error',error);
            toast.error('Something went wrong')
        }finally{
            setIsLoading(false)
        }
    },[name,username,bio,profileImage,coverImage,editModal,mutateFetchedUser])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Name" value={name} disabled={isLoading} onChange={(e) =>setName(e.target.value)} />
            <Input placeholder="Username" value={username} disabled={isLoading} onChange={(e) =>setUsername(e.target.value)} />
            <Input placeholder="Bio" value={bio} disabled={isLoading} onChange={(e) =>setBio(e.target.value)} />
        </div>
    )
    

    return (
        <Modal 
            isOpen={editModal.isOpen}
            disabled={isLoading}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default Edit