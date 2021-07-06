import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { signUpAsync } from './signUpSlice';
import { loginAsync } from '../Signin/signinSlice';
import { useTitle } from '../../../Title';
import { url } from '../../../domain';

function Signup() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [terms, setTerms] = useState(false);
	const [isExistsError, setIsExistsError] = useState(false);
	const [isTermsError, setIsTermsError] = useState(false);
	const [isEmptyError, setIsEmptyError] = useState(false);

	useTitle('Uprophet');

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
		setTerms(value === 'on' ? true : false);
	};

	const submitLogin = (username, password) => {
		dispatch(loginAsync({ url: `${url}/signin`, username, password })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				history.push('/');
			}
		});
	};

	const signup = (event) => {
		event.preventDefault();
		if (username && name && password && email) {
			if (terms) {
				dispatch(signUpAsync({ url: `${url}/signup`, name, username, password, email })).then((res) => {
					if (res.meta.requestStatus === 'fulfilled') {
						submitLogin(username, password);
					} else {
						setIsExistsError(true);
					}
				});
			} else {
				if (!terms) setIsTermsError(true);
			}
		} else {
			setIsEmptyError(true);
		}
	};

	return (
		<section className='pt6'>
			<h1 className='moon-gray'>Join Uprophet today!</h1>
			<article className='br2 pa5-l pa4-m pa3-nsba dark-gray b--black-10 br4 mv4 w-75 mw6 shadow-5 center'>
				{isExistsError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Username already exists.</p>
					</div>
				)}
				{isTermsError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Please accept terms.</p>
					</div>
				)}
				{isEmptyError && (
					<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
						<p className='f5 white'>Please fill all the fields.</p>
					</div>
				)}
				<div className='measure pa3 black-80'>
					<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Name' type='text' maxLength='20' name='name' id='name' onChange={onNameChange} />
						</div>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Username' type='text' maxLength='20' name='username' id='username' onChange={onUsernameChange} />
						</div>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent w-75' placeholder='Email' type='email' maxLength='100' name='email-address' id='email-address' onChange={onEmailChange} />
						</div>
						<div className='mv3'>
							<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Password' type='password' maxLength='128' name='password' id='password' onChange={onPasswordChange} />
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
	);
}

export default Signup;
