import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";


const PostList = ({posts, title, removePost}) => {


    if(!posts.length) {
       return <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post) => (
                    <CSSTransition
                        timeout={500}
                        classNames = 'post'
                        key={post.id}>
                        <PostItem
                            removePost={removePost}

                            post={post}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default PostList;
