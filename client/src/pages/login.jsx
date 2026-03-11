import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuthSelector } from "../services/selector/authSelector";

import useCustomDispatch from "../hooks/useCustomDispatch";
import authLogin from "../services/api/auth/authLogin";

import Cookies from "js-cookie";
import Loader from "../common/loader";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useCustomDispatch();
  const { authLoginResponse } = useAuthSelector();

  const initialFormData = { email: "", password: "" };

  const [userDetail, setUserDetail] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleUserData = (e) => {
    const { name, value } = e.target;

    setUserDetail({
      ...userDetail,
      [name]: value
    });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateLogin = () => {

    if (!userDetail.email && !userDetail.password)
      return "Please Enter Email and Password";

    if (!userDetail.email)
      return "Please Enter Your Email";

    if (!isValidEmail(userDetail.email))
      return "Enter a valid email address";

    if (!userDetail.password)
      return "Please Enter Your Password";

    if (userDetail.password.length < 6)
      return "Password must be at least 6 characters";

    return null;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationError = validateLogin();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {

      setErrorMessage(null);
      // setSuccessMessage(null);

      const res = await dispatch(authLogin(userDetail)).unwrap();

      if (res?.token) {

        // setSuccessMessage(res?.message || "Login successful");

        const user = res?.user;

        Cookies.set("user", JSON.stringify(user));

        setTimeout(() => {
          navigate(`/${user.role}/dashboard`);
        }, 1000);
      }

    } catch (error) {

      console.log("LOGIN ERROR:", error);

      setErrorMessage(
        error?.extraDetails ||
        error?.message ||
        error?.msg ||
        "Login failed"
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Login to MediMax AI
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userDetail.email}
                onChange={handleUserData}
              />
            </div>

            <div className="relative">
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={userDetail.password}
                onChange={handleUserData}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 text-sm select-none"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            {/* {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )} */}

            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {authLoginResponse?.loading ? <Loader /> : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-900 font-semibold">
              Register
            </Link>
          </p>

        </div>

      </div>
    </>
  );
};

export default Login;