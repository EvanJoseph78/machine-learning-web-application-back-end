import express from "express";
import { verifyToken } from "../verifyToken.js";
import { courseFinished, deleteUser, getAllUsers, getSubscribedCourses, getUserById, subscribeCourse, unsubscribeCourse, update } from "../controllers/user.js";


const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//getAll users // desativar?
router.get("/", getAllUsers);

//get user by id // desativar?
router.get("/:id", getUserById);

//inscrever-se em um curso
router.put("/sub/course/:courseId", verifyToken, subscribeCourse);

//desinscrever-se em um curso
router.put("/unsub/course/:courseId", verifyToken, unsubscribeCourse);

//curso finalizado
router.put("/course/:courseId/finished", verifyToken, courseFinished);

//get subscribed courses
router.get("/sub/courses/", verifyToken, getSubscribedCourses);

//TODO - fazer rota para obter certificado!



export default router;

