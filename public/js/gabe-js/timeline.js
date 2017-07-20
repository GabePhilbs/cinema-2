// console.log('Geronimo!!! (calltimeline has been called)');



function calltimeline(){    
	
	//test if this function is getting called
	//console.log('Geronimo!!! (calltimeline has been called)');
	//test if films is being loaded
	//console.log(films);

	var timeline = '<!-- beginning of the navbar block -->'

	

	timeline +='<!-- beginning of timeline -->'
		timeline +='<div id="timeline" class="timeline-container">'

			for(var i =1930; i <= 2010; i+=10){
				var n = i.toString();
		       timeline +=' <div class="timeline-wrapper">'
		       timeline +="<h2 class='timeline-time '>"+ i +"'s</h2>"

		             timeline +='<dl class="timeline-series '+ n +'">'
	          			
		                timeline +='</dl>'
		        timeline +='</div>'

		        $('dl.' + n).html('');
		    }

 return timeline;}

 $('div.timelineSpot').html(calltimeline());

// function for the timeline links
 
 	//just creating a variable for this function to work with
 	

 	//replace this with .get when the array becomes html

function populateTimeline(){

$.get(serverUrl+"films", function(data){
	films = data;
	// console.log(films);
	for(var i =0; i< 9; i++){
		//get a decade from the loop
		var dec = 1930+ (i*10);
		//turn it to string
		var n = dec.toString();
		//crete content to input
		var insert =''
		// console.log(dec);
		// console.log(films);
		// console.log(n);
		for(var t =0; t<films.length; t++){
			// console.log(" second for runs");

		

			// console.log(" second for runs");
			// console.log(films[t]);
			// console.log(films[t] == n);
			if(n == films[t].decade){

				// console.log(' approved' );
				// console.log(films[t]);

				insert =''
				insert +='<dt class="timeline-event" id="event03"><a href="#pageTop" class="smoothScroll timelineLink">' + films[t].name + '</a></dt>'
			        insert +='<dd class="timeline-event-content" id="event01EX">'
			               insert +=' <p>Content about the event goes here.</p>'
			       insert +=' </dd>'

			       // console.log(n);
			       // console.log(insert);
			       // console.log(films[i].name);
			       //append to right decade
			       $('.'+ dec).append(insert);
			}

		}
       }
       //href="#pageTop"
       //smoothScroll 

       //START OF TIMELINE CLICK

       // I moved the click function here, so it loads after ajax
       // otherwise the anchor would not load
       $('.timelineLink').click(function(){
			// console.log('helllo');
		    filmTitle =($(this).text());

		      // OLD WAY, SORT FILM FROM ARRAY
		    //grep gives an array, so I need to obtain the first element of it

		    var tempArray = $.grep( films, function(rightFilm) {
  				// testing if the array films loads here
  				//console.log(films);
  				return rightFilm.name == filmTitle;

			});
		    // switch content to selected film
		    film = tempArray[0];


	// 	    // NEW WAY, GET RIGHT FILM FROM SERVER

	// 	    $.get("https://cine-server-dev.herokuapp.com/this-film",
	// 		function(data)
	// 		{ 
	// 		 	 var film = data;
				
			
	// }
	// );
		    
		    

		    //loads the html used in films
		    loadBody();

		    //inserts the specific content of this film
	 		


	 		// console.log(film);
	 		
	 		//WHY THE HELL IS THIS POST NOT WORKING?!!!?!?!
	 		 $.post(serverUrl+"this-director", film, function(data){
	 		 	

	 		 	// console.log(data);
	 		 	// console.log(data[0]);

	 		 	film.director = data[0];
	 		 	// console.log(film.director);
	 		 	// console.log(film.director.name);

	 		 	insertContent();
	 		 });
	    

		    //runs the accordion
		    $( function() {
			    $( "#accordion" ).accordion({
			      collapsible: true
			    });
			  } );

		   

		  });


       //END OF TIMELINE CLICK

       //smooth scroll was not running so I called it from here
       runSmoothScroll();

       //load directors into films

      //  var filmLoadDir ={};

      //  for(var k = 0; k < films. length; k++){

      //  		filmLoadDir = films[k]

	     //   	$.post(serverUrl+"this-director", filmLoadDir, function(data){
		 		 	

		 		 // 	// console.log(data);
		 		 // 	// console.log(data[0]);

		 		 // 	filmLoadDir.director = data[0];
		 		 // 	// console.log(film.director);
		 		 // 	// console.log(film.director.name);

		 		 	
		 		 // });


      //  }

});
			
};

populateTimeline();

function refreshTimeline(){
	calltimeline();
	populateTimeline();

};



