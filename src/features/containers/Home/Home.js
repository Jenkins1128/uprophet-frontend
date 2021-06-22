import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Topquotes from '../../presentationals/Topquotes/Topquotes';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { homeAsync, postQuoteAsync } from './homeSlice';
import Loading from '../../presentationals/Loading/Loading';
import { useLocation } from 'react-router-dom';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Header from '../../presentationals/Header/Header';

function Home() {
	const [latestQuotes, setLatestQuotes] = useState([]);
	const [notificationCount, setNotificationCount] = useState(0);
	const [requestStatus, setRequestStatus] = useState('rejected');
	const [title, setTitle] = useState('');
	const [quote, setQuote] = useState('');

	const dispatch = useDispatch();
	const location = useLocation();
	let { isIn } = location.state ? location.state : false;

	useEffect(() => {
		console.log();

		dispatch(homeAsync('http://localhost:3001/')).then((res) => {
			// do additional work
			console.log(res);
			console.log(res.meta.requestStatus);
			setRequestStatus(res.meta.requestStatus);
			const newQuotes = res.payload;
			const notifications = newQuotes.pop().notificationCount;
			setLatestQuotes(newQuotes.reverse());
			setNotificationCount(notifications);
		});
	}, [dispatch, isIn]);

	const postQuote = (event) => {
		event.preventDefault();
		if(title !== '' && quote !== ''){
			dispatch(postQuoteAsync({url: 'http://localhost:3001/createQuote', title, quote})).then((res) => {
				console.log(res);
				if(res.meta.requestStatus === 'fulfilled'){
					console.log('ok');
					const payload = res.payload;
					//delete your current quote from latestQutoes arr if exists
					latestQuotes.some((quote, i)=> {
						if(quote.user_name === payload.user_name){
							latestQuotes.splice(i, i, payload);
						}
						return quote.user_name === payload.user_name;
					})
					//add new quote
					setLatestQuotes([...latestQuotes]);
				}
			});
		}
	};

	const onTitleChange = (event) => {
		const { value } = event.target;
		setTitle(value);
	}

	const onQuoteChange = (event) => {
		const { value } = event.target;
		setQuote(value);
	}

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
							<QuotePoster postQuote={postQuote} onQuoteChange={onQuoteChange} onTitleChange={onTitleChange}  />
							<div className='mt5'>
								{latestQuotes.map((quote, i) => {
									return <QuotePost key={quote.id} userName={quote.user_name} quote={`"${quote.quote}"`} />;
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
