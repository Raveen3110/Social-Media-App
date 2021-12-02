import React, { useState } from 'react'
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

    const handleChange = (e) => {
        if (e.target.files[0]) {

            console.log("object", e.target.files[0].name)
            setImage(e.target.files[0]);
            setImg(e.target.files[0].name)
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
                            username: "Sample Name"
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                        setProgressShow(false)
                        onHideModal()
                    })
            }
        )
    }
    return (
        <Modal show={show} onHide={onHideModal}>
            <Modal.Header>
                <span className="d-flex post-modal-header">
                    <b>Create new post</b>
                </span>
                {/* <Button type="button" onClick={() => onHideModal()} className="btn-close"
                    data-bs-dismiss="modal" aria-label="Close"></Button> */}
            </Modal.Header>
            <Modal.Body className='modal_body'>
                {/* <input type="text" placeholder='Enter a caption...' onChange={(e) => setCaption(e.target.value)} /> */}


                <div className="upload-btn-wrapper" style={{ marginLeft: "32px", marginTop: "10px" }} >
                    <div className="rectangle">
                        <img src={img} height="200px" alt="profile" style={{ marginTop: "4px" }} />
                    </div>
                    <form>
                        <input type='file' onChange={(e) => handleChange(e)} />
                    </form>
                </div>
                <div >
                    <div class="md-form">
                        <textarea onChange={(e) => setCaption(e.target.value)} placeholder='Write a caption...' className="md-textarea form-control mt-4" rows="2"></textarea>
                    </div>
                    
                   {progressShow? <ProgressBar animated now={progress} className='mt-3'/>:<></>}
                    
                </div>

                {/* <img src={dragImg} height="250px" />
                <input className="img-btn" type="file" onChange={(e) => handleChange(e)} />
                <div >
                    <div class="md-form">
                        <textarea id="form7" placeholder='Enter a caption...' class="md-textarea form-control" rows="2"></textarea>
                    </div>

                    <progress value={progress} max={100} style={{ width: "100%", marginTop: "10px" }} />
                </div> */}



                {/* <Button onClick={handleUpload}>Upload</Button> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onHideModal()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => handleUpload()}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
        // <Modal >
        //     <Modal.Body>
        //         <progress value={progress} max={100} />
        //         <input type="text" placeholder='Enter a caption...' onChange={(e) => setCaption(e.target.value)} />
        //         <input type="file" onChange={(e) => handleChange(e)} />
        //         <Button onClick={handleUpload}>Upload</Button>
        //     </Modal.Body>
        // </Modal>
    )
}

export default Imageupload
