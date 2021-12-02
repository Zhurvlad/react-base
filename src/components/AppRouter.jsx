import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {publicRoutes, privateRoutes} from "../router/Routes";
import {AuthContext} from "../contex";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if(isLoading) {
        return <Loader/>
    }

    return (
        //Код кладём в свич и если юзер переходит на несуществующую страницу то редиректим его

            isAuth
                ? <Switch>
                    {privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            component={route.component}
                            path={route.path}
                            exact={route.exact}/>
                    )}
                    <Redirect to={'/posts'}/>
                </Switch>
                : <Switch>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            component={route.component}/>
                    )}
                    <Redirect to={'/login'}/>
                </Switch>



            /*<Route path ='/about' exact>
                <About/>
            </Route>
            <Route path ='/posts' exact>
                <Posts/>
            </Route>
            //Для динамического роутинга ставим ID через :
            //И так как у нас в обоих случаях в роутинге есть постс мы юзаем Эксакт
            <Route path ={'/posts/:id'} exact>
                <PostIdPage/>
            </Route>
            <Route path={'/error'}>
                <Error/>
            </Route>*/


    );
};

export default AppRouter;
