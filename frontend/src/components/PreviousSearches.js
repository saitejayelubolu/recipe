import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PreviousSearches(){
    
const [search, setSearch] = useState();
const [searchRecipe, setSearchRecipe] = useState();
const [recipes, setRecipes] = useState();
const navigate = useNavigate();
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
                }
            })
            .then((response) => {
                // console.log(response.data.data)
                setSearchRecipe(response.data.data)
            })
            .catch(err => console.log(err));
    };
useEffect(() => {
    axios.get("http://localhost:5500/recipe/getrecipe")
    .then((recipeObj)=>{
        // console.log("data",recipeObj.data);
        return setRecipes(recipeObj.data)
    })
    .catch((err)=>{
        console.log("error",err)
    })
})
    return (
        <>
            <div style={{}}>
                <div>
                    <button style={{width:"100px",height:"50px"}} onClick={addrecipe}>Add Recipe</button>
                </div>
                <div style={{marginTop:"10px"}} className="previous-searches section">
                    <div class="search-box">
                        <input style={{}} type="text" placeholder="Search ..." onChange={(e) => setSearch(e.target.value)} />
                        <button style={{}} onClick={onSubmit} className="btn" type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                {searchRecipe ? searchRecipe.map((recipe, index) => (
                    <div class="card" style={{width: "18rem"}}>
                        {/* <li>{recipe.image}</li> */}
                        <img src={recipe.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{recipe.recipeName}</h5>
                          <p class="card-text">{recipe.description}</p>
                          <p class="card-text">{recipe.ingredients}</p>
                        </div>
                    </div>
                ))
                : recipes?.map((data, index)=> (
                    <div class="card" style={{width: "18rem"}}>
                        {/* <li>{recipe.image}</li> */}
                        <img src={data.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{data.recipeName}</h5>
                          <p class="card-text">{data.description}</p>
                          <p class="card-text">{data.ingredients}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}