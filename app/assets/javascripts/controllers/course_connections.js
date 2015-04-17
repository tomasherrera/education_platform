angular.module('eduapp').controller("CourseConnectionsCtrl",function($scope, $resource) {
  Students = $resource("/courses/:course_id/students.json", {course_id: "@id"}, {});
  $scope.loaded = false;
  $scope.loading = false;

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
      )};
    }
});
