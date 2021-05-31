import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAsync } from './signinSlice';

function Signin() {
	const history = useHistory();
	const dispatch = useDispatch();

	const submitLogin = () => {
		dispatch(loginAsync('https://jsonplaceholder.typicode.com/todos/1')).then((res) => {
			// do additional work
			console.log(res.meta.requestStatus);
			//console.log(res.meta.requestStatus);
			if (res.meta.requestStatus === 'fulfilled') {
				history.push('/');
			}
		});
	};

	return (
		<section className='pt7 '>
			<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
				<div className='measure center pa3 black-80'>
					<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Username' type='text' name='name' id='name' />
						</div>
						<div className='mv3'>
							<input className='b pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Password' type='password' name='password' id='password' />
						</div>
					</fieldset>
					<div className='lh-copy mt1'>
						<input className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' value='Sign in' onClick={submitLogin} />
					</div>
				</div>
			</article>
		</section>
	);
}

export default Signin;
