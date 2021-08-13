const ChangePasswordForm = ({ handleNewPasswordOnchange, handleVerifyPasswordOnchange, isIncorrectVerifyError, isEmptyError2, changePassword }) => {
	return (
		<article className=' br2 ba pa5-l pa4-m pa3-ns black-80 dark-gray b--black-10 br4 w-75 mw6 shadow-5 center'>
			{isIncorrectVerifyError && (
				<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
					<p className='f5 white'>Passwords are not the same.</p>
				</div>
			)}
			{isEmptyError2 && (
				<div className='mt3 center h-10 w-75 ba bw1 br3 bg-red'>
					<p className='f5 white'>Please fill all the fields.</p>
				</div>
			)}
			<form className='measure center pa3 black-80'>
				<fieldset id='change_password' className='ba b--transparent ph0 mh0'>
					<div className='mv3'>
						<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='New Password' type='password' onChange={handleNewPasswordOnchange} />
					</div>
					<div className='mv3'>
						<input className='b pa2 input-reset ba br4 bg-transparent w-75' placeholder='Verify New Password' type='password' onChange={handleVerifyPasswordOnchange} />
					</div>
				</fieldset>
				<div className='lh-copy mt1'>
					<button className='b ph3 pv2 input-reset ba br4 b--black bg-light-green grow pointer f6 dib' type='submit' onClick={changePassword}>
						Change Password
					</button>
				</div>
			</form>
		</article>
	);
};

export default ChangePasswordForm;
