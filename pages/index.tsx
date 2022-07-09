import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
    const [newPostBody, setNewPostBody] = useState("");
    const [posts, setPosts] = useState<{body: string, _id: string}[]>([]);

    function onAdd() {
        axios.post("/api/post", {body: newPostBody}).then(() => {
            setNewPostBody("");
            onRequest();
        }).catch(e => console.log(e));
    }

    function onRequest() {
        axios.get("/api/post").then(res => {
            setPosts(res.data.posts);
        }).catch(e => console.log(e));
    }

    function onDelete(id: string) {
        axios.delete("/api/post", {data: {id: id}}).then(() => {
            onRequest();
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        onRequest();
    }, []);

    return (
        <>
            <input type="text" value={newPostBody} onChange={e => setNewPostBody(e.target.value)} />
            <button onClick={onAdd}>Add</button>
            {posts.map(d => (
                <>
                    <p key={d._id}>{d.body}</p>
                    <button onClick={() => onDelete(d._id)}>Delete</button>
                </>
            ))}
        </>
    );
}
