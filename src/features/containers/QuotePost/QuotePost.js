import React from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Userphoto from '../Userphoto/Userphoto';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

const QuotePost = ({ username, title, quote, quoteId, likeCount, didLike, date, hasComments }) => {
	const offsetDate = (date) => {
		var newDate = new Date(date);
		newDate.setHours(newDate.getHours() - 7);
		return newDate.toISOString();
	};
	return (
		<article id={quoteId} className='tc relative bg-transparent br7 pv4 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph4-l ph4-m ph3-ns'>
			<div className='flex absolute top-1 left-1'>
				<Link to={`/${username}`}>
					<Userphoto username={username} />
				</Link>
				<Link to={`/${username}`} className='no-underline'>
					<p className='black-50 b relative top--1 '>{username}</p>
				</Link>
			</div>
			<div className='pt5 mt2 ph3'>
				<p className='f6 b underline light-green'>{title}</p>
				<p className='f6 mt3 light-green b'>{quote}</p>
			</div>
			<div className='flex justify-between mt5 h1 ph4'>
				<div className='flex items-center'>
					<LikeButton quoteId={quoteId} likeCount={likeCount} didLike={didLike} />
					{hasComments && (
						<Link to={`/quote/${quoteId}`} className='ml4 no-underline f5 b light-green grow '>
							Comments
						</Link>
					)}
				</div>
				<div>
					<ReactTimeAgo date={new Date(offsetDate(date))} locale='en' timeStyle='mini-minute-now' />
				</div>
			</div>
		</article>
	);
};

export default QuotePost;
