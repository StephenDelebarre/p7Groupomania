import React, {useState} from "react";
import "../style/PostForm.css"
import axios from "axios";

function PostForm() {

    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

    const createPost = (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")

        // const post = {
        //     userId: userId,
        //     message: message,
        //     image: image
        // }


        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("message", message);
        formData.append("image", image);

        formData.forEach((value, key) => {
            console.log(key + " " + value)
        })
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/posts`,
            data: {
            },
            headers: {
                Authorization: "Bearer " + token,
                "content-type": "multipart/form-data"
            },
            transformRequest: formData => formData
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
                    placeholder="Écrire ici..."
                    onChange={(e) => setMessage(e.target.value)} value={message}
                >
                </textarea>
                <div className="btn_nav">
                    <input type="file" accept=".png,.jpeg,.jpg" className="add_image_btn" onChange={(e) => setImage (e.target.files[0])}/>
                    <button className="btn_post">Publier</button>
                </div>
            </form>
        </div>
    )
}

export default PostForm;