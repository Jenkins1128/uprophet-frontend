import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { useParams } from 'react-router-dom';
import { getCommentsAsync, selectLatestComments, selectSecondRequestStatus, updateQuoteComment } from './quoteCommentsSlice';
import CommentPoster from './CommentPoster/CommentPoster';
import QuoteComment from './QuoteComment/QuoteComment';
import QuotePost from '../QuotePost/QuotePost';
import { clearAddedComment, postCommentAsync, selectAddedComment } from './postCommentSlice';
import { getQuotePostAsync, selectQuotePost } from './getQuotePostSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import { url } from '../../../domain';

function QuoteComments() {
	const { quoteId } = useParams();
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');

	const latestComments = useSelector(selectLatestComments);
	const getAddedComment = useSelector(selectAddedComment);
	const quotePost = useSelector(selectQuotePost);
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectSecondRequestStatus);

	const isEmpty = (obj) => {
		for (const x in obj) {
			return false;
		}
		return true;
	};

	useEffect(() => {
		dispatch(getQuotePostAsync({ url: `${url}/getQuotePost`, quoteId }));
	}, [dispatch, quoteId]);

	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		if (requestStatus1 === 'fulfilled') {
			dispatch(getCommentsAsync({ url: `${url}/getComments`, quoteId }));
		}
	}, [dispatch, requestStatus1, quoteId]);

	useEffect(() => {
		if (!isEmpty(getAddedComment)) {
			let updatedComments = [...latestComments];
			updatedComments.unshift(getAddedComment);
			dispatch(clearAddedComment());
			dispatch(updateQuoteComment(updatedComments));
		}
	}, [dispatch, getAddedComment, latestComments]);

	const postComment = (event) => {
		event.preventDefault();
		if (quotePost.id && comment !== '') {
			dispatch(postCommentAsync({ url: `${url}/addComment`, quoteId, comment }));
			event.target.reset();
			setComment('');
		}
	};

	const onCommentChange = (event) => {
		const { value } = event.target;
		setComment(value);
	};

	return (
		<>
			{requestStatus1 === 'pending' ? (
				<Loading />
			) : requestStatus1 === 'fulfilled' ? (
				requestStatus2 === 'pending' ? (
					<Loading />
				) : requestStatus2 === 'fulfilled' ? (
					<div className='mt6 mh2 f7'>
						{quotePost.id && (
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
						)}
						<CommentPoster postComment={postComment} onCommentChange={onCommentChange} />
						<div className='mt5'>
							{latestComments.map((comment) => {
								return <QuoteComment key={comment.id} commentId={comment.id} comment={comment.comment} commenter={comment.commenter} date={comment.date_posted} />;
							})}
						</div>
					</div>
				) : (
					<PleaseSignin />
				)
			) : (
				<PleaseSignin />
			)}
		</>
	);
}

export default QuoteComments;
