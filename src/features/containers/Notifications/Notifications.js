import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification/Notification';
import { getNotificationsAsync, selectNotifications, selectRequestStatus } from './redux/notificationsSlice';
import { getUserAsync, selectFirstRequestStatus } from '../../presentationals/Header/redux/getUserSlice';
import Loading from '../../presentationals/Loading/Loading';
import PleaseSignin from '../../presentationals/PleaseSignin/PleaseSignin';
import { url } from '../../../domain';

function Notifications() {
	const dispatch = useDispatch();
	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const notifications = useSelector(selectNotifications);

	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getNotificationsAsync(`${url}/notifications`));
	}, [dispatch]);

	return (
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
							{notifications.map((notification) => {
								return <Notification key={notification.id} username={notification.notice.split(' ')[0]} notice={notification.notice} quotesId={notification.quotes_id} date={notification.date} />;
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
	);
}

export default Notifications;
