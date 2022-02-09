import tw from "tailwind-styled-components";

export const Loading = tw.h1`
  text-7xl
  text-gray-800-800
  text-center
`;

export const LoadingCircle = tw.div`
  border-8
  border-gray-400
  border-solid
  rounded-full
  w-12
  h-12
  mx-auto
  mt-4
  border-t-lime-500
  animate-spin
`;
