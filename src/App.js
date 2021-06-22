import React from 'react';
import About from './features/presentationals/About/About';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './features/containers/Signup/Signup';
import Signin from './features/containers/Signin/Signin';
import Terms from './features/presentationals/Terms/Terms';
import Home from './features/containers/Home/Home';
import Profile from './features/containers/Profile/Profile';
import Explore from './features/containers/Explore/Explore';
import Notifications from './features/containers/Notifications/Notifications';
import Following from './features/containers/Following/Following';
import Followers from './features/containers/Followers/Followers';
import EditProfile from './features/containers/EditProfile/EditProfile';
import ChangePassword from './features/containers/ChangePassword/ChangePassword';
import ForgotPassword from './features/containers/ForgotPassword/ForgotPassword';

function App() {
	return (
		<Router>
			<div className='App'>
				<main>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/about' component={About} />
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/signin' component={Signin} />
						<Route exact path='/notifications' component={Notifications} />
						<Route exact path='/explore' component={Explore} />
						<Route exact path='/followers' component={Followers} />
						<Route exact path='/following' component={Following} />
						<Route exact path='/editprofile' component={EditProfile} />
						<Route exact path='/changepassword' component={ChangePassword} />
						<Route exact path='/forgotpassword' component={ForgotPassword} />
						<Route path='/profile' component={Profile} />
						<Route exact path='/terms' component={Terms} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
