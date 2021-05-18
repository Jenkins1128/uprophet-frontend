import React from 'react';
import { FacebookProvider, Like } from 'react-facebook';

const FBLikeButton = () => {
	return (
		<FacebookProvider appId='334885081313257'>
			<Like href='http://www.facebook.com/Uprophet' colorScheme='dark' layout='box_count' showFaces share />
		</FacebookProvider>
	);
};

export default FBLikeButton;
