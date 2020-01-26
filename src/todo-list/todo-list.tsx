import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { ITodo } from '../interface';
type TodoListRef = {
	todos: Array<ITodo>
}

export const TodoList: React.FC<TodoListRef> = ({todos}) => {
	return(
		<>
			<h2>List</h2>
			<List>
			{
				todos.map(todo =>{
					console.log('list todos', todo)
					return(
						<ListItem key={todo.id} role={undefined} dense button>

            	<ListItemText primary={`Line item ${todo.title}`} />

          	</ListItem>
					)
				})
			}
			</List>
		</>
	)
}