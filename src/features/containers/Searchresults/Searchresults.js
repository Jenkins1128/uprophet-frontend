import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { searchAsync, selectRequestStatus, selectResults } from './searchSlice';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import ResultCard from './ResultCard/ResultCard';
import Loading from '../../presentationals/Loading/Loading';
import { getUserAsync } from '../../presentationals/Header/getUserSlice';
import { url } from '../../../domain';

const Searchresults = () => {
	const { searchtext } = useParams();
	const dispatch = useDispatch();

	const requestStatus = useSelector(selectRequestStatus);
	const results = useSelector(selectResults);

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
		if (searchtext && searchtext.trim() !== '') {
			dispatch(searchAsync({ url: `${url}/search`, search: searchtext }));
		}
	}, [dispatch, searchtext]);

	return (
		<>
			{requestStatus === 'pending' ? (
				<Loading />
			) : requestStatus === 'fulfilled' ? (
				<section className='mt6 mh2 f7'>
					<h1 className='flex ml4 moon-gray'>Search Results for "{searchtext}"</h1>
					<div className='mt5'>
						{results.map((result) => {
							return <ResultCard key={result.id} isMounted={mounted.current} currentUser={result.currentUser} username={result.user_name} didFavorite={result.didFavorite} />;
						})}
					</div>
				</section>
			) : requestStatus === 'idle' ? (
				<section className='mt6 mh2 f7'>
					<h1 className='flex ml4 moon-gray'>Search Results for ""</h1>
					<div className='mt5'></div>
				</section>
			) : (
				<PleaseSignin />
			)}
		</>
	);
};

export default Searchresults;
