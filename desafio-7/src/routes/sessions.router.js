import { Router } from "express";
import CartManager from "../controllers/Carts.js";
import SessionManager from "../controllers/Sessions.js";
import passport from "passport";
import { isValidPassword } from "../util.js";
import config from "../config.js";
import jwt from "jsonwebtoken";


const router = Router();
const sessionManager =new  SessionManager();

router.post("/register", passport.authenticate("register", { failureRedirect: "/failRegister" }), async (req, res) => {
    return res.send({ status: "sucess", message: "user registered" });
});

router.get("/failRegister", (req, res) => {
  console.log("Failed Register");
  return res.send({ status: "error", error: "authentication error" });
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await sessionManager.getUser({email});
  if(!user) return res.status(401).send({status: error, error:"User does not exist"});

  if(!isValidPassword(user, password))
    return res.status(401).send({ status: "error", message: "Invalid Credentials"});
  
  const jwtUser = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    cart: user.cart,
  }

  const token = jwt.sign(jwtUser, config.jwtSecret, {expiresIn: "2h"});

  return res
  .cookie("jwtCookie", token, {httpOnly: true})
  .send({status: "succes", message:"Login Sucessful"});
});

router.post("/logout", async (req, res) => {
  return res
  .clearCookie("jwtCookie")
  .send({status: "Sucess", message: "log out successful"})
});

router.get("/failLogin", (req, res) => {
  res.send({ status: "error", error: "failed login" });
});

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), async (req, res) => {

});

router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), async (req, res) => {
  req.session.user = req.user;
  res.redirect("/");
});


export default router;