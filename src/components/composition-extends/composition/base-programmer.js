import React from 'react';
import { CanCode } from './can-code';

export const BaseProgrammer = (name = '') => {
  const programmerName = {name}
  return (
    {
    ...programmerName,
    ...CanCode(programmerName)
    })
}