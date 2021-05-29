import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DefaultProfilePic from './defaultProfilePic.png';
import QuotePost from '../../presentationals/QuotePost/QuotePost';
function Profile() {
	const location = useLocation();
	return (
		<section className='mt6 mh2 f7'>
			<div className='flex flex-column'>
				<button className='self-end w-10 b--none br3 bg-white moon-gray grow pointer:hover: pointer'>Edit Profile</button>
				<h1 className='flex ml4 moon-gray'>{location.pathname.substring(1)}</h1>

				<div className='flex justify-center'>
					<img className='br-100 ml3 mr4 mt4 ba bw2 b--white bg-white h4 w4' src={DefaultProfilePic} alt='Logo' />
					<div className='flex flex-column'>
						<div className='mt4'>
							<Link to='#0' className='ml3 no-underline moon-gray b f5-l f6-m'>
								0 quotes
							</Link>
							<Link to='#0' className='ml4 no-underline moon-gray b f5-l f6-m'>
								0 followers
							</Link>
							<Link to='#0' className='ml4 no-underline moon-gray b f5-l f6-m'>
								0 following
							</Link>
						</div>
						<div>
							<p>I am quote master.</p>
						</div>
					</div>
				</div>
				<div className=' mt3'>
					<h1 className='flex pl6-l pl5-m light-green'>Quotes</h1>
					<QuotePost />
					<QuotePost />
					<QuotePost />
					<QuotePost />
					<QuotePost />
				</div>
			</div>
		</section>
	);
}

export default Profile;
