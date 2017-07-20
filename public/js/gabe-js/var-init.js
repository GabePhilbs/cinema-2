

// switch between live server and local -- change url of DB
// var serverUrl ="localhost:5000/"
var serverUrl = "https://cine-server-dev.herokuapp.com/"


//<!--  getting arrays -->
	var directors =[]

	 function loadDirectors(){
		
	 	function setDirectors(data){
	 		// console.log(data);
	 		directors = data;
	 		// console.log(directors);
	 	}


		 $.get(serverUrl+"directors",
		function(data)
		{ 
		 
		 // console.log(data);

		 setDirectors(data);
		 return data;
		}
		);

		// console.log(data);
		// return data;
	  };

	  // var directors = loadDirectors();
	  loadDirectors();
	 // console.log(directors);


	 var films =[];
	 function loadFilms(){
	 	$.get(serverUrl+"films", function(data){  
	 		films = data; 
	 		//console.log(films);	 		
	 		return data;
	 	});
			 // console.log(films);
			 // console.log('following up, films as loaded in var-init')
			 // console.log(films);
	}
	  
	  loadFilms();

