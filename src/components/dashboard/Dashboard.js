import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/pinsterest.png'
import Post from './Post'
import { auth, db } from '../../config/firebase'
import bgImg from '../../assets/css/sliderrr.jpeg'
import { Button } from 'reactstrap'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Imageupload from './Imageupload'
import { BsPlusSquare } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
// import { Avatar } from '@mui/material'
import { Avatar } from '@material-ui/core'



function Dashboad() {
    const history = useHistory()
    const [postModal, setPostModal] = useState(false)

    const [post, setPost] = useState([
        // {
        //     img:"bgImg",
        //     username:"Raveen Deep",
        //     caption:"Wow its work Properly"
        // }, {
        //     img:"bgImg",
        //     username:"Raveen Deep",
        //     caption:"Wow its work Properly"
        // }
    ])
    const logout = () => {
        auth.signOut()
        history.push("./")

    }
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => ({
                post: doc.data(),
                id: doc.id
            })));
        })
    }, [])
    return (
        <div className='app_dashboard'>
            <div className="header">
                <div className='dashboard-inner'>
                    <img src={logo} alt="logo" height="40px"
                        className='header_img'
                    />
                    <span className='header_button'>

                        <span onClick={() => setPostModal(true)}><AiFillHome />  </span>
                        <span onClick={() => setPostModal(true)}><BiMessageRoundedAdd />  </span>
                        <FaRegHeart />

                        <span onClick={() => setPostModal(true)}><BsPlusSquare />  </span>
                        <Avatar
                            className='post-avatar'
                            // alt="avatar"
                            // src={img}
                             />
                    </span>
                </div>
            </div>

            <Imageupload show={postModal} onHideModal={setPostModal} />

            <div className='dashboard-inner--lower'> {console.log("postttt", post)}
                {post.map(item => (
                    <Post key={item.id} username={item.post.username} img={item.post.imageUrl} caption={item.post.caption} />
                ))}
                <Button className="btn mt-4" type="submit"
                    style={{ width: "100%", backgroundColor: "orange", border: "none" }}
                    onClick={() => logout()}
                >logOut</Button>
            </div>
        </div>
    )
}
export default Dashboad