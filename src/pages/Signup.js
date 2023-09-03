import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axiosInstance from "../apis/axiosInstance";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    axiosInstance
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
        {
          email,
          password,
        },
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/signin");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/todo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerForm onSubmit={handleSignup}>
      <label>email</label>
      <input
        value={email}
        onChange={handleEmailChange}
        data-testid='email-input'
      />
      <label>password</label>
      <input
        value={password}
        onChange={handlePasswordChange}
        data-testid='password-input'
        type='password'
      />
      <button disabled={isDisabled} data-testid='signup-button' type='submit'>
        회원가입
      </button>
    </ContainerForm>
  );
}

export const ContainerForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  label,
  input {
    margin-right: 0.5rem;
  }
  button {
    border: 1px solid pink;
    border-radius: 10px;
    padding: 0.2rem;
  }
`;
