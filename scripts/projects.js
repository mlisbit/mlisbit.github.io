var project_json_location 	= '/json/projects_data.json';
var settings_json_location 	= 'settings.json';
var projects_container 		= 'ul.mixitup-container';
var debug 					= true;
var modal_id 				= '#myModal';
var project_link			= 'ul.mixitup-container li';
var change_layout			= '.mixitup-layout'
var projects 				= [];
var thumb_location 			= '/imgs/thumbs/';
var gallery_location 		= '/imgs/thumbs/';


var getGithubInfo = function(username, project) {
	var githubAPI = 'https://api.github.com/repos/mlisbit/cshub_site';
	$.getJSON( githubAPI, {
		format: "json"
	  })
		.done(function( data ) {
			console.log({'forks': data.forks_count, 'stars': data.stargazers_count})
		  //return {'forks': data.forks_count, 'stars': data.stargazers_count}
		});
}

var createTitle = function(data) {
	$('#myModal h3.project-heading').empty();
	$('#myModal h3.project-heading').append(data.title);	
}

var createGallery = function(data) {
	$('#myModal .gallery').empty();
	$('#myModal .gallery').append('<div class="orbit" data-orbit></div>')
	var dataoptions = "variable_height: true; bullets: false; slide_number: false; navigation_arrows: true"
	if (data['images'].length <= 1) {
		dataoptions = "variable_height: true; bullets: false; slide_number: false; navigation_arrows: false"
	}
	
	$('#myModal .gallery .orbit').attr('data-options', function() {
		return dataoptions
	})
	
	for (var i = 0 ; i < data['images'].length ; i++) {
		var current = data['images'][i];
		var thumb = $('<li>');
		thumb.append('<img src="'+ gallery_location + current.path +'">')
		if (current.caption) {
			thumb.append('<div class="orbit-caption">'+current.caption+'</div>')
		}
		thumb.appendTo('#myModal .gallery .orbit')
	}
}

var createProjectInfoField = function(data) {
	$('#myModal .info').empty();
	for (var i = 0 ; i < data['info'].length ; i++) {
		var current = data['info'][i];
		var container = $('<div>', {'class': 'row'});
		var left = $('<div>', {'class': 'small-3 columns project-sub-header', 'html': current.label});
		var right = $('<div>', {'class': 'small-9 columns end'});
		container.appendTo('#myModal .info');
		container.append(left)
		container.append(right)
		if (current.text) {
			right.append(current.text)
			
		}
		if (current.list) {
			var list = $('<ul>');
			right.append(list)
			for (var k = 0 ; k < current.list.length ; k++) {
				var bullet = $('<li>', {'html': current.list[k]});
				list.append(bullet);
			}
		}
	}
	
}

//generate the project links on modal open.
var createProjectLinkField = function(data) {
	$('#myModal .project-links .right').empty();
	for (var i = 0 ; i < data['links'].length ; i++) {
		var current = data['links'][i];
		if (current.icon) {
			$('#myModal .project-links .right').append('<a href="'+current['link']+'" class="btn btn--s btn--gray-border"><i class="fa '+current.icon+' fa-lg"></i>'+current['label']+'</a>')
		} else {
			$('#myModal .project-links .right').append('<a href="'+current['link']+'" class="btn btn--s btn--gray-border">'+current['label']+'</a>')
		}
	}
}

//generates the thumbnail for project mixin object.
var mixinOject = function(key, data) {
	var title = data['title']
	,	thumb =	data['thumb']
	, 	mini_description = data['mini_description']
	,	catagories = data['catagories'].join(" ");

	return $('<li tabindex="0" class="small-12 medium-6 large-4 columns end mix '+catagories+'" data-projectid="'+key+'"><figure><div><img src="' +thumb_location+thumb+ '" alt=""></div><figcaption><center><h3>'+title+'</h3></center><center><span>'+mini_description+'</span></center></figcaption></figure></li>')
}

var generateModal = function(key, data) {
	var data = findData(key)
	var title = data['title']
	,	thumb =	data['thumb']
	, 	mini_description = data['mini_description'];
	
	createProjectLinkField(data);
	createProjectInfoField(data);
	createGallery(data);
	createTitle(data);
	getGithubInfo();
	//var title_string = '<h2>'+title+'</h2>'
	//$(modal_id).append(title_string);
	$(modal_id).foundation('reveal', 'open');
	$(document).foundation('reflow'); 
	//<a class="close-reveal-modal">&#215;</a>
}

//returns the data associated with the peoject.json index
var findData = function(key) {
	return projects.responseJSON[key];	
}


$(document).ready(function() {
	projects = $.getJSON(project_json_location, function() {
	  //console.log( "success" );
	})
	.fail(function() {
		console.log( "error with projects json" );
	  })
	
	$(document).on("click keypress", project_link, function(e) {
		if (e.which === 13 || e.type === 'click') {
			generateModal($(this).attr('data-projectid'));
		}
	})
	projects.complete(function() {
		var layout = 'list'
		//$('change_layout')
		$.each(projects.responseJSON, function(key, val) {
			$(projects_container).append(mixinOject(key, val));
			//console.log(key, val);
		});
		$('.mixitup-container').mixItUp({
			animation: {
				animateChangeLayout: true,
				effects: 'fade rotateX(-40deg) translateZ(-100px)'
			},
			layout: {
				containerClass: 'list'
			}
		});
		
		$(change_layout).on('click keypress', function(e){
			if (e.which === 13 || e.type === 'click') {
				if(layout == 'list'){
				  layout = 'grid cs-style-2';
				  $('figcaption').hide()
				  $(change_layout).html('<i class=" fa fa-bars"></i>');
				  $(projects_container).mixItUp('changeLayout', {
					containerClass: layout // change the container class to "grid"
				  }, function() {
				  	$('figcaption').show()
				  });
				} else {
				  layout = 'list';
				  //$(change_layout).text('Grid'); // Update the button text
				  $(change_layout).html('<i class=" fa fa-th-large"></i>');
				  $(projects_container).mixItUp('changeLayout', {
					containerClass: layout // Change the container class to 'list'
				  });
				}
			}
		  }); //end change layout
	});

});
