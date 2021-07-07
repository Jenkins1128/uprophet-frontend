import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { homeAsync, selectLatestQuotes, selectSecondRequestStatus } from './homeSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { postQuoteAsync, selectNewQuote } from './postQuoteSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import { getNotificationCountAsync } from '../../presentationals/Header/getNotificationCountSlice';
import { url } from '../../../domain';

function Home() {
	const dispatch = useDispatch();

	const [latestQuotes, setLatestQuotes] = useState({ quotes: [] });
	const [title, setTitle] = useState('');
	const [quote, setQuote] = useState('');

	const getlatestQuotes = useSelector(selectLatestQuotes);
	const getNewQuote = useSelector(selectNewQuote);

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const mounted = useRef(null);

	const isEmpty = (obj) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

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
		if (!isEmpty(getNewQuote)) {
			let updatedQuotes = [...getlatestQuotes];
			//replace your current quote to added quote
			updatedQuotes.some((quote, i) => {
				if (quote.user_name === getNewQuote.user_name) {
					updatedQuotes.splice(i, 1, getNewQuote);
				}
				return quote.user_name === getNewQuote.user_name;
			});
			//add new quote to latest quotes
			setLatestQuotes({ quotes: [...updatedQuotes] });
		}
	}, [getlatestQuotes, getNewQuote]);

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
										isMounted={mounted.current}
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
	);
}

export default Home;
