import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DefaultProfilePic from './defaultProfilePic.png';
import QuotePost from '../QuotePost/QuotePost';
import { TestQuotes } from './TestQuotes';

function Profile() {
	const location = useLocation();
	return (
		<section className='mt6 mh2 f7'>
			<div className='flex flex-column'>
				<Link to='/edit' className='self-end w-10 b--none no-underline br3 bg-white moon-gray grow pointer:hover: pointer'>
					Edit Profile
				</Link>
				<h1 className='flex ml4 light-green'>{location.pathname.substring(1)}</h1>

				<div className='flex justify-center'>
					<img className='br-100 ml3 mr4 mt4 ba bw2 b--white bg-white h4 w4 pointer' src={DefaultProfilePic} alt='Logo' />
					<div className='flex flex-column'>
						<div className='flex mt4'>
							<p className='ml3 mt0 moon-gray b f5-l f6-m'>0 quotes</p>
							<Link to='/followers' className='ml4 no-underline moon-gray b f5-l f6-m'>
								0 followers
							</Link>
							<Link to='/following' className='ml4 no-underline moon-gray b f5-l f6-m'>
								0 following
							</Link>
						</div>
						<div className='mt3'>
							<p className='tc'>I am quote master.</p>
						</div>
					</div>
				</div>
				<div className=' mt3'>
					<h1 className='flex pl6-l pl5-m light-green'>Quotes</h1>
					{TestQuotes.map((quote, i) => {
						return <QuotePost key={i} userName={quote.userName} quote={quote.quote} />;
					})}
				</div>
			</div>
		</section>
	);
}

export default Profile;
