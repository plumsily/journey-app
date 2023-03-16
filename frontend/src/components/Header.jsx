import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BsJournalRichtext } from "react-icons/bs";
import { BiLogIn, BiLogOut, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="flex w-full items-center justify-between py-4">
      <div className="flex">
        <Link to="/">
          <button className="flex items-center gap-1 text-3xl dark:hover:text-lime-300 hover:text-red-400 hover:-translate-y-[1px]  transition-all font-dmserif">
            <BsJournalRichtext /> Journey
          </button>
        </Link>
      </div>
      <ul className="flex gap-2">
        {user ? (
          <>
            <li>
              <Link to="/profile">
                <button className="btn flex gap-1">
                  <BiUser /> Profile
                </button>
              </Link>
            </li>
            <li>
              <button className="btn flex gap-1" onClick={onLogout}>
                <BiLogOut /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="btn flex gap-1">
                  <BiLogIn /> Login
                </button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="btn flex gap-1">
                  <BiUser /> Register
                </button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
