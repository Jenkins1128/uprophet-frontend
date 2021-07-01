import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Bell from './bell.png';
import Compass from './compass.png';
import Home from './home.png';
import Logout from './logout.png';
import Menu from './Menu/Menu';
import { useDispatch } from 'react-redux';
import { logoutAsync } from './navSlice';
import Userphoto from '../../containers/Userphoto/Userphoto';

const Navigation = ({ currentUser, isSignedIn }) => {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)'
	});
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 889px)' });
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	});
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

	const dispatch = useDispatch();
	const history = useHistory();

	const logout = () => {
		dispatch(logoutAsync('http://localhost:3001/logout')).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				console.log(res);
				history.push('/signin', {
					pathname: '/signin',
					state: {
						// location state
						isIn: false
					}
				});
			}
		});
	};

	return (
		<nav className='flex items-center'>
			{(isDesktopOrLaptop || isTabletOrMobileDevice) && (
				<>
					{!(isTabletOrMobile || isPortrait) ? (
						isSignedIn ? (
							<>
								<Link
									to={{
										pathname: '/',
										state: {
											isIn: true
										}
									}}
									className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'
								>
									<img title='Home' className='w2 h2' alt='Home' src={Home} />
								</Link>
								<Link to='/notifications' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell} />
								</Link>
								<Link to='/explore' className='f6 grow b--none ph3 mh3 pt1 mb2 dib bg-transparent '>
									<img title='Explore' className='w2 h2' alt='Compass' src={Compass} />
								</Link>
								<Link to={`/${currentUser}`} className='f6 grow no-underline mh3 mb2 dib'>
									<Userphoto size={'header'} username={currentUser} />
								</Link>
								<button onClick={logout} className='f6 grow b--none ph3 mh3 pt1 mb2 dib bg-transparent pointer'>
									<img title='Logout' className='w2 h2' alt='Logout' src={Logout} />
								</button>
							</>
						) : (
							<>
								<Link to='/about' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									About
								</Link>
								<Link to='/signin' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									Sign in
								</Link>
								<Link to='/signup' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									Sign up
								</Link>
								<a className='f6 grow no-underline b--none b ba bw1 ph3 mh3 dib black hover-white' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
									Video
								</a>
							</>
						)
					) : (
						<Menu isSignedIn={isSignedIn} logout={logout} currentUser={currentUser} />
					)}
				</>
			)}
		</nav>
	);
};

export default Navigation;
