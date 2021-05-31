import React from 'react';
import QuotePost from '../QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';
import { TestQuotes } from './TestQuotes';

function Home() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Home</h1>
			<QuotePoster />
			<div className='mt5'>
				{TestQuotes.map((quote, i) => {
					return <QuotePost key={i} userName={quote.userName} quote={quote.quote} />;
				})}
			</div>
		</section>
	);
}

export default Home;
