import React from 'react';
import defaultProfilePic from './defaultProfilePic.png';
//import './QuoteCard.css';
const QuotePost = () => {
	return (
		<article className='tc relative bg-transparent br7 pv4 ma3 mh6-l mh5-m br4 bw4 shadow-4 ph4-l ph4-m ph3-ns'>
			<div className='flex absolute top-1 left-1'>
				<img className='br-100 ba bw2 b--white bg-white h3 w3' src={defaultProfilePic} alt='Logo' />
				<p className='black-50 b relative top--1 '>{'Tester'}</p>
			</div>
			<div className='pt5 ph3'>
				<p className='light-green b  '>{'this a test'}</p>
			</div>
		</article>
	);
};

export default QuotePost;
