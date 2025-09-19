const mongodb = require("../data/database")
const ObjectId = require("mongodb").ObjectId

const getAll = async (req, res) => {
    // #swagger.tags = ['Courses']
    try {
        const result = await mongodb.getDatabase().db("week03").collection("courses").find();
        const courses = await result.toArray(); // Se usa await para que la promesa se resuelva

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses);
    } catch (err) {
        // Mejor manejo de errores
        res.status(500).json({ message: err.message || "Something went wrong" });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Courses']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid course id to find a course.');
            return;
        }
        const courseId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db('week03')
            .collection('courses')
            .find({ _id: courseId });
        
        const courses = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(courses[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Something went wrong' });
    }
};

const createCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const course = {
        coursename: req.body.coursename,
        coursecode: req.body.coursecode
    }

    const response = await mongodb.getDatabase().db("week03").collection("courses").insertOne(course)

    if (response.acknowledged) {
        res.status(201).json({id: response.insertedId})
    } else {
        res.status(500).json(response.error || "Some error ocurred while inserting a student")
    }
}

const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const courseId = new ObjectId(req.params.id)

    const course = {
        coursename: req.body.coursename,
        coursecode: req.body.coursecode
    }

    const response = await mongodb.getDatabase().db("week03").collection("courses").replaceOne({_id: courseId}, course)
    
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error ocurred while updating the student")
    }
}

const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const courseId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db("week03").collection("courses").deleteOne({_id: courseId})

    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || "Some error ocurred while deleting the student")
    }
} 

module.exports = {
    getAll, getSingle, createCourse, updateCourse, deleteCourse
}