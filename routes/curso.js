const router = require("express").Router();

const cursoController = require("../controllers/cursoController");

//get courses
router.get("/", cursoController.getAllCourses);

//add course
router.post("/", cursoController.addCourse);

//delete course
router.delete("/:courseId", cursoController.deleteCourse);

//update course
router.put("/:courseId", cursoController.updateCourse);

//get course by id
router.get("/:courseId", cursoController.getCourseById);



module.exports = router;
