import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/Mybutton";
import {AuthContext} from "../../../contex";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logOut = e => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={'navbar'}>
            <MyButton onClick = {logOut}>
                Выйти
            </MyButton>
            <div className={'navbar__links'}>
                <Link to={'/about'}>О сайте</Link>
                <Link to={'/posts'}>Посты</Link>
            </div>
        </div>
    );
};

export default Navbar;