import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../presentationals/Header/Header';
import { changePasswordAsync, changePasswordSignInAsync } from './changePasswordSlice';
import ChangePasswordForm from './ChangePasswordForm';

function ChangePassword() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [changePasswordForm, setChangePasswordForm] = useState(false);

	const handleUsernameOnchange = (event) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handlePasswordOnchange = (event) => {
		const { value } = event.target;
		setPassword(value);
	};

	const handleNewPasswordOnchange = (event) => {
		const { value } = event.target;
		setNewPassword(value);
	};

	const handleVerifyPasswordOnchange = (event) => {
		const { value } = event.target;
		setVerifyPassword(value);
	};

	const initChangePasswordForm = (event) => {
		event.preventDefault();

		dispatch(changePasswordSignInAsync({ url: 'http://localhost:3001/changePasswordSignIn', username, password })).then((res) => {
			console.log(res);
			if (res.meta.requestStatus === 'fulfilled') {
				setChangePasswordForm(true);
			}
		});
	};

	const changePassword = (event) => {
		event.preventDefault();

		if (newPassword === verifyPassword) {
			console.log('newPassword ' + newPassword);
			console.log('verifyPassword ' + verifyPassword);
			dispatch(changePasswordAsync({ url: 'http://localhost:3001/changePassword', username, newPassword })).then((res) => {
				console.log(res);
				if (res.meta.requestStatus === 'fulfilled') {
					console.log('PASSWORD CHANGED!');
					history.push('/signin');
				}
			});
		} else {
			console.log('PASSWORDS INCORRECT!');
		}
	};

	return (
		<>
			<Header isSignedIn={false} />
			<section className='pt6 '>
				<h1 className='moon-gray'>Change Password?</h1>

				{!changePasswordForm ? (
					<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
						<form className='measure center pa3 black-80'>
							<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
								<div className='mt3'>
									<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' name='name' id='name' onChange={handleUsernameOnchange} />
								</div>
								<div className='mv3'>
									<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' name='password' id='password' onChange={handlePasswordOnchange} />
								</div>
							</fieldset>
							<div className='lh-copy mt1'>
								<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={initChangePasswordForm}>
									Sign In
								</button>
							</div>
						</form>
					</article>
				) : (
					<ChangePasswordForm handleNewPasswordOnchange={handleNewPasswordOnchange} handleVerifyPasswordOnchange={handleVerifyPasswordOnchange} changePassword={changePassword} />
				)}
			</section>
		</>
	);
}

export default ChangePassword;
