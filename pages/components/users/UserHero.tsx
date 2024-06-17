import useUser from "@/pages/hooks/useUser"
import Image from "next/image"
import Avatar from "../Avatar"

interface UserHeroProps {
    userId:string
}

const UserHero:React.FC<UserHeroProps> = ({userId})=>{

    const {data:fetchedUser} = useUser(userId)

    return (
        <div>
            <div className="relative bg-neutral-700 h-44 ">
                {/* 背景图 */}
                {fetchedUser?.coverImage && (
                    <Image 
                        fill
                        style={{objectFit:'cover'}}
                        alt="cover"
                        src={fetchedUser.coverImage}
                    />
                )}

                {/* 头像 */}
                <div className="absolute left-4 -bottom-16">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    )
}

export default UserHero