import usePosts from "@/pages/hooks/usePosts"
import PostItem from "./PostItem"


 interface PostFeedProps {
    userId?:string
 }

const PostFeed:React.FC<PostFeedProps> = ({userId})=>{

    const {data: posts = []} = usePosts(userId)

    // console.log('posts',posts);
    return ( 
        <div>
            {
                // 注意这里是（）
                posts.map((post:Record<string,any>)=>(
                    <PostItem 
                        userId={userId}
                        key={post.id}
                        data={post}
                    />
                ))
            }
        </div>
    )
}

export default PostFeed