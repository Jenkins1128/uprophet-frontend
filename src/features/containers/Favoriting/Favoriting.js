import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoritingCard from './FavoritingCard/FavoritingCard';
import { favoritingAsync, selectFavoriting } from './favoritingSlice';
import { url } from '../../../domain';
import { getUserAsync } from '../../presentationals/Header/getUserSlice';

function Favoriting() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const favoriting = useSelector(selectFavoriting);

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
		dispatch(favoritingAsync({ url: `${url}/favoriting`, username }));
	}, [dispatch, username]);

	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Favoriting</h1>
			<div className='mt5'>
				{favoriting.length > 0 &&
					favoriting.map((favoriter, i) => {
						return <FavoritingCard key={i} isMounted={mounted.current} currentUser={favoriter.currentUser} username={favoriter.to_user} didFavorite={favoriter.didFavorite} />;
					})}
			</div>
		</section>
	);
}

export default Favoriting;
