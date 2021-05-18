import React from 'react';
import defaultProfilePic from './defaultProfilePic.png';
//import './QuoteCard.css';
const QuoteCard = ({ userName, quote }) => {
	return (
		<div className='tc relative bg-transparent br7 pv5 ph7 ma3 br4 bw4 shadow-4'>
			<div className='flex absolute top-1 left-1'>
				<img className='br-100 ba bw2 b--white bg-white h3 w3' src={defaultProfilePic} alt='Logo' />
				<p className='black-50 b relative top--1 left-1'>{userName}</p>
			</div>
			<div>
				<p className='light-green b'>"{quote}"</p>
			</div>
		</div>
	);
};

export default QuoteCard;
