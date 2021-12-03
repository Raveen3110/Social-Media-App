import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { db } from '../../config/firebase';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import firebase from 'firebase/compat';

function Post({ postId, ...props }) {
    const [comments, setComments] = useState([])
    const [addcomment, setAddComment] = useState('')
    const [formKey, setFormKey] = useState(1)

    useEffect(() => {
        console.log("postId", postId)
        let unsubcribe;
        if (postId) {
            unsubcribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubcribe()
        }
    }, [postId])
    const postcomment = (e) => {
        console.log("object")
        e.preventDefault();
        setFormKey(prev => (prev + 1)); // clear form
        
        db.collection("posts").doc(postId).collection("comments").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // text:addcomment,
            username:addcomment,
        });
        setAddComment('')
    }
    return (
        <div className='post'>

            <div className='post-header'>
                <Avatar
                    className='mr-2 post-avatar'
                    alt="avatar"
                    src={props.img} />
                <b style={{fontSize:"20px"}}>{props.username}</b>
            </div>
            {/* image */}
            {/* {props.img?<>Image</>:<>............................</>} */}
            <img className='post-img' src={props.img} alt="image-posting" />
            {/* Username + caption */}
            <h4 className='post-text'>
                <b style={{fontSize:"18px"}}>{props.username}:</b>
                 <span style={{fontSize:"16px"}}>  {props.caption}</span>
            </h4>
              <div className='post-comment'>
                {comments && comments?.map((item) =>
                    <div style={{marginTop:"0px",marginButtom:"0px"}}> {console.log("comments", item)}
                        {item.username}
                    </div>

                )}
            </div>  
            <InputGroup className="comments-part" key={String(formKey)}>
                <FormControl
                    placeholder="Add a comments..."
                    value={addcomment}
                    onChange={(e) => setAddComment(e.target.value)}
                    className="post-input"
                />
                {console.log("object", addcomment)}
                <Button disabled={!addcomment}
                    type="submit"
                    onClick={postcomment}
                    className="post-button" style={{ color: "#6082a3" }} onClick={(e) => postcomment(e)}>
                    Post
                </Button>
               
            </InputGroup>
        </div>
    )
}

export default Post
