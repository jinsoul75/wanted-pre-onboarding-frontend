import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function Todo() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [editTodoValue, setEditTodoValue] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        { todo: todoValue },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTodoValue("");
        const newTodo = {
          id: res.data.id,
          todo: todoValue,
          isCompleted: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      })
      .catch((error) => console.log(error));
  };

  const handleTodoDelete = (id) => {
    axios
      .delete(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleTodoEdit = (todo) => {
    setEditId(todo.id);
    setEditTodoValue(todo.todo);
  };

  const handleEditTodoValueChange = (event) => {
    setEditTodoValue(event.target.value);
  };
  const handleTodoValueChange = (event) => {
    setTodoValue(event.target.value);
  };
  const handleEditCancle = () => {
    setEditId(0);
  };
  const handleCheckboxChange = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
        {
          todo: todo.todo,
          isCompleted: !todo.isCompleted,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTodos(updatedTodos);
      })
      .catch((res) => console.log(res));
  };

  const handleEditSubmit = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, todo: editTodoValue };
      }
      return t;
    });
    axios
      .put(
        `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
        {
          todo: editTodoValue,
          isCompleted: todo.isCompleted,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setTodos(updatedTodos);
        setEditId(0);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
      return;
    }
    axios("https://www.pre-onboarding-selection-task.shop/todos", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ContainerForm onSubmit={handleTodoSubmit}>
        <lable className='margin-right'>Add Todo:</lable>
        <input
          data-testid='new-todo-input'
          value={todoValue}
          onChange={handleTodoValueChange}
        />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </ContainerForm>
      <ContainerUl>
        {todos.map((todo) => {
          const isEdit = editId === todo.id;
          return isEdit ? (
            <li key={todo.id}>
              <label>
                <input
                  type='checkbox'
                  checked={todo.isCompleted}
                  onChange={() => handleCheckboxChange(todo)}
                />
                <input
                  data-testid='modify-input'
                  value={editTodoValue}
                  onChange={handleEditTodoValueChange}
                />
              </label>
              <button
                data-testid='submit-button'
                onClick={() => handleEditSubmit(todo)}
                className='margin-right'
              >
                제출
              </button>
              <button
                data-testid='cancel-button'
                onClick={() => handleEditCancle(todo.id)}
              >
                취소
              </button>
            </li>
          ) : (
            <li key={todo.id}>
              <label>
                <input
                  type='checkbox'
                  checked={todo.isCompleted}
                  onChange={() => handleCheckboxChange(todo)}
                />
                <span>{todo.todo}</span>
              </label>
              <button
                onClick={() => handleTodoEdit(todo)}
                data-testid='modify-button'
                className='margin-right'
              >
                수정
              </button>
              <button
                onClick={() => handleTodoDelete(todo.id)}
                data-testid='delete-button'
              >
                삭제
              </button>
            </li>
          );
        })}
      </ContainerUl>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  button {
    border: 1px solid black;
    border-radius: 10px;
    padding: 0.2rem;
    &:hover {
      background-color: pink;
    }
  }
  input,
  span,
  .margin-right {
    margin-right: 0.5rem;
  }
`;

const ContainerForm = styled.form`
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
`;

const ContainerUl = styled.ul`
  li {
    margin-top: 0.5rem;
    list-style: none;
  }
`;
