import React from 'react';
import MyButton from "./UI/button/Mybutton";
import {useHistory} from 'react-router-dom'

const PostItem = ({post, removePost}) => {
    //Для того чтобы переходить по постам динамически мы юзаем юс хистори
    const router = useHistory()


    return (
        <div className="post">
            <div className="post__content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton  onClick = {() => router.push(`/posts/${post.id}`)}>Открыть</MyButton>
                <MyButton onClick = {() => removePost(post)}>Удалить пост</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
