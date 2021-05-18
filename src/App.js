import React from 'react';
import Header from './features/presentationals/Header/Header';
import Topquotes from './features/presentationals/Topquotes/Topquotes';
import About from './features/presentationals/About/About';
import './App.css';
import Navigation from './features/presentationals/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './features/containers/Signup/Signup';
import Signin from './features/containers/Signin/Signin';

function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Navigation />
				<Switch>
					<Route exact path='/'>
						<Topquotes />
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
				</Switch>
			</div>
		</Router>
	);
}

export default App;
