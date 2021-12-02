import React from 'react';
import {usePosts} from "../components/hooks/usePosts";
import {useFetching} from "../components/hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/Mybutton";
import MyModal from "../components/UI/Mymodal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../components/hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

const Posts = () => {
    const [posts, setPosts] = React.useState([])

    const [filter, setFilter] = React.useState({sort: '', query: ''})
    const [visible, setVisible] = React.useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [totalPages, setTotalPages] = React.useState(0)
    const [limit, setLimit] = React.useState(10)
    const [page, setTotalPage] = React.useState(1)

    const lastElem = React.useRef('')



    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        //Достаём с сервера общее количество постов
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })


    useObserver(lastElem, page < totalPages, isPostsLoading, () => {
        setTotalPage(page + 1)
    })


    React.useEffect(() => {
        fetchPosts()
    }, [page, limit]);

    const changePage = (page) => {
        setTotalPage(page)

    }

    const addPost = (newPost) => {
        setPosts([...posts, newPost])
        setVisible(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 30}} onClick={() => setVisible(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm addPost={addPost}/>
            </MyModal>


            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={'Кол-вл элементов на странице'}
                options={[
                    {value: 5, name:'5'},
                    {value: 10, name:'10'},
                    {value: 25, name:'25'},
                    {value: -1, name: 'Показать всё'},
                ]}
            />
            {postError &&
            <h1>Произошла ошибка {postError}</h1>}
            <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={'Посты'}/>
            <div ref={lastElem} style={{height: 20, background: 'red'}}/>
            {isPostsLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                <Loader/>
            </div>}
            <Pagination changePage={changePage} page={page} totalPages={totalPages}/>
        </div>

    );
};

export default Posts;
