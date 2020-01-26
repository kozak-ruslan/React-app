import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { TodoForm } from "./todo-form";
import { TodoList } from "./todo-list";
import { ITodo } from "../interface";


export const TodoComponent: React.FunctionComponent = () => {
	const [todos, setTodos] = useState<Array<ITodo>>([]);

	const addHandle = (title: string) => {

		const newTodo: ITodo = {
			title: title,
			id: Date.now(),
			completed: false
		};
		setTodos(prev =>[newTodo, ...todos]);
	}
    return(
			<div className='mx-5'>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography variant="h3" gutterBottom>
							Page Todo List
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<TodoForm onAdd={addHandle}/>
					</Grid>
					<Grid item xs={12}>
						<TodoList todos={todos}/>
					</Grid>
				</Grid>
			</div>
    )
}