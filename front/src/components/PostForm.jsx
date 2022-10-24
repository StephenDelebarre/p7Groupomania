import React, {useState} from "react";
import "../style/PostForm.css";
import axios from "axios";

// fomulaire de création de post

function PostForm() {

    const [message, setMessage] = useState("");
    const [image, setImage] = useState();

    const createPost = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("message", message);
        formData.append("image", image);

        await axios.post("http://localhost:5000/api/posts", formData, {
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

        window.location.reload();
    };

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
                    <input type="file" id="file" accept="image/*" className="add_image_btn" onChange={(e) => setImage (e.target.files[0], e.target.files[0].name)}/>
                    <label htmlFor="file" className="file_label"><i className="fa-solid fa-image fa-2xl"></i></label>
                    <button className="btn_post">Publier</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;