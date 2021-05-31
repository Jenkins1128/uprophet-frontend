import React from 'react';
import DefaultProfilePic from './defaultProfilePic.png';

const EditProfile = () => {
	return (
		<section className='mt6 mh2 f7'>
			<h1 className='flex ml4 moon-gray'>Edit Profile</h1>
			<form>
				<figure>
					<img className='br-100 mt4 ba bw2 b--white bg-white h4 w4 pointer' src={DefaultProfilePic} alt='Logo' />
					<figcaption>
						<button className='mt3 bg-transparent b--none pointer tc b light-green f5'>Edit Profile Photo</button>
					</figcaption>
				</figure>
			</form>
			<form className='mt5 flex flex-column items-center'>
				<textarea placeholder='Enter a bio' name='bio' className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2' />
				<input type='submit' value='Save' className='bg-light-green pointer br-pill w4 h2' />
			</form>
		</section>
	);
};

export default EditProfile;
