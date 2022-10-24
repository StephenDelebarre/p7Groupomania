import React, {useState, useEffect, useCallback} from "react";
import Post from "../components/Post";
import axios from "axios";
import "../style/Feed.css";

// fil d'actualité qui affiche tout les posts

function Feed() {

    const [posts, setPosts] = useState([]);

    const token = localStorage.getItem("token");

    const getPost = useCallback (async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                posts: posts
            }
        })
        .then((res) => {
            setPosts(res.data)
        })
        .catch ((err) => {
            console.log(err)
        });
    }, []);

    useEffect(() => {
        getPost();
    }, [getPost]);

    return (
        <div className="feed">
            <ul className="post_feed">
                {posts.map((post) => {
                        return <Post post={post} key={post._id} />
                    })
                }
            </ul>
        </div>
    );
};

export default Feed; 