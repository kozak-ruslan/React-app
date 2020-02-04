import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, ListItemIcon, Checkbox, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ITodo } from '../../interfaces/interface';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
			flexDirection: 'column'
		},
	}),
);

type TodoListRef = {
	todos: Array<ITodo>,
	onRemove(id: number): void,
	onToggle(id: number): void
}

export const TodoList: React.FC<TodoListRef> = ({ todos, onRemove, onToggle }) => {
	const classes = useStyles();
	return (
		<>
			<h2>List</h2>
			{(todos.length === 0) ? 'List empty' : ''}
			<List className={classes.root}>
				{
					todos.map(todo => {
						console.log('list todos', todo)
						return (
							<ListItem key={todo.id} role={undefined} dense button>
								<ListItemIcon
									onClick={() => onToggle(todo.id)}>
									<Checkbox
										edge="start"
										checked={todo.completed}
										tabIndex={-1}
										disableRipple
									/>
								</ListItemIcon>

								<ListItemText primary={`Line item ${todo.title}`} />
								<ListItemSecondaryAction>
									<IconButton
										size="small"
										edge="end"
										aria-label="comments"
										onClick={() => onRemove(todo.id)}>
										<DeleteSweepIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						)
					})
				}
			</List>
		</>
	)
}