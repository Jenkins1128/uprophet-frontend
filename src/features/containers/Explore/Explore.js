import React from 'react';
import QuotePost from '../../presentationals/QuotePost/QuotePost';

function Explore() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Explore</h1>
			<div className='mt5'>
				<QuotePost />
				<QuotePost />
				<QuotePost />
				<QuotePost />
				<QuotePost />
			</div>
		</section>
	);
}

export default Explore;
