import React from 'react';
import Userphoto from '../Userphoto/Userphoto';

//import './QuoteCard.css';
const QuotePost = ({ userName, quote }) => {
	return (
		<article className='tc relative bg-transparent br7 pv4 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph4-l ph4-m ph3-ns'>
			<div className='flex absolute top-1 left-1'>
				<Userphoto username={userName} />
				<p className='black-50 b relative top--1 '>{userName}</p>
			</div>
			<div className='pt5 ph3'>
				<p className='light-green b  '>{quote}</p>
			</div>
		</article>
	);
};

export default QuotePost;
