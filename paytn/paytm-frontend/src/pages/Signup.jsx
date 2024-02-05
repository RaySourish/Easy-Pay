import axios from 'axios';
import React, { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';





// axios.get('http://localhost:3000/api/v1')
//   .then(function (response) {
//     // handle success
//     console.log("Here is it",response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });


// axios.post('http://localhost:3000/api/v1/user/signup',{
//   username: 'sourish',
//   password: '123456',
//   firstName: 'sorui',
//   lastName: 'Ray'
// }).then(res=>{
//   console.log(res);
// }).catch(err=>{
//   console.log("Error in axios:",err.message)
// })

// WHY I HAVE TO USE THE USENAVIGATE // OR ANY HHOOOK IN THE MAIN FUNCTION WHICH IS TO BE EXPORTED


export function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
    



try{axios.post('http://localhost:3000/api/v1/user/signup',{

username:formData.username,
password:formData.password,
firstName:formData.firstName,
lastName:formData.lastName

}).then(res=>{
  console.log(res);
  console.log(res.data);
  console.log(res.data.token)
  localStorage.setItem('token',res.data.token)

  // can get onlly one json attribute from the request
  if(res.status=200){
   
    navigate('/dashboard')
  }
}).catch(err=>{
  console.log("Error in axios:",err.message)
})}
catch(err){

}
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input id="lastName" name="lastName" type="text" autoComplete="family-name" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={handleChange} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


