import useUsers from "@/pages/hooks/useUsers"
import Avatar from "../Avatar"

const Followbar = ()=>{

    const {data:users = []} = useUsers()
    // console.log('users',users);
    // bug 退出登录也可以请求到-20240617

    // 如果没有关注的人，则不显现
    if(users.length === 0 ){
        return null
    }

    return(
        <div className="
            hidden
            lg:block
            px-6
            py-4
        ">
            <div className="bg-neutral-800 rounded-xl p-4">
                <div className="text-white text-xl font-semibold">Who to follow</div>

                {/* list */}
                <div className="flex flex-col gap-6 mt-4">
                    {
                        users.map((user: Record<string,any>) =>(
                            <div key={user.id} className="flex flex-row gap-4">
                                <Avatar userId={user.id} />
                                <div className="flex flex-col">
                                    <p className="text-white text-sm font-semibold">{user.name}</p>
                                    <p className="text-neutral-400 text-sm">@{user.username}</p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Followbar