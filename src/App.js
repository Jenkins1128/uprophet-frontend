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
import EditProfile from './features/containers/Profile/EditProfile/EditProfile';
import ChangePassword from './features/containers/ChangePassword/ChangePassword';
import ForgotPassword from './features/containers/ForgotPassword/ForgotPassword';
import QuoteComments from './features/containers/QuoteComments/QuoteComments';
import Searchresults from './features/containers/Searchresults/Searchresults';
import Favoriters from './features/containers/Favoriters/Favoriters';
import Favoriting from './features/containers/Favoriting/Favoriting';
import Header from './features/presentationals/Header/Header';

function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<main>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/about' component={About} />
						<Route exact path='/signup' component={Signup} />
						<Route exact path='/signin' component={Signin} />
						<Route exact path='/notifications' component={Notifications} />
						<Route exact path='/explore' component={Explore} />
						<Route exact path='/changepassword' component={ChangePassword} />
						<Route exact path='/forgotpassword' component={ForgotPassword} />
						<Route exact path='/quote/:quoteId' component={QuoteComments} />
						<Route exact path='/terms' component={Terms} />
						<Route exact path={['/search', '/search/:searchtext']} component={Searchresults} />
						<Route path='/:username/favoriters' component={Favoriters} />
						<Route path='/:username/favoriting' component={Favoriting} />
						<Route exact path='/account/edit' component={EditProfile} />
						<Route path='/:username' component={Profile} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
