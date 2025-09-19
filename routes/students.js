const router = require('express').Router()

const studentsController = require("../controllers/students")

const Joi = require('joi');
const { celebrate, Joi: JoiCelebrate, errors } = require('celebrate');

const ciRegex = /^[0-9]+$/;

const studentSchema = Joi.object({
    givenname: Joi.string().min(3).max(20).required(),
    surname: Joi.string().min(3).max(20).required(),
    birthday: Joi.date().iso().required(),
    ci: Joi.string().pattern(ciRegex).min(8).max(8).required(),
    email: Joi.string().email().required(),
    favoriteColor: Joi.string().min(1).max(20).required(),
    phonenumber: Joi.string().pattern(ciRegex).max(15).required()
});

router.get("/", studentsController.getAll)
router.post("/", celebrate({ body: studentSchema }), studentsController.createStudent)

router.get("/:id", studentsController.getSingle)
router.put("/:id", celebrate({ body: studentSchema }), studentsController.updateStudent)
router.delete("/:id", studentsController.deleteStudent)

router.use(errors());

module.exports = router