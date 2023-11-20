import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"


export default function TopRecipesCard({TopRecipes}) {
    return (
        <div className="chief-card">
            <img src={TopRecipes.img} alt="" />
            <div className="chief-card-info">
                <h3 className="chief-card-name">{TopRecipes.name}</h3>
                <p className="chief-recipe-count">Recipes: <b>{TopRecipes.recipesCount}</b></p>
                <p className="chief-cuisine">Cuisine: <b>{TopRecipes.cuisine}</b></p>
                <p className="cheif-icons">
                    <FontAwesomeIcon icon={faFacebook} />
                    <FontAwesomeIcon icon={faTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                </p>
            </div>
        </div>
    )
}