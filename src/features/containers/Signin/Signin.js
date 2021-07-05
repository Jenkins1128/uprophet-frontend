import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getUserAsync } from '../../presentationals/Header/getUserSlice';
import { loginAsync } from './signinSlice';

function Signin() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		dispatch(getUserAsync('http://localhost:3001/currentUser'));
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
		dispatch(loginAsync({ url: 'http://localhost:3001/signin', username, password })).then((res) => {
			console.log(res);
			//console.log(res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				history.push('/');
			}
		});
	};

	return (
		<>
			<section className='pt7 '>
				<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
					<form className='measure center pa3 black-80'>
						<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' name='name' id='name' onChange={handleUsernameOnchange} />
							</div>
							<div className='mv3'>
								<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' name='password' id='password' onChange={handlePasswordOnchange} />
							</div>
						</fieldset>
						<div className='lh-copy mt1'>
							<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={submitLogin}>
								Sign in
							</button>
						</div>
						<div className='flex justify-between relative top-2 '>
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
		</>
	);
}

export default Signin;
