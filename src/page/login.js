import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { LOGIN  } from "../GraphQL/mutations";
import { useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const [showpassword, setShowpassword] = useState(0);
  const [toggleText, setToggleText] = useState("password");
  const [passwordIcon, setPasswordIcon] = useState(0);
  const [login, { data, error }]= useMutation(LOGIN);
  const [queryError, setQueryerror]= useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(()=>{
    if(data && data.login.token){
      setUser(data.login);
      localStorage.setItem('token', data.login.token);
      navigate("/article");
    }
    if(error){
      setQueryerror(error.message)
    }
  }, [data, error])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        email,
        password
      }
    });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  // ---------------------testing-------------------------------------------

  const handlePassword = (e) => {
    if (e.target.value.length > 0) {
      setShowpassword(1);
    } else {
      setShowpassword(0);
    }
    setPassword(e.target.value);
  };
  const handleShowPassword = () => {
    if (toggleText === "password") {
      setToggleText("text");
      setPasswordIcon(0);
    } else {
      setToggleText("password");
      setPasswordIcon(1);
    }
  };

  return (
    <div className="mx-[auto] my-[5%] p-[35px] w-[400px] border-solid border-2 border-black-600">
      <div className="flex flex-col mt-5 mb-7">
        <span className="text-[30px] font-bold text-[#595959] mb-4">
          Welcome Back!
        </span>
        <div className="font-bold">
          <span className="text-base text-[#8A8B8B]">
            Don't have an account?
          </span>
          <Link to="/register" className="text-[red]">
            {" "}
            Sign up now!
          </Link>
        </div>
      </div>
      {queryError?<div className="text-[red] text-center">{queryError}</div>:""}
      <div className="flex flex-col">
        {/* -------------------------------email input-------------------------------------- */}
        <div className="relative group mt-10">
          <input
            onChange={handleEmail}
            type="email"
            id="email"
            required
            className="w-full h-10 text-sm peer outline-none border-b-2 p-2"
          />

          <label className="text-[#8A8B8B] pb-4 transform transition-all absolute top-0 left-0 h-full flex items-center pl-1 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
            Email
          </label>
        </div>

        {/* --------------------------------Password input----------------------------------- */}

        <div className="relative group mt-10 flex">
          <input
            onChange={handlePassword}
            type={toggleText}
            id="password"
            required
            className="w-full h-10 text-sm peer outline-none border-b-2 p-2"
          />

          <label className="text-[#8A8B8B] pb-4 transform transition-all absolute top-0 left-0 h-full flex items-center pl-1 text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">
            Password
          </label>
          <div
            className="text-[20px] border-b-2 cursor-pointer"
            onClick={handleShowPassword}
          >
            {passwordIcon ? (
              <AiOutlineEye
                className={`text-[#8A8B8B] text-[20px] ${
                  showpassword ? "" : "hidden"
                }`}
              />
            ) : (
              <AiOutlineEyeInvisible
                className={`text-[#8A8B8B] text-[20px] ${
                  showpassword ? "" : "hidden"
                }`}
              />
            )}
          </div>
        </div>

        <div className="mb- flex justify-between items-center">
  
        </div>
      </div>
      <div
        onClick={handleSubmit}
        className="cursor-pointer mt-16 flex items-center justify-center bg-[#0E4E48] rounded-full p-3 text-[#fff]"
      >
        Sign in
      </div>  
    </div>
  );
};

export default Login;
