import React from 'react';
import FollowersCard from './FollowersCard/FollowersCard';

function Following() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Followers</h1>
			<div className='mt5'>
				<FollowersCard />
				<FollowersCard />
				<FollowersCard />
			</div>
		</section>
	);
}

export default Following;
