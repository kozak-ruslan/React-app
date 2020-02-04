import { ITodo } from "../interfaces/interface";
import { Todo } from "../enum/Todo-list";
const todos = (state:Array<ITodo> = [], action: any) => {
  switch (action.type) {
    case Todo.addTodo:
      return [...state, action.todo];

    case Todo.removeTodo:
      return state.filter(todo => todo.id !== action.id);

    case Todo.toggleTodo:
      return state.map((todo:ITodo) => {
        if(todo.id === action.id){
          todo.completed = !todo.completed;
        }
        return todo;
      }); 

    default:
      return state;
  }
}

export default todos