import tw from "tailwind-styled-components";

import { Link } from "react-router-dom";

export const Nav = tw.nav`
bg-lime-100
  shadow-lg
  
`;
export const NavCenter = tw.div`
  
  max-w-screen-lg
  m-auto
  md:flex
  md:justify-between
`;

export const NavHeader = tw.div`
  p-4
  flex
  justify-between
  items-center
`;

export const NavLogo = tw(Link)`
text-3xl
  items-center
  text-lime-500
  mb-0
  hover:text-lime-700
  duration-500
  ease-in-out
  transition-all
`;

export const NavToggle = tw.button`
text-lime-500
  bg-transparent
  text-2xl
  hover:rotate-90
  duration-500
  ease-in-out
  transition-all
  md:hidden
`;

export const LinksContainer = tw.div`
  h-0
  overflow-hidden
  duration-500
  ease-in-out
  transition-all
  md:!h-auto 
  md: my-auto
`;

export const NavLinks = tw.div`
  
  flex
  flex-col
  
  md:flex-row
  md:items-center
`;

export const NavLink = tw(Link)`
  capitalize
  px-4
  py-2
  text-gray-500
  m-0
  text-lg
  hover:text-zinc-900
  hover:bg-lime-200
  hover:pl-6
  duration-500
  transition-all
  ease-in-out
  md:hover:pl-4
  md:hover:bg-lime-100
`;
