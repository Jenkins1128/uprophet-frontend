import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpAsync } from './signUpSlice';
import { loginAsync } from '../Signin/signinSlice';

function Signup() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [terms, setTerms] = useState(false);

	const onNameChange = (event) => {
		const { value } = event.target;
		setName(value);
	};

	const onUsernameChange = (event) => {
		const { value } = event.target;
		setUsername(value);
	};

	const onEmailChange = (event) => {
		const { value } = event.target;
		setEmail(value);
	};

	const onPasswordChange = (event) => {
		const { value } = event.target;
		setPassword(value);
	};

	const onTermsChange = (event) => {
		const { value } = event.target;
		console.log('Terms ', value);
		setTerms(value === 'on' ? true : false);
	};

	const submitLogin = (username, password) => {
		dispatch(loginAsync({ url: 'http://localhost:3001/signin', username, password })).then((res) => {
			// do additional work

			//console.log(res.meta.requestStatus);
			console.log(res);
			//console.log(res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				history.push({
					pathname: '/',
					state: {
						// location state
						isIn: true
					}
				});
			}
		});
	};

	const signup = (event) => {
		event.preventDefault();
		if (terms) {
			dispatch(signUpAsync({ url: 'http://localhost:3001/signup', name, username, password, email })).then((res) => {
				console.log(res);
				if (res.meta.requestStatus === 'fulfilled') {
					submitLogin(username, password);
				}
			});
		} else {
			console.log('Please accept terms.');
		}
	};

	return (
		<>
			<section className='pt6'>
				<h1 className='moon-gray'>Join Uprophet today!</h1>
				<article className='br2 pa5-l pa4-m pa3-nsba dark-gray b--black-10 br4 mv4 w-75 mw6 shadow-5 center'>
					<div className='measure pa3 black-80'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Name' type='text' name='name' id='name' onChange={onNameChange} />
							</div>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' name='username' id='username' onChange={onUsernameChange} />
							</div>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Email' type='email' name='email-address' id='email-address' onChange={onEmailChange} />
							</div>
							<div className='mv3'>
								<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' name='password' id='password' onChange={onPasswordChange} />
							</div>
							<div className='mv3'>
								<input className='b pa2 ba br4 bg-transparent' type='radio' name='terms' id='terms' onChange={onTermsChange} />
								<p>I READ & UNDERSTAND the </p>
								<Link to='/terms' className='no-underline dark-green'>
									Terms of Uprophet.
								</Link>
							</div>
						</fieldset>
						<div className='lh-copy mt3'>
							<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={signup}>
								Sign up
							</button>
						</div>
					</div>
				</article>
			</section>
		</>
	);
}

export default Signup;
