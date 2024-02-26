import express from "express";
import { verifyToken } from "../verifyToken.js";
import { deleteUser, getAllUsers, getUserById, update } from "../controllers/user.js";


const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//getAll users // desativar?
router.get("/", getAllUsers);

//get user by id // desativar?
router.get("/:id", getUserById);



export default router;

