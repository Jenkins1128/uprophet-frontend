import React from 'react';
import { Link } from 'react-router-dom';
import Bell from './bell.png';
import Compass from './compass.png';
import DefaultProfilePic from './defaultProfilePic.png';
import Logout from './logout.png';

const Navigation = ({ isSignedIn }) => {
	console.log(isSignedIn);
	return isSignedIn ? (
		<div className='flex pt5 mt5 ph3'>
			<div className='mr5'>
				<button className='f6 grow pointer:hover b--none ph3 mh3 pv1 mb2 dib bg-transparent pointer:hover: pointer'>
					<img className='h-50 w-50' alt='Notification' src={Bell} />
				</button>
				<button className='f6 grow pointer:hover b--none ph3 mh3 pv1 mb2 dib bg-transparent pointer:hover: pointer'>
					<img className='h-50 w-50' alt='Compass' src={Compass} />
				</button>
			</div>
			<div className='ml5 self-end'>
				<button className='f6 grow no-underline br-100 ba bw1 mh3 pv1 mb2 dib bg-white b--white pointer:hover: pointer'>
					<img className='h1 w1' src={DefaultProfilePic} alt='Profile' />
				</button>
				<button className='ff6 grow pointer:hover b--none ph3 mh3 pv1 mb2 dib bg-transparent pointer:hover: pointer'>
					<img className='h-50 w-50' alt='Logout' src={Logout} />
				</button>
			</div>
		</div>
	) : (
		<div className='pt5 mt5 ph3'>
			<Link to='/about' className='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib light-silver'>
				About
			</Link>
			<Link to='/signin' className='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib dark-green'>
				Sign in
			</Link>
			<Link to='/signup' className='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib light-green'>
				Sign up
			</Link>
			<a className='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib light-silver' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
				Video
			</a>
		</div>
	);
};

export default Navigation;
