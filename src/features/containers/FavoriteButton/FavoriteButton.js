import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { favoriteAsync, unfavoriteAsync } from './favoriteButtonSlice';

const FavoriteButton = ({ username, didFavorite }) => {
	const dispatch = useDispatch();

	const [getDidFavorite, setDidFavorite] = useState(didFavorite);

	const favorite = () => {
		dispatch(favoriteAsync({ url: 'http://localhost:3001/favorite', toUser: username })).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setDidFavorite(true);
			}
		});
	};

	const unfavorite = () => {
		dispatch(unfavoriteAsync({ url: 'http://localhost:3001/unfavorite', toUser: username })).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setDidFavorite(false);
			}
		});
	};

	return (
		<div>
			{!getDidFavorite ? (
				<button className='f6 button-reset bg-white ba b--black-10 grow pointer pv1 black-60' onClick={favorite}>
					Favorite
				</button>
			) : (
				<button className='f6 button-reset bg-white ba b--black-10 grow pointer pv1 black-60' onClick={unfavorite}>
					UnFavorite
				</button>
			)}
		</div>
	);
};

export default FavoriteButton;
