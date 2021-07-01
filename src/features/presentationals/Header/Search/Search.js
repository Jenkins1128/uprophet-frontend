import React, { useState } from 'react';
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
		console.log(searchtext);
		history.push(`/search/${searchtext}`);
	};

	return (
		<article className='mr2'>
			<form onSubmit={submitSearch}>
				<input className='pa2 input-reset ba br4 bw1 bg-transparent b--white w-100 ' placeholder='Search' onChange={onSearchChange} type='text' name='search' id='search' />
			</form>
		</article>
	);
};

export default Search;
