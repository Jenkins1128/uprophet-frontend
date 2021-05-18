import React from 'react';
import QuoteCard from './QuoteCard';
import { UsersQuotes } from './UserQuotes.js';
import FBLikeButton from '../FBLikeButton/FBLikeButton';

const Topquotes = () => {
	return (
		<div className=' mh2'>
			<FBLikeButton />
			<h1 className='moon-gray'>Express yourself freely</h1>
			<div className='flex-wrap overflow-y-scroll'>
				{UsersQuotes.map((user, i) => {
					return <QuoteCard key={i} userName={UsersQuotes[i].userName} quote={UsersQuotes[i].quote} />;
				})}
			</div>
		</div>
	);
};

export default Topquotes;
