import React from 'react';

const QuotePoster = ({ postQuote, onQuoteChange, onTitleChange }) => {
	return (
		<section className='pt3'>
			<article className=' br2 ba pa4-l pa3-m pa4-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
				<form className='measure center pa3 ph1 black-80' onSubmit={postQuote}>
					<fieldset id='sign_in' className='flex flex-column ba b--transparent '>
						<div className='mt2 ph4'>
							<input className='pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-100' placeholder='Title' type='text' onChange={onTitleChange} />
						</div>
						<div className='mt3  flex'>
							<strong className='f2 mr2 moon-gray'>"</strong>
							<input className='pa2 input-reset ba br4 bw1 bg-transparent b--moon-gray w-100' placeholder='Enter a quote. Marks set! :)' type='text' name='quote' id='quote' onChange={onQuoteChange} />
							<strong className='f2 ml2 moon-gray'>"</strong>
						</div>
					</fieldset>
					<div className='lh-copy mt1'>
						<button className='b ph3 pv2 input-reset ba bw1 br4 bg-light-green grow pointer f6 dib' type='submit'>
							Post
						</button>
					</div>
				</form>
			</article>
		</section>
	);
};

export default QuotePoster;
