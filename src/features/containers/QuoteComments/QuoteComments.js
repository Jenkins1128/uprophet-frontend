import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import Header from '../../presentationals/Header/Header';
import { useParams } from 'react-router-dom';
import { getCommentsAsync, selectLatestComments, selectSecondRequestStatus } from './quoteCommentsSlice';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { postCommentAsync, selectAddedComment } from './postCommentSlice';
import { getQuotePostAsync, selectQuotePost } from './getQuotePostSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import { url } from '../../../domain';

function QuoteComments() {
	const { quoteId } = useParams();
	const [latestComments, setLatestComments] = useState({ comments: [] });
	const [comment, setComment] = useState('');

	const getlatestComments = useSelector(selectLatestComments);
	const getAddedComment = useSelector(selectAddedComment);
	const quotePost = useSelector(selectQuotePost);

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const dispatch = useDispatch();

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

	//get quote post
	useEffect(() => {
		dispatch(getQuotePostAsync({ url: `${url}/getQuotePost`, quoteId }));
	}, [dispatch, quoteId]);

	//get current user status
	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	//get comments
	useEffect(() => {
		if (requestStatus1 === 'fulfilled') {
			dispatch(getCommentsAsync({ url: `${url}/getComments`, quoteId }));
		}
	}, [dispatch, requestStatus1, quoteId]);

	//listen for get latest comments
	useEffect(() => {
		setLatestComments({ comments: [...getlatestComments] });
	}, [getlatestComments]);

	//listen for an added comment
	useEffect(() => {
		if (!isEmpty(getAddedComment)) {
			setLatestComments({ comments: [...getlatestComments, getAddedComment] });
		}
	}, [getAddedComment, getlatestComments]);

	const postComment = (event) => {
		event.preventDefault();
		if (comment !== '') {
			dispatch(postCommentAsync({ url: `${url}/addComment`, quoteId, comment }));
		}
	};

	const onCommentChange = (event) => {
		const { value } = event.target;
		setComment(value);
	};

	return (
		<>
			<Header isSignedIn={requestStatus1 === 'fulfilled' && requestStatus2 === 'fulfilled' ? true : false} />
			<>
				{requestStatus1 === 'idle' ? (
					<Loading />
				) : requestStatus1 === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							{quotePost.id && (
								<QuotePost
									isMounted={mounted.current}
									quoteId={quotePost.id}
									username={quotePost.user_name}
									title={quotePost.title}
									quote={`${quotePost.quote}`}
									likeCount={quotePost.likeCount}
									didLike={quotePost.didLike}
									date={quotePost.date_posted}
									hasComments={false}
								/>
							)}

							<CommentPoster postComment={postComment} onCommentChange={onCommentChange} />
							<div className='mt5'>
								{latestComments.comments.map((comment, i) => {
									return <QuoteComment key={comment.id} isMounted={mounted.current} commentId={comment.id} comment={comment.comment} commenter={comment.commenter} date={comment.date_posted} />;
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
