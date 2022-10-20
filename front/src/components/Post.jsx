import React, {useState, useEffect} from "react";
import axios from "axios";
import "../style/Post.css"
import UserImage from "../Image/user_image.jpg"

function Post({post, message, image, like}) {

    const [update, setUpdate] = useState(false);
    const [newText, setNewText] = useState("")
    const [newImage, setNewImage] = useState("");
    const [addLike, setAddLike] = useState(0)
    const [liked, setLiked] = useState(false)

    // const updateItem =

    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")


    // fonction de suppression

    const deletePost = () => {
        if (userId === post.userId) {
            axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
                headers: {
                    Authorization: "bearer " + token
                }
            })
        } else { alert("Vous n'être pas autorisé à supprimer ce post")}
    }

    // fonction de modification

    const modifyPost = () => {
        if (userId === post.userId) {
            message = newText
            image = newImage
            axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
                headers: {
                    Authorization: "Bearer " + token
                },
                data: {
                    message,
                    image
                }
            })
            setUpdate(false)
        } else {
            alert("Vous n'êtes pas autorisé à modifier ce post")
        }
    }

    // requête qui récupère les posts de la base de données

    axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        headers: {
            Authorization: "Bearer " + token
        },
        data: {
            post
        }
    })
    .then((res) => {

    })
    .catch ((err) => {
        console.log(err)
    })

    const updateLike = () => {

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                like
            }
        })
        .then(() => {
            setAddLike(liked ? like -1 : like + 1);
            setLiked(!liked)
        })
    }


    return (
        <div className="post">
            <div className="post_header">
                <div className="user_identity">
                <img src={UserImage} alt="" className="post_img" />
                {post.userId}
                </div>
                {userId === post.userId && (
                    <div className="post_btn">
                        <ul>
                            <li className="modify_btn" onClick={() => setUpdate(!update)}><i class="fa-solid fa-pen-to-square fa-xl"></i></li>
                            <li className="delete_btn" onClick={deletePost}><i class="fa-solid fa-trash fa-xl"></i></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="post_body">
                {update === false && <div className="post_message">
                    {post.message}
                </div> }
                {update && (
                    <div className="update_post">
                        <div className="update_post_textarea">
                            <textarea className="modify_text" defaultValue={post.message} onChange={(e) => setNewText(e.target.value)}></textarea>
                        </div>
                        <div className="update_post_btn">
                            <button className="update_btn" onClick={modifyPost}>Envoyer</button>
                        </div>
                    </div>
                )}
                <div className="post_img">
                    {post.imageUrl}
                </div>
            </div>
            <div className="post_footer">
                <div className="like">
                <i class="fa-regular fa-heart" onClick={updateLike}></i>
                    <p className="like_counter" >{post.like}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;