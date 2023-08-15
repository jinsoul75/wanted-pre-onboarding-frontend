import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem('access_token', `Bearer ${res.data.access_token}`);
          navigate("/todo");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{
    if(localStorage.getItem('access_token')){
      navigate('/todo');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <form onSubmit={handleSignup}>
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
    </form>
  );
}
