
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {Routes, Route, useNavigate} from 'react-router-dom';
// import {useSearchParams, useParams } from "react-router-dom";


// // make thhe error handling better in the backend otherwise

//  export function SendMoney() {
//   // const [to, setTo] = useState('');
//   const [amount, setAmount] = useState('');
//   const [userName,setuserName] = useState('')
//   let [searchParams] = useSearchParams();
//   let [namee,setNamee]=useSearchParams('');



//   const navigate = useNavigate()

//   useEffect(()=>{

//   //  setuserName(searchParams.get('username'))
//   //  setName(searchParams.get('name'))
//   const username = searchParams.get('username');
//   const name = searchParams.get('name');
//     setuserName(userName)
//   setNamee(name);
//   console.log(username,"+",name);
  
//   setuserName(username)
//   console.log(userName);

//   },[])

 


//   function handleSend() {
//      // Implement your logic for sending money
//      alert(`Sending ${amount} to ${namee}`);

//      const token = localStorage.getItem('token');
//      const config = {
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer ' + token
//        },
//        // timeout: 5000 // Example: 5 seconds
//      };

//      axios.post('http://localhost:3000/api/v1/account/transfer', {
//        userId: userName,
//        to: namee,
//        amount: amount
//      }, config)

//        .then(res => { 
//         if(res.status!=200){
//           alert('Error')
//         }
//         console.log(res)
//         navigate('/dashboard');
//          }).catch(err => { console.log(err); });


     
//    }

//   return (
//     <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
//       <div className="bg-green-200 p-8 rounded-md shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Send Money{namee}</h2>
//         <div className="mb-4 ">
    
//         <CircularIcon letter='A'></CircularIcon>
//           <div className="border rounded-md px-4 py-2 w-full text-md "> {namee} </div>
//         </div>
        
//         <div className="mb-4">
         
//           <input
//             type="text"
//             className="border border-gray-1000 rounded-md px-4 py-2 w-full"
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>
//         <button
//           className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
//           onClick={handleSend}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


// function CircularIcon({ letter }) {
//   return (
//     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//       {letter}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export function SendMoney() {
  const [amount, setAmount] = useState('');
  const [userName, setUserName] = useState('');
  const [namee, setNamee] = useState('');

  let [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const username = searchParams.get('username');
    const name = searchParams.get('name');
    setUserName(username);
    setNamee(name);
  }, [searchParams]);

  function handleSend() {
    alert(`Sending ${amount} to ${namee}`);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };

    axios
      .post('http://localhost:3000/api/v1/account/transfer', {
        userId: userName,
        to: namee,
        amount: amount,
      }, config)
      .then(res => {
        if (res.status !== 200) {
          alert('Error');
        }
        console.log(res);
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
      <div className="bg-green-200 p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Send Money to {namee}</h2>
        <div className="flex items-center mb-4">
          <CircularIcon letter={namee.charAt(0)} />
          <div className="ml-4 text-xl">{namee}</div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-1000 rounded-md px-4 py-2 w-full"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function CircularIcon({ letter }) {
  return (
    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
      {letter}
    </div>
  );
}
