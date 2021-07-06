import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoritingCard from './FavoritingCard/FavoritingCard';
import { favoritingAsync, selectFavoriting, selectRequestStatus } from './favoritingSlice';
import Header from '../../presentationals/Header/Header';
import { url } from '../../../domain';

function Favoriting() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const requestStatus = useSelector(selectRequestStatus);
	const favoriting = useSelector(selectFavoriting);

	useEffect(() => {
		dispatch(favoritingAsync({ url: `${url}/favoriting`, username }));
	}, [dispatch, username]);

	return (
		<>
			<Header isSignedIn={requestStatus === 'fulfilled' ? true : false} />
			<section className='mt6 mh2 f7'>
				<h1 className='flex ml4 moon-gray'>Favoriting</h1>
				<div className='mt5'>
					{favoriting.length > 0 &&
						favoriting.map((favoriter, i) => {
							return <FavoritingCard key={i} currentUser={favoriter.currentUser} username={favoriter.to_user} didFavorite={favoriter.didFavorite} />;
						})}
				</div>
			</section>
		</>
	);
}

export default Favoriting;
