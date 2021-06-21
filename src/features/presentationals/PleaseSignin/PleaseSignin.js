import { useHistory } from 'react-router';

const PleaseSignin = () => {
	const history = useHistory();
	const pleaseSignin = () => {
		history.push('/signin');
	};

	return (
		<section className='mt6'>
			<h1 className='f3 light-green'>Session expired. Please sign in.</h1>
			<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={pleaseSignin}>
				Sign in
			</button>
		</section>
	);
};

export default PleaseSignin;
