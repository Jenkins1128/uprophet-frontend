import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { homeAsync } from './homeSlice';
import Loading from '../../presentationals/Loading/Loading';
import { useLocation } from 'react-router-dom';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Header from '../../presentationals/Header/Header';

function Home() {
	const [latestQuotes, setLatestQuotes] = useState([]);
	const [requestStatus, setRequestStatus] = useState('rejected');

	const dispatch = useDispatch();
	const location = useLocation();
	let { isIn } = location.state ? location.state : false;

	useEffect(() => {
		//let isCancelled = false;
		console.log();

		dispatch(homeAsync('http://localhost:3001/')).then((res) => {
			// do additional work
			console.log(res);
			console.log(res.meta.requestStatus);
			setRequestStatus(res.meta.requestStatus);
			//console.log(res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				//if (!isCancelled) {
				//console.log(res.status);
				//}
			}
			setLatestQuotes(res.payload);
		});

		// return () => {
		// 	isCancelled = true;
		// };
	}, [dispatch, isIn]);

	return (
		<>
			<Header isSignedIn={requestStatus === 'fulfilled' ? true : false} />
			<>
				{isIn ? (
					requestStatus === '' ? (
						<Loading />
					) : requestStatus === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<h1 className='flex ml4 moon-gray'>Home</h1>
							<QuotePoster latestQuote={latestQuotes} />
							<div className='mt5'>
								{latestQuotes.map((quote, i) => {
									return i < latestQuotes.length - 1 && <QuotePost key={quote.id} userName={quote.user_name} quote={`"${quote.quote}"`} />;
								})}
							</div>
						</section>
					) : (
						latestQuotes[0] === 403 && <PleaseSignin />
					)
				) : (
					<Topquotes />
				)}
			</>
		</>
	);
}

export default Home;
