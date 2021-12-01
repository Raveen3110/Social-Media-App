import React, { useEffect, useState } from 'react'
import logo from '../../assets/image/logo.png'
import Post from './Post'
import { db } from '../../config/firebase'
import bgImg from '../../assets/css/sliderrr.jpeg'

function Dashboad() {
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

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot=>{
            setPost(snapshot.docs.map(doc => ({
               post: doc.data(),
               id: doc.id
            })));
            })
    }, [])
    return (
        <div className='app_dashboard'>
            <div className="header">
                <img src={logo} alt="logo" height="50px"
                    className='header_img'
                />

            </div>
            <h1>Dashboad Newww   Page</h1>
            {console.log("postttt",post)}
            {post.map(item => (
                <Post key={item.id} username={item.post.username} img={bgImg} caption={item.post.caption}/>
            ))}


        </div>
    )
}
export default Dashboad