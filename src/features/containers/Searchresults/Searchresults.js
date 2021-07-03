import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { searchAsync, selectRequestStatus, selectResults } from './searchSlice';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Header from '../../presentationals/Header/Header';
import ResultCard from './ResultCard/ResultCard';
import Loading from '../../presentationals/Loading/Loading';

const Searchresults = () => {
	const { searchtext } = useParams();
	const dispatch = useDispatch();

	const requestStatus = useSelector(selectRequestStatus);
	const results = useSelector(selectResults);

	useEffect(() => {
		if (searchtext && searchtext.trim() !== '') {
			dispatch(searchAsync({ url: 'http://localhost:3001/search', search: searchtext }));
		}
	}, [dispatch, searchtext]);

	return (
		<>
			<Header isSignedIn={requestStatus === 'fulfilled' || requestStatus === 'idle' ? true : false} />
			<>
				{requestStatus === 'pending' ? (
					<Loading />
				) : requestStatus === 'fulfilled' ? (
					<section className='mt6 mh2 f7'>
						<h1 className='flex ml4 moon-gray'>Search Results for "{searchtext}"</h1>
						<div className='mt5'>
							{results.map((result) => {
								return <ResultCard key={result.id} currentUser={result.currentUser} username={result.user_name} didFavorite={result.didFavorite} />;
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
		</>
	);
};

export default Searchresults;
