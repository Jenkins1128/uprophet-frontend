import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changePasswordAsync, changePasswordSignInAsync } from './changePasswordSlice';
import ChangePasswordForm from './ChangePasswordForm';
import { url } from '../../../domain';

function ChangePassword() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [changePasswordForm, setChangePasswordForm] = useState(false);

	const [isIncorrectError, setIsIncorrectError] = useState(false);
	const [isIncorrectVerifyError, setIsIncorrectVerifyError] = useState(false);
	const [isEmptyError1, setIsEmptyError1] = useState(false);
	const [isEmptyError2, setIsEmptyError2] = useState(false);

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
		if (username && password) {
			dispatch(changePasswordSignInAsync({ url: `${url}/changePasswordSignIn`, username, password })).then((res) => {
				if (res.meta.requestStatus === 'fulfilled') {
					setChangePasswordForm(true);
				} else {
					setIsIncorrectError(true);
				}
			});
		} else {
			setIsEmptyError1(true);
		}
	};

	const changePassword = (event) => {
		event.preventDefault();
		if (newPassword && verifyPassword) {
			if (newPassword === verifyPassword) {
				dispatch(changePasswordAsync({ url: `${url}/changePassword`, username, newPassword })).then((res) => {
					console.log(res);
					if (res.meta.requestStatus === 'fulfilled') {
						history.push('/signin');
					}
				});
			} else {
				setIsIncorrectVerifyError(true);
			}
		} else {
			setIsEmptyError2(true);
		}
	};

	return (
		<>
			<section className='pt6 '>
				<h1 className='moon-gray'>Change Password?</h1>

				{!changePasswordForm ? (
					<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
						{isIncorrectError && (
							<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
								<p className='f5 white'>Username or password is incorrect.</p>
							</div>
						)}
						{isEmptyError1 && (
							<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
								<p className='f5 white'>Please fill all the fields.</p>
							</div>
						)}

						<form className='measure center pa3 black-80'>
							<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
								<div className='mt3'>
									<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' maxLength='20' name='name' id='name' onChange={handleUsernameOnchange} />
								</div>
								<div className='mv3'>
									<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' maxLength='128' name='password' id='password' onChange={handlePasswordOnchange} />
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
					<ChangePasswordForm
						handleNewPasswordOnchange={handleNewPasswordOnchange}
						handleVerifyPasswordOnchange={handleVerifyPasswordOnchange}
						isIncorrectVerifyError={isIncorrectVerifyError}
						isEmptyError2={isEmptyError2}
						changePassword={changePassword}
					/>
				)}
			</section>
		</>
	);
}

export default ChangePassword;
