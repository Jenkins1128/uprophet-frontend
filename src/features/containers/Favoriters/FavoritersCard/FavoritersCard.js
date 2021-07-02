import React from 'react';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import Userphoto from '../../Userphoto/Userphoto';

const FavoritersCard = ({ username, didFavorite }) => {
	return (
		<article className='flex justify-between w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div className='dtc w2 w3-ns v-mid'>
					<Userphoto username={username} />
				</div>
				<div className='dtc v-mid pl3'>
					<h1 className='f6 f5-ns fw6 lh-title light-green mv0'>{username}</h1>
				</div>
			</div>

			<div className='self-center'>
				<FavoriteButton username={username} didFavorite={didFavorite} />
			</div>
		</article>
	);
};

export default FavoritersCard;
