import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Body = styled.div`
  background-color: white;
`;

const Background = styled.div`
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Shape = styled.div`
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
`;

const ShapeGradient = styled(Shape)`
  &:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  &:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
`;

const LoginForm = styled.form`
  height: 500px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  /* background-color: #080710; */
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  color: #fff;
`;

const Label = styled.label`
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

const Input = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  outline: none;
  border: none;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #fff;
  &::placeholder {
    color: #e5e5e5;
  }
`;

const Button = styled.button`
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
`;

const LinkRegister = styled(Link)`
  padding: 10px;
  margin: 10px;
  text-align: center;
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notyf = new Notyf({
    duration: 2000,
    dismissiblea: true,

    position: {
      x: "right",
      y: "top",
    },
  });
  const wrongPassword = () => notyf.error("Please check the Password");
  const notFound = () => notyf.error("Please check the Email");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { refreshToken } = userCredential.user;
      sessionStorage.setItem("Auth Token", refreshToken);
      navigate("/dashboard");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        wrongPassword();
      }
      if (error.code === "auth/user-not-found") {
        notFound();
      }
    }
  };

  return (
    <>
      <Body>
        <Background>
          <ShapeGradient />
          <ShapeGradient />
        </Background>
        <LoginForm onSubmit={handleLogin}>
          <Heading>Login</Heading>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="Email"
          />
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            placeholder="Password"
          />
          <Button type="submit">Log in </Button>
          <LinkRegister to="/register">Create an account?</LinkRegister>
        </LoginForm>
      </Body>
    </>
  );
}

export default Login;