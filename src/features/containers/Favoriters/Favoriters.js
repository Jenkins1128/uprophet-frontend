import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FavoritersCard from './FavoritersCard/FavoritersCard';
import { favoritersAsync, selectFavoriters, selectRequestStatus } from './favoritersSlice';
import { url } from '../../../domain';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../presentationals/Loading/Loading';

function Favoriters() {
	const { username } = useParams();
	const dispatch = useDispatch();
	const favoriters = useSelector(selectFavoriters);
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
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

	return requestStatus1 === 'fulfilled' ? (
		requestStatus2 === 'fulfilled' ? (
			<section className='mt6 mh2 f7'>
				<h1 className='flex ml4 moon-gray'>Favoriters</h1>
				<div className='mt5'>
					{favoriters.length > 0 &&
						favoriters.map((favoriter, i) => {
							return <FavoritersCard key={i} isMounted={mounted.current} currentUser={favoriter.currentUser} username={favoriter.from_user} didFavorite={favoriter.didFavorite} />;
						})}
				</div>
			</section>
		) : requestStatus2 === 'pending' ? (
			<Loading />
		) : (
			<PleaseSignin />
		)
	) : requestStatus1 === 'pending' ? (
		<Loading />
	) : (
		<PleaseSignin />
	);
}

export default Favoriters;
