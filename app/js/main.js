
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-

	
	// =-=-=-=-=-=-=-=-=-=-=-=- <click> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const videoPreivew = $(".video-preview");
	if(videoPreivew) {
	
		const videoWrapper = videoPreivew.closest('.video-wrapper'),
			  videoElement = videoWrapper.querySelector('.video-element');

		videoPreivew.classList.add('_hidden');
		videoElement.load();
		setTimeout(() => {
			videoElement.play();
		},100)
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </click> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

function resize() {

	html.style.setProperty("--height-screen", window.innerHeight + "px")
	html.style.setProperty("--height-header", header.offsetHeight + "px")

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=


let sliderAllFor = new Swiper('.all-for__slider', {

	spaceBetween: 23,
	slidesPerView: 1,

	loop: true,
	loopedSlides: 3,

	breakpoints: {
		1600: {
			slidesPerView: 2,
		},

		2500: {
			slidesPerView: 3,
		},

		

		/* 550: {
			// params
		} */
	},

});


setTimeout(() => {
	sliderAllFor.slideNext(0);
	sliderAllFor.slidePrev(0);
	setTimeout(() => {
		sliderAllFor.el.style.opacity = 1;
	},100)
},0)

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
