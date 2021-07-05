import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import defaultProfilePic from './defaultProfilePic.png';
import { userPhotoAsync } from './userPhotoSlice';

const Userphoto = ({ size, username }) => {
	const dispatch = useDispatch();
	const [base64Img, setBase64Img] = useState('');
	// const mounted = useRef(false);

	useEffect(() => {
		dispatch(userPhotoAsync({ url: 'http://localhost:3001/getPhoto', username })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				setBase64Img(res.payload.photo);
			}
		});
	}, [dispatch, username]);

	// useEffect(() => {
	// 	mounted.current = true;
	// 	return () => {
	// 		mounted.current = false;
	// 	};
	// }, []);

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
