import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <button className='margin-right' onClick={() => navigate("/signup")}>
        Signup
      </button>
      <button className='margin-right' onClick={() => navigate("/signin")}>
        Signin
      </button>
      <button onClick={() => navigate("/todo")}>Todo</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  button {
    border: 2px solid pink;
    border-radius: 10px;
    padding: 3rem;
    &:hover {
      background-color: pink;
    }
  }
  .margin-right {
    margin-right: 1rem;
  }
`;
