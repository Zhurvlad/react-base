import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/Mybutton";

const PostForm = ({addPost}) => {
    const [post, setPost] = React.useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        addPost(newPost)
        setPost({
            body: '',
            title: ''
        })

    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})}
                type={'text'}
                placeholder={'Название поста'}/>
            <MyInput
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})}
                type={'text'}
                placeholder={'Описание поста'}/>

            <MyButton onClick={addNewPost} >Создать пост</MyButton>

        </form>
    );
};

export default PostForm;