import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import AddRecipe from "./components/addRecipe";
// import UpdateRecipe from "./components/updateRecipe";
function App() {
  return (
    <Router>
      <div className="container main">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Recipes />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="/SignUp" element= {<SignUp />} />
          <Route path="/login" element={<LogIn />}/>
          <Route path="/addrecipe" element={<AddRecipe/>}/>
          {/* <Route path="/updaterecipe" element={<UpdateRecipe/>}/> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  )
}

export default App;
