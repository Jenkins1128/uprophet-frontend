import React from 'react';
import FollowingCard from './FollowingCard/FollowingCard';
import { TestFollowings } from './TestFollowings';

function Following() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Following</h1>
			<div className='mt5'>
				{TestFollowings.map((following, i) => {
					return <FollowingCard key={i} userName={following.userName} />;
				})}
			</div>
		</section>
	);
}

export default Following;
