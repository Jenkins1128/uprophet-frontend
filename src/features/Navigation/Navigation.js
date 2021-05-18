import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<div class='pt5 mt5 ph3'>
			<Link to='/about' class='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib light-silver'>
				About
			</Link>
			<a class='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib dark-green' href='#0'>
				Sign in
			</a>
			<a class='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib light-green' href='#0'>
				Sign up
			</a>
			<a class='f6 grow no-underline br-pill ba bw1 ph3 mh3 pv2 mb2 dib light-silver' rel='noopener noreferrer' href='https://youtu.be/Z7YR0zwMtTk?list=TLGGTOFWbVS80XMxODA1MjAyMQ' target='_blank'>
				Video
			</a>
		</div>
	);
};

export default Navigation;
