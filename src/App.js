import React, { useCallback, useEffect } from 'react';
import { read_cookie } from 'sfcookies';
import Header from './features/presentationals/Header/Header';
import About from './features/presentationals/About/About';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './features/containers/Signup/Signup';
import Signin from './features/containers/Signin/Signin';
import Terms from './features/presentationals/Terms/Terms';
import { useDispatch, useSelector } from 'react-redux';
import Home from './features/containers/Home/Home';
import { selectSigninState, isStillSignedIn } from './features/containers/Signin/signinSlice';
import Profile from './features/containers/Profile/Profile';
import Explore from './features/containers/Explore/Explore';
import Notifications from './features/containers/Notifications/Notifications';
import Following from './features/containers/Following/Following';
import Followers from './features/containers/Followers/Followers';
import EditProfile from './features/containers/EditProfile/EditProfile';

function App() {
	const isSignedIn = useSelector(selectSigninState);
	// const dispatch = useDispatch();

	// const checkSignedIn = useCallback(() => {
	// 	dispatch(isStillSignedIn(isCookieValid));
	// }, [isCookieValid, dispatch]);

	// useEffect(() => {
	// 	checkSignedIn();
	// }, [checkSignedIn]);
	// console.log('APPPPPP');
	return (
		<Router>
			<div className='App'>
				<Header isSignedIn={isSignedIn} />
				<main>
					<Switch>
						<Route exact path='/' render={() => <Home isCookieValid={read_cookie('upUserId') ? true : false} />} />
						<Route exact path='/about' component={About} />
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/signin' component={Signin} />
						<Route exact path='/notifications' component={Notifications} />
						<Route exact path='/explore' component={Explore} />
						<Route exact path='/followers' component={Followers} />
						<Route exact path='/following' component={Following} />
						<Route exact path='/editprofile' component={EditProfile} />
						<Route path='/profile' component={Profile} />
						<Route exact path='/terms' component={Terms} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
