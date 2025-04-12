// Needed Resources 
const regValidate = require('../utilities/account-validation')
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accController")

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
//Route for login
router.get('/login', accountController.buildLogin);
router.post('/register', accountController.handleRegister);
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )
//Route for registration
router.get('/register', accountController.buildRegister);
//Middleware for errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong in the account.');
});

// Process the login attempt
router.post(
    "/login",
    (req, res) => {
      res.status(200).send('login process')
    }
  )

module.exports = router;