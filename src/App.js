import React from 'react';
import Header from './features/Header/Header';
import Topquotes from './features/Topquotes/Topquotes';
import About from './features/About/About';
import './App.css';
import Navigation from './features/Navigation/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
					<Route path='/about'>
						<About />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
