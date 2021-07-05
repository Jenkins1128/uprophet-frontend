import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Userphoto from '../../Userphoto/Userphoto';
import PleaseSignin from '../../../presentationals/PleaseSignin/PleaseSignin';
import Loading from '../../../presentationals/Loading/Loading';
import { getUserAsync, selectFirstRequestStatus } from '../../../presentationals/Header/getUserSlice';
import { getCurrentUserInfoAsync, selectCurrentUserInfo, selectRequestStatus } from './currentUserInfoSlice';
import { changeBioAsync, selectChangeBioStatus } from './editBioSlice';
import { changePhotoAsync, selectChangePhotoStatus } from './editPhotoSlice';
import { getNotificationCountAsync } from '../../../presentationals/Header/getNotificationCountSlice';

const EditProfile = () => {
	const [bio, setBio] = useState('');
	const [imageData, setImageData] = useState({});
	const dispatch = useDispatch();

	const requestStatus1 = useSelector(selectFirstRequestStatus);
	const requestStatus2 = useSelector(selectRequestStatus);
	const changeBioStatus = useSelector(selectChangeBioStatus);
	const changePhotoStatus = useSelector(selectChangePhotoStatus);
	const userInfo = useSelector(selectCurrentUserInfo);

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
	}, [dispatch, changePhotoStatus, changeBioStatus]);

	useEffect(() => {
		console.log('noti check');
		dispatch(getNotificationCountAsync('http://localhost:3001/getNotificationCount'));
	}, [dispatch]);

	//get userInfo obj
	useEffect(() => {
		dispatch(getCurrentUserInfoAsync('http://localhost:3001/currentUserInfo'));
	}, [dispatch, changePhotoStatus, changeBioStatus]);

	const savePhoto = (event) => {
		event.preventDefault();

		dispatch(changePhotoAsync({ url: 'http://localhost:3001/uploadPic', imageData }));
	};

	const saveBio = (event) => {
		event.preventDefault();
		console.log('bio', bio);
		dispatch(changeBioAsync({ url: 'http://localhost:3001/savebio', bio }));
	};

	const onBioChange = (event) => {
		const { value } = event.target;
		setBio(value);
	};

	const onPicChange = (event) => {
		const { files } = event.target;
		const file = files[0];
		const name = file.name;

		const reader = new FileReader();

		reader.onload = function (event) {
			// The file's text will be printed here, if you want to see the base64
			const { result } = event.target;
			const getImage = result.split(',')[1];
			// Set state with base64 data
			setImageData({ name: name, image: getImage });
		};

		reader.readAsDataURL(file);
	};

	return (
		<>
			<>
				{console.log(requestStatus1, requestStatus2)}
				{console.log('changePhotoStatus', changePhotoStatus)}
				{requestStatus1 === 'pending' ? (
					<Loading />
				) : requestStatus1 === 'fulfilled' ? (
					requestStatus2 === 'pending' ? (
						<Loading />
					) : requestStatus2 === 'fulfilled' ? (
						<section className='mt6 mh2 f7'>
							<h1 className='flex ml4 moon-gray'>Edit Profile</h1>
							<form onSubmit={savePhoto}>
								<figure className='flex flex-column items-center'>
									<Userphoto size='profile' username={userInfo.currentUser} />
									<figcaption>
										<input type='file' name='profilePhoto' onChange={onPicChange} className='mt4 bg-transparent b--none pointer tc b light-green f5' />
									</figcaption>
									<button className='bg-light-green pointer mt3 br-pill w4 h2'>Save</button>
								</figure>
							</form>
							<form className='mt5 flex flex-column items-center' onSubmit={saveBio}>
								<textarea placeholder={userInfo.bio} name='bio' onChange={onBioChange} className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' />
								<button className='bg-light-green pointer mt3 br-pill w4 h2'>Save</button>
							</form>
						</section>
					) : (
						<PleaseSignin />
					)
				) : (
					<PleaseSignin />
				)}
			</>
		</>
	);
};

export default EditProfile;
