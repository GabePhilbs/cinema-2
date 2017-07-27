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

				
			

					function refreshData(){	
		
						FilmServ.films().then(function(response){
							$scope.films = response.data;
							runCarousel(response.data);
							console.log($scope.films);

							
						});
		
						FilmServ.directors().then(function(response){
							$scope.directors = response.data;
							console.log($scope.directors);
						});

						}
			

				refreshData();
				

			


			$scope.decades = [1930,1940,1950,1960,1970,1980,1990,2000,2010]
				
			
			//FILM PAGE CONTENT
			$scope.changeFilm = function(clickedFilm){

				$scope.currentFilm = clickedFilm;
				console.log(clickedFilm)
				
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

				$http.post(serverUrl+"new-director", newDir).then(function(response, err){
					if(err){
						console.log(err);
					} 
					console.log(response);
					refreshData();
				});
				
				console.log(newDir);
				console.log('click');
				


				$scope.newDirName ='';
				$scope.newDirAbout = '';
				


			}

			$scope.newFilm = function(){

				var newFilm ={};

				newFilm.name = $scope.addFilmName ;
				newFilm.summary = $scope.addFilmSummary ;
				newFilm.cast = $scope.addFilmCast ;
				newFilm.decade = $scope.decadeSelect ;
				newFilm.director = $scope.directorSelect ;
				newFilm.img = $scope.addFilmImg ;

				
				console.log("next film to be posted")
				console.log(newFilm)

				$http.post(serverUrl+"new-film", newFilm).then(function(response, err){
					if(err){
						console.log(err);
						
					} 
					console.log(response);
					refreshData();
				});
				


				$scope.addFilmName ='';
				$scope.addFilmSummary = '';
				$scope.addFilmCast = '';
				$scope.decadeSelect = '';
				$scope.directorSelect = '';
				$scope.addFilmImg = '';




			}

			


			$scope.deleteFilm = function(){

			

				
				filmToDel = $scope.filmSelectDel
				
				console.log(filmToDel);

				var stuffToDelete ={filmDel: filmToDel};

				console.log(stuffToDelete);

				$http.post(serverUrl+"delete-film", stuffToDelete).then(function(response, err){
					if(err){
						console.log(err);
						
					} 
					console.log(response);
					console.log(here);
					refreshData();
				});
				

			}



			$scope.deleteDirector = function(){

						
				directorToDel = $scope.directorSelectDel


				var stuffToDelete ={directorDel: directorToDel};

				$http.post(serverUrl+"delete-director", stuffToDelete).then(function(response, err){
					if(err){
						console.log(err);
						
					} 
					console.log(response);
					console.log(here)
					refreshData();
				});
				

			}




			
			$scope.loadFilmEdit = function(){

				var newFilm = JSON.parse($scope.filmSelectEdit);
				console.log(newFilm);

				$scope.filmNameEdit = newFilm.name;
				$scope.FilmSummaryEdit = newFilm.summary ;
				$scope.filmCastEdit = newFilm.cast;
				$scope.decadeSelectEdit = newFilm.decade;
				$scope.directorSelectEdit = newFilm.director;
				$scope.FilmImgEdit = newFilm.img;



			}

			$scope.editFilm = function(){


				//Instead of creating this var as null, make sure it has the same values as the selected film
				var newFilm = JSON.parse($scope.filmSelectEdit);


				newFilm.name = $scope.filmNameEdit
				newFilm.summary = $scope.FilmSummaryEdit
				newFilm.cast = $scope.filmCastEdit
				newFilm.decade = $scope.decadeSelectEdit
				newFilm.director = $scope.directorSelectEdit
				newFilm.img = $scope.FilmImgEdit 


				$http.post(serverUrl+"edit-film", newFilm).then(function(response, err){
					if(err){
						console.log(err);
					} 
					console.log(response);
					refreshData();
				});
				
				console.log(newFilm);


				$scope.filmNameEdit ='';
				$scope.FilmSummaryEdit = '';
				$scope.filmCastEdit = '';
				$scope.decadeSelectEdit = '';
				$scope.directorSelectEdit = '';
				$scope.FilmImgEdit = '';




			}



			//form select

			$scope.goHome = function(){
				 $location.path('/');
			}




			$scope.mySelect = "Edit Film List"


			$scope.forms = ["Edit Film List","Add Director", "Add Film", "Delete", "Edit Film"];




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





			










