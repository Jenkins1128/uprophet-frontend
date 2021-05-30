import React from 'react';
import FollowingCard from './FollowingCard/FollowingCard';

function Following() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Following</h1>
			<div className='mt5'>
				<FollowingCard />
				<FollowingCard />
				<FollowingCard />
			</div>
		</section>
	);
}

export default Following;
