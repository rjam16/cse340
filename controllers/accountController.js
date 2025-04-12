const bcrypt = require("bcryptjs")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }
  
  module.exports = { buildLogin }
  /* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav();
    res.render("account/register", {  // Make sure you have a 'register.ejs' view
      title: "Register",
      nav,
      errors: null
    });
  }
  
  // Handle user registration - accountController.js
  async function handleRegister(req, res, next) {
    try {
      const { name, email, password, confirmPassword } = req.body;
  
      if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect("/account/register");
      }
  
      console.log(`User: ${name}, Email: ${email}`);
  
      req.flash("success", "Registration successful. Please log in.");
      res.redirect("/account/login");
    } catch (error) {
      next(error);
    }
  }
  
  /* ****************************************
  *  Process Registration
  * *************************************** */
  async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body
  
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      })
    } else {
      // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
 }}
  
  module.exports = { buildLogin, buildRegister, handleRegister,registerAccount };