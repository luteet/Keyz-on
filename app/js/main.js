
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	nav = document.querySelector('.header__nav'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


function slideUp (target, duration=300) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
	  target.style.display = 'none';
	  target.style.removeProperty('height');
	  target.style.removeProperty('padding-top');
	  target.style.removeProperty('padding-bottom');
	  target.style.removeProperty('margin-top');
	  target.style.removeProperty('margin-bottom');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}

function slideDown (target, duration=300) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
	  display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
	  target.style.removeProperty('height');
	  target.style.removeProperty('overflow');
	  target.style.removeProperty('transition-duration');
	  target.style.removeProperty('transition-property');
	}, duration);
}
	

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

	
	// =-=-=-=-=-=-=-=-=-=-=-=- <video-preview> -=-=-=-=-=-=-=-=-=-=-=-=
	
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
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </video-preview> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <filter-category> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const filterCategoryTarget = $(".filter-category__target");
	if(filterCategoryTarget) {
	
		const filterCategory = filterCategoryTarget.closest('.filter-category'),
			  filterCategoryList = filterCategory.querySelector('.filter-category__list');

		if(!filterCategory.classList.contains('_animating')) {
			filterCategory.classList.add('_animating');

			if(filterCategory.classList.contains('_active')) {
				filterCategoryList.style.display = 'block';
				filterCategory.classList.remove('_active');
	
				slideUp(filterCategoryList);
			} else {
	
				slideDown(filterCategoryList);
				filterCategory.classList.add('_active');
				
			}

			setTimeout(() => {
				filterCategory.classList.remove('_animating');
			},300)
		}
		
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </filter-category> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <amount-product> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const amountBtn = $(".amount-btn")
	if(amountBtn) {
	
		const amountBlock = amountBtn.closest('.amount-block'),
			  amountInput = amountBlock.querySelector('.amount-input');
		console.log(amountInput)
		if(amountBtn.classList.contains('_up')) {
			amountInput.value = Number(amountInput.value) + 1;
		} else if(amountBtn.classList.contains('_down')) {
			amountInput.value = (Number(amountInput.value) - 1) ? Number(amountInput.value) - 1 : 1;
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </amount-product> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=


const appendToOnTablet = document.querySelectorAll('[data-append-to-on-tablet]');
let appendToOnTabletArray = [];

appendToOnTablet.forEach(appendToOnTablet => {
	appendToOnTabletArray.push([appendToOnTablet, document.querySelector('#' + appendToOnTablet.dataset.appendToOnTablet), appendToOnTablet.parentElement]);
})

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

function resize() {

	html.style.setProperty("--height-screen", window.innerHeight + "px")
	html.style.setProperty("--height-header", header.offsetHeight + "px")
	html.style.setProperty('--width-header-nav', nav.offsetWidth + "px")

	windowSize = window.innerWidth

	resizeCheckFunc(992,
		function () {  // screen > 992px

			Array.from(appendToOnTabletArray).forEach(appendToOnTablet => {
				if(appendToOnTablet[0].parentElement != appendToOnTablet[2]) {
					appendToOnTablet[2].append(appendToOnTablet[0]);
				}
			})			

		},
		function () {  // screen < 992px

			Array.from(appendToOnTabletArray).forEach(appendToOnTablet => {
				appendToOnTablet[1].append(appendToOnTablet[0]);
			})

		}
	);

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.all-for__slider')) {
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
}

if(document.querySelector('.product__image--main') || document.querySelector('.product__image--list')) {

	let productImageList = new Swiper('.product__image--list', {
	
		spaceBetween: 20,
		slidesPerView: 4,

		watchSlidesProgress: true,
	
		/* breakpoints: {
			992: {
				// params
			},
	
			550: {
				// params
			}
		} */
	
	});
	
	let productImageMain = new Swiper('.product__image--main', {
	
		spaceBetween: 20,
		slidesPerView: 1,
	
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		thumbs: {
			swiper: productImageList,
		}
	
	});

	
	
}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
