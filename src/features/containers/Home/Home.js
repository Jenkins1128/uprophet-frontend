import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { TestQuotes } from './TestQuotes';
import { homeAsync, selectResCodeState } from './homeSlice';

function Home() {
	const resState = useSelector(selectResCodeState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(homeAsync('http://localhost:3001/')).then((res) => {
			// do additional work
			console.log(res);
			console.log(res.meta.requestStatus);

			//console.log(res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				console.log('ok');
			}
		});
	}, [dispatch]);

	return resState === 200 ? (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Home</h1>
			<QuotePoster />
			<div className='mt5'>
				{TestQuotes.map((quote, i) => {
					return <QuotePost key={i} userName={quote.userName} quote={quote.quote} />;
				})}
			</div>
		</section>
	) : (
		<Topquotes />
	);
}

export default Home;
