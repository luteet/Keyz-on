
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

function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id, initStart) {

		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				body.classList.remove('_popup-active');
				html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
				body.classList.add('_popup-active');

				if (saveHref) history.pushState('', "", id);

				setTimeout(() => {
					if (!initStart) {
						popup.classList.add('_active');
						function openFunc() {
							popupCheck = true;
							popup.removeEventListener('transitionend', openFunc);
						}
						popup.addEventListener('transitionend', openFunc)
					} else {
						popup.classList.add('_transition-none');
						popup.classList.add('_active');
						popupCheck = true;
					}

				}, 0)

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			if (popup.classList.contains('_transition-none')) popup.classList.remove('_transition-none')

			setTimeout(() => {
				popup.classList.remove('_active');
				function closeFunc() {
					const activePopups = document.querySelectorAll('.popup._active');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;
					popup.removeEventListener('transitionend', closeFunc)
				}

				popup.addEventListener('transitionend', closeFunc)

			}, 0)

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					open(url.hash, true);
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()


const cookie = document.querySelector('.cookie');
if(!localStorage.getItem('keyz-on-cookie')) setTimeout(() => {cookie.classList.remove('_hidden')}, 500)


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
		
		if(amountBtn.classList.contains('_up')) {
			amountInput.value = Number(amountInput.value) + 1;
		} else if(amountBtn.classList.contains('_down')) {
			amountInput.value = (Number(amountInput.value) - 1) ? Number(amountInput.value) - 1 : 1;
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </amount-product> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <cookie-hide-on-btn> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const cookieBtn = $("button.cookie__btn")
	if(cookieBtn) {
	
		const cookie = document.querySelector('.cookie');
		cookie.classList.add('_hidden');

		localStorage.setItem('keyz-on-cookie', true);
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </cookie-hide-on-btn> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <click> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const passwordToggle = $(".password-toggle")
	if(passwordToggle) {
	
		const passwordToggleParent = passwordToggle.parentElement,
			  passwordToggleInput = passwordToggleParent.querySelector('input');

		if(!passwordToggle.classList.contains('_active')) {
			passwordToggleInput.setAttribute('type', 'text');
			passwordToggle.classList.add('_active')
		} else {
			passwordToggleInput.setAttribute('type', 'password');
			passwordToggle.classList.remove('_active')
		}

	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </click> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <cart-product-delete> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const cartProductDelete = $(".cart__product--delete")
	if(cartProductDelete) {
	
		const cartProduct = cartProductDelete.closest('.cart__product');

		cartProduct.addEventListener('transitionend', function () {
			setTimeout(() => {
				slideUp(cartProduct);
			},50)
		})

		cartProduct.style.opacity = 0;
		cartProduct.style.visibility = "hidden";
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </cart-product-delete> -=-=-=-=-=-=-=-=-=-=-=-=

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

		spaceBetween: 9,
		slidesPerView: 1,
	
		loop: true,
		loopedSlides: 3,
	
		breakpoints: {
			768: {
				slidesPerView: 1,
				spaceBetween: 23,
			},
			1600: {
				slidesPerView: 2,
				spaceBetween: 23,
			},
	
			2500: {
				slidesPerView: 3,
				spaceBetween: 23,
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

		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
	
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


const headerSearchInput = document.querySelectorAll('.header__search--input');
headerSearchInput.forEach(headerSearchInput => {
	headerSearchInput.addEventListener('focus', function () {
		header.classList.add('_search-focus');
	})
	headerSearchInput.addEventListener('blur', function () {
		header.classList.remove('_search-focus');
	})
})


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/
