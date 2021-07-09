import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import QuotePost from '../QuotePost/QuotePost';
import Userphoto from '../Userphoto/Userphoto';
import { profileAsync, selectProfileQuotes, selectRequestStatus } from './profileSlice';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../presentationals/Loading/Loading';
import { getUserAsync, selectCurrentUser, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import { selectUserInfo, userInfoAsync } from './userInfoSlice';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { url } from '../../../domain';
import { deleteQuoteAsync } from './deleteQuoteSlice';

function Profile() {
	const { username } = useParams();
	const dispatch = useDispatch();

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const profileQuotes = useSelector(selectProfileQuotes);
	const userInfo = useSelector(selectUserInfo);
	const currentUser = useSelector(selectCurrentUser);

	const isEmpty = (obj) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

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
		dispatch(profileAsync({ url: `${url}/profile`, username }));
	}, [dispatch, username]);

	useEffect(() => {
		dispatch(userInfoAsync({ url: `${url}/userInfo`, username }));
	}, [dispatch, username]);

	const deleteQuote = (quoteId) => {
		dispatch(deleteQuoteAsync({ url: `${url}/deleteQuote`, quoteId })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				Swal.fire('Deleted!', 'Your quote has been deleted.', 'success');
				dispatch(profileAsync({ url: `${url}/profile`, username }));
			}
		});
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
						<div className='flex flex-column'>
							{userInfo.currentUser === username ? (
								<Link to='/account/edit' className='self-end w-10 b--none no-underline br3 bg-white moon-gray grow pointer:hover: pointer'>
									Edit Profile
								</Link>
							) : (
								<div className='self-end'>{!isEmpty(userInfo) && <FavoriteButton username={username} didFavorite={userInfo.didFavorite} />}</div>
							)}

							<h1 className='flex ml4 light-green'>{username}</h1>

							<div className='flex justify-center'>
								<Userphoto size={'profile'} username={username} isMounted={mounted.current} />
								<div className='flex flex-column'>
									<div className='flex mt4'>
										<p className='ml3 mt0 moon-gray b f5-l f6-m'>{profileQuotes.length} quotes</p>
										<Link to={!isEmpty(userInfo) ? `/${username}/favoriters` : '#'} className='ml4 no-underline moon-gray b f5-l f6-m'>
											{userInfo.favoriters} favoriters
										</Link>
										<Link to={!isEmpty(userInfo) ? `/${username}/favoriting` : '#'} className='ml4 no-underline moon-gray b f5-l f6-m'>
											{userInfo.favoriting} favoriting
										</Link>
									</div>
									<div className='mt3'>
										<p className='measure tc'>{userInfo.bio}</p>
									</div>
								</div>
							</div>
							<div className=' mt3'>
								<h1 className='flex pl6-l pl5-m light-green'>Quotes</h1>
								{profileQuotes.map((quote) => {
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
											canDelete={quote.user_name === currentUser ? true : false}
											deleteQuote={deleteQuote}
										/>
									);
								})}
							</div>
						</div>
					</section>
				) : (
					<PleaseSignin />
				)
			) : (
				<PleaseSignin />
			)}
		</>
	);
}

export default Profile;
