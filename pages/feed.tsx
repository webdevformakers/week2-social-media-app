import {useState, useEffect} from "react";
import axios from "axios";

export default function Feed() {
    const [posts, setPosts] = useState<{
        body: string,
        _id: string,
        createdAt: string,
        user: {
            name: string,
            image: string
        }
    }[]>([]);

    useEffect(() => {
        axios.get("/api/feed").then(res => {
            setPosts(res.data.posts);
        }).catch(e => console.log(e));
    }, []);

    return (
        <>
            {posts.map(d => (
                <div key={d._id} className="p-2 border shadow-md m-4">
                    <p>{d.body}</p>
                    <div className="flex items-center">
                        <img src={d.user.image} alt="" className="w-4 h-4 rounded-full mr-2"/>
                        <p className="text-sm text-gray-500">Posted by {d.user.name}</p>
                    </div>
                </div>
            ))}
        </>
    )
}