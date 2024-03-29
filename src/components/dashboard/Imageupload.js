import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import dragImg from '../../assets/image/Drag.png'
import { storage, db } from '../../config/firebase'
import firebase from "firebase/compat/app"
import { Modal, ProgressBar } from 'react-bootstrap'

function Imageupload({ show, onHideModal }) {

    const [image, setImage] = useState("")
    const [img, setImg] = useState(dragImg)

    const [progress, setProgress] = useState("")
    const [caption, setCaption] = useState("")
    const [progressShow, setProgressShow] = useState(false)
    const LoginUserName =localStorage.getItem('LoginUserName')
    console.log("LoginUserName",LoginUserName)

    const handleChange = (e) => {
        if (e.target.files[0]) {

            console.log("object", e.target.files[0])
            setImage(e.target.files[0]);
            // setImg(e.target.files[0])
            // console.log("image",img)
        }
    }
    const handleUpload = () => {
        // setImage(e.target.file[0]);
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progressValue = Math.round(
                    (snapshot.bytesTransferred) / (snapshot.totalBytes) * 100
                );
                setProgressShow(true)
                setProgress(progressValue);
            },
            (error) => {
                console.log("error", error.message)
                alert(error.message)
            },
            () => {
                // complete fun
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: LoginUserName
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                        setImg(dragImg);
                        setProgressShow(false)
                        onHideModal()
                    })
            }
        )
    }
    const modalclosed = () => {

        setProgress(0);
        setCaption("");
        setImage(null);
        setImg(dragImg);
        setProgressShow(false)
        onHideModal()
    }
    return (
        <Modal show={show} onHide={onHideModal}>
            <Modal.Header>
                <span className="d-flex post-modal-header">
                    <b>Create new post</b>
                </span>
            </Modal.Header>
            <Modal.Body className='modal_body'>

                <div className="upload-btn-wrapper" style={{ marginLeft: "32px", marginTop: "10px" }} >
                    <div className="rectangle">
                        {/* {console.log("Imageee",img.name)} */}
                        <img src={img} height="200px" alt="profile" style={{ marginTop: "4px" }} />
                    </div>
                    <form>
                        <input type='file' onChange={(e) => handleChange(e)} />
                    </form>
                </div>
                <div >
                    <div className="md-form">
                        <textarea onChange={(e) => setCaption(e.target.value)} placeholder='Write a caption...' className="md-textarea form-control mt-4" rows="2"></textarea>
                    </div>
                    {progressShow ? <ProgressBar animated now={progress} className='mt-3' /> : <></>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => modalclosed()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleUpload()}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Imageupload
