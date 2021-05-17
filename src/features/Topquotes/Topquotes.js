import React from 'react';
import QuoteCard from './QuoteCard';

const Topquotes = () => {
	return (
		<div className='mt5 '>
			<h1 className='moon-gray'>Express yourself freely</h1>
			<QuoteCard />
			{
				//<QuoteCardList />
			}
		</div>
	);
};

export default Topquotes;
