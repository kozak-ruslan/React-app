import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";


interface TodoFormProps {
	onAdd(title: string): void
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {

	// const [title, setTitle] = useState<string>('');
	const ref = useRef<HTMLInputElement>(null);

	const keyPresetHandle = (event: React.KeyboardEvent) => {
		console.log('11');
		if (event.key === 'Enter' && ref.current!.value != '') {
			props.onAdd(ref.current!.value);
			ref.current!.value = ''
		}
	}
	const handleClick = () => {
		if(ref.current!.value != ''){
			console.log('handleClick', ref.current!.value);
			props.onAdd(ref.current!.value);
			ref.current!.value = ''
		}
	}

	return (
		<Grid container>
			<TextField
				id="standard-basic"
				label="Введіть назв"
				inputRef={ref}
				onKeyPress={keyPresetHandle}/>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClick}>
				Add
			</Button>
		</Grid>
	)
}