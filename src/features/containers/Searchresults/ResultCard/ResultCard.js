import React from 'react';
import Userphoto from '../../Userphoto/Userphoto';
import defaultProfilePic from './defaultProfilePic.png';

const ResultCard = ({ username, didFavorite }) => {
	return (
		<article className='dt w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div className='dtc w2 w3-ns v-mid'>
					<Userphoto username={username} />
				</div>
				<div className='dtc v-mid pl3'>
					<h1 className='f6 f5-ns fw6 lh-title light-green mv0'>{username}</h1>
				</div>
			</div>

			<div className='dtc v-mid'>
				<form className='w-100 tr'>
					{!didFavorite ? (
						<button className='f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60' type='submit'>
							Favorite
						</button>
					) : (
						<button className='f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60' type='submit'>
							UnFavorite
						</button>
					)}
				</form>
			</div>
		</article>
	);
};

export default ResultCard;
