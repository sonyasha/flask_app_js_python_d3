
$( document ).ready(function() {
    console.log( "ready!" );
});

// $("#sportsBtn").click(function () {
//     $('#parent').toggleClass("embed-responsive-1by1");
//     console.log('cllicked');
// })

// $(".test").click(function () {
//     $('#sportgraph',  window.parent.document).css({"height":"650px"});
//     console.log('cllicked');
// })

// var frlink = "{{ url_for('show_sports') }}"
// $('#openBtn').click(function(){
//     $('#myModal').on('show', function () {
      
// 	});
//     $('#myModal').modal({show:true})
// });

$('#sportsBtn').click(function(){
	$('#sports-modal').modal({show:true})
});

$('#mapsBtn').click(function(){
	$('#maps-modal').modal({show:true})
});

$('#rateBtn').click(function(){
	$('#rates-modal').modal({show:true})
});

$('#entBtn').click(function(){
	$('#ent-modal').modal({show:true})
});

$('#liqBtn').click(function(){
	$('#liq-modal').modal({show:true})
});

$(document).ready(function() {
	$("#submitForm").click(function(event) {
		event.preventDefault();
		$('#rates-modal').modal({show:true});
		setTimeout(function() { //show rates before submitting
			$("#contact_form").submit();
		}, 4000)
		
	});
});

