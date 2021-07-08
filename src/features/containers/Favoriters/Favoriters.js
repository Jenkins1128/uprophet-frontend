import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoritersCard from './FavoritersCard/FavoritersCard';
import { favoritersAsync, selectFavoriters } from './favoritersSlice';
import { url } from '../../../domain';
import { getUserAsync } from '../../presentationals/Header/getUserSlice';

function Favoriters() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const favoriters = useSelector(selectFavoriters);

	const mounted = useRef(null);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		dispatch(favoritersAsync({ url: `${url}/favoriters`, username }));
	}, [dispatch, username]);

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Favoriters</h1>
			<div className='mt5'>
				{favoriters.length > 0 &&
					favoriters.map((favoriter, i) => {
						return <FavoritersCard key={i} isMounted={mounted.current} currentUser={favoriter.currentUser} username={favoriter.from_user} didFavorite={favoriter.didFavorite} />;
					})}
			</div>
		</section>
	);
}

export default Favoriters;
