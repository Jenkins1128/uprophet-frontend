import React from 'react';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import Userphoto from '../../Userphoto/Userphoto';
import { Link } from 'react-router-dom';

const FavoritingCard = ({ currentUser, username, didFavorite }) => {
	return (
		<div className='flex justify-between w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div>
					<Link to={`/${username}`}>
						<Userphoto username={username} />
					</Link>
				</div>
				<div className='ml3'>
					<Link to={`/${username}`} className='no-underline'>
						<h1 className='f6 f5-ns fw6 lh-title light-green mv0'>{username}</h1>
					</Link>
				</div>
			</div>

			<div className='self-center'>{currentUser !== username && <FavoriteButton username={username} didFavorite={didFavorite} />}</div>
		</div>
	);
};

export default FavoritingCard;
