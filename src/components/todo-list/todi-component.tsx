import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";
import { ITodo } from "../../interfaces/interface";
import { connect } from 'react-redux';
import { removeTodo, addTodo, toggleTodo } from "../../actions/actions";

interface State {
	todos: Array<ITodo>;
}

const TodoComponent: React.FunctionComponent<any> = ({todos, removeTodo, toggleTodo, addTodo }) => {
	//const [todos, setTodos] = useState<Array<ITodo>>([]);
	console.log('testStore', todos);
	const handleRemove = (id: number) => {
		removeTodo(id);

		//  useState
		// setTodos(prev => prev.filter(todo => todo.id !== id))
	}
	const handleToggle = (id: number) => {
		console.log(id)
		toggleTodo(id)


		//  useState
		// setTodos(prev => prev.map((todo:ITodo) => {
		// 	if(todo.id === id){
		// 		todo.completed = !todo.completed;
		// 	}
		// 	return todo;
		// }));
		let obj: any = [
			'test1',
			'test2',
			'test3'
		];
		console.log(obj);
		let a = ['test4', 'test44'];
		let b = [...obj, ...a];
		console.log(b);
		console.log(a);
		obj.push('test55');
		console.log(b);
		console.log(obj);

	}

	const addHandle = (title: string) => {

		const newTodo: ITodo = {
			title: title,
			id: Date.now(),
			completed: false
		};
		addTodo(newTodo);
		// setTodos(prev => [newTodo, ...todos]);
	}

	return (
		<div className='mx-5'>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography variant="h3" gutterBottom>
						Page Todo List
						</Typography>
				</Grid>
				<Grid item xs={12}>
					<TodoForm onAdd={addHandle} />
				</Grid>
				<Grid item xs={12}>
					<TodoList
						onToggle={handleToggle}
						onRemove={handleRemove}
						todos={todos} />
				</Grid>
			</Grid>
		</div>
	)
}

export default connect(
(state: State) => {
	return {
		todos: state.todos
	}
}, {
	removeTodo,
	addTodo,
	toggleTodo
})(TodoComponent)