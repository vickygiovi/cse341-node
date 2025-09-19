const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    const result = await mongodb.getDatabase().db('week03').collection('students').find();
    const students = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Something went wrong' });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags = ['Students']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid student id to find a student.');
      return;
    }
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db('week03')
      .collection('students')
      .find({ _id: studentId });

    const students = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(students[0]);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Something went wrong' });
  }
};

const createStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const student = {
        givenname: req.body.givenname,
        surname: req.body.surname,
        birthday: req.body.birthday,
        ci: req.body.ci,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        phonenumber: req.body.phonenumber
    }

    const response = await mongodb.getDatabase().db("week03").collection("students").insertOne(student)

    if (response.acknowledged) {
        res.status(201).json({id: response.insertedId})
    } else {
        res.status(500).json(response.error || "Some error ocurred while inserting a student")
    }
}

const updateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const studentId = new ObjectId(req.params.id)

    const student = {
        givenname: req.body.givenname,
        surname: req.body.surname,
        birthday: req.body.birthday,
        ci: req.body.ci,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        phonenumber: req.body.phonenumber
    }

    const response = await mongodb.getDatabase().db("week03").collection("students").replaceOne({_id: studentId}, student)
    
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the student")
    }
}

const deleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    const studentId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db("week03").collection("students").deleteOne({_id: studentId})

    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting the student")
    }
} 

module.exports = {
    getAll, getSingle, createStudent, updateStudent, deleteStudent
}