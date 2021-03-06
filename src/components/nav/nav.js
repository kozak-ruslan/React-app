import React from "react";
import "./nav.css";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        {/* <li>
					<NavLink to='/games' activeClassName="selected">
						Games
					</NavLink>
				</li> */}
        <li>
          <NavLink to="/hooks-user-list" activeClassName="selected">
            Hooks User List
          </NavLink>
        </li>
        <li>
          <NavLink to="/class-user-list" activeClassName="selected">
            Class User List
          </NavLink>
        </li>
        <li>
          <NavLink to="/demand-supply" activeClassName="selected">
            Demand Supply
          </NavLink>
        </li>
        <li>
          <NavLink to="/phone-component" activeClassName="selected">
            Phone-List
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo-component" activeClassName="selected">
            Todo-Component
          </NavLink>
        </li>
        <li>
          <NavLink to="/promise" activeClassName="selected">
            Promise
          </NavLink>
        </li>
        <li>
          <NavLink to="/composition-extends" activeClassName="selected">
            Composition and Extends
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
