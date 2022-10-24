import React, {useState} from "react";
import axios from "axios";
import "../style/Post.css";
import UserImage from "../Image/user_image.jpg";
import "../services/Date";
import moment from "moment";

// mise en page, modification et suppression des posts et like

function Post({post}) {

    const [update, setUpdate] = useState(false);
    const [newText, setNewText] = useState("");
    const [newImage, setNewImage] = useState();
    const [like, setLike] = useState();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const admin = localStorage.getItem("admin");

    // fonction de suppression

    const deletePost = async () => {
        if (userId === post.userId) {
            await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
                headers: {
                    Authorization: "bearer " + token
                }
            });
        } else { alert("Vous n'être pas autorisé à supprimer ce post")}

        window.location.reload();

    };

    // fonction de modification

    const modifyPost = async () => {

        if (userId === post.userId) {

        const newPost = new FormData();
        newPost.append("userId", userId);
        newPost.append("message", newText);
        newPost.append("image", newImage);

        await axios.put(`${process.env.REACT_APP_API_URL}api/posts/${post._id}`, newPost, {
        headers: {
            Authorization: "Bearer " + token,
            "content-type": "multipart/form-data",
            'Content-Type': 'application/octet-stream',
        }

            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            });
        };

        window.location.reload();
        
    };

    // liker les posts

    const updateLike = () => {

         axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}/like`,
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                like: like,
                userId: userId
            }
        });
        setLike(1);

        document.querySelector(".fa-heart").classList.add("heart");
    };


    return (
        <div className="post">
            <div className="post_header">
                <div className="user_identity">
                <img src={UserImage} alt="" className="post_img_user" />
                {post.userId}
                </div>
                {(userId === post.userId || admin === "true") && (
                    <div className="post_btn">
                        <ul>
                            <li className="modify_btn" onClick={() => setUpdate(!update)}><i className="fa-solid fa-pen-to-square fa-xl"></i></li>
                            <li className="delete_btn" onClick={deletePost}><i className="fa-solid fa-trash fa-xl"></i></li>
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
                        {post.imageURL && (
                            <div>
                                <input type="file" accept="image/*" className="add_image_btn" onChange={(e) => setNewImage (e.target.files[0], e.target.files[0].name)}/>
                                <label htmlFor="file" className="file_label"><i className="fa-solid fa-image fa-xl"></i></label>
                            </div>
                        )}
                    </div>
                )}
                {post.imageURL && (
                    <div className="post_img_div">
                        <img src={post.imageURL} alt="" className="post_img"></img>
                    </div>
                )}
                <div className="date">Publié il y a {moment(post.updatedAt).locale("fr").fromNow(true)}{" "}</div>
            </div>
            <div className="post_footer">
                <div className="like">
                    {post.usersLiked.includes(userId) && (
                        <i class="fa-sharp fa-solid fa-heart heart"></i>
                    )}
                    {!post.usersLiked.includes(userId) && (
                        <i className="fa-regular fa-heart" onClick={updateLike}></i>
                    )}
                    <p className="like_counter">{post.like}</p>
                </div>
            </div>
        </div>
    );
};

export default Post;