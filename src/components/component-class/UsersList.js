import React from 'react';


export default class UsersList extends React.Component {
    state = {
      users: [
          {name: 'Vasya', age: 50},
          {name: 'Ivan', age: 20},
          {name: 'Larisa', age: 25}, 
        ],
      testName: 'test'
    };

    onChange(e, i) {
        const value = e.target.value;
        const { users } = this.state;
        users[i].age = +value;
        this.setState({users});
    };
    onChangeTest(e){
      const value = e.target.value;
      
     const testName = value;
      this.setState({testName});
      console.log(this.state);
    }

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
    const { users , testName } = this.state;
    return (
      <div className="game" style={{ backgroundColor: "#44014C"}}>
        {
          users.map(({ name, age } = {}, i) => this.renderItem({name, age, i}))
        }
        <input 
            value={testName}
            onChange={e => this.onChangeTest(e)}/>
      </div>
    );
  }
}


