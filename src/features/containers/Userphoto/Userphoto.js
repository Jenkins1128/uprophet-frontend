import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../../domain';
import Loading from '../../presentationals/Loading/Loading';
import { changePhotoStatusToIdle, selectChangePhotoStatus } from '../Profile/EditProfile/redux/editPhotoSlice';
import defaultProfilePic from '../../../images/defaultProfilePic.png';
import { userPhotoAsync } from './redux/userPhotoThunk';

const Userphoto = ({ size, username }) => {
	const dispatch = useDispatch();
	const [base64Img, setBase64Img] = useState('');
	const [loading, setLoading] = useState(true);
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
			if (mounted.current) {
				setLoading(false);
			}
			if (res.meta.requestStatus === 'fulfilled' && mounted.current) {
				setBase64Img(res.payload.photo);
			}
		});
	}, [dispatch, setLoading, username]);

	useEffect(() => {
		if (changePhotoStatus === 'fulfilled') {
			setLoading(true);
			dispatch(userPhotoAsync({ url: `${url}/getPhoto`, username })).then((res) => {
				if (mounted.current) {
					setLoading(false);
				}
				if (res.meta.requestStatus === 'fulfilled' && mounted.current) {
					setBase64Img(res.payload.photo);
					dispatch(changePhotoStatusToIdle());
				}
			});
		}
	}, [dispatch, setLoading, username, changePhotoStatus]);

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

	return loading ? <Loading isPhoto={true} size={size} /> : <img className={`br-100 ba bw1 b--white bg-white ${getSize()}`} src={base64Img ? `data:image;base64,${base64Img}` : defaultProfilePic} alt='UserPhoto' />;
};

export default Userphoto;
