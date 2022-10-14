// import React, {useState} from "react";
// import axios from "axios";

// function Post() {

//     const [posts, setPosts] = useState(null)

//     const token = localStorage.getItem("token")

//     axios({
//         method: "get",
//         url: `${process.env.REACT_APP_API_URL}api/posts`,
//         headers: {
//             Authorization: "Bearer " + token
//         },
//         data: {
//             posts: posts
//         }
//     })
//     .then((res) => {
//        setPosts(res.data)
//     })
//     .catch ((err) => {
//         console.log(err)
//     })

//     return (
//         <div className="post">
//             <p className="text">{posts.message}</p>
//         </div>
//     )
// }

// export default Post;