import React, {useState} from "react";
import Post from "react";
import axios from "axios";
import { useEffect } from "react";
import "../style/Feed.css"

function Feed() {

    const [posts, setPosts] = useState(true)

    const token = localStorage.getItem("token")

    useEffect(() => {
        axios({
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
        })
    })

    return (
        <div className="feed">
            <ul className="post_feed">
                {/* {posts.map((post) => {
                        return <Post post={post} key={post._id} />
                    })
                } */}
            </ul>
        </div>
    )

    }

export default Feed; 