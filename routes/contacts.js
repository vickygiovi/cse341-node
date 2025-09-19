const router = require('express').Router()

const contactsController = require("../controllers/contacts")

const Joi = require('joi');
const { celebrate, Joi: JoiCelebrate, errors } = require('celebrate');

const contactSchema = Joi.object({
    firstName: Joi.string().min(3).max(20).required(),
    lastName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    favoriteColor: Joi.string().min(3).max(20).required(),
    birthday: Joi.date().iso().required()
});

router.get("/", contactsController.getAll)
router.post("/", celebrate({ body: contactSchema }), contactsController.createContact)

router.get("/:id", contactsController.getSingle)
router.put("/:id", celebrate({ body: contactSchema }), contactsController.updateContact)
router.delete("/:id", contactsController.deleteContact)

router.use(errors());

module.exports = router