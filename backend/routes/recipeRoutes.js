const express = require("express");
const router = express.Router();
const recipeSchema = require("../schema/RecipeSchema");
const { auth } = require("../config/jwt");
//add
router.post("/addrecipe", auth, (req,res,next) =>
{
    // console.log("req.body", req.body)
    recipeSchema.create(req.body, (err,data)=>
    {
        if(err)
        {
            return next(err);
        }    
        else{
            res.json(data);
        }
    });
});

//get
router.get("/getRecipe", auth,(req,res,next)=>
{
    recipeSchema.find((err,data)=>{
        if(err)
        {
            return next(err);
        }
        else{
            return res.json(data);
        }
    });
});

// search by ingredients
  router.get('/search/:ingredients', auth, (req, res) => {

    let {ingredients} = req.params;
    // console.log("des",description)

    recipeSchema.find({ingredients}).then(result => {
        // console.log("data", result)
        res.json({
            status: "Success",
            message: "get data successfully!!",
            data: result
        });

    }).catch(err => {
        console.log(err);
        res.json({
            status : "FAILED",
            message : "An error occurred while searching tweet"
        })
    })
})

//delete
router.delete("/deleteRecipe/:id", auth,(req,res, next)=>
{
    recipeSchema.findByIdAndDelete(req.params.id,(err,data)=>
    {
        if (err) {
            return next(err);
          } else {
            return res.json("Deleted Successfully");
          }
    });
});


// update
router.put("/update/:id",auth, (req, res)=>{
    const details = {
      recipeName: req.body.recipeName,
      description: req.body.description,
      image: req.body.image,
      ingredients: req.body.ingredients
    }
    recipeSchema.findByIdAndUpdate(req.params.id, {$set:details}, function(err, result) {
      if (err)
      {
        res.status(400).send({
          status: false,
          message:err
        });
      }else{
        res.send({
          status: true,
          message:"updated successfully",
          data: result
        });
      }
  })
  });
// get recipe by id
  router.get("/:id", auth,(req,res,next)=>
  {
      recipeSchema.find({"_id": req.params.id},(err,data)=>{
          if(err)
          {
              return res.send(err);
          }
          else{
              return res.json(data);
          }
      });
  });
module.exports = router;