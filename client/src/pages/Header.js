import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 60px;
  color: white;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;

  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items:center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 19px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;

`;

const Header = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>ParkFast</Logo>
        </Left>
        <Right>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/login"
          >
            <MenuItem>Login</MenuItem>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to="/register"
          >
            <MenuItem>Register</MenuItem>
          </Link>

          <MenuItem>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/cart"
            ></Link>
          </MenuItem>
        </Right>
      </Wrapper>
      <hr/>
    </Container>
  );
};

export default Header;