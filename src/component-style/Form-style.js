import tw from "tailwind-styled-components";

export const Form = tw.form`
  rounded
  shadow-md
  bg-white
  mt-12
  w-2/3
  mx-auto 
  p-8
  max-w-screen-md
  
`;

export const FormControl = tw.div`
  mb-4
  mx-auto
  w-4/5
  
`;

export const FromLabel = tw.label`
  block
  capitalize
  text-lg
  tracking-wider
`;

export const FormInput = tw.input`

  block
  p-1
  text-lg
  bg-gray-100
  rounded
  w-full
  
`;
