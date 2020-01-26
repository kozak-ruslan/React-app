import React from 'react';

export default function UsersListHooksStupid(props = {}) {

    const  { users=[], onChange } = props;

    return (
        <div>
            <div>Hooks Stupid</div>
            {users.map(({ name='defName', age='defAge' } = {}, i) => {
                return (
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
            })}
        </div>
    )
}