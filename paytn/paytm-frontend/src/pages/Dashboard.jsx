import React, { useState,useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios'




export function Dashboard({  }) {
    
const navigate = useNavigate();
// hooks can only be called inside the body of the function
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filter,setFilter] = useState([])
  const [userName,setuserName] = useState([]);
  const [balance,setBalance] = useState([]);
  
  
  // axios.get('http//:localhost:3000/api/v1/user/').then(res=>console.log(res.data)).catch(err=>console.log(err))



  console.log(localStorage.getItem('token'));

  
    // let allUser= [];
    useEffect(() => {
      const token = localStorage.getItem('token')
  axios({

    method: 'get',
    url: 'http://localhost:3000/api/v1/user/bulk?filter='+searchQuery,
    responseType: 'json',
    headers:{
      Authorization : 'bearer '+token
    }
  })
    .then(function (response) {
      // allUser = response.data;
      console.log("this is ",response.data)
      let allUser = response.data.user
      // console.log(typeof response.data.user)
      console.log(response.data.user[0])
      // allUser.map(user => {
        // Spread the existing users state array and add the new user object to it
        setUsers(allUser)
      // });
    }).catch(err=>{
      console.log("There is error:",err)
    })

  },[searchQuery])

console.log("user",userName)

  const handleSearchChange = (e) => {
    
    setSearchQuery(e.target.value);
    console.log(searchQuery)
    

    // You can filter the users based on the search query here
  };

  const handleSend = (username) => {
    // Implement your logic for sending a message to the user
    alert(`Sending message to ${username}`);
    navigate('/send?username='+userName+'&name='+username);

  };

  useEffect(()=>{

    const token = localStorage.getItem('token')
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/v1/account/balance',
      responseType: 'json',
      headers:{
        Authorization : 'bearer '+token
      }
    })
    .then(res=>{
      console.log("thissss",res.data)
      setuserName(res.data.userId)
      console.log("This user",userName)
     setBalance( res.data.balance );
    }).catch(err=>{console.log(err)})

   

    
  })


  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl  font-semibold cursor-pointer" onClick={()=>{navigate('/signin')}}>EasyPay</div>
        <div>Welcome, {userName}</div>
      </div>
      <div className='text-xl font-bold pt-5 pd-3'>Balance</div>
      <div className='text-lg font-semibold pl-1 pt-3'>{balance}</div>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* rendering all the todos */}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleSend(user.username)}>Send</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


