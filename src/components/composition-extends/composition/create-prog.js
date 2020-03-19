import React from 'react';
import { BaseProgrammer } from './base-programmer';
import { FrontEnd, CanReactAndVue } from './front-end';
import { BackEnd } from './back-end';
import { FullStack } from './full-stack';

const CreateProgrammer = () => {
  console.log('Starting CreateProgrammer');
  const baseProgrammer = BaseProgrammer('Ivan');
  baseProgrammer.code();

  console.log('Starting FrontEnd Programmer');
  const frontEnd = FrontEnd('Ivan2');
  frontEnd.code();
  frontEnd.react();

  console.log('Starting BeckEnd Programmer');
  const backEnd = BackEnd('Ivan3');
  backEnd.code();
  backEnd.nodeJs();

  console.log('Starting FullStack Programmer!!!!!!');
  const fullStack = FullStack('Anton Full-Stack ')
  fullStack.code()
  fullStack.react();
  fullStack.nodeJs();

  console.log('Front React and Vue !!!!!')
  const reactVue = CanReactAndVue('Inna');
  reactVue.vue();
  return (<></>)
}

export default CreateProgrammer
