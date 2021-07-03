import React from 'react';
import forward from './forward2.png';
import { Link } from 'react-router-dom';
import Userphoto from '../../Userphoto/Userphoto';

const Notification = ({ username, notification }) => {
	return (
		<article class='dt w-100 bb b--black-05 pb2 mt2' href='#0'>
			<div className='flex items-center'>
				<div class='dtc w2 w3-ns v-mid'>
					<Link to={`/${username}`}>
						<Userphoto username={username} />
					</Link>
				</div>
				<div class='dtc v-mid pl3'>
					<h1 class='f6 f5-ns fw6 lh-title light-green mv0'>{notification}</h1>
				</div>
			</div>

			<div class='dtc v-mid'>
				<form class='w-100 tr'>
					<button class=' button-reset bg-transparent b--none dim pointer pv1 black-60' type='submit'>
						<img src={forward} alt='forward' className='w2  h2 bg-light-green br-100' />
					</button>
				</form>
			</div>
		</article>
	);
};

export default Notification;
