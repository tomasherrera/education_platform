(function() {
  var app = angular.module('eduapp', ["ngResource", 'ngRoute', 'ng-rails-csrf']);

  app.controller("SchoolController", function($scope, $resource, $routeParams) {
    var IndexCourses;
    $scope.courses = [];
    $scope.order = "title";
    IndexCourses = $resource("/index.json", {}, {});

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
    $scope.update = function(course){
      Course.update({ id:course.id }, course).$promise.then(
        //success
        function( value ){
          $scope.getCourses();
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
