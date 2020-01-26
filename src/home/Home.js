import React, { useState }  from 'react';
import './home.css'
import UsersList from './UsersList';
import UsersHooks from './UsersListHook';
import UsersHooksStupid from './UsersListHookStupid';

function Square(props){
  return(
    <button className='square' onClick={() => props.onClick()}>
      {props.count}
    </button>
    )
}

function PreviousStep(props) {
 return (
   <button className='previous-btn' onClick={() => props.onClick()}> {'<-'} </button>
 ) 
}
function HooksStates() {
  
  const [count, setCount] = useState(0);
  return(
    <div>
      <p>Вы кликнули {count} раз</p>
      <button onClick={ () => setCount(count + 1)}> Hooks set</button>
    </div>
  )
}


export class Board extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
    this.history = [];
  }

  handleClick(i) {
    // const squares = this.state.squares.slice();
    const { 
      squares,
      xIsNext,
      squ
    } = this.state;
    console.log(xIsNext);
    console.log(squ);
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext? 'X': 'O';
    this.setState(
      {
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
      this.history.push(squares);
  }
  
  renderSquare(i) {
    return <Square
      count={ this.state.squares[i] }
      onClick={ () => this.handleClick(i) }/>
  }

  handleBackStep() {
    if(this.history.length && this.history.length > 0 ) {
      const index = this.history.length -1;
      const squares = this.history[index - 1].slice();
      this.setState(
        {
          squares: squares,
          xIsNext: !this.state.xIsNext
        });
  
    }
  }


  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
   }

  render() {
    const winner = this.calculateWinner(this.state.squares)

    const title = 'base class Board';
    let status;
      if(winner) {
        status = 'Победитель: ' + winner;
      } else {
        status = 'Следующий игрок: ' + (this.state.xIsNext ? 'X' : 'O');
      }
    


    return (
      <div>
        <div className='name'>
          {title} , {status}
        </div>
        <div>
          <PreviousStep onClick={() => this.handleBackStep()}/>
        </div>
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div>Test Hooks</div>        
        <HooksStates></HooksStates>
      </div>      
    );
  }

}






export class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state={
      users: [
        {name: 'Vasya', age: 50},
        {name: 'Ivan', age: 20},
        {name: 'Larisa', age: 25}, 
      ]
    }
  }

  onChange(e, i) {
    const value = e.target.value;
    const { users } = this.state;
    users[i].age = +value;
    this.setState({users});
};

  render() {
    const {users} = this.state;
    return (
      <div className="game">
        <h1>
          Page Game
        </h1>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
        </div>
        <br/>
        <div> Class User List</div>
        <UsersList />
        <br/>
        
        <UsersHooksStupid
          users={users}
          onChange={this.onChange}
        />
        <br/>
        11111
        <br/>
        <UsersHooks/>
      </div>
    );
  }
}



export default Home;


