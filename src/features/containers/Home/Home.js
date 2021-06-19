import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { TestQuotes } from './TestQuotes';
import { homeAsync } from './homeSlice';

function Home() {
	const [latestQuotes, setLatestQuotes] = useState([]);
	const [requestStatus, setRequestStatus] = useState('rejected');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(homeAsync('http://localhost:3001/')).then((res) => {
			// do additional work
			console.log(res);
			console.log(res.meta.requestStatus);
			setRequestStatus(res.meta.requestStatus);
			//console.log(res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				//console.log(res.status);
				setLatestQuotes(res.payload);
			}
		});
	}, [dispatch]);

	return requestStatus === 'fulfilled' ? (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Home</h1>
			<QuotePoster />
			<div className='mt5'>
				{latestQuotes.map((quote, i) => {
					return i < latestQuotes.length - 1 && <QuotePost key={quote.id} userName={quote.user_name} quote={`"${quote.quote}"`} />;
				})}
			</div>
		</section>
	) : (
		<Topquotes />
	);
}

export default Home;
