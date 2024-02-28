const express = require("express");
const { addCourse, deleteCourse, getAllCourses, getCourseById, updateCourse } = require("../controllers/course.js");

const router = express.Router();

//get courses
router.get("/", getAllCourses);

//add course
router.post("/", addCourse);

//delete course
router.delete("/:id", deleteCourse);

//update course
router.put("/:id", updateCourse);

//get course by id
router.get("/:id", getCourseById);

module.exports = router;

