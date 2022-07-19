import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CREATEUSER  } from "../GraphQL/mutations";

const Signup = ({setUser}) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_Password] = useState("");
  const [showError, setShowError] = useState("hidden");
  const [createUser, { data, error }]= useMutation(CREATEUSER);
  const [queryError, setQueryerror]= useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirm_password !== password) {
      setShowError("");
      return;
    }
    createUser({
      variables:{
        firstName,
        lastName,
        middleName,
        email,
        password
      }
    })
  };

  useEffect(()=>{
    if(data&&data.createUser.token){
      setUser(data.createUser);
      localStorage.setItem('token', data.createUser.token);
      navigate("/article");
    }
    if(error){
      setQueryerror(error.message)
    }
  }, [data, error])

  const handleChange = (e) => {
    switch (e.target.placeholder) {
      case "First Name":
        setFirstName(e.target.value);
        break;
      case "Last Name":
        setLastName(e.target.value);
        break;
      case "Middle Name":
        setMiddleName(e.target.value);
        break;
      case "Email":
        setEmail(e.target.value);
        break;
      case "Password":
        setPassword(e.target.value);
        break;
      case "Confirm password":
        setconfirm_Password(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="mx-[auto] my-[1%] p-[35px] w-[500px] border-solid border-2 border-black-600">
      <div className="flex flex-col mt-12">
        <span className="text-[30px] font-bold text-[#595959] mb-4">
          Create Account
        </span>
        <div className="font-bold">
          <span className="text-base text-[#8A8B8B]">
            Already have an account?
          </span>

          <Link to="/" className="text-[red]">
            {" "}
            Sign in!
          </Link>
        </div>
      </div>
      {queryError?<div className="text-[red] text-center">{queryError}</div>:""}
      <div className="flex flex-col">
        <input
          placeholder={"First Name"}
          type={"text"}
          className="outline-none border-b-2 p-2 mt-6"
          onChange={handleChange}
        />
        <input
          placeholder={"Last Name"}
          type={"text"}
          className="outline-none border-b-2 p-2 mt-6"
          onChange={handleChange}
        />
        <input
          placeholder={"Middle Name"}
          type={"text"}
          className="outline-none border-b-2 p-2 mt-6"
          onChange={handleChange}
        />
        <input
          placeholder={"Email"}
          type={"email"}
          className="outline-none mt-6 border-b-2 p-2"
          onChange={handleChange}
        />
        <div className={`text-[red] mt-6 ${showError}`}>
          Passwords dont match!
        </div>
        <input
          placeholder={"Password"}
          type={"password"}
          className="outline-none border-b-2 p-2 mt-6 "
          onChange={handleChange}
        />
        <input
          placeholder={"Confirm password"}
          type={"password"}
          className="outline-none border-b-2 p-2 mt-6 "
          onChange={handleChange}
        />
      </div>
      <div
        onClick={handleSubmit}
        className="cursor-pointer mt-11 flex items-center justify-center bg-[#0E4E48] rounded-full p-3 text-[#fff] font-"
      >
        Submit
      </div>
    </div>
  );
};

export default Signup;
