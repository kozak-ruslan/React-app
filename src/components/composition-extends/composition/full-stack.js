import React from 'react';
import { BaseProgrammer } from './base-programmer';
import { FrontEnd } from './front-end';
import { BackEnd } from './back-end';

export const FullStack = (name) => {
  const programmer = BaseProgrammer(name);
  
  return {
    ...programmer,
    ...FrontEnd(name),
    ...BackEnd(name)
  }
}
