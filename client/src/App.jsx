import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header/Header';
import Landing from './components/layout/landingPage/Landing';
import Footer from './components/layout/footer/Footer';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Alert from './components/layout/alert/Alert';

//Redux
import { Provider } from 'react-redux';
import store from './store.js';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken.js';
import Dashboard from './components/dashboard/Dashboard.jsx';
import PrivateRoute from './components/routing/PrivateRoute.jsx';
import CreateProfile from './components/profileForms/createProfile/CreateProfile.jsx';
import EditProfile from './components/profileForms/editProfile/EditProfile.jsx';
import AddExperience from './components/profileForms/addExperience/AddExperience.jsx';
import EditExperience from './components/profileForms/editExperience/EditExperience.jsx';
import AddEducation from './components/profileForms/addEducation/AddEducation.jsx';
import EditEducation from './components/profileForms/editEducation/EditEducation.jsx';
import AllProfiles from './components/profiles/allProfiles/AllProfiles.jsx';
import SingleProfile from './components/profiles/singleProfile/SingleProfile.jsx';
import Followers from './components/profiles/followers/Followers.jsx';
import Following from './components/profiles/following/Following.jsx';
import AllPosts from './components/posts/allPosts/AllPosts.jsx';
import CreatePost from './components/posts/createPost/CreatePost.jsx';
import SinglePost from './components/posts/singlePost/SinglePost.jsx';
import Posts from './components/profiles/posts/Posts.jsx';
import NotFound from './components/layout/notFound/NotFound.jsx';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='fixed top-24 left-0 right-0 z-[5] w-full mx-auto max-w-7xl px-2 sm:px-5 md:px-10 overflow-hidden space-y-4 md:space-y-5'>
          <Alert />
        </div>
        <Header />
        <section className='min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-195px)] w-full px-2 sm:px-5 md:px-10 mt-[85px] md:mt-[125px] max-w-7xl mx-auto'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/users' element={<AllProfiles />} />
            <Route path='/users/:user_id' element={<SingleProfile />} />
            <Route path='/users/:user_id/follower' element={<Followers/>} />
            <Route path='/users/:user_id/following' element={<Following/>} />
            <Route
              path='/users/:user_id/posts'
              element={<PrivateRoute component={Posts} />}
            />
            <Route
              path='/dashboard'
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path='/create-profile'
              element={<PrivateRoute component={CreateProfile} />}
            />
            <Route
              path='/edit-profile'
              element={<PrivateRoute component={EditProfile} />}
            />
            <Route
              path='/add-experience'
              element={<PrivateRoute component={AddExperience} />}
            />
            <Route
              path='/edit-experience/:exp_id'
              element={<PrivateRoute component={EditExperience} />}
            />
            <Route
              path='/add-education'
              element={<PrivateRoute component={AddEducation} />}
            />
            <Route
              path='/edit-education/:edu_id'
              element={<PrivateRoute component={EditEducation} />}
            />
            <Route
              path='/posts'
              element={<PrivateRoute component={AllPosts} />}
            />
            <Route
              path='/create-post'
              element={<PrivateRoute component={CreatePost} />}
            />
            <Route
              path='/posts/:post_id'
              element={<PrivateRoute component={SinglePost} />}
            />
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </section>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
