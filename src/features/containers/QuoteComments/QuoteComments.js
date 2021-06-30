import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, getNotificationCountAsync } from '../Home/homeSlice';

import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Header from '../../presentationals/Header/Header';
import { useLocation, useParams } from 'react-router-dom';
import { getCommentsAsync, getQuotePostAsync, selectLatestComments, selectSecondRequestStatus } from './quoteCommentsSlice';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { postCommentAsync, selectAddedComment } from './postCommentSlice';

function QuoteComments() {
	const [notificationCount, setNotificationCount] = useState(0);
	const [comment, setComment] = useState('');
	const { quoteId } = useParams();

	const [latestComments, setLatestComments] = useState({ comments: [] });

	const getlatestComments = useSelector(selectLatestComments);
	const getAddedComment = useSelector(selectAddedComment);

	const [quotePost, setQuotePost] = useState({});
	const requestStatus1 = useRef('idle');
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getQuotePostAsync({ url: 'http://localhost:3001/getQuotePost', quoteId })).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setQuotePost(res.payload);
			}
		});
	}, [dispatch, quoteId]);

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser')).then((res) => {
			console.log('HOME: ', res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				requestStatus1.current = 'fulfilled';
				dispatch(getCommentsAsync({ url: 'http://localhost:3001/getComments', quoteId }));
			} else {
				requestStatus1.current = 'idle';
			}
		});
	}, [dispatch, quoteId]);

	const isEmpty = (obj) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		setLatestComments({ comments: [...getlatestComments] });
		console.log('GET COMMENTS');
	}, [getlatestComments]);

	useEffect(() => {
		if (!isEmpty(getAddedComment)) {
			console.log('ADDED COMMENT');
			setLatestComments({ comments: [...getlatestComments, getAddedComment] });
		}
	}, [getAddedComment, getlatestComments]);

	useEffect(() => {
		dispatch(getNotificationCountAsync('http://localhost:3001/getNotificationCount')).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setNotificationCount(res.payload.notificationCount);
			}
		});
	}, [dispatch]);

	const postComment = (event) => {
		event.preventDefault();
		if (comment !== '') {
			dispatch(postCommentAsync({ url: 'http://localhost:3001/addComment', quoteId, comment }));
		}
	};

	const onCommentChange = (event) => {
		const { value } = event.target;
		setComment(value);
	};

	return (
		<>
			<Header isSignedIn={requestStatus1.current === 'fulfilled' && requestStatus2 === 'fulfilled' ? true : false} />
			<>
				{requestStatus1.current === 'idle' ? (
					<Loading />
				) : requestStatus1.current === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<QuotePost
								quoteId={quotePost.id}
								username={quotePost.user_name}
								title={quotePost.title}
								quote={`${quotePost.quote}`}
								likeCount={quotePost.likeCount}
								didLike={quotePost.didLike}
								date={quotePost.date_posted}
								hasComments={false}
							/>
							<CommentPoster postComment={postComment} onCommentChange={onCommentChange} />
							<div className='mt5'>
								{latestComments.comments.map((comment, i) => {
									return <QuoteComment key={comment.id} commentId={comment.id} comment={comment.comment} commenter={comment.commenter} date={comment.date_posted} />;
								})}
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

export default QuoteComments;
