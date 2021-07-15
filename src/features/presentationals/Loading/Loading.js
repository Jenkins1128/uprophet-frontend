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
		<section className='mt6 flex justify-center'>
			<div className={`loader ${getSize()}`}></div>
		</section>
	) : (
		<div className={`loader ${getSize()} top-0 `}></div>
	);
};

export default Loading;
