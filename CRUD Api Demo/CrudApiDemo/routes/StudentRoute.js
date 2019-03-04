module.exports = (app) => {

    const students = require('../controller/StudentController.js');

    // Create a new Student
    app.post('/createStudent', students.create);

    // get list of  all Students
    app.get('/getAllStudents', students.getAll);

    // get student with a specific id
    app.get('/getStudent/:studentid', students.findOne);

    // Update a Student with given id
    app.put('/updateStudent/:studentid', students.update);

    // Delete a Student with specific id
    app.delete('/deleteStudent/:studentid', students.deleteStudent);
}
