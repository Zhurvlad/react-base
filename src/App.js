import React from 'react'
import './styles/App.css'
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./contex";


function App() {
    const [isAuth, setIsAuth] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        if(localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false)
    }, [])

    return (
        <AuthContext.Provider value = {{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <Router>
                <Navbar/>
                <AppRouter/>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
