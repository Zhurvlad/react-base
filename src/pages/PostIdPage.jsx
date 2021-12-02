import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../components/hooks/useFetching";
import {getPagesCount} from "../components/utils/pages";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = React.useState({})
    const [comments, setComments] = React.useState([])

    const [fetchPostsById, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostService.getById(params.id)
        setPost(response.data)

    })

    const [fetchCommentsById, isCommentsLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getComments(params.id)
        setComments(response.data)

    })



    useEffect(() => {
        fetchPostsById()
        fetchCommentsById()

    }, [])


    return (
        <div>
            <h1>
                Вы открыли страницу поста с ID = {params.id}
            </h1>
            {isPostLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>Комментарии</h1>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments && comments.map(com => (
                        <div key={com.id} style={{marginTop: 15}}>
                            <h5>{com.email}</h5>
                            <h4>name: {com.name}</h4>
                            <div>Text: {com.body}</div>
                        </div>
                    ))}}
                </div>
            }
        </div>
    );
};

export default PostIdPage;
