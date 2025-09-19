const router = require('express').Router()

const coursesController = require("../controllers/courses")

const Joi = require('joi');
const { celebrate, Joi: JoiCelebrate, errors } = require('celebrate');

const courseSchema = Joi.object({
    coursename: Joi.string().min(3).max(40).required(),
    coursecode: Joi.string().min(1).max(20).required()
});

router.get("/", coursesController.getAll)
router.post("/", celebrate({ body: courseSchema }), coursesController.createCourse)

router.get("/:id", coursesController.getSingle)
router.put("/:id", celebrate({ body: courseSchema }), coursesController.updateCourse)
router.delete("/:id", coursesController.deleteCourse)

router.use(errors());

module.exports = router