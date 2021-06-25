import React from 'react';
import LikeButton from '../LikeButton/LikeButton';
import Userphoto from '../Userphoto/Userphoto';
import { Link } from 'react-router-dom';

//import './QuoteCard.css';
const QuotePost = ({ username, title, quote, quoteId, likeCount, didLike, date }) => {
	return (
		<article className='tc relative bg-transparent br7 pv4 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph4-l ph4-m ph3-ns'>
			<div className='flex absolute top-1 left-1'>
				<Userphoto username={username} />
				<p className='black-50 b relative top--1 '>{username}</p>
			</div>
			<div className='pt5 ph3'>
				<p className='light-green b  '>{quote}</p>
			</div>
			<div className='flex '>
				<LikeButton quoteId={quoteId} likeCount={likeCount} didLike={didLike} />
				<Link to={`quote/${quoteId}`} className='self-center ml4 no-underline f5 light-green grow '>
					Comments
				</Link>
			</div>
		</article>
	);
};

export default QuotePost;
