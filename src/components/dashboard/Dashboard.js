import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/pinsterest.png'
import InstagramEmbed from 'react-instagram-embed';
import Post from './Post'
import { auth, db } from '../../config/firebase'
import bgImg from '../../assets/css/sliderrr.jpeg'
import loader from '../../assets/image/balls_loading.gif'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Imageupload from './Imageupload'
import { BsPlusSquare } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { Avatar } from '@material-ui/core'
import { Dropdown, DropdownButton } from 'react-bootstrap';



function Dashboad() {
    const history = useHistory()
    const [postModal, setPostModal] = useState(false)


    const [post, setPost] = useState([])
    const logout = () => {
        auth.signOut()
        history.push("/")
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
                        <div className="input-group rounded">
                            <input type="search" className="form-control rounded" style={{ marginTop: "8px", height: "34px" }} placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" />
                            <span className="input-group-text border-0" style={{ backgroundColor: "white", marginRight: "20px" }}>
                                {/* <i className="fas fa-search"></i> */}
                                <BiSearchAlt2 size={22} />
                            </span>
                        </div>
                        <span className='x3x3' onClick={() => setPostModal(true)}><AiFillHome />  </span>
                        <span className='x3x3' onClick={() => setPostModal(true)}><BsPlusSquare />  </span>
                        <div className="mb-2" style={{ backgroundColor: "white", border: "none" }}>
                            {['end'].map((direction) => (
                                <DropdownButton style={{ backgroundColor: "white", border: "none" }}
                                    key={direction}
                                    drop={direction}
                                    title={<Avatar className='post-avatar' />}>
                                    <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                                </DropdownButton>
                            ))}
                        </div>
                    </span>
                </div>
            </div>
            <Imageupload show={postModal} onHideModal={setPostModal} />
            <div className='dashboard-inner--lower'>

                {/* {console.log("postttt", post)} */}
                {post.map(item => (
                    <div style={{ padding: "20px" }}>
                        {/* {console.log("item.post.id", item.id)} */}
                        <Post key={item.id} postId={item.id} username={item.post.username} img={item.post.imageUrl} caption={item.post.caption} />

                    </div>
                ))}


                <InstagramEmbed
                    url='https://www.instagram.com/p/B_uf9dmAGPw/'
                    // clientAccessToken='utm_source=ig|web_copy_link'
                    maxWidth={320}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => { }}
                    onSuccess={() => { }}
                    onAfterRender={() => { }}
                    onFailure={() => { }}
                />
            </div>
        </div>
    )
}
export default Dashboad