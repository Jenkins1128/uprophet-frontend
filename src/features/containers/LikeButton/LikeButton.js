import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Like from './like.png';
import { likeAsync, unlikeAsync } from './likeButtonSlice';
import UnLike from './unlike.png';

const LikeButton = ({ quoteId, likeCount, didLike }) => {
	const dispatch = useDispatch();

	const getLikeCount = useRef(likeCount);
	const [getDidLike, setDidLike] = useState(didLike);

	const like = () => {
		dispatch(likeAsync({ url: 'http://localhost:3001/like', quoteId })).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				getLikeCount.current += 1;
				setDidLike(true);
			}
		});
	};

	const unlike = () => {
		dispatch(unlikeAsync({ url: 'http://localhost:3001/unlike', quoteId })).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				getLikeCount.current -= 1;
				setDidLike(false);
			}
		});
	};

	return (
		<div className='flex pv1'>
			<p className='f4'>{getLikeCount.current ? getLikeCount.current : 0}</p>
			{getDidLike ? (
				<button className='grow pointer b--none bg-transparent' onClick={unlike}>
					<img className='h2 w2' alt='like' src={Like} />
				</button>
			) : (
				<button className='grow pointer b--none bg-transparent' onClick={like}>
					<img className='h2 w2' alt='like' src={UnLike} />
				</button>
			)}
		</div>
	);
};

export default LikeButton;
