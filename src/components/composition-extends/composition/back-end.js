import { BaseProgrammer } from "./base-programmer";

export const BackEnd = (name) => {
  const proger = BaseProgrammer(name);
  const canNodeJs = ({name}) => {
    return {
      nodeJs(){
        console.log(`Composition. ${name}  Create NodeJS`)
      }
    } 
  }

  return {
    ...proger,
    ...canNodeJs(proger)
  }
}