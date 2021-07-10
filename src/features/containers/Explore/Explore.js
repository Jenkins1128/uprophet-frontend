import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import QuotePost from '../QuotePost/QuotePost';
import { getExploreQuotesAsync, selectExploreQuotes } from './exploreQuotesSlice';
import { useHistory } from 'react-router-dom';
import refreshIcon from './refresh.png';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../presentationals/Loading/Loading';
import { url } from '../../../domain';

function Explore() {
	const dispatch = useDispatch();
	const history = useHistory();

	const requestStatus = useSelector(selectFirstRequestStatus);
	const exploreQuotes = useSelector(selectExploreQuotes);

	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		if (requestStatus === 'fulfilled') {
			dispatch(getExploreQuotesAsync(`${url}/explore`));
		}
	}, [requestStatus, dispatch]);

	const refresh = () => {
		history.go(0);
	};

	return (
		<>
			{requestStatus === 'pending' ? (
				<Loading />
			) : requestStatus === 'fulfilled' ? (
				<section className='mt6 mh2 f7'>
					<button className='bg-transparent b--none pointer grow' onClick={refresh}>
						<img alt='refresh' className='h1 w1' src={refreshIcon} />
					</button>
					<h1 className='flex ml4 moon-gray'>Explore</h1>
					<div className='mt5'>
						{exploreQuotes.map((quote) => {
							return (
								<QuotePost key={quote.id} quoteId={quote.id} username={quote.user_name} title={quote.title} quote={`"${quote.quote}"`} likeCount={quote.likeCount} didLike={quote.didLike} date={quote.date_posted} hasComments={true} />
							);
						})}
					</div>
				</section>
			) : (
				<PleaseSignin />
			)}
		</>
	);
}

export default Explore;
