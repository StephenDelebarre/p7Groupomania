import React, {useState} from "react";
import "../style/PostForm.css"
import axios from "axios";

function PostForm() {

    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    // const [like, setLike] = useState()

    const createPost = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        const post = {
            userId: userId,
            message: message,
            image: image,
        }
        
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            data: {
                post
            },
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="create_post">
            <form className="post_form" onSubmit={createPost}>
                <textarea 
                    name="" 
                    id="" 
                    cols="100" 
                    rows="10" 
                    className="text_area"
                    onChange={(e) => setMessage(e.target.value)} value={message}
                >
                </textarea>
                <input type="file" accept="image/" className="add_image_btn" onChange={(e) => setImage (e.target.value)} value={image} />
                <button className="btn_post">Publier</button>
            </form>
        </div>
    )
}

export default PostForm;