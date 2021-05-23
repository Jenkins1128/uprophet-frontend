import React from 'react';

const QuotePoster = () => {
	return (
		<article className='justify-center br2 ba dark-gray b--black-10 br4 mt4  w-40 mw6 shadow-5 center'>
			<main className='pa4 black-80'>
				<div className='measure center'>
					<fieldset id='sign_in' className='ba b--transparent ph0 mh0'>
						<div className='mt3'>
							<strong className='f2 mr3 moon-gray'>"</strong>
							<input className='pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-75 h-75' placeholder='Enter a quote. Quotation marks set! :)' type='text' name='quote' id='quote' />
							<strong className='f2 ml3 moon-gray'>"</strong>
						</div>
					</fieldset>
					<div className='lh-copy mt3'>
						<input className='b ph3 pv2 input-reset ba br4 bw1 b--moon-gray light-green bg-transparent grow pointer f6 dib' type='submit' value='Post' />
					</div>
				</div>
			</main>
		</article>
	);
};

export default QuotePoster;
