import tw from "tailwind-styled-components";

export const FormStyle = tw.form`
w-full
shadow-lg
bg-white
mb-2
p-2
flex
flex-col
rounded-lg
hover:bg-gray-50
`;

export const InputContainerStyle = tw.div`
  mx-auto
  w-5/6
`;

export const InputStyle = tw.input`
  p-2
  bg-slate-100
  w-5/6
  mx-auto
  rounded
`;
