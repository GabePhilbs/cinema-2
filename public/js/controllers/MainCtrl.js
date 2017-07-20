angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {

	// TIMELINE

				$http.get("https://cine-server-dev.herokuapp.com/films").then(function(response){
					
					$scope.films = response.data;
					// the .data part is to get just the body with no headers
				})



				$http.get("https://cine-server-dev.herokuapp.com/directors").then(function(response){
					
					$scope.directors = response.data;
					// the .data part is to get just the body with no headers
					
				})

			


			$scope.decades = [1930,1940,1950,1960,1970,1980,1990,2000,2010]
				
			
			//FILM PAGE CONTENT
			$scope.changeFilm =function(clickedFilm){

				$scope.currentFilm = clickedFilm;
				for(var i =0; i < directors.length; i++){
					
					if(directors[i].name == $scope.currentFilm.director ){
						
						$scope.currentFilm.director = directors[i];
					}
				}
				console.log($scope.currentFilm);
			}

						//FORM STUFF

			$scope.newDir = function(){

				var newDir ={};

				newDir.name = $scope.newDirName
				newDir.about = $scope.newDirAbout

				$http.post(serverUrl+"new-director", newDir)
				console.log(newDir)


			}




			})







