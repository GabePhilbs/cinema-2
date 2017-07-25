angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $location, FilmServ,$rootScope, $interval) {
				$scope.selectedForm = 1;
				$scope.formDisplayFilm =true;
				$scope.formDisplayDir =true;
				$scope.formDisplayDel =true;

				$scope.lumpsy = 2;
				$scope.formDisplay = false;


	// TIMELINE

				// $http.get("https://cine-server-dev.herokuapp.com/films").then(function(response){
					
				// 	$scope.films = response.data;
				// 	// the .data part is to get just the body with no headers
				// })



				// $http.get("https://cine-server-dev.herokuapp.com/directors").then(function(response){
					
				// 	$scope.directors = response.data;
				// 	// the .data part is to get just the body with no headers
					
				// })

				
				var directors =  FilmServ.directors();

				

				FilmServ.films().then(function(response){
					$scope.films = response.data;
					runCarousel(response.data);
					
				});

				FilmServ.directors().then(function(response){
					$scope.directors = response.data;
					
				});
				
				

				
				

			


			$scope.decades = [1930,1940,1950,1960,1970,1980,1990,2000,2010]
				
			
			//FILM PAGE CONTENT
			$scope.changeFilm = function(clickedFilm){

				$scope.currentFilm = clickedFilm;
				
				for(var i =0; i < $scope.directors.length; i++){
					
					
					if($scope.directors[i].name == $scope.currentFilm.director ){
						
						$scope.currentFilm.director = $scope.directors[i];
						
					}
				}

				
				
				 $location.path('/film');
			}

						//FORM STUFF

			$scope.newDir = function(){

				var newDir ={};

				newDir.name = $scope.newDirName
				newDir.about = $scope.newDirAbout

				$http.post(serverUrl+"new-director", newDir)
				


			}


			$scope.newDir = function(){

				var newDir ={};

				newDir.name = $scope.newDirName
				newDir.about = $scope.newDirAbout

				$http.post(serverUrl+"new-director", newDir)
				


				$scope.newDirName ='';
				$scope.newDirAbout = '';


			}

			$scope.newFilm = function(){

				var newFilm ={};

				newFilm.name = $scope.addFilmName
				newFilm.summary = $scope.addFilmSummary
				newFilm.cast = $scope.addFilmCast
				newFilm.decade = $scope.decadeSelect
				newFilm.director = $scope.directorSelect



				$http.post(serverUrl+"new-film", newFilm)
				


				$scope.addFilmName ='';
				$scope.addFilmSummary = '';
				$scope.addFilmCast = '';
				$scope.decadeSelect = '';
				$scope.directorSelect = '';




			}

			$scope.deleteStuff = function(){

			

				
				filmToDel = $scope.filmSelectDel
				directorToDel = $scope.directorSelectDel


				var stuffToDelete ={filmDel: filmToDel, directorDel: directorToDel};

				$http.post(serverUrl+"delete", stuffToDelete)
				

				


			}




			//form select

			$scope.goHome = function(){
				 $location.path('/');
			}




			$scope.mySelect = "Edit Film List"


			$scope.forms = ["Edit Film List","Add Director", "Add Film", "Delete"];




			//acordion
			$scope.acordionSelect = function(someNum){
				 $scope.accordionIndex = someNum;
				 
			}


			var homeIndex =0;

			//carousel -- must run inside the function that calls films
			function runCarousel(films){

				var filmList = films;
				setHomeFilm();
				
				$interval( function() { setHomeFilm() } , 4000);

				function setHomeFilm(){
					if(homeIndex < (films.length-1)){
						
						$scope.homeFilm = films[homeIndex];
						homeIndex= homeIndex +1 ;
						
					} else {homeIndex = 0}

						

						// console.log(homeFilm);

				}
				

				
			}

			


			})





			










