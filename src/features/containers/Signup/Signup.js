import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../presentationals/Header/Header';

function Signup() {
	return (
		<>
			<Header isSignedIn={false} />
			<section className='pt6'>
				<h1 className='moon-gray'>Join Uprophet today!</h1>
				<article className='br2 pa5-l pa4-m pa3-nsba dark-gray b--black-10 br4 mv4 w-75 mw6 shadow-5 center'>
					<div className='measure pa3 black-80'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Name' type='text' name='name' id='name' />
							</div>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Username' type='text' name='username' id='username' />
							</div>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Email' type='email' name='email-address' id='email-address' />
							</div>
							<div className='mv3'>
								<input className='b pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Password' type='password' name='password' id='password' />
							</div>
							<div className='mv3'>
								<input className='b pa2 ba br4 bg-transparent hover-white' type='radio' name='terms' id='terms' />
								<p>I READ & UNDERSTAND the </p>
								<Link to='/terms' className='no-underline dark-green'>
									Terms of Uprophet.
								</Link>
							</div>
						</fieldset>
						<div className='lh-copy mt3'>
							<input className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' value='Sign up' />
						</div>
					</div>
				</article>
			</section>
		</>
	);
}

export default Signup;
