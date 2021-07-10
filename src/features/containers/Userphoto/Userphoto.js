import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../../domain';
import { changePhotoStatusToIdle, selectChangePhotoStatus } from '../Profile/EditProfile/editPhotoSlice';
import defaultProfilePic from './defaultProfilePic.png';
import { userPhotoAsync } from './userPhotoSlice';

const Userphoto = ({ size, username }) => {
	const dispatch = useDispatch();
	const [base64Img, setBase64Img] = useState('');
	const changePhotoStatus = useSelector(selectChangePhotoStatus);

	const mounted = useRef(null);

	useEffect(() => {
		mounted.current = true;
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(() => {
		dispatch(userPhotoAsync({ url: `${url}/getPhoto`, username })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled' && mounted.current) {
				setBase64Img(res.payload.photo);
			}
		});
	}, [dispatch, username]);

	useEffect(() => {
		if (changePhotoStatus === 'fulfilled') {
			dispatch(userPhotoAsync({ url: `${url}/getPhoto`, username })).then((res) => {
				if (res.meta.requestStatus === 'fulfilled' && mounted.current) {
					setBase64Img(res.payload.photo);
					dispatch(changePhotoStatusToIdle());
				}
			});
		}
	}, [dispatch, username, changePhotoStatus]);

	const getSize = () => {
		switch (size) {
			case 'header':
				return 'h2 w2';
			case 'profile':
				return 'h4 w4';
			default:
				return 'h3 w3';
		}
	};

	return <img className={`br-100 ba bw1 b--white bg-white ${getSize()}`} src={base64Img ? `data:image;base64,${base64Img}` : defaultProfilePic} alt='UserPhoto' />;
};

export default Userphoto;
