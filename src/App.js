import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './view/pages/Home';
import SignUp from './view/pages/Signup';
import Rules from './view/pages/Rules';
import Top from './view/pages/Top';
import MainPage from './view/pages/MainPage';
import Header from './view/containers/Header';
import Footer from './view/containers/Footer';
import NotFound from './view/pages/NotFound';
import Profile from './view/pages/Profile';
import { paths } from './constants';
import Loading from "./view/components/Loading";
import { getCurrentUser } from './helpers/auth';
import Verification from './view/pages/Verification';
import PasswordReset from './view/pages/PasswordReset';
import DeleteAccount from './view/pages/DeleteAccount';
import { axiosInstance } from './helpers/api';

function App() {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [leagues, setLeagues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (getCurrentUser()) {
            setUser(getCurrentUser().user);
        }

        axiosInstance.get('leagues')
            .then((response) => {
                setLeagues(response.data.data);
            })
            .then(() => { setIsLoading(false) })
    }, []);

    function handleOpenClose() {
        setOpen(!open);
    }

    return (
        !isLoading ?
            <div className='App'>
                <Header
                    className='header'
                    open={open}
                    handleOpenClose={handleOpenClose}
                    user={user}
                    setUser={setUser}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
                <main className="main">
                    <Routes>
                        <Route path={paths.home}
                            element={<Home leagues={leagues} />}
                        />
                        <Route path={`${paths.main}/:slug`}
                            element={<MainPage user={user} leagues={leagues} />}
                        />
                        <Route path={paths.signup}
                            element={<SignUp handleOpenClose={handleOpenClose} setUser={setUser} />}
                        />
                        <Route path={paths.profile}
                            element={<Profile user={user} setUser={setUser} />}
                        />
                        <Route path={paths.rules} element={<Rules />} />
                        <Route path={paths.top} element={<Top />} />
                        <Route path={`${paths.reset}/:token`} element={<PasswordReset />} />
                        <Route path={`${paths.verification}/:action`}
                            element={<Verification user={user} setUser={setUser} />}
                        />
                        <Route path={`${paths.account}/:result`}
                            element={<DeleteAccount setUser={setUser} />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer className="footer" />
            </div>
            :
            <Loading />
    );
}

export default App;
