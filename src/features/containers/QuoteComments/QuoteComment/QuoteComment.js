import React from 'react';
import Userphoto from '../../Userphoto/Userphoto';
import ReactTimeAgo from 'react-time-ago';

const QuoteComment = ({ isMounted, commenter, comment, date }) => {
	const offsetDate = (date) => {
		var newDate = new Date(date);
		newDate.setHours(newDate.getHours() - 7);
		return newDate.toISOString();
	};

	return (
		<article className='flex flex-column tc relative bg-transparent br7 pv4 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph4-l ph4-m ph3-ns'>
			<div className='flex absolute top-1 left-1'>
				<Userphoto username={commenter} isMounted={isMounted} />
				<p className='black-50 b relative top--1 '>{commenter}</p>
			</div>
			<div className='self-center pt5 ph3'>
				<p className='f6 light-green b'>{comment}</p>
			</div>
			<div className='self-end'>
				<ReactTimeAgo date={new Date(offsetDate(date))} locale='en' timeStyle='mini-minute-now' />
			</div>
		</article>
	);
};

export default QuoteComment;
