import React from 'react';


export default class UsersList extends React.PureComponent {
    state = {
        users: [
            {name: 'Vasya', age: 50},
            {name: 'Ivan', age: 20},
            {name: 'Larisa', age: 25}, 
          ],
    };

    onChange(e, i) {
        const value = e.target.value;
        const { users } = this.state;
        users[i].age = +value;
        this.setState({users});
    };

    renderItem({name, age, i}) {
      return (
        <div key={name} className='user'>
          <div className='user-name'>
            {name}
          </div>
          <div className='user-age'>
            <input 
            value={age}
            onChange={e => this.onChange(e, i)}/>
          </div>
        </div>
      )
    }

  render() {
    const { users } = this.state;
    return (
      <div className="game" style={{ backgroundColor: "#44014C"}}>
        {
          users.map(({ name, age } = {}, i) => this.renderItem({name, age, i}))
        }
      </div>
    );
  }
}


