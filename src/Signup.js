import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

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

  const handleSignup = () => {
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/auth/signup",
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
        if(res.status === 201){
          navigate('/signin');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <input
        value={email}
        onChange={handleEmailChange}
        data-testid='email-input'
      />
      <input
        value={password}
        onChange={handlePasswordChange}
        data-testid='password-input'
      />
      <button
        disabled={isDisabled}
        data-testid='signup-button'
        onClick={handleSignup}
      >
        회원가입
      </button>
    </>
  );
}
