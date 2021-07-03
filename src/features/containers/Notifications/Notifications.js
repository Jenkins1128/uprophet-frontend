import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationCountAsync } from '../../presentationals/Header/getNotificationCountSlice';
import Notification from './Notification/Notification';
import { selectNotifications, selectRequestStatus } from './notificationsSlice';
import Header from '../../presentationals/Header/Header';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/getUserSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';

function Notifications() {
	const dispatch = useDispatch();
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const notifications = useSelector(selectNotifications);

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getNotificationCountAsync('http://localhost:3001/notifications'));
	}, [dispatch]);
	return (
		<>
			<Header isSignedIn={requestStatus1 === 'fulfilled' ? true : false} />
			<>
				{requestStatus1 === 'pending' ? (
					<Loading />
				) : requestStatus1 === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<h1 className='flex ml4 moon-gray'>Notifications</h1>
							<div className='mt5'>
								{notifications.map((notification, i) => {
									return <Notification key={i} username={notification.username} notification={notification.notification} />;
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
