const router = require('express').Router()

const contactsController = require("../controllers/contacts")

router.get("/", contactsController.getAll)
router.post("/", contactsController.createContact)

router.get("/:id", contactsController.getSingle)
router.put("/:id", contactsController.updateContact)
router.delete("/:id", contactsController.deleteContact)

module.exports = router