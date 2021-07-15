import React from 'react';
import Userphoto from '../../Userphoto/Userphoto';
import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';

const QuoteComment = ({ commenter, comment, date }) => {
	return (
		<article className='flex flex-column tc relative bg-transparent br7 pv4 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph4-l ph4-m ph3-ns'>
			<div className='flex absolute top-1 left-1'>
				<Link to={`/${commenter}`}>
					<Userphoto username={commenter} />
				</Link>
				<Link to={`/${commenter}`} className='no-underline'>
					<p className='black-50 b relative top--1 '>{commenter}</p>
				</Link>
			</div>
			<div className='self-center pt5 ph3'>
				<p className='f6 light-green b'>{comment}</p>
			</div>
			<div className='self-end'>
				<ReactTimeAgo date={new Date(date)} locale='en' timeStyle='mini-minute-now' />
			</div>
		</article>
	);
};

export default QuoteComment;
