import {format} from 'date-fns'
import { useMemo } from "react"
import { BiCalendar } from 'react-icons/bi'

import useCurrentUser from "@/pages/hooks/useCurrentUser"
import useUser from "@/pages/hooks/useUser"

import Button from "../Button"


interface UserBioProps {
    userId:string
}

const UserBio:React.FC<UserBioProps> = ({userId})=>{

    const {data:fetchedUser} = useUser(userId)
    const {data:currentUser} = useCurrentUser()

    const createdAt = useMemo(()=>{
        if(!fetchedUser?.createdAt){
            return null
        }

        return format(new Date(fetchedUser.createdAt),'MMM yyyy')

    },[fetchedUser.createdAt])

    return (
        <div className="border-b-[1px] border-neutral-800 pb-4 ">
            {/* follow or edit */}
            <div className="flex justify-end p-2">
                {// 如果是自己
                    currentUser?.id === userId?(
                        // 编辑信息按钮
                        <Button label="Edit" onClick={()=>{}} secondry />
                    ):(
                        <Button label="Follow" onClick={()=>{}} secondry />)
                }
            </div>

            <div className="mt-8 px-4">

                <div className="flex flex-col">
                    {/* name */}
                    <div className=" text-2xl text-white font-semibold">{fetchedUser?.name}</div>

                    {/* username */}
                    <div className='text-md text-neutral-500'>@{fetchedUser?.username}</div>
                </div>

                <div className="flex flex-col mt-4">
                    {/* bio */}
                    <p className='text-white'>{fetchedUser?.bio}</p>

                    {/* createdAt */}
                    <div className="flex items-center gap-2 mt-4 text-neutral-400">
                        <BiCalendar size={24}/>
                        <div className="text-sm">Joined {createdAt}</div>
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-4">
                    {/* Following */}
                    <div className="flex flex-row gap-1 items-center">
                        <p className='text-white'>{fetchedUser?.followingIds?.length}</p>
                        <p className='text-neutral-500'>Following</p>
                    </div>
                    {/* Follower */}
                    <div className="flex flex-row items-center gap-1">
                        <p className='text-white'>{fetchedUser?.followersCount || 0}</p>
                        <div className="text-neutral-500">Followers</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBio