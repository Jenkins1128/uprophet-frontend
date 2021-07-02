import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import QuotePost from '../QuotePost/QuotePost';
import Userphoto from '../Userphoto/Userphoto';
import { profileAsync, selectProfileQuotes, selectRequestStatus } from './profileSlice';
import Header from '../../presentationals/Header/Header';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../presentationals/Loading/Loading';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import { selectUserInfo, userInfoAsync } from './userInfoSlice';

function Profile() {
	const { username } = useParams();
	const dispatch = useDispatch();

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const profileQuotes = useSelector(selectProfileQuotes);
	const useInfo = useSelector(selectUserInfo);
	//TODO - HANDLE IF USER DOESN"T EXIST

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
	}, [dispatch]);

	//get profile quotes
	useEffect(() => {
		dispatch(profileAsync({ url: 'http://localhost:3001/profile', username }));
	}, [dispatch, username]);

	//get userInfo obj
	useEffect(() => {
		dispatch(userInfoAsync({ url: 'http://localhost:3001/userInfo', username }));
	}, [dispatch, username]);

	return (
		<>
			<Header isSignedIn={requestStatus1 === 'fulfilled' && requestStatus2 === 'fulfilled' ? true : false} />
			<>
				{requestStatus1 === 'pending' ? (
					<Loading />
				) : requestStatus1 === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<div className='flex flex-column'>
								<Link to='/edit' className='self-end w-10 b--none no-underline br3 bg-white moon-gray grow pointer:hover: pointer'>
									Edit Profile
								</Link>
								<h1 className='flex ml4 light-green'>{username}</h1>

								<div className='flex justify-center'>
									<Userphoto size={'profile'} username={username} />
									<div className='flex flex-column'>
										<div className='flex mt4'>
											<p className='ml3 mt0 moon-gray b f5-l f6-m'>{profileQuotes.length} quotes</p>
											<Link to={`/${username}/favoriters`} className='ml4 no-underline moon-gray b f5-l f6-m'>
												{useInfo.favoriters} favoriters
											</Link>
											<Link to={`/${username}/favoriting`} className='ml4 no-underline moon-gray b f5-l f6-m'>
												{useInfo.favoriting} favoriting
											</Link>
										</div>
										<div className='mt3'>
											<p className='tc'>{useInfo.bio}</p>
										</div>
									</div>
								</div>
								<div className=' mt3'>
									<h1 className='flex pl6-l pl5-m light-green'>Quotes</h1>
									{profileQuotes.map((quote) => {
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
							</div>
						</section>
					) : (
						<PleaseSignin />
					)
				) : (
					<PleaseSignin />
				)}
			</>
		</>
	);
}

export default Profile;
