import React from 'react';
import QuotePost from './QuotePost/QuotePost';
import QuotePoster from './QuotePoster/QuotePoster';

function Home() {
	return (
		<section className='mh2 f7'>
			<h1 className='flex ml5 moon-gray'>Home</h1>
			<QuotePoster />
			<div className='mt3'>
				<QuotePost />
				<QuotePost />
				<QuotePost />
				<QuotePost />
				<QuotePost />
			</div>
		</section>
	);
}

export default Home;
