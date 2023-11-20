// import React, { useRef, useState, useEffect, useAuth  } from "react";
// import axios from "axios";
// import { Link, Navigate, Routes, useNavigate } from "react-router-dom";
// import  Modal  from "react-bootstrap/Modal";
// import  Form from "react-bootstrap/Form";
// import FormGroup from "react-bootstrap/esm/FormGroup";
// // import { Button } from "bootstrap";
// import Button  from "react-bootstrap/Button";

// function UpdateRecipe() {
//   const [recipeName, setRecipeName] = useState();
//   const [description, setDescription] = useState();
//   const [image, setImage] = useState();
//   const [ingredients, setIngredients] = useState();
//   const [id, setId] = useState();
//   const [show, setShow] = useState(true);

//   const handleClose = () => setShow(false);



//   const navigate = useNavigate();
//   const userdetails = JSON.parse(localStorage.getItem("user-info"));
//   // console.log("userdetails",userdetails);
//   // const token = userdetails.data.token;
  
// useEffect(()=>{
//   if(!userdetails){
//     navigate("/login");
//   }
// })

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     const base64 = await convertToBase64(file);
//     // console.log(base64);
//     setImage(base64);
//   }; 
// //   console.log(ingre);
//   const handleUpdateRecipe = async (event) => {
//     event.preventDefault();
//     var ingre = ingredients.replace(/,/g, ',');
//     var ingre = ingre.split(",");
//     // console.log("image: ", image);
    
//     // console.log("id given: ",id);
//       await axios.post(`http://localhost:5500/recipe/update/${id}`, 
//       { 
//         "recipeName":recipeName, 
//         "description": description, 
//         "image": image,
//         "ingredients": ingre
//       }, 
//       {
//         headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userdetails.data.token}`
//         }
//       }).then(response=>{
//         // console.log("1",response)
//         alert("Recipe Added Successful");
      
//     }) .catch(error => {
//         alert("Recipe adding is failed");
//         // console.error("error:", error);
//     })
//   };
//   return (
//     <div>
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Update Recipe</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form onSubmit={handleUpdateRecipe}>
//               <Form.Group className="mb-3" >
//                 <Form.Label className="fs-bold" >
//                   Recipe-Name
//                 </Form.Label>
//                 <Form.Control
//                 type="text"
//                 name="recipeName"
//                 // value={}
//                 onChange={(e) => setRecipeName(e.target.value)}
//                 required />
//               </Form.Group>
//               <Form.Group className="mb-3" >
//                 <Form.Label className="fs-bold" >
//                   Description
//                 </Form.Label>
//                 <Form.Control
//                 type="text"
//                 name="description"
//                 // value={}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required />
//               </Form.Group>
//               <Form.Group className="mb-3" >
//                 <Form.Label className="fs-bold" >
//                 Upload Image
//                 </Form.Label>
//                 <Form.Control
//                 type="file"
//                 name="image"
//                 // value={}
//                 onChange={(e) => setImage(e.target.value)}
//                 required />
//               </Form.Group>
//               <Form.Group className="mb-3" >
//                 <Form.Label className="fs-bold" >
//                 Ingredient Name
//                 </Form.Label>
//                 <Form.Control
//                 type="text"
//                 name="ingredient"
//                 // value={}
//                 onChange={(e) => setIngredients(e.target.value)}
//                 required />
//               </Form.Group>
//               <FormGroup className="text-center">
//                 <Button
//                   className="btn btn-primary"
//                   variant= "primary"
//                   type="submit"
//                 >Submit</Button>
//               </FormGroup>
//               {/* <div className="input-container2">
//                 <label
//                   style={{
//                     textAlign: "center",
//                     //marginTop: "10px",
//                     color: "chocolate",
//                   }}
//                   for="name"
//                 >
//                   <b>Recipe-Name</b>
//                 </label>
//                 <input 
//                 style={{ marginLeft: "20px", width: "310px", font: "caption" }}
//                 type="text"
//                 id="recipeName"
//                 name="recipeName"
//                 placeholder="Enter your Recipe Name"
//                 onChange={(e) => setRecipeName(e.target.value)}
//                 required></input>
//                 <label
//                   style={{
//                     textAlign: "center",
//                     color: "chocolate",
//                   }}
//                   for="description"
//                 >
//                   <b>Description</b>
//                 </label>
//                 <input
//                   style={{ marginLeft: "20px", width: "310px", font: "caption" }}
//                   type="text"
//                   id="description"
//                   placeholder="Enter your Description"
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//                 <label
//                   style={{ textAlign: "center", color: "chocolate" }}
//                   for="password"
//                 >
//                   <b>Upload Image</b>
//                 </label>
//                 <input
//                   style={{ marginLeft: "20px", width: "350px", font: "caption" }}
//                   type="file"
//                   id="image"
//                   placeholder="Upload image"
//                   onChange={handleFileUpload}
//                   required
//                 />
//                 <label style={{ textAlign: "center", color: "chocolate" }}
//                   for="password">
//                       <b>Ingredient Name</b>
//                   </label>
//                   <input style={{ marginLeft: "20px", width: "310px", font: "caption" }}
//                   id="ingredient"
//                   type="text"
//                   placeholder="Ingredient name"
//                   onChange={(e) => setIngredients(e.target.value)}
//                   required
//                   />
//                 <input style={{
//                     marginLeft: "70px",
//                     marginTop: "15px",
//                     height: "35px",
//                     width: "200px",
//                     font: "caption",
//                     backgroundColor: "burlywood",
//                     border: "none",
//                     color: "purple",
//                   }}
//                   id="submit"
//                   type="submit"
//                   value="Submit"
//                 />
//               </div> */}
//             </Form>
//           </Modal.Body>
//         </Modal>
//       {/* <h1 style={{ textAlign: "center" }}>Update Recipe</h1> */}
      
//     </div>
//   );
// }

// export default UpdateRecipe;
