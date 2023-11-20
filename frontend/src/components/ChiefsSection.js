import TopRecipesCard from "./Toprecipes"
import TopRecipes from "./Toprecipes"

export default function TopRecipesSection(){
    const TopRecipes = [
        {
            name: "Chicken pizza",
            img: "/img/Toprecipes/img_1.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "Veggie",
            img: "/img/Toprecipes/img_2.jpg",
            recipesCount: "05",
            cuisine: "Japanese",
        },
        {
            name: "Erich Maria",
            img: "/img/Toprecipes/img_3.jpg",
            recipesCount: "13",
            cuisine: "Italian",
        },
        {
            name: "Chris Brown",
            img: "/img/Toprecipes/img_4.jpg",
            recipesCount: "08",
            cuisine: "American"
        },
        {
            name: "Blake Lively",
            img: "/img/Toprecipes/img_5.jpg",
            recipesCount: "09",
            cuisine: "French"
        },
        {
            name: "Ben Affleck",
            img: "/img/Toprecipes/img_6.jpg",
            recipesCount: "04",
            cuisine: "Indian"
        }
    ]
    return (
        <div className="section chiefs">
            <h1 className="title">Our Top Recipes</h1>
            <div className="top-chiefs-container">
                {/* <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard /> */}
                { TopRecipes.map(TopRecipes => <TopRecipesCard key={TopRecipes.name} TopRecipes={TopRecipes} />) }
            </div>
        </div>
    )
}