import React from 'react';
import FollowersCard from './FollowersCard/FollowersCard';
import { TestFollowers } from './TestFollowers';

function Following() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Followers</h1>
			<div className='mt5'>
				{TestFollowers.map((followers, i) => {
					return <FollowersCard key={i} userName={followers.userName} />;
				})}
			</div>
		</section>
	);
}

export default Following;
