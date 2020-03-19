import React, { useState } from 'react';
// @ts-check
export default function UsersListHooks(props = {}) {
    const defUsers = [
        {name: 'Vasya', age: 50},
        {name: 'Ivan', age: 20},
        {name: 'Larisa', age: 25}, 
    ];

    const [users, setUsers] = useState(defUsers);

    const onChange = (e, i) => {
        const value = e.target.value;
        const newUsers = [...users];
        newUsers[i].age = +value;
        setUsers(newUsers);
    };
    const renderInner = ({ name, age, i}) => {
        console.log(name, age, i);
        return(
            <div key={i} className='user'>
                <div className='user-name'>
                    {name}
                </div>
                <div className='user-age'>
                    <input 
                    value={age}
                    onChange={(e) => {
                        if (onChange) onChange(e, i);
                    }}/>
                </div>
            </div>
        )        
    }
    
    return (
        <div>
            
            {users.map(({name, age, key}, i) => {
            return (                
                renderInner({name, age, i, key})
            )
            })}
        </div>
    )
}