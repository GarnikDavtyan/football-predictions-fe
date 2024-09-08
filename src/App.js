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

function App() {

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (getCurrentUser()) {
            setUser(getCurrentUser().user);
        }
        setIsLoading(false);
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
                    isLoading = {isLoading}
                    setIsLoading={setIsLoading}
                />
                <main className="main">
                    <Routes>
                        <Route path={paths.home}
                            element={<div className="custom-route"><Home /></div>}
                        />
                        <Route path={`${paths.main}/:slug`}
                            element={
                                <div className="custom-route">
                                    <MainPage user={user} />
                                </div>
                            }
                        />
                        <Route path={paths.signup}
                            element={
                                <div className="custom-route">
                                    <SignUp handleOpenClose={handleOpenClose} setUser={setUser} />
                                </div>
                            }
                        />
                        <Route path={paths.profile}
                            element={
                                <div className="custom-route">
                                    <Profile user={user} setUser={setUser} />
                                </div>
                            }
                        />
                        <Route path={paths.rules}
                            element={
                                <div className="custom-route">
                                    <Rules />
                                </div>
                            }
                        />
                        <Route path={paths.top}
                            element={
                                <div className="custom-route">
                                    <Top />
                                </div>
                            }
                        />
                        <Route path={`${paths.verification}/:action`}
                            element=
                            {
                                <div className="custom-route">
                                    <Verification user={user} setUser={setUser} />
                                </div>
                            }
                        />
                        <Route path={`${paths.reset}/:token`}
                            element=
                            {
                                <div className="custom-route">
                                    <PasswordReset />
                                </div>
                            }
                        />
                        <Route path="*"
                            element={
                                <div className="custom-route">
                                    <NotFound />
                                </div>
                            }
                        />
                    </Routes>
                </main>
                <Footer className="footer" />
            </div>
            :
            <Loading />

    );
}

export default App;
