import React from 'react';
import defaultProfilePic from './defaultProfilePic.png';

const FollowersCard = ({ userName }) => {
	return (
		<article className='dt w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div className='dtc w2 w3-ns v-mid'>
					<img src={defaultProfilePic} alt='Profile' className='ba bw2 b--white db br-100 w2 w3-ns h2 h3-ns' />
				</div>
				<div className='dtc v-mid pl3'>
					<h1 className='f6 f5-ns fw6 lh-title light-green mv0'>{userName}</h1>
				</div>
			</div>

			<div className='dtc v-mid'>
				<form className='w-100 tr'>
					<button className='f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60' type='submit'>
						Follow
					</button>
				</form>
			</div>
		</article>
	);
};

export default FollowersCard;
