// Vertically center the Value Prop Section
function centerVP() {
	vpHeight = $("section.vp").outerHeight();
	vpContainerHeight = $("section.vp > .container").outerHeight();
	negSpace = vpHeight-vpContainerHeight;

	$("section.vp > .container").css({
		"top": negSpace/2+"px"
	});
}

// Smoothscroll down to about section
function readMoreAbout() {
	$("a.button.readMoreAbout").click(function(){
		$("html, body").animate({
			scrollTop: $("section.aboutMe").offset().top
		},750);
	});
}

// This is the pulldown thing that changes BGs in VP section
window.onload = function() {
    WebPullToRefresh.init({
        loadingFunction: changeBGs
    });
}

// The function that PTR calls
var changeBGs = function() {
    return new Promise( function( resolve, reject ) {
    	$("section.vp").addClass("fadeOut");
        var vpBGs = [
			"../images/bobbyjkane-desk-2-bg.jpg",
			"../images/bobbyjkane-floor-bg.jpg",
			"../images/bobbyjkane-light-bg.jpg",
			"../images/bobbyjkane-self-bg.jpg",
			"../images/bobbyjkane-sigma-bg.jpg",
			"../images/bobbyjkane-sun-bg.jpg"
		]

		setTimeout(function(){
			$("section.vp").css({
				"background-image": "url('images/" + vpBGs[Math.floor(Math.random() * vpBGs.length)] + "')"
			}).removeClass("fadeOut").addClass("fadeIn");
		},500);

        if ( true /* if the loading worked */ ) {
            resolve();
        } else {
            reject();
        }
    } );
};

// Sticky fixed header stuff here
var header = document.querySelector("header");
new Headroom(header, {
  tolerance: {
    down : 2,
    up : 5
  },
  offset : 100,
  classes: {
    initial: "slide",
    pinned: "slideDown",
    unpinned: "slideUp"
  }
}).init();

function addHeaderBG() {
	windowHeight = $(window).height();
	headerHeight = $("header").outerHeight();

	if (window.pageYOffset > windowHeight - headerHeight ) {
		$("header").addClass("withBG");
	}

	if (window.pageYOffset < windowHeight - headerHeight ) {
		$("header").removeClass("withBG");
	}
}

// Downing opacity of VP text while scrolling down
function vpOpacity() {
    var scrollTop = $(window).scrollTop(),
    height = $(window).height(),
    altHeight = height-(height/2);

    $("section.vp .container").css({
        "opacity": ((altHeight - scrollTop) / altHeight)
    });
}

// The entire open menu/close menu thing

	var keys = {37: 1, 38: 1, 39: 1, 40: 1};
	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;  
	}
	function preventDefaultForScrollKeys(e) {
	    if (keys[e.keyCode]) {
	        preventDefault(e);
	        return false;
	    }
	}
	function disableScroll() {
	  if (window.addEventListener) // older FF
	      window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove  = preventDefault; // mobile
	  document.onkeydown  = preventDefaultForScrollKeys;
	}
	function enableScroll() {
	    if (window.removeEventListener)
	        window.removeEventListener('DOMMouseScroll', preventDefault, false);
	    window.onmousewheel = document.onmousewheel = null; 
	    window.onwheel = null; 
	    window.ontouchmove = null;  
	    document.onkeydown = null;  
	}

	(function($) {
	    $.fn.clickToggle = function(func1, func2) {
	        var funcs = [func1, func2];
	        this.data('toggleclicked', 0);
	        this.click(function() {
	            var data = $(this).data();
	            var tc = data.toggleclicked;
	            $.proxy(funcs[tc], this)();
	            data.toggleclicked = (tc + 1) % 2;
	        });
	        return this;
	    };
	}(jQuery));

	function openMenu() {
		scrollTop = $(window).scrollTop();

		$(".mobileMenu").addClass("active");
		$("nav").addClass("show").css({
			"z-index": "999",
			"top": scrollTop+"px" 
		});
		$("#pullThis").addClass("hide");
		disableScroll();

		if ( $("header").hasClass("withBG") ) {
			$("header").removeClass("withBG");
		}
	}

	function closeMenu() {
		$(".mobileMenu").removeClass("active");
		$("nav").removeClass("show").css("z-index", "0");
		$("#pullThis").removeClass("hide");
		enableScroll();
	}

	$(".mobileMenu").clickToggle(function(){
		openMenu();
	},
	function() {
		closeMenu();
	});

	$(document).keyup(function(e){
		if(e.keyCode === 27) {
			closeMenu();
		}
	});


// Tell the time
function welcomeText() {
	var time = new Date().getHours();
	if ( time > 3 ) {
		document.getElementById("time").innerHTML="morning";
	}
	if ( time > 11 ) {
		document.getElementById("time").innerHTML="afternoon";
	}
	if ( time > 17 || time >= 0 & time < 4 ) {
		document.getElementById("time").innerHTML="evening";
	}
}


// Form focused state
function focusInput() {
	$("form .group, form .group .row").each(function(){
		formElements = "input, select, textarea";
		$(formElements).on("focus", function() {
			$(this).parent().addClass("focused");
		});
		$(formElements).on("focusout", function(){
			$(this).parent().removeClass("focused");
			if ( $("form .group .row").hasClass("focused") ) {
				$("form .group .row.focused").parent().removeClass("focused");
				$("form .group .row.focused").removeClass("focused");
			}
		});
	});
}

// Form show budget
function showBudgetInput() {

	$("select#whatBrings").change(function() {
		if ( $(this).val() === "Discuss a project" ) {
			$(".group.budget").fadeIn();
		}
		return false;
	});
}


// Make form appear
function showForm() {
	$("section.form").show();
	$("section.form .container").fadeIn("slow");

	setTimeout(function(){
		$("html, body").animate({
			scrollTop: $("section.form").offset().top
		},750);
		$("section.form input#firstName").focus();
	},250);
}

$("a.contactButton").click(function(){
	showForm();
	closeMenu();
});

/*
// Send form data
$("form#contactMe").submit(function(e){
	formData = $("#form#contactMe").serialize();
	console.log(formData);
	$.post("../send_mail.php", formData);
	e.preventDefault();
});
*/

// Running all these scripts

welcomeText();
focusInput();

$(document).ready(function(){
	centerVP();
	readMoreAbout();
	showBudgetInput();

	// Validate Form
	$("form#contactMe").validate({
		rules: {
			firstName: 		"required",
			lastName: 		"required",
			emailAddress: {
				required: true,
				email: true
			},
			whatBrings: 	"required",
			whatsOn:  		"required",
			budget: {
				required: function(element) {
					return $("#whatBrings").val() === "Discuss a project";
				}
			}
		},
		messages: {
			firstName: "",
			lastName: "",
			emailAddress: "",
			whatBrings: "",
			whatsOn: "",
			budget: ""
		}
	});

	// Send form data
	$("form#contactMe").submit(function(event){
		formValid = $("form#contactMe").valid();
		if ( formValid === true ) {
			$("form .loader").css("display", "inline-block");
			formData = $("form#contactMe").serialize();
			$.post("/server/send_mail.php", formData, function(results) {
				var result = jQuery.parseJSON( results );
				if(result.success) {
					$("form#contactMe, section.form p").fadeOut();
					$("section.form h2").html("Success! I'll be in touch : )");
				}
			});
			event.preventDefault();
		} else {
			event.preventDefault();
		}
	});
});

$(window).resize(function() {
	//moveAboutMe();
	centerVP();
});

$(window).scroll(function(){
	addHeaderBG();
	vpOpacity();
});