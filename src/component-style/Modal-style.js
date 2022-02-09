import tw from "tailwind-styled-components";

export const ModalContainer = tw.div`
  ${(p) => (p.$showModal ? "visible" : "invisible ")}
  
  fixed
  
  h-screen
  w-screen
  top-0
  lett-0
  
`;

export const ModalContent = tw.div`
bg-slate-50
  max-w-md
  
  absolute
  h-1/5
  w-1/2
  top-1/3
  left-1/3
  shadow
  rounded-xl
  z-10
`;

export const ButtonClose = tw.button`
  absolute
  top-0
  right-0
  text-red-800
  text-4xl
  hover:scale-125

`;

export const DeleteButtonConatiner = tw.div`
  
  absolute
  bottom-5
  right-5
`;

export const ModalTitle = tw.p`
text-2xl
  absolute
  top-1/3
  left-20
  text-red-500
`;

export const ModalEditInput = tw.input`
  bg-slate-200
  rounded
  p-2
  absolute
  mx-auto
  w-11/12
  top-20
  left-5
  
`;

export const EditTitle = tw.p`

  text-2xl
  absolute
  top-5
  left-5
  text-gray-700
`;
