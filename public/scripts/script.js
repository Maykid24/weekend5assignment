var myApp=angular.module( 'myApp', [] );

myApp.controller( 'whereTheAnimals', ['$scope', '$http', function ($scope, $http) {

  $scope.addPet = function () {
    event.preventDefault();

    var objectToSend = {
      name: $scope.nameIn,
      animal: $scope.animalIn,
      age: $scope.ageIn,
      image: $scope.imageIn
    };//End of objectToSend
    $http({
      method: 'POST',
      url: '/petPost',
      data: objectToSend
    });//end of http
    console.log(objectToSend);
    //Clears out input from the user
    $scope.nameIn = '';
    $scope.animalIn = '';
    $scope.ageIn = '';
    $scope.imageIn = '';
  };//end of add pet function

  $scope.getPets = function () {
    $http({
      method: 'GET',
      url: '/getPets',
    }).then( function( response ){
      // like an ajax success
      // we have been sent back "response"
      // .data is the data in the reponse
      $scope.allThePets = response.data;
      console.log( $scope.allThePets );
    });
  };//End of get pets function
}]);//End of my app controller whereTheAnimals
