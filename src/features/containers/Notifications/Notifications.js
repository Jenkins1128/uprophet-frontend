import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification/Notification';
import { getNotificationsAsync, selectNotifications, selectRequestStatus } from './notificationsSlice';
import Header from '../../presentationals/Header/Header';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { getNotificationCountAsync } from '../../presentationals/Header/getNotificationCountSlice';

function Notifications() {
	const dispatch = useDispatch();
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const notifications = useSelector(selectNotifications);

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getNotificationsAsync('http://localhost:3001/notifications'));
	}, [dispatch]);

	useEffect(() => {
		console.log('noti check');
		dispatch(getNotificationCountAsync('http://localhost:3001/getNotificationCount'));
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
									return <Notification key={notification.id} username={notification.notice.split(' ')[0]} notice={notification.notice} currentUser={currentUser} quotesId={notification.quotes_id} date={notification.date} />;
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
