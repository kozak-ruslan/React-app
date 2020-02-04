import { ITodo } from "../interfaces/interface";
import { Todo } from "../enum/Todo-list";

export const addPhone = function(phone: any) {
  return {
    type: "ADD_PHONE",
    phone
  };
};

export const deletePhone = function(phone: any) {
  return {
    type: "DELETE_PHONE",
    phone
  };
};

export const toggleTodo = (id: number) => ({
  type: Todo.toggleTodo,
  id
});

export const removeTodo = (id: number) => ({
  type: Todo.removeTodo,
  id
});

export const addTodo = (todo: ITodo) => (dispatch: any) => {
  setTimeout(() => {
    dispatch({
      type: Todo.addTodo,
      todo
    });
  }, 1000);
};
// module.exports = { addPhone, deletePhone, handleToggle };
