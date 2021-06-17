// // A mock function to mimic making an async request for data
export async function submitLogin() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		return response.json();
	} catch (error) {
		return null;
	}
}
