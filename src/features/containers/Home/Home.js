import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { getNotificationCountAsync, getUserAsync, homeAsync, postQuoteAsync, selectLatestQuotes, selectNotificationCount, selectSecondRequestStatus } from './homeSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Header from '../../presentationals/Header/Header';

function Home() {
	const [title, setTitle] = useState('');
	const [quote, setQuote] = useState('');

	const latestQuotes = useSelector(selectLatestQuotes);
	const [notificationCount, setNotificationCount] = useState(0);

	const requestStatus1 = useRef('idle');
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const dispatch = useDispatch();
	// const location = useLocation();

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser')).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				requestStatus1.current = 'fulfilled';
				dispatch(homeAsync('http://localhost:3001/'));
			} else {
				requestStatus1.current = 'idle';
			}
		});
	}, [dispatch]);

	const setNotifications = (res) => {
		setNotificationCount(res.payload.notificationCount);
	};

	useEffect(() => {
		dispatch(getNotificationCountAsync('http://localhost:3001/getNotificationCount')).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setNotifications(res);
			}
		});
	}, [dispatch]);

	const postQuote = (event) => {
		event.preventDefault();
		if (title !== '' && quote !== '') {
			dispatch(postQuoteAsync({ url: 'http://localhost:3001/createQuote', title, quote }));
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
			<Header isSignedIn={requestStatus1.current === 'fulfilled' && requestStatus2 === 'fulfilled' ? true : false} />
			<>
				{/* {console.log('notificationCount', notificationCount)} */}
				{requestStatus1.current === 'idle' ? (
					<Loading />
				) : requestStatus1.current === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<h1 className='flex ml4 moon-gray'>Home</h1>
							<QuotePoster postQuote={postQuote} onQuoteChange={onQuoteChange} onTitleChange={onTitleChange} />
							<div className='mt5'>
								{latestQuotes.map((quote, i) => {
									console.log(quote);
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
					<Topquotes />
				)}
			</>
		</>
	);
}

export default Home;
