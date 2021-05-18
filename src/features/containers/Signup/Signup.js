import React from 'react';

function Signup() {
	return (
		<div>
			<h1 className='moon-gray'>Join Uprophet today.</h1>
			<article className='br2 ba dark-gray b--black-10 br4 mv4 w-40 mw6 shadow-5 center'>
				<main className='pa4 black-80'>
					<div className='measure'>
						<fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Name' type='text' name='name' id='name' />
							</div>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Username' type='text' name='name' id='name' />
							</div>
							<div className='mt3'>
								<input className='pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Email' type='email' name='email-address' id='email-address' />
							</div>
							<div className='mv3'>
								<input className='b pa2 input-reset ba br4 bg-transparent hover-white w-75' placeholder='Password' type='password' name='password' id='password' />
							</div>
						</fieldset>
						<div className='lh-copy mt3'>
							<input className='b ph3 pv2 input-reset ba br4 b--black bg-transparent grow pointer f6 dib' type='submit' value='Sign up' />
						</div>
					</div>
				</main>
			</article>
		</div>
	);
}

export default Signup;
