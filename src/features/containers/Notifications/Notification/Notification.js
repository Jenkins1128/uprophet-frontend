import React from 'react';
import forward from './forward2.png';
import { Link } from 'react-router-dom';
import Userphoto from '../../Userphoto/Userphoto';
import { HashLink } from 'react-router-hash-link';
import ReactTimeAgo from 'react-time-ago';

const Notification = ({ isMounted, username, notice, currentUser, quotesId, date }) => {
	const offsetDate = (date) => {
		var newDate = new Date(date);
		newDate.setHours(newDate.getHours() - 7);
		return newDate.toISOString();
	};

	return (
		<article className='flex justify-between w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div className='dtc w3 v-mid'>
					<Link to={`/${username}`}>
						<Userphoto username={username} isMounted={isMounted} />
					</Link>
				</div>
				<div className='dtc v-mid pl3'>
					<h1 className='f7 f5-ns fw6 lh-title light-green mv0'>{notice}</h1>
					<div>
						<ReactTimeAgo date={new Date(offsetDate(date))} locale='en' timeStyle='mini-minute-now' />
					</div>
				</div>
			</div>
			<div className='self-center'>
				{!quotesId ? (
					<Link to={`/${username}`}>
						<img src={forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</Link>
				) : (
					<HashLink smooth to={`/${currentUser}/#${quotesId}`}>
						<img src={forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</HashLink>
				)}
			</div>
		</article>
	);
};

export default Notification;
