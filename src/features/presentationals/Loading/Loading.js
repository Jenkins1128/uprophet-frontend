const Loading = ({ isPhoto, size }) => {
	const getSize = () => {
		switch (size) {
			case 'header':
				return 'h2 w2';
			case 'profile':
				return 'h4 w4';
			default:
				return 'h3 w3';
		}
	};
	return !isPhoto ? (
		<div className='flex justify-center mt6'>
			<div className={`loader ${getSize()}`}></div>
		</div>
	) : (
		<div className={`loader ${getSize()} top-0 `}></div>
	);
};

export default Loading;
