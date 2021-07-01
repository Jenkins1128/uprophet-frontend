import React from 'react';
import profilePic from './profile.jpg';
import Header from '../../presentationals/Header/Header';

const About = () => {
	return (
		<>
			<Header isSignedIn={false} />
			<section className='pt6 '>
				<h1 className=' moon-gray'>About</h1>
				<p className='ma3 pv3 ph5-l ph4-m ph3-ns light-green b'>
					Hello my name is Isaiah Jenkins and I've created this social network to open up a world where U can express, share, and inspire your creative quotes with your friends. Enjoy yourself and be something U. Uprophet was launched on
					August 1, 2015.
				</p>
				<img className='br-100 ba bw2 b--white h5 w5' src={profilePic} alt='profilePic' />
			</section>
		</>
	);
};

export default About;
