import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoritersCard from './FavoritersCard/FavoritersCard';
import { favoritersAsync, selectFavoriters, selectRequestStatus } from './favoritersSlice';
import Header from '../../presentationals/Header/Header';

function Favoriters() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const requestStatus = useSelector(selectRequestStatus);
	const favoriters = useSelector(selectFavoriters);

	useEffect(() => {
		dispatch(favoritersAsync({ url: 'http://localhost:3001/favoriters', username }));
	}, [dispatch, username]);

	return (
		<>
			<Header isSignedIn={requestStatus === 'fulfilled' ? true : false} />
			<section className='mt6 mh2 f7'>
				<h1 className='flex ml4 moon-gray'>Favoriters</h1>
				<div className='mt5'>
					{favoriters.length > 0 &&
						favoriters.map((favoriter, i) => {
							return <FavoritersCard key={i} currentUser={favoriter.currentUser} username={favoriter.from_user} didFavorite={favoriter.didFavorite} />;
						})}
				</div>
			</section>
		</>
	);
}

export default Favoriters;
