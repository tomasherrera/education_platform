(function() {
  var app = angular.module('eduapp', ["ngResource", 'ngRoute', 'ng-rails-csrf']);

  app.controller("SchoolController", function($scope, $resource, $routeParams) {
    var IndexCourses;
    $scope.courses = [];
    $scope.order = "title";
    IndexCourses = $resource("/index.json", {}, {});
    $scope.index_courses = IndexCourses.get().$promise.then(
      //success
      function( value ){
        $scope.courses = value.courses;
        $scope.assisted_courses = value.assisted_courses;
      },
      //error
      function( error ){/*Do something with error*/}
    );

    $scope.refresh = function(){
      $scope.index_courses = IndexCourses.get().$promise.then(
        //success
        function( value ){
          $scope.courses = value.courses;
          $scope.assisted_courses = value.assisted_courses;
        },
        //error
        function( error ){/*Do something with error*/}
      );
    };
    var Course = $resource('/courses/:id', {id: "@id"} , {"update": {method: "PUT"}});
    $scope.update = function(course){
      var course1 = Course.get({id: course.id});
      var title = prompt("Enter new Course title:", course.title);
      course1.title = title;
      Course.update({ id:course.id }, course1).$promise.then(
        //success
        function( value ){
          $scope.refresh();
        },
        //error
        function( error ){/*Do something with error*/}
      );

    };

    $scope.addAlert = function(){
      //console.log($scope.courses);
    };

  });

})();
