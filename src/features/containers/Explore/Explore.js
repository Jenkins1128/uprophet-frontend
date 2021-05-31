import React from 'react';
import QuotePost from '../QuotePost/QuotePost';
import { TestQuotes } from './TestQuotes';

function Explore() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Explore</h1>
			<div className='mt5'>
				{TestQuotes.map((quote, i) => {
					return <QuotePost key={i} userName={quote.userName} quote={quote.quote} />;
				})}
			</div>
		</section>
	);
}

export default Explore;
