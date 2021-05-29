import React from 'react';
import Header from './features/presentationals/Header/Header';
import Topquotes from './features/presentationals/Topquotes/Topquotes';
import About from './features/presentationals/About/About';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './features/containers/Signup/Signup';
import Signin from './features/containers/Signin/Signin';
import Terms from './features/presentationals/Terms/Terms';
import { useSelector } from 'react-redux';
import Home from './features/containers/Home/Home';
import { selectSigninState } from './features/containers/Signin/signinSlice';
import Profile from './features/containers/Profile/Profile';
import Explore from './features/containers/Explore/Explore';

function App() {
	const isSignedIn = useSelector(selectSigninState);
	return (
		<Router>
			<div className='App'>
				<Header isSignedIn={isSignedIn} />
				<main>
					<Switch>
						<Route exact path='/'>
							{isSignedIn ? <Home /> : <Topquotes />}
						</Route>
						<Route exact path='/about'>
							<About />
						</Route>
						<Route exact path='/signup'>
							<Signup />
						</Route>
						<Route exact path='/signin'>
							<Signin />
						</Route>
						<Route exact path='/notifications'>
							<Signin />
						</Route>
						<Route exact path='/explore'>
							<Explore />
						</Route>
						<Route path='/'>
							<Profile />
						</Route>

						<Route exact path='/terms'>
							<Terms />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
