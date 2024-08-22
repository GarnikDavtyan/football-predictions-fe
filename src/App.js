import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import CustomRoute from './view/components/CustomRoute';
import './App.css';
import Home from './view/pages/Home';
import SignUp from './view/pages/Signup';
import Rules from './view/pages/Rules';
import Top from './view/pages/Top';
import MainPage from './view/pages/MainPage';
import Header from './view/containers/Header';
import Footer from './view/containers/Footer';
import NotFound from './view/pages/NotFound';
import { paths } from './constants';
import Loading from "./view/components/Loading";
import {getCurrentUser} from './helpers/auth';
import {axiosInstance} from './helpers/api';


function App() {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     if(getCurrentUser()) {
      setUser(getCurrentUser().user);
     }

     axiosInstance.get('leagues')
      .then((response) => {
        setLeagues(response.data.data);
      })
      .then(() => { setIsLoading(false)})
  }, []);

  function handleOpenClose() {
    setOpen(!open);
  }

  return (
    !isLoading ?
      <div className='App'>
        <Header className='header' open={open} handleOpenClose={handleOpenClose} user={user} setUser={setUser} />
        <main className="main">
          <Switch>
            <CustomRoute className="home-route" exact path={[paths.home, paths.main]}>
              <Home leagues={leagues} />
            </CustomRoute>

            <CustomRoute path={paths.main + '/:id'}>
              <MainPage user={user} leagues={leagues}/>
            </CustomRoute>

            <CustomRoute path={paths.signup}>
              <SignUp handleOpenClose={handleOpenClose} setUser={setUser}/>
            </CustomRoute>

            <CustomRoute path={paths.rules} component={Rules} />
            <CustomRoute path={paths.top} component={Top} />
            <CustomRoute render={() => <NotFound subLink='' />} />
          </Switch>
        </main>
        <Footer className="footer" />
      </div>
      :
      <Loading />

  );
}

export default App;
