import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
// import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (isSuccess || user) {
  //     navigate("/");
  //   }

  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (password !== password2) {
    //   toast.error("Passwords do not match");
    // } else {
    //   const userData = {
    //     name,
    //     email,
    //     password,
    //   };

    //   dispatch(register(userData));
    // }
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className="card shadow-2xl dark:shadow-dark2xl w-96 mx-auto">
        <div className="card-body">
          <section className="flex flex-col items-center gap-4 mb-6">
            <h1 className="flex text-3xl card-title font-dmserif">Register</h1>
            <p className="text-center">Please create an account</p>
          </section>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              className="input input-bordered w-full"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />

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
            <input
              type="password"
              className="input input-bordered w-full"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
            <button
              type="submit"
              className="btn btn-primary dark:btn-accent w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
