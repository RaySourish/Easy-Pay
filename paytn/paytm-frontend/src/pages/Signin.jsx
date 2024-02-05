import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export function Signin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [passwordWarning,setpassWarning] = useState({})
  const Navigate = useNavigate();

// handling the state variable
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    console.log(e.target.name)
    setFormData({ ...formData, [name]: value });


    if (name === 'password' && value.length < 6) {
      setpassWarning('Password must be at least 6 characters long.');
    } else {
      setpassWarning('');
    }
console.log(passwordWarning)
  };
const token = localStorage.getItem('token')
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    axios({

      method: 'post',
      url: 'http://localhost:3000/api/v1/user/signin',
      responseType: 'json',
      data:{
        username :formData.username,
        password :formData.password

      },
      headers:{
        Authorization : 'bearer '+token
      }
    }).then(res=>{
  console.log(res.data);
  if(res.status==200) Navigate('/dashboard')
}).catch(err=>{
  console.log("Error in axios:",err.message)
})
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
              {/* { passwordWarning ? <div className="text-red-500">{passwordWarning}</div>:null} */}
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

 