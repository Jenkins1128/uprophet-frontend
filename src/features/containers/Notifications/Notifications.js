import React from 'react';
import Notification from './Notification/Notification';
import { TestNotifications } from './TestNotifications';

function Notifications() {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Notifications</h1>
			<div className='mt5'>
				{TestNotifications.map((notification, i) => {
					return <Notification key={i} notification={notification.notification} />;
				})}
			</div>
		</section>
	);
}

export default Notifications;
