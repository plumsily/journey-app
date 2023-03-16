import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import TodoForm from "../components/TodoForm";
// import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
// import { getTodos, reset } from "../features/todos/todoSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  // const { todos, isLoading, isError, message } = useSelector(
  //   (state) => state.todos
  // );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // dispatch(getTodos());
    }

    // if (isError) {
    //   console.log(message);
    // }

    return () => {
      // dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Here are your Journeys:</p>
      </section>

      <section className="content">
        <h3>You don't have any Journeys to show</h3>

        {/* {todos.length > 0 ? (
      <div className="todos">
        {todos.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </div>
    ) : (
      <h3>You don't have any Journeys to show</h3>
    )} */}
      </section>

      {/* <TodoForm /> */}
    </>
  );
}

export default Profile;
