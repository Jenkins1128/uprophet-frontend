import React from 'react';
import Notification from './Notification/Notification';

function Explore() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Notifications</h1>
			<div className='mt5'>
				<Notification />
				<Notification />
				<Notification />
			</div>
		</section>
	);
}

export default Explore;
