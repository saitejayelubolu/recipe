import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import  Modal  from "react-bootstrap/Modal";
import  Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
// import { Button } from "bootstrap";
import Button  from "react-bootstrap/Button";
import logo from "../logo.jpg"

export default function Recipes(){
    const [search, setSearch] = useState();
    const [searchRecipe, setSearchRecipe] = useState();
    const [recipes, setRecipes] = useState();
    const [role, setRole] = useState(false);
    const [oneRecipe, setOneRecipe] = useState();
    const [show, setShow] = useState(false);
    // const [updateId, setUpdateId] = useState();
   
    const navigate = useNavigate();
    const userdetails = JSON.parse(localStorage.getItem("user-info"));
    
    // console.log('userdetails', userdetails.data.data.role);
    //logout
    const logout = () => {
        localStorage.removeItem("user-info");
        navigate("/login");
        // setIsLoggedin(false);
    };
    function addrecipe()
    {
        navigate("/addrecipe")
    }
    function onSubmit() {
        axios.get(
            `http://localhost:5500/recipe/search/${search}`,
            {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userdetails.data.token}`
                }
            })
            .then((response) => {
                // console.log(response.data.data)
                setSearchRecipe(response.data.data)
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        if (!userdetails) {
            navigate("/login");
        }
        else{
            if(userdetails.data.data.role === "admin"){
                setRole(true);
            }
             axios.get("http://localhost:5500/recipe/getrecipe",
            {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userdetails.data.token}`
                }
            })
            .then((recipeObj)=>{
                return setRecipes(recipeObj.data)
            })
            .catch((err)=>{
                console.log("error",err)
            })
        }
    })
    const deleteRecipe = ((id) => {
        axios.delete(`http://localhost:5500/recipe/deleteRecipe/${id}`,{
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${userdetails.data.token}`
            }
        })
        .then((response) => {
            // console.log(response)
            alert("Recipe deleted successfully")
        })
        .catch(err => console.log(err));
    })

    //update Recipe Id
    const updateRecipeId = async (id) => {
      await axios.get(`http://localhost:5500/recipe/${id}`,
      {
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userdetails.data.token}`
        }
      }).then(response=>{
        // console.log("oneRecipe",response.data)
        // setUpdateId(id);
        setOneRecipe(response.data[0]);
        setShow(true)
      }).catch(error => {
          alert("Recipe fetch is failed");
          console.error("error:", error);
      })
    };
    // console.log("onerecipe",oneRecipe);
    const handleClose = () => setShow(false);
    //update recipe
    const handleUpdateRecipe = async () => {
        // event.preventDefault();
        // return console.log("1234rrr",oneRecipe.in);
        var ingredient = await oneRecipe.ingredients
        // console.log("ingredient",ingredient);
        // var ingre = await ingredient.replace(/,/g, ',');
        // var ingre = await ingre.split(",");
          await axios.put(`http://localhost:5500/recipe/update/${oneRecipe._id}`, 
          { 
            "recipeName":oneRecipe.recipeName, 
            "description": oneRecipe.description, 
            "image": oneRecipe.image,
            "ingredients": ingredient
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
            //  console.error("error:", error);
        })
      };

      //image
      const convertToBase64 = async (file) => {
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
         setOneRecipe({...oneRecipe, image:base64});
      }; 
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container-fluid">
                    {/* <h className="navbar-brand">Navbar w/ text</h> */}
                    <img src={logo} className="navbar-brand" alt="logo" style={{"height":130}}/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon">
                        <img src={logo} className="App-logo" alt="logo" />
                      </span>
                    </button>
                    <div className="collapse navbar-collapse text-center" id="navbarText" style={{"justifyContent":"center"}}>
                        <ul className="navbar-nav  mb-2 mb-lg-0">
                          <li className="nav-item m-2">
                            <input  type="text" className="form-control nav-search" 
                            placeholder="Search ..." onChange={(e) => setSearch(e.target.value)}/> 
                          </li>
                          <li className="nav-item m-2">
                            <button onClick={onSubmit} className="btn btn-success" type="submit">
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                          </li>
                        </ul>
                    </div>
                    <div>
                        <button className="btn btn-danger" onClick={logout}>Logout</button>
                      </div>
                    </div>
                </nav>
            </div>
            {role ? <div> <button className="btn btn-primary" onClick={addrecipe}>Add Recipe</button> </div> : null}
            <div>
                {searchRecipe ? searchRecipe.map((recipe, index) => (
                    <div className="card" style={{width: "18rem"}}>
                        {/* <li>{recipe.image}</li> */}
                        <img src={recipe.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{recipe.recipeName}</h5>
                          <p className="card-text">{recipe.description}</p>
                          <p className="card-text">{recipe.ingredients}</p>
                          {role ? <button className='btn btn-danger'onClick={() =>{deleteRecipe(recipe._id)}}>Delete</button> : null}
                          {role ? <button className='btn btn-primary'onClick={() =>{updateRecipeId(recipe._id)}}>Update</button> : null}
                        </div>
                    </div>
                ))
                : recipes?.map((data, index)=> (
                    <div className="card" style={{width: "18rem"}}>
                        {/* <li>{recipe.image}</li> */}
                        <img src={data.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{data.recipeName}</h5>
                          <p className="card-text">{data.description}</p>
                          <p className="card-text">{data.ingredients}</p>
                          {role ? <button className='btn btn-danger'onClick={() =>{deleteRecipe(data._id)}}>Delete</button> : null }
                          {role ? <button className='btn btn-primary'onClick={() =>{updateRecipeId(data._id)}}>Update</button> : null}
                        </div>
                    </div>
                ))}
            </div>
            {/* Update popup */}
            {oneRecipe ? <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateRecipe}>
                        <Form.Group className="mb-3" >
                          <Form.Label className="fs-bold" >
                            Recipe-Name
                          </Form.Label>
                          <Form.Control
                          type="text"
                          name="recipeName"
                          value={oneRecipe.recipeName}
                          onChange={(e) => setOneRecipe({...oneRecipe, recipeName: e.target.value})}
                          required />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="fs-bold" >
                            Description
                          </Form.Label>
                          <Form.Control
                          type="text"
                          name="description"
                          value={oneRecipe.description}
                          onChange={(e) => setOneRecipe({...oneRecipe, description:e.target.value})}
                          required />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="fs-bold" >
                          Upload Image
                          </Form.Label>
                          <Form.Control
                          type="file"
                          name="image"
                        //   value={oneRecipe.image}
                          onChange={handleFileUpload}
                          required />
                          <img src={oneRecipe.image} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="fs-bold" >
                          Ingredient Name
                          </Form.Label>
                          <Form.Control
                          type="text"
                          name="ingredients"
                          value={oneRecipe.ingredients}
                          onChange={(e) => setOneRecipe({...oneRecipe, ingredients:e.target.value})}
                          required />
                        </Form.Group>
                        <FormGroup className="text-center">
                          <Button
                            className="btn btn-primary"
                            variant= "primary"
                            type="submit"
                          >Submit</Button>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal> : null}
            
        </>
    )
}