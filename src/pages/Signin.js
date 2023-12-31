import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerForm } from "./Signup";
import { instance } from "../apis/axiosInstance";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event) => {
    event.preventDefault();
    instance
      .post("/auth/signin", {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem(
            "access_token",
            `Bearer ${res.data.access_token}`
          );
          navigate("/todo");
        }
      })
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
      <button data-testid='signin-button' type='submit'>
        로그인
      </button>
    </ContainerForm>
  );
}
