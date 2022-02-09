import tw from "tailwind-styled-components";

export const Button = tw.button`
  inline-block
  p-2
  capitalize
  text-lime-500
  bg-lime-200
  tracking-wider
  rounded
  cursor-pointer
  shadow
  border-transparent

  text-lg
  
  duration-500
  transition-all
  ease-in-out

  hover:text-lime-200
  hover:bg-lime-700
  hover:shadow-lg
`;

export const ButtonBlock = tw(Button)`
  w-full
  mt-6
`;

export const ButtonDelete = tw(Button)`
  text-red-700
  bg-white
  hover:text-white
  hover:bg-red-700
  hover:shadow-lg
  shadow-none
  border-red-700
  border-solid
  border-2
  
  transition-none
  hover:scale-100
  mr-1
`;

export const ButtonCloseModal = tw(Button)`
text-gray-900
  bg-white
  hover:text-white
  hover:bg-gray-900
  hover:shadow-lg
  shadow-none
  border-gray-900
  border-solid
  border-2
  
  transition-none
`;

export const EditButtonStyle = tw(ButtonCloseModal)`
  text-blue-500
  bg-white
  border-blue-500
  hover:text-white
  hover:bg-blue-500
  mr-1
`;
