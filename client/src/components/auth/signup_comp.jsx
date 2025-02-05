import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {validateSignup} from '../../util/validator'
import DotLoading from '../shared/DotLoading';
function Signup_comp({ toggleAuth }) {

const [isloading,setIsLoading] = useState(false);
const navigate = useNavigate();

let [userInfo, setUserInfo] = useState({name:'',email:'',password:''});

function handleChange(e){
  setUserInfo({...userInfo,[e.target.id]:e.target.value});
  console.log(userInfo)
}

async function handleSignup(e){
  try{
    e.preventDefault();
    const { error } = validateSignup.validate(userInfo);
      if (error) {
        throw new Error(error);
      }
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}auth/signup`, 
        userInfo,
        { withCredentials: true }
      );
      console.log(userInfo);
      console.log(response.data);
    if(response.status===200){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(response.data);
      setIsLoading(false);
      navigate('/');
    }
  }
  catch(e){
    setIsLoading(false);
  }
}
  return (
    <form className="w-full" >
      <div className="flex justify-between">
        <h1 className="text-4xl max-sm:text-3xl  font-semi-bold mb-5">Signup</h1>

      </div>
      <p className="mb-6">Welcome! Please enter your details.</p>
      <div className="mb-5">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          value={userInfo.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full border-b-2  border-gray-300 py-2 focus:outline-none focus:border-blue-500"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full border-b-2 border-gray-300  py-2  focus:outline-none focus:border-blue-500"
          value={userInfo.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <button className="w-full max-xs:text-lg max-xs:py-1 bg-black text-xl text-white py-2 rounded-md" onClick={handleSignup} >
          {isloading?<DotLoading/>:"Signup"}
        </button>
      </div>

      <div className="flex justify-center">
        <p>
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={toggleAuth}
          >
            Login
          </span>
        </p>
      </div>
    </form>
  );
}

export default Signup_comp;
