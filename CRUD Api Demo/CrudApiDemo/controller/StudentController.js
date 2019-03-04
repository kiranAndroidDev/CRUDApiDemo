//import model
const student = require('../model/Student.js');

// function to create a student and save it in database
let create = function(req,res){
  //if(!req.body.name) {
    //   return res.status(400).send({
      //     message: "Empty Request body"
       //});
   //}
   console.log(req.body);
   //create student object
   const studentObj = new student({
     name: req.body.name,
     age: req.body.age,
     marks: req.body.marks
   });

//saving data in database
   studentObj.save(function(err,result){
     if(err){
       res.status(500).send({
         message: err.message || "Something went wrong..."
       });
     }
    else{
       res.status(200).send(result);
     }
   });
};
 // retrieve all student list
let getAll= function(req,res){

  student.find()
    .then(results => {
        res.send(results);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something went wrong..."
        });
    });
};

// find student with given id
let findOne = function(req,res){
   // Retrieve student
  student.findById(req.params.studentid,function(err,result){
    if(err){
      res.status(500).send({
        message: err.message || "Something went wrong..."
      });
    }
      else{
        res.status(200).send(result);
      }

  });
};

// update Student with specific id
let update = function(req,res){
  if(!req.body.content) {
       return res.status(400).send({
           message: "Student Id cannot be Empty"
       });
   }
   // Retrieve student and update it with the request body
   student.findByIdAndUpdate(req.param.studentid, {
       name: req.body.name ,
       age: req.body.age,
       marks: req.body.marks
   }, {new: true})
   .then(result => {
       if(!result) {
           return res.status(404).send({
               message: "Student not found with this id " + req.params.studentid
           });
       }
       res.send(result);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "Student not found with this id " + req.params.studentid
           });
       }
       return res.status(500).send({
           message: "Error updating Student with this id " + req.params.studentid
       });
   });
};

//delete data of student with particular id
let deleteStudent = function(req,res){
  student.findByIdAndRemove(req.param.studentid)
    .then(result => {
        if(!result) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentid
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentid
            });
        }
        return res.status(500).send({
            message: "Failed to delete Student with id " + req.params.studentid
        });
    });
};

module.exports={
  create,
getAll,
findOne,
update,
deleteStudent,
}
