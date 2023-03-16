import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import TodoForm from "../components/TodoForm";
// import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
// import { getTodos, reset } from "../features/todos/todoSlice";

function Feed() {
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
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   } else {
  //     dispatch(getTodos());
  //   }

  //   if (isError) {
  //     console.log(message);
  //   }

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [user, navigate, isError, message, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <div>
      <h1 className="font-dmserif text-2xl">Feed</h1>
    </div>
  );
}

export default Feed;
