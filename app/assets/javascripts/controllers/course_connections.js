
angular.module('eduapp').controller("CourseConnectionsCtrl",function($scope, $resource, Course) {
  $scope.students_course = Course;
  Students = $resource("/courses/:course_id/students.json", {course_id: "@id"}, {});
  var CourseConn = $resource("/course_connections.json", {course_id: "@course_id", student_id: "@student_id"}, {});
  $scope.loaded = false;
  $scope.loading = false;
  $scope.ConnCourse = Course;


  $scope.getStudents = function(course){
    if (course.students_number > 0 && !$scope.loaded){
      $scope.loading = true;
      Students.get({course_id:course.id}).$promise.then(
        //success
        function( value ){
          $scope.students = value.students;
          $scope.loaded = true;
          course.students_number = value.students.length;
          $scope.loading = false;
        },
        function( error ){/*Do something with error*/}
      );
    };
    $scope.getAllStudents();
  };

  $scope.addStudent = function(student, course, idx){
    var course_conn = new CourseConn();
    course_conn.student_id = student.id
    course_conn.course_id = course.id;
    course_conn.$save().then(function(res)  {
      $scope.students.push(res.student);
      $scope.ConnCourse.AllStudentss.splice(idx, 1);
    });
  };

  $scope.deleteStudent = function(student, course, idx){
    var r = confirm("Are you sure you want to delete " + student.first_name + " from " + course.title);
    if (r == true){
      CourseConn.remove({ course_id:course.id, student_id:student.id}).$promise.then(
        //success
        function( value ){
          $scope.students.splice(idx, 1);
          $scope.ConnCourse.AllStudentss.splice(0, 0, value.student);
          course.students_number -= 1;
        },
        //error
        function( error ){/*Do something with error*/}
      );
    }
  };

});
