import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Bell from './bell.png';
import Compass from './compass.png';
import DefaultProfilePic from './defaultProfilePic.png';
import Logout from './logout.png';
import Menu from './Menu/Menu';

const Navigation = ({ isSignedIn }) => {
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)'
	});
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 889px)' });
	const isTabletOrMobileDevice = useMediaQuery({
		query: '(max-device-width: 1224px)'
	});
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

	return (
		<nav className='flex items-center'>
			{(isDesktopOrLaptop || isTabletOrMobileDevice) && (
				<>
					{!(isTabletOrMobile || isPortrait) ? (
						isSignedIn ? (
							<>
								<Link to='/notifications' className='f6 grow no-underline b b--none ba bw1 ph3 mh3 dib black hover-white'>
									<img title='Notifications' className='w2 h2' alt='Notifications' src={Bell} />
								</Link>
								<Link to='/explore' className='f6 grow b--none ph3 mh3 pt1 mb2 dib bg-transparent '>
									<img title='Explore' className='w2 h2' alt='Compass' src={Compass} />
								</Link>
								<Link to='/icjenkins' className='f6 grow no-underline br-100 ba bw1 mh3 pv3 ph3 mb2 dib  b--white bg-white'>
									<img title='Profile' className='br-100 w1 h1' src={DefaultProfilePic} alt='Profile' />
								</Link>
								<Link to='#0' className='f6 grow b--none ph3 mh3 pt1 mb2 dib bg-transparent'>
									<img title='Logout' className='w2 h2' alt='Logout' src={Logout} />
								</Link>
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
						<Menu isSignedIn={isSignedIn} />
					)}
				</>
			)}
		</nav>
	);
};

export default Navigation;
