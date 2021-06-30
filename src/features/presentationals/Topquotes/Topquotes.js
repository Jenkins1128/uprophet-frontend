import React from 'react';
import QuoteCard from './QuoteCard';
import { UsersQuotes } from './UserQuotes.js';

const Topquotes = () => {
	return (
		<section className='mt6 mh2'>
			<h1 className='moon-gray'>Express yourself freely</h1>
			<div className='flex-wrap overflow-y-scroll'>
				{UsersQuotes.map((user, i) => {
					return <QuoteCard key={i} userName={UsersQuotes[i].userName} quote={UsersQuotes[i].quote} />;
				})}
			</div>
		</section>
	);
};

export default Topquotes;
