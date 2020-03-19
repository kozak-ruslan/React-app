import React from 'react';



const TodoPromise: React.FC = () => {
	// promise
	console.log('Request data...');
	// example-1
	setTimeout(() => {
		console.log('Example-1 Preparing data...')

		const backEndDate = {
			example: 1,
			server: 'aws',
			port: 2000,
			status: 'working'
		};

		setTimeout(() => {
			console.log('Data receiver', backEndDate);
		}, 2000);
	}, 2000);

	// example-2
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Example-2 Preparing data...')

			const backEndDate = {
				example: 2,
				server: 'aws',
				port: 2000,
				status: 'working'
			};
			resolve(backEndDate);
		}, 2000);
	});

	promise.then((data: any) => {
		console.log('Example-2 result promise', data);
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				data.modified = true;
				resolve(data)
			}, 2000);
		});
	})
		.then((result: any) => {
			console.log('Example-2 promise2 result', result);
			result.fromPromise = true;
			return result;
		})
		.then((resultModified: any) => {
			console.log('resultModified ', resultModified)
		})
		.catch(err => {
			console.error(err);
		})
		.finally(() => {
			console.log('Finally Example-2')
		});

	// Example-3
	const sleep = (ms: any) => new Promise(resolve => {
		setTimeout(() => {
			resolve()
		}, ms)
	})

	sleep(2000).then(() => {
		console.log('Example-3 After 2 sec')
	});

	// All
	Promise.all([sleep(2000), sleep(3000)]).then(() => {
		console.log('finally All Promise')
	});

	// race
	Promise.race([sleep(2000), sleep(3000)]).then(() => {
		console.log('finally Race Promise')
	})

	// Example-4
	const url = 'https://jsonplaceholder.typicode.com/users';
	const delay = (ms: number) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log("Example-4")
				resolve('Example-4')
			}, ms);
		})
	}
	delay(2000).then(data => {
		console.log(data)
	});

	// Example-4.1 then
	const fetchTodo = () => {
		return delay(3000).then(() => fetch(url))
			.then(response =>
				response.json()
			);
	}

	fetchTodo().then(data => {
		console.log('Example-4.1: then', data)
	}).catch(e => console.error(e));

	// Example-4.2 async, await
	const url1 = 'https://jsonplaceholder.typicode.com/todos/1';
	async function fetchAsync() {
		await delay(3000);
		const response = await fetch(url1);
		const data = await response.json();
		console.log("Example-4.2 async, await DATA:", data)
	}

	fetchAsync();

	// End

	// destructurization
	let arr = ["I", "go", "home"];
	let arr1 = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
	// const obj = {...};
	// const obj1 = {...};
	// Spread
	console.log('arr1', arr1);
	console.log('arr1', ...arr1);
	let obj: any = [
		'test1',
		'test2',
		'test3'
	];
	console.log(obj);
	let a = ['test4', 'test44'];
	// clone [...obj, ...a] in b
	let b = [...obj, ...a];
	console.log(b);
	console.log(a);
	obj.push('test55');
	console.log(b);
	console.log(obj);

	// Rest
	function multitude(...arg: any) {
		arg.forEach((element: any) => {
			console.log(element);
		});
	}
	multitude(5,6,'qqqqqqqqq');

	return (<></>)
}


export default TodoPromise