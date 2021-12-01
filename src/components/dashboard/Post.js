import { Avatar } from '@material-ui/core'
import React from 'react'

function Post(props) {
    return (
        <div className='post'>

            <div className='post-header'>
                <Avatar
                    className='mr-2 post-avatar'
                    alt="avatar"
                    src={props.img} />
                <h3>{props.username}</h3>
            </div>
            {/* image */}
            <img className='post-img' src={props.img} alt="image-posting" />
            {/* Username + caption */}
            <h4 className='post-text'><b>{props.username}</b> {props.caption}</h4>
        </div>
    )
}

export default Post
