import { useEffect, useState } from 'react';
import RedDot from './reddot.png';
import { useTime } from 'react-time-sync';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationCountAsync, selectNotificationCount } from '../Header/getNotificationCountSlice';
import { url } from '../../../domain';

const NotiDot = () => {
	const timeLeft = useTime();
	const dispatch = useDispatch();
	const notificationCount = useSelector(selectNotificationCount);

	useEffect(() => {
		dispatch(getNotificationCountAsync(`${url}/getNotificationCount`));
	}, [dispatch, timeLeft]);

	return notificationCount > 0 && <img alt='notidot' className='absolute left-1 h1 w1' src={RedDot} />;
};

export default NotiDot;
