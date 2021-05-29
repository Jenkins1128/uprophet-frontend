// // A mock function to mimic making an async request for data
export function submitLogin() {
	return fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then((response) => {
			if (response.ok) {
				// do something
				return response.json();
			}
		})
		.then((json) => console.log(json))
		.catch((e) => console.log('fetch did not resolve'));
}
