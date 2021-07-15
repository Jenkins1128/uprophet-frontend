import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { url } from '../../../domain';
import { favoriteAsync, unfavoriteAsync } from './favoriteButtonSlice';

const FavoriteButton = ({ username, didFavorite }) => {
	const dispatch = useDispatch();
	const [getDidFavorite, setDidFavorite] = useState(false);

	useEffect(() => {
		setDidFavorite(didFavorite);
	}, [didFavorite]);

	const favorite = () => {
		dispatch(favoriteAsync({ url: `${url}/favorite`, toUser: username })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setDidFavorite(true);
			}
		});
	};

	const unfavorite = () => {
		dispatch(unfavoriteAsync({ url: `${url}/unfavorite`, toUser: username })).then((res) => {
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
