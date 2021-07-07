import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { url } from '../../../domain';
import { getUserAsync } from '../../presentationals/Header/getUserSlice';
import { loginAsync } from './signinSlice';

function Signin() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isIncorrectError, setIsIncorrectError] = useState(false);
	const [isEmptyError, setIsEmptyError] = useState(false);

	useEffect(() => {
		dispatch(getUserAsync(`${url}/currentUser`));
	}, [dispatch]);

	const handleUsernameOnchange = (event) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handlePasswordOnchange = (event) => {
		const { value } = event.target;
		setPassword(value);
	};

	const submitLogin = (event) => {
		event.preventDefault();
		if (username && password) {
			dispatch(loginAsync({ url: `${url}/signin`, username, password })).then((res) => {
				if (res.meta.requestStatus === 'fulfilled') {
					history.push('/');
				} else {
					setIsIncorrectError(true);
				}
			});
		} else {
			setIsEmptyError(true);
		}
	};

	return (
		<section className='pt6 '>
			<h1 className='moon-gray f3'>"Focus on the now."</h1>
			<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
				{isIncorrectError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Username or password is incorrect.</p>
					</div>
				)}
				{isEmptyError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Please fill all the fields.</p>
					</div>
				)}
				<form className='measure center pa3 black-80'>
					<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' maxLength='20' placeholder='Username' type='text' name='name' id='name' onChange={handleUsernameOnchange} />
						</div>
						<div className='mv3'>
							<input className='b pa2 input-reset ba br4 bg-transparent w-75' maxLength='128' placeholder='Password' type='password' name='password' id='password' onChange={handlePasswordOnchange} />
						</div>
					</fieldset>
					<div className='lh-copy mt1'>
						<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={submitLogin}>
							Sign in
						</button>
					</div>
					<div className='flex justify-between mt3'>
						<Link to='/changepassword' className='no-underline b light-green hover-black grow pointer'>
							Change Password
						</Link>
						<Link to='/forgotpassword' className='no-underline b light-green hover-black grow pointer'>
							Forgot Password
						</Link>
					</div>
				</form>
			</article>
		</section>
	);
}

export default Signin;
