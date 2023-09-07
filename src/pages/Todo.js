import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { instance } from "../apis/axiosInstance";

export default function Todo() {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [editTodoValue, setEditTodoValue] = useState("");

  const navigate = useNavigate();

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    instance
      .post("/todos", {
        todo: todoValue,
      })
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
  };

  const handleTodoDelete = (id) => {
    instance
      .delete(`/todos/${id}`, {})
      .then((res) => {
        console.log(res);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
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
    instance
      .put(`/todos/${todo.id}`, {
        todo: todo.todo,
        isCompleted: !todo.isCompleted,
      })
      .then((res) => {
        console.log(res);
        setTodos(updatedTodos);
      })
  };

  const handleEditSubmit = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, todo: editTodoValue };
      }
      return t;
    });
    instance
      .put(`todos/${todo.id}`, {
        todo: editTodoValue,
        isCompleted: todo.isCompleted,
      })
      .then((res) => {
        console.log(res);
        setTodos(updatedTodos);
        setEditId(0);
      })
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/signin");
      return;
    }
    instance("/todos")
      .then((res) => {
        console.log(res);
        setTodos(res.data);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ContainerForm onSubmit={handleTodoSubmit}>
        <label className='margin-right'>Add Todo:</label>
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
              <input
                type='checkbox'
                checked={todo.isCompleted}
                onChange={() => handleCheckboxChange(todo)}
              />
              <span>{todo.todo}</span>

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
