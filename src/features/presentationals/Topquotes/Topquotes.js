import React, { useEffect, useRef } from 'react';
import QuoteCard from './QuoteCard';
import { UsersQuotes } from './UserQuotes.js';
import FBLikeButton from '../FBLikeButton/FBLikeButton';

const Topquotes = () => {
	const mounted = useRef(true);
	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	return (
		<section className='mt6 mh2'>
			{mounted.current && <FBLikeButton />}
			<h1 className='moon-gray'>Express yourself freely</h1>
			<div className='flex-wrap overflow-y-scroll'>
				{UsersQuotes.map((user, i) => {
					return <QuoteCard key={i} userName={UsersQuotes[i].userName} quote={UsersQuotes[i].quote} />;
				})}
			</div>
		</section>
	);
};

export default Topquotes;
