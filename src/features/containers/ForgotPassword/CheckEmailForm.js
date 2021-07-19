const CheckEmailForm = ({ Link }) => {
	return (
		<article className='flex flex-column mh4 br2 ba pv4 black-80 dark-gray b--black-10 br4 w-60 mw6 shadow-5 measure center'>
			<h1>Check email for temporary password.</h1>
			<Link to='/changepassword' className='center b w-75 pv2 input-reset ba br4 b--black bg-light-green black grow pointer hover-white no-underline f6 ' type='submit'>
				Change Password
			</Link>
			<Link to='/signin' className='center b w-75 mt3 pv2 input-reset ba br4 b--black bg-light-green black grow pointer hover-white no-underline f6 ' type='submit'>
				Sign In
			</Link>
		</article>
	);
};

export default CheckEmailForm;
