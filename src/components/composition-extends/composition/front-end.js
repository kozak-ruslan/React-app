import React from "react";
import { BaseProgrammer } from "./base-programmer";

export const FrontEnd = name => {
  const programmer = BaseProgrammer(name);

  return {
    ...programmer,
    ...canReact(programmer)
  };
};

export const canReact = ({ name }) => {
  return {
    react() {
      console.log(`Composition FrontEnd. ${name}  Create React App`);
    }
  };
};
export function canVue({ name }) {
  return {
    vue() {
      console.log(`Composition FrontEnd. ${name}  Create Vue App`);
    }
  };
}

export const CanReactAndVue = name => {
  const a = BaseProgrammer(name);
  return {
    ...canReact(a),
    ...canVue(a)
  };
};
