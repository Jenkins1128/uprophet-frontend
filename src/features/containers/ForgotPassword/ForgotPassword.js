import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { url } from '../../../domain';
import Loading from '../../presentationals/Loading/Loading';
import CheckEmailForm from './CheckEmailForm';
import { forgotPasswordAsync } from './forgotPasswordSlice';

function ForgotPassword() {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [checkEmailForm, setCheckEmailForm] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isIncorrectError, setIsIncorrectError] = useState(false);
	const [isEmptyError, setIsEmptyError] = useState(false);

	const handleUsernameOnchange = (event) => {
		const { value } = event.target;
		setUsername(value);
	};

	const handleEmailOnchange = (event) => {
		const { value } = event.target;
		setEmail(value);
	};

	const initCheckEmailForm = (event) => {
		event.preventDefault();
		if (username && email) {
			setLoading(true);
			dispatch(forgotPasswordAsync({ url: `${url}/forgotPassword`, username, email })).then((res) => {
				console.log(res);
				setLoading(false);
				if (res.meta.requestStatus === 'fulfilled') {
					setCheckEmailForm(true);
				} else {
					setIsIncorrectError(true);
				}
			});
		} else {
			setIsEmptyError(true);
		}
	};

	return (
		<>
			<section className='pt6 '>
				<h1 className='moon-gray'>Forgot Password?</h1>
				{isLoading ? (
					<Loading />
				) : !checkEmailForm ? (
					<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
						{isIncorrectError && (
							<div className='center h-10 w-75 ba bw1 br3 bg-red'>
								<p className='f5 white'>Username or email is incorrect.</p>
							</div>
						)}
						{isEmptyError && (
							<div className='center h-10 w-75 ba bw1 br3 bg-red'>
								<p className='f5 white'>Please fill all the fields.</p>
							</div>
						)}
						<form className='measure center pa3 black-80'>
							<fieldset id='change_password_signin' className='ba b--transparent ph0 mh0'>
								<div className='mt3'>
									<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' maxLength='20' name='username' id='username' onChange={handleUsernameOnchange} />
								</div>
								<div className='mv3'>
									<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Email' type='text' maxLength='100' name='email' id='email' onChange={handleEmailOnchange} />
								</div>
							</fieldset>
							<div className='lh-copy mt1'>
								<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={initCheckEmailForm}>
									Submit
								</button>
							</div>
						</form>
					</article>
				) : (
					<CheckEmailForm Link={Link} />
				)}
			</section>
		</>
	);
}

export default ForgotPassword;
