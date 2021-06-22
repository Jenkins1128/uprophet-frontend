const CheckEmailForm = ({ Link }) => {
	return (
		<article className=' br2 ba pa5 black-80 dark-gray b--black-10 br4 w-60 mw6 shadow-5 center'>
			<h1>Check email for temporary password.</h1>
			<div className='flex flex-column mh4'>
				<Link to='/changepassword' className='b ph3 pv2 input-reset ba br4 b--black bg-light-green black grow pointer hover-white no-underline f6 dib' type='submit'>
					Change Password
				</Link>
				<Link to='/signin' className='b mt3 ph3 pv2 input-reset ba br4 b--black bg-light-green black grow pointer hover-white no-underline f6 dib' type='submit'>
					Sign In
				</Link>
			</div>
		</article>
	);
};

export default CheckEmailForm;
