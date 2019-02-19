import * as React from 'react';
import TodoItem from './TodoItem';

interface ITodoItemData {
  id: number;
  text: string;
  done: boolean;
}

interface IState {
  todoItems: ITodoItemData[];
  input: string
}

class TodoList extends React.Component<{}, IState> {
  public id: number = 0;

  public state: IState = {
    input: '',
    todoItems: [],
  };

  public onToggle = (id: number): void => {
    const { todoItems } = this.state;
    const index = todoItems.findIndex(todo => todo.id === id);
    const selectedItem = todoItems[index];
    const nextItems = [...todoItems];

    nextItems[index] = {
      ...selectedItem,
      done: !selectedItem.done,
    };


    this.setState({
      todoItems: nextItems
    });
  };

  public onRemove = (id: number): void => {
    this.setState(
      ({ todoItems }) => ({
        todoItems: todoItems.filter(todo => todo.id !== id)
      })
    );
  };

  public onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    this.setState({
      input: value
    });
  };

  public onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState(
      ({ todoItems, input }) => ({
        input: '',
        todoItems: [...todoItems, {id: this.id++, text: input, done: false}]
      })
    )
  };

  public render () {
    const { onSubmit, onChange, onToggle, onRemove }  = this;
    const { input, todoItems }= this.state;

    const todoItemList = todoItems.map(
      todo => (
        <TodoItem
          key={todo.id}
          done={todo.done}
          onToggle={() => onToggle(todo.id)}
          onRemove={() => onRemove(todo.id)}
          text={todo.text}
        />
      )
    );
    return (
      <div>
        <h1>오늘 뭐하지?</h1>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={input} />
          <button type="submit">추가 하기</button>
        </form>
        <ul>
          {todoItemList}
        </ul>
      </div>
    )
  }
}

export default TodoList;