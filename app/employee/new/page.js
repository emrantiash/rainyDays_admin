import React from 'react'

export default function AddEmployee() {
  return (
    <div>...Below real code</div>
  )
}


// import React from 'react';
// import Input from '@/app/components/input/Input';
// import Select from '@/app/components/select/Select';
// import Button from '@/app/components/button/Button';
// import Horizontal from '@/app/components/horizontal/Horizontal';

// const placement = [
//   {
//     id : 1 ,
//     name : "Head Office",
//     value : 1 
//   },
//   {
//     id : 1 ,
//     name : "Branch",
//     value : 2 
//   },
//   {
//     id : 1 ,
//     name : "Pick UP",
//     value : 3 
//   },
//   {
//     id : 1 ,
//     name : "Delivery",
//     value : 4 
//   }
// ]

// export default function AddEmployee() {
//   return (
//     <main >
//       <div className="container-fluid" >
//         <div className='row' >
//           <div className="card border-bottom-warning  shadow h-100 py-3" style={{ width: '40%' }}>

//             <div className='card-body'  >

//               <form className="user" >
//                 <div >
//                 <div className="form-group">
//                   <Input
//                     type="text"
//                     placeholder='Name '
//                     width='60%'
//                   />
//                   <Horizontal />
//                 </div>

//                 <div className="form-group">
//                   <Input
//                     type="text"
//                     placeholder='Phone '
//                     width='60%'
//                   />
//                 </div>
//                 <hr />
//                 <div className="form-group">
//                   {/* dropdown */}
//                   <Select
//                     width='60%'
//                     data = {placement}
//                   />

//                 </div>
//                 <hr />
//                 <Button
//                   text={"Create User! "}
//                   width="60%"
//                 />



//                 <Horizontal />
//                 </div>

//               </form>
//             </div>

//           </div>

//         </div>
//       </div>

//     </main>
//   )
// }
