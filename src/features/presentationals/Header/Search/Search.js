import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
	const [searchtext, setSearchText] = useState('');
	const history = useHistory();

	const onSearchChange = (event) => {
		const { value } = event.target;
		setSearchText(value);
	};

	const submitSearch = (event) => {
		event.preventDefault();
		if (searchtext.trim() !== '') {
			history.push(`/search/${searchtext}`);
			event.target.reset();
		}
	};

	return (
		<div className='mr2'>
			<form onSubmit={submitSearch}>
				<input className='pa2 input-reset ba br4 bw1 bg-transparent b--white w-100 ' placeholder='Search' onChange={onSearchChange} type='text' maxLength='20' />
			</form>
		</div>
	);
};

export default Search;
