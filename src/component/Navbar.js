import React, { useRef } from "react";
import {
  LinksContainer,
  Nav,
  NavCenter,
  NavHeader,
  NavLink,
  NavLinks,
  NavLogo,
  NavToggle,
} from "../component-style/Nav-Style";
import { FaAlignJustify } from "react-icons/fa";
import { useGlobalContext } from "../context/context";

export default function Navbar() {
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const { user, logout } = useGlobalContext();

  const toggleLinks = () => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    const linksContainerHeight =
      linksContainerRef.current.getBoundingClientRect().height;
    if (linksContainerHeight === 0) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = 0;
    }
  };

  return (
    <>
      <Nav>
        <NavCenter>
          <NavHeader>
            <NavLogo to="/">Home</NavLogo>

            <NavToggle onClick={toggleLinks}>
              <FaAlignJustify />
            </NavToggle>
          </NavHeader>
          <LinksContainer ref={linksContainerRef}>
            {user ? (
              <NavLinks ref={linksRef}>
                <NavLink to="/">{user.name}</NavLink>
                <NavLink
                  to="#"
                  onClick={() => {
                    logout();
                    window.location = "/";
                  }}
                >
                  Log out
                </NavLink>
              </NavLinks>
            ) : (
              <NavLinks ref={linksRef}>
                <NavLink to="/login">login</NavLink>
                <NavLink to="/register">register</NavLink>
              </NavLinks>
            )}
          </LinksContainer>
        </NavCenter>
      </Nav>
    </>
  );
}
