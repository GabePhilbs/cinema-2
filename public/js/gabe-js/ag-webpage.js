


// DECIDING WHAT SHOWS ON PAGE LOAD - REPLACE WITH ANGULAR 

function loadBody(){
	$('#formSpotMessage').html("");
	if(film == 1){
		// $('#bodySpot').html(callHome());
		//console.log(callHome())
		$('#homeSpot').show();
		$('#filmSpot').hide();

		//hide forms
		$('#deleteCont').hide();
		$('#addFilmCont').hide();
		$('#newDirectorCont').hide();

	}else {
		// $('#bodySpot').html(callFilm());
		// //console.log(callFilm())
		$('#filmSpot').show();
		$('#homeSpot').hide();
	}

}




loadBody();

$('#homeButton').click(function(){
	film = 1;
	loadBody();

})



//STARTING ACCORDION

$( function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  } );
//'About ' + film.director.name

function insertContent(){
	// console.log(film.director);
	// $('#formSpotMessage').html("");
	// $('#summary').html(film.summary);
	// console.log($('#directorName'));
	// $('#directorName').html("About " + film.director.name);
		// console.log(film);
		// console.log(film.director);
		// console.log(film.director.name);
		// console.log(film.director.about);

	// $('#aboutDirector').html(film.director.about);
	// $('#cast').html(film.cast);
	// $('#filmBannerTitle').html(film.name);
	// $('#filmBanner').css(
	// 	{
	// 		"background-image": 
	// 		"url('"+film.img+"')"
	// 	}
	// 	);
	// console.log(film.name);
	// console.log(film.img);
	




}

if(film ==1){

} 

else {
	insertContent();
};



// POPULATING SELECTS

//getting from botton of the page

// a function that feeds a list of directors in the select forms
function loadDirectorsSelect(){
			var dirList ='';
			// console.log(dirList);
			for(var i = 0; i < directors.length; i++){
				dirList += "<option value=" +"'"+ directors[i].name + "'"+ ">" + directors[i].name + "</option>";

			}
			dirList +='<option value="" disabled selected>Director</option>'
			$('.directorSelectList').html(dirList);
			// console.log(dirList);
		};

function loadfilmSelect(){
			var filmList ='';
			// console.log(dirList);
			for(var i = 0; i < films.length; i++){
				filmList += "<option value=" +"'"+ films[i].name + "'"+ ">" + films[i].name + "</option>";

			}
			filmList +='<option value="" disabled selected>Film</option>'
			$('.filmSelectList').html(filmList);
			// console.log(filmList);
		};



function loadFilmForm(){

	
	$('#formSpot').append($('#newFilmCont'));
	$("#newFilmCont").css("display", "none");

}





$.get(serverUrl+"directors",
		function(data)
		{ 
		 	 directors = data;
		// console.log(directors);
		

		loadDirectorsSelect();
}
);

function loadDeleteLists(){
	$.get(serverUrl+"directors",
			function(data)
			{ 
			 	directors = data;
			// console.log(directors);
			

			loadDirectorsSelect();
	}
	);

	$.get(serverUrl+"films",
			function(data)
			{ 
			 	 var films = data;
				// console.log(films);
			

			loadfilmSelect();
	}
	);

};

loadDeleteLists();

// function getNewFilm(){

// 	var filmFromForm ={
// 	name: $('filmName') ,
// 	summary: $('summaryField'),
// 	cast: $(''),
// 	director: directors[$('')],
// 	img: $(''),
// 	decade:$('')
// 	} 

// 	console.log(filmFromForm);
// };




$('#addFilmButton').click(function(){
	// var bla = $('#filmName').val();
	console.log("button clicked");
	$('#formSpotMessage').html("");
	
		var filmFromForm ={
			name: $('#filmName').val() ,
			summary: $('#summaryField').val() ,
			cast: $('#castField').val(),
			director: $('#directorSelect').val() ,
			img: $('#imgLink').val() ,
			decade: $('#decadeSelect').val() 
			} 

		// console.log($('#decadeSelect').val());
		// console.log(filmFromForm);

			$('#filmName').val('');
			$('#summaryField').val('');
			$('#castField').val('');
			$('#directorSelect').val('');
			$('#imgLink').val('');
			$('#decadeSelect').val(''); 

			console.log(filmFromForm);


			//.POST  FILM	HERE

	$.post(serverUrl+"new-film", filmFromForm, function(data){
	 		 	

	 		 	
	 		 	console.log(data);
	 		 	refreshTimeline();
	 		 	insertContent();
	 		 });
		
	//MESSAGE FORM	
	$('#formSpotMessage').html("FORM SENT");

	loadDeleteLists();

	}
);

$('#addDirectorButton').click(function(){
	// var bla = $('#filmName').val();
	console.log("button clicked");
	$('#formSpotMessage').html("");
	
		var directorFromForm ={
			name: $('#directorName').val() ,
			about: $('#about').val() ,
			} 

			$('#directorName').val('') ,
			$('#about').val('') ,
		console.log(directorFromForm);



	//.POST  DIRECTOR 	HERE


	$.post(serverUrl+"new-director", directorFromForm, function(data){
	 		 	

	 		 	console.log(data);
	 		 	refreshTimeline();
	 		 	insertContent();
	 		 });



	//MESSAGE FORM	
	$('#formSpotMessage').html("FORM SENT");

	loadDeleteLists();

	}
);


$('#deleteButton').click(function(){
	// var bla = $('#filmName').val();
	
	$('#formSpotMessage').html("");
	var filmToDel= $('#filmSelect').val()
	var directorToDel= $('#directorsDelete').val()  
		
	
	
			//.POST  FILM	HERE
	var stuffToDelete ={filmDel: filmToDel, directorDel: directorToDel};

	console.log("object created");
	$.post(serverUrl+"delete", stuffToDelete, function(data){
	 		 	
	 		 	refreshTimeline();
	 		 	insertContent();

	 		 });
		
	//MESSAGE FORM	
	$('#formSpotMessage').html("FORM SENT");
	// $('#filmSelect').val()
	// $('#directorsDelete').val() 


	//clear selectors - NOT WORKING
	$('#directorsDelete').change(function(){
   		$('#directorsDelete').not(this).prop('selectedIndex',0);            
	});

	$('#filmSelect').change(function(){
   		$('#filmSelect').not(this).prop('selectedIndex',0);            
	});


	loadDeleteLists();

	}
);





		
	//DROPDOWN THAT SELECTS FORMS


$('#addDirectorDrop').click(function(){
	$('#formSpotMessage').html("");
	$('#newDirectorCont').show();
	$('#deleteCont').hide();
	$('#addFilmCont').hide();

		
	});



$('#addFilmDrop').click(function(){
	$('#formSpotMessage').html("");
	$('#addFilmCont').show();
	$('#newDirectorCont').hide();
	$('#deleteCont').hide();


		
	});


$('#deleteDrop').click(function(){
	$('#formSpotMessage').html("");
	$('#deleteCont').show();
	$('#addFilmCont').hide();
	$('#newDirectorCont').hide();
	



		
	});



// runSmoothScroll();

//IMPORTANT ACCORDION SETTINGS

$("#accordion").accordion({ 

heightStyle: "content" 

});


