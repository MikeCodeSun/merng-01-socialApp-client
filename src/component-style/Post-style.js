import tw from "tailwind-styled-components";

export const PostContainer = tw.section`
  rounded
  w-5/6
  max-w-screen-md
  mx-auto
  p-4
  mt-4

`;

export const OnePost = tw.article`
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

export const PostInfo = tw.div`
p-1
capitalize
flex
items-center
text-2xl
border-gray-400
border-b-2
`;

export const UserIcon = tw.div`
  rounded-full
  bg-lime-200
  h-8
  w-8
  text-lime-700
  flex
  justify-center
  items-center
  mr-4
  
`;

export const PostContent = tw.div`
  text-lg
  pt-1
  pl-12
`;

export const PostDate = tw.span`
  text-sm
  ml-4
  
`;

export const IconContainer = tw.div`
  flex
  justify-evenly
  mt-2
  items-center
`;

export const CommentIcon = tw.button`
  flex
  items-center
  m-0
  text-gre
  hover:scale-125
  text-green-400
`;
export const LikeIcon = tw.button`
  flex
  items-center
text-red-700
  hover:scale-125
`;

export const DeleteIcon = tw.button`
 text-red-700
 hover:scale-125
`;
export const EditIcon = tw.button`
  text-yellow-300
  hover:scale-125
`;
