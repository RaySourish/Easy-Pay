// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import React from 'react';
// // import { BrowserRouter , Routes,Route } from 'react-router-dom';
// // import Home from './pages/Home';
// // import Signup from './pages/Signup';
// // import Signin from './pages/Signin'
// // function App() {
// //   // const [count, setCount] = useState(0)

// //   return (
// //     <>
// //      <BrowserRouter>
// //       <Routes>
// //         <Route path="home" element ={<Home/>} >
// //         {/* <Route path="/signup" element={<Signup/>}/> */}
// //         <Route path='/signin' element={<Signin/>}/>
          
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>    
      

   
       
//     </>
//   )
// }

// export default App


import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import  {Signin}  from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App