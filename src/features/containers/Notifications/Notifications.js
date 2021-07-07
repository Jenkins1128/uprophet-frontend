import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification/Notification';
import { getNotificationsAsync, selectNotifications, selectRequestStatus } from './notificationsSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { getNotificationCountAsync } from '../../presentationals/Header/getNotificationCountSlice';
import { url } from '../../../domain';

function Notifications() {
	const dispatch = useDispatch();
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const notifications = useSelector(selectNotifications);
	const mounted = useRef(null);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getNotificationsAsync(`${url}/notifications`));
	}, [dispatch]);

	useEffect(() => {
		console.log('noti check');
		dispatch(getNotificationCountAsync(`${url}/getNotificationCount`));
	}, [dispatch]);

	return (
		<>
			<>
				{console.log(notifications)}
				{requestStatus1 === 'pending' ? (
					<Loading />
				) : requestStatus1 === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<h1 className='flex ml4 moon-gray'>Notifications</h1>
							<div className='mt5'>
								{notifications.map((notification) => {
									let currentUser;
									if (notification.to_user) {
										currentUser = notification.to_user;
									} else if (notification.user_name) {
										currentUser = notification.user_name;
									}
									return (
										<Notification
											key={notification.id}
											isMounted={mounted.current}
											username={notification.notice.split(' ')[0]}
											notice={notification.notice}
											currentUser={currentUser}
											quotesId={notification.quotes_id}
											date={notification.date}
										/>
									);
								})}
							</div>
						</section>
					) : (
						<PleaseSignin />
					)
				) : (
					<PleaseSignin />
				)}
			</>
		</>
	);
}

export default Notifications;
