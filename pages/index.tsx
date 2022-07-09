import { useEffect, useState } from "react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import {signOut} from "next-auth/react";

export default function Index(props: {
    session: {
        user: {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
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
            <p>name: {props.session.user.name}</p>
            <p>email: {props.session.user.email}</p>
            <img src={props.session.user.image} alt="Profile picture" />
            <button onClick={() => signOut()}>Sign out</button>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getSession(context);

    if (!session) return { redirect: { permanent: false, destination: "/signin" } };

    return { props: {session: session} };
}
