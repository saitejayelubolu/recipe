// src/components/Signup.js
import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AddRecipe() {
  const [recipeName, setRecipeName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [ingredients, setIngredients] = useState();
  const navigate = useNavigate();
  const userdetails = JSON.parse(localStorage.getItem("user-info"));
  // console.log("userdetails",userdetails);
  // const token = userdetails.data.token;
  
useEffect(()=>{
  if(!userdetails){
    navigate("/login");
  }
})

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setImage(base64);
  }; 
//   console.log(ingre);
  const handleaddRecipe = async (event) => {
    event.preventDefault();
    var ingre = ingredients.replace(/,/g, ',');
     ingre = ingre.split(",");
    // console.log("Name:", recipeName);
    // const dummyString = "23,67, 89,990, "
    // console.log("Description:", description);
    console.log("image: ", image);
    // console.log("Ingredient: ",ingre);
   
      await axios.post("http://localhost:5500/recipe/addRecipe", 
      { 
        "recipeName":recipeName, 
        "description": description, 
        "image": image,
        "ingredients": ingre
      }, 
      {
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userdetails.data.token}`
        }
      }).then(response=>{
        // console.log("1",response)
        alert("Recipe Added Successful");
      
    }).catch(error => {
        alert("Recipe adding is failed");
        // console.error("error:", error);
    })
  };
  return (
    <div>
      <h1 style={{ textAlign: "center"}}>Add Recipe</h1>
      <form onSubmit={handleaddRecipe}>
        <div style={{}} class="input-container2">
        <label style={{textAlign: "center",color: "chocolate",}}
            for="name"
          >
            <b>Recipe-Name</b>
          </label>
          <input 
          style={{ marginLeft: "20px", width: "310px", font: "caption" }}
          type="text"
          id="recipeName"
          name="recipeName"
          placeholder="Enter your Recipe Name"
          onChange={(e) => setRecipeName(e.target.value)}
          required></input>
          <label style={{textAlign: "center",color: "chocolate",}}
            for="description"
          >
            <b>Description</b>
          </label>
          <input
            style={{ marginLeft: "20px", width: "310px", font: "caption" }}
            type="text"
            id="description"
            placeholder="Enter your Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label
            style={{ textAlign: "center", color: "chocolate" }}
            for="password"
          >
            <b>Upload Image</b>
          </label>
          <input style={{ marginLeft: "20px", width: "350px", font: "caption" }}
            type="file"
            id="image"
            placeholder="Upload image"
            onChange={handleFileUpload}
            required
          />
          <label style={{ textAlign: "center", color: "chocolate" }}
            for="password">
                <b>Ingredient Name</b>
            </label>
            <input style={{ marginLeft: "20px", width: "310px", font: "caption" }}
            id="ingredient"
            type="text"
            placeholder="Ingredient name"
            onChange={(e) => setIngredients(e.target.value)}
            required
            />
          <input style={{
              marginLeft: "70px",
              marginTop: "15px",
              height: "35px",
              width: "200px",
              font: "caption",
              backgroundColor: "burlywood",
              border: "none",
              color: "purple",
            }}
            id="submit"
            type="submit"
            value="Submit"
          />

        </div>
      </form>
    </div>
  );
}

export default AddRecipe;
