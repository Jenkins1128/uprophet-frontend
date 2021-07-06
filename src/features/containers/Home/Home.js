import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { homeAsync, selectLatestQuotes, selectSecondRequestStatus } from './homeSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { postQuoteAsync, selectAddedLatestQuotes } from './postQuoteSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import { getNotificationCountAsync } from '../../presentationals/Header/getNotificationCountSlice';
import { url } from '../../../domain';

function Home() {
	const [latestQuotes, setLatestQuotes] = useState({ quotes: [] });
	const [title, setTitle] = useState('');
	const [quote, setQuote] = useState('');

	const getlatestQuotes = useSelector(selectLatestQuotes);
	const getAddedLatestQuotes = useSelector(selectAddedLatestQuotes);

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const dispatch = useDispatch();
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
		console.log('noti check');
		dispatch(getNotificationCountAsync(`${url}/getNotificationCount`));
	}, [dispatch]);

	useEffect(() => {
		if (requestStatus1 === 'fulfilled') {
			dispatch(homeAsync(`${url}/`));
		}
	}, [dispatch, requestStatus1]);

	useEffect(() => {
		setLatestQuotes({ quotes: [...getlatestQuotes] });
	}, [getlatestQuotes]);

	useEffect(() => {
		setLatestQuotes({ quotes: [...getAddedLatestQuotes] });
	}, [getAddedLatestQuotes]);

	const postQuote = (event) => {
		event.preventDefault();
		if (title !== '' && quote !== '') {
			dispatch(postQuoteAsync({ url: `${url}/createQuote`, title, quote }));
		}
	};

	const onTitleChange = (event) => {
		const { value } = event.target;
		setTitle(value);
	};

	const onQuoteChange = (event) => {
		const { value } = event.target;
		setQuote(value);
	};

	return (
		<>
			<>
				{console.log(requestStatus1, requestStatus2)}
				{requestStatus1 === 'pending' ? (
					<Loading />
				) : requestStatus1 === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<h1 className='flex ml4 moon-gray'>Home</h1>
							<QuotePoster postQuote={postQuote} onQuoteChange={onQuoteChange} onTitleChange={onTitleChange} />
							<div className='mt5'>
								{latestQuotes.quotes.map((quote) => {
									return (
										<QuotePost
											key={quote.id}
											quoteId={quote.id}
											username={quote.user_name}
											title={quote.title}
											quote={`"${quote.quote}"`}
											likeCount={quote.likeCount}
											didLike={quote.didLike}
											date={quote.date_posted}
											hasComments={true}
										/>
									);
								})}
							</div>
						</section>
					) : (
						<PleaseSignin />
					)
				) : (
					<Topquotes isMounted={mounted.current} />
				)}
			</>
		</>
	);
}

export default Home;
