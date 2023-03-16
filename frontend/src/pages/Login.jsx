import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { BiLogIn, BiLogOut, BiUser } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/profile");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="card shadow-2xl w-96 mx-auto">
        <div className="card-body">
          <section className="flex flex-col items-center gap-4 mb-6">
            <h1 className="flex text-3xl card-title font-dmserif">Login</h1>
            <p className="text-center">
              Login and start sharing your Journeys!
            </p>
          </section>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              className="input input-bordered w-full"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />

            <input
              type="password"
              className="input input-bordered w-full"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />

            <button type="submit" className="btn w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
