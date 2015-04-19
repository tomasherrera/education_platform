(function() {
  var app = angular.module('eduapp', ["ngResource", 'ngRoute', 'ng-rails-csrf', 'templates']);

  app.config(function($routeProvider) {
    $routeProvider
        .when('/profile', {
            templateUrl: '/profile.html'
        })
        .when('/', {
            templateUrl: '/index.html'
        })
        ;
  });

  app.controller("SchoolController", function($scope, $resource, $routeParams, $location) {
    var IndexCourses;
    var AllStudents
    $scope.courses = [];
    $scope.order = "title";
    $scope.selected = {};
    $scope.editing = false;
    $scope.old_title = "";
    $scope.dashboard_style = "";
    $scope.profile_style = "";
    $scope.addStudent = false;
    $scope.all_students = ["'first_name':'Tomas', 'last_name':'Herrera', 'email':'tomasherrera@example.com'"];
    $scope.query = "";
    IndexCourses = $resource("/index.json", {}, {});
    AllStudents = $resource("/all_students.json", {}, {});

    $scope.getAllStudents = function(){
      AllStudents.get().$promise.then(
        function( value ){
          $scope.all_students = value.students;
        },
        function( error ){/*Do something with error*/}
      );
    };

    $scope.getCourses = function(){
      IndexCourses.get().$promise.then(
      //success
      function( value ){
        $scope.courses = value.courses;
        $scope.assisted_courses = value.assisted_courses;
      },
      function( error ){/*Do something with error*/}
    )};
    $scope.getCourses();

    var Course = $resource('/courses/:id', {id: "@id"} , {"update": {method: "PUT"}});

    $scope.update = function(course, index){
      Course.update({ id:course.id }, course).$promise.then(
        //success
        function( value ){
          $scope.courses[index].title = value.title;
          $scope.setEditing(false);
        },
        //error
        function( error ){/*Do something with error*/}
      );

    };

    $scope.delete = function(course, idx){
      var r = confirm("Are you sure?");
      if (r == true){
        Course.remove({ id:course.id }).$promise.then(
          //success
          function( value ){
            $scope.courses.splice(idx, 1);
          },
          //error
          function( error ){/*Do something with error*/}
        );
      }
    };

    $scope.activeWindow = function(){
      if ($location.path() === "/"){
        $scope.dashboard_style = "active";
        $scope.profile_style = "";
      }else if ($location.path() === "/profile"){
        $scope.profile_style = "active";
        $scope.dashboard_style = "";
      };
    }

    $scope.changeView = function(view){
      $location.path(view);
    };

    $scope.setOldTitle = function(old_title){
      $scope.old_title = old_title;
    };

    $scope.cancelEditing = function(course){
      course.title = $scope.old_title;
    };

    $scope.setEditing = function(value){
      $scope.editing = value;
    };

    $scope.getEditing = function(){
      return $scope.editing;
    };

    $scope.getSelected = function(course){
      return course === $scope.selected;
    };

    $scope.setSelected = function(course){
      $scope.selected = course;
    };

    $scope.setOrder = function(new_order){
      $scope.order = new_order;
    };

    $scope.select = function(course){
      $scope.selected = course;
    };

    $scope.addAlert = function(){
      console.log($scope.courses[0].students_number === 0);
    };

    $scope.canEdit = function(course){
      return course.students_number === 0;
    };
    $scope.activeWindow();
  });

})();
