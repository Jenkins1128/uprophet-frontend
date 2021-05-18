import React from 'react';
import { FacebookProvider, Like } from 'react-facebook';

const FBLikeButton = () => {
	return (
		<div className='ma3'>
			<FacebookProvider appId='334885081313257'>
				<Like href='http://www.facebook.com/Uprophet' layout='box_count' colorScheme='dark' showFaces share />
			</FacebookProvider>
		</div>
	);
};

export default FBLikeButton;
