$(document).ready(e => {
	// change background header
	const header = $('.header');
	const slider = $('.slider');
	let heightHeader = header.height();
	let heightSlider = slider.height();
	$(window).on('scroll', e => {
		if (window.pageYOffset > heightSlider - heightHeader) {
			header.addClass('active');
		} else {
			header.removeClass('active');
		}
	});

	// Toggle navbar;
	const hamburger = $('.header-hamburger');
	const nav = $('.navbar');
	hamburger.on('click', e => {
		$(e.target).toggleClass('active');
		nav.toggleClass('active');
	});

	// resize window
	function hideNav() {
		hamburger.removeClass('active');
		nav.removeClass('active');
	}
	let widthWindow = $(window).width();
	$(window).on('resize', e => {
		if (widthWindow > 767) {
			hideNav();
		}
	});

	// change Language
	const currentLanguage = $('.header-current span');
	const language = $('.header-sublang a');
	language.on('click', e => {
		e.preventDefault();
		let languageText = $(e.target).text();
		let currentLanguageText = currentLanguage.text();
		currentLanguage.text(languageText);
		$(e.target).text(currentLanguageText);
	});

	// Back to top
	const backToTop = $('#backtotop');
	const scProduct = $('.products');
	backToTop.on('click', e => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});
	$(window).on('scroll', e => {
		let positionProduct = scProduct.offset();
		if ($(window).scrollTop() > positionProduct.top - heightHeader) {
			backToTop.css('display', 'flex');
		} else {
			backToTop.css('display', 'none');
		}
	});

	// popup videos
	const btnPlay = $('.products-video');
	const popupVideo = $('.popup');
	const btnClose = $('.popup-close');
	const iframe = $('.popup iframe');
	btnPlay.on('click', function (e) {
		let videoId = $(this).attr('data-video-id');
		iframe.attr('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
		popupVideo.css('display', 'flex');
	});
	function removePopup() {
		iframe.attr('src', '');
		popupVideo.css('display', 'none');
	}
	btnClose.on('click', function (e) {
		removePopup();
	});
	popupVideo.on('click', function (e) {
		removePopup();
	});

	// Active menu
	const menuLinks = $('.menu-link');
	const navLinks = $('.nav-link');
	let sections = [];
	function removeActiveMenu(element) {
		element.each(function () {
			$(this).removeClass('active');
		});
	}
	function scrollToSection(element) {
		element.each(function (index) {
			let className = $(this).attr('href').replace('#', '');
			let section = $(`.${className}`);
			sections.push(section);
			$(this).on('click', function (e) {
				e.preventDefault();
				window.scrollTo({
					top: section.offset().top - heightHeader + 1,
					behavior: 'smooth',
				});
			});
		});
	}
	if (widthWindow > 767) {
		scrollToSection(menuLinks);
	} else {
		scrollToSection(navLinks);
	}
	$(window).on('scroll', function (e) {
		let positionScroll = $(window).scrollTop();
		$.each(sections, function (index) {
			if (positionScroll > $(this).offset().top - heightHeader && positionScroll < $(this).offset().top + $(this).outerHeight() - heightHeader) {
				removeActiveMenu(menuLinks);
				removeActiveMenu(navLinks);
				menuLinks.eq(index).addClass('active');
				navLinks.eq(index).addClass('active');
			} else {
				menuLinks.eq(index).removeClass('active');
				navLinks.eq(index).removeClass('active');
			}
		});
	});
	// Accordion
	const accordionHeaders = $('.accordion-header');
	accordionHeaders.on('click', e => {
		accordionHeaders.next().slideUp(250);
		if ($(e.target).find('i').text() === '-') {
			$(e.target).find('i').text('+');
		} else {
			accordionHeaders.find('i').text('+');
			if ($(e.target).find('i').text() === '+') {
				$(e.target).find('i').text('-');
			}
		}

		$(e.target).next().stop().slideToggle(250);
	});

	// PhotoSwipe lib
	var initPhotoSwipeFromDOM = function (gallerySelector) {
		var parseThumbnailElements = function (el) {
			var thumbElements = el.childNodes,
				numNodes = thumbElements.length,
				items = [],
				figureEl,
				linkEl,
				size,
				item;
			for (var i = 0; i < numNodes; i++) {
				figureEl = thumbElements[i]; // <figure> element
				if (figureEl.nodeType !== 1) {
					continue;
				}
				linkEl = figureEl.children[0]; // <a> element
				size = linkEl.getAttribute('data-size').split('x');
				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10),
				};
				if (figureEl.children.length > 1) {
					item.title = figureEl.children[1].innerHTML;
				}
				if (linkEl.children.length > 0) {
					// <img> thumbnail element, retrieving thumbnail url
					item.msrc = linkEl.children[0].getAttribute('src');
				}
				item.el = figureEl; // save link to element for getThumbBoundsFn
				items.push(item);
			}
			return items;
		};
		var closest = function closest(el, fn) {
			return el && (fn(el) ? el : closest(el.parentNode, fn));
		};
		var onThumbnailsClick = function (e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
			var eTarget = e.target || e.srcElement;
			var clickedListItem = closest(eTarget, function (el) {
				return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
			});
			if (!clickedListItem) {
				return;
			}
			var clickedGallery = clickedListItem.parentNode,
				childNodes = clickedListItem.parentNode.childNodes,
				numChildNodes = childNodes.length,
				nodeIndex = 0,
				index;
			for (var i = 0; i < numChildNodes; i++) {
				if (childNodes[i].nodeType !== 1) {
					continue;
				}
				if (childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}
			if (index >= 0) {
				openPhotoSwipe(index, clickedGallery);
			}
			return false;
		};
		var photoswipeParseHash = function () {
			var hash = window.location.hash.substring(1),
				params = {};
			if (hash.length < 5) {
				return params;
			}
			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if (!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if (pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}
			if (params.gid) {
				params.gid = parseInt(params.gid, 10);
			}
			return params;
		};
		var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
				gallery,
				options,
				items;
			items = parseThumbnailElements(galleryElement);
			options = {
				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
				getThumbBoundsFn: function (index) {
					var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
						pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
						rect = thumbnail.getBoundingClientRect();

					return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
				},
				showAnimationDuration: 0,
				hideAnimationDuration: 0,
			};
			if (fromURL) {
				if (options.galleryPIDs) {
					for (var j = 0; j < items.length; j++) {
						if (items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}
			if (isNaN(options.index)) {
				return;
			}
			if (disableAnimation) {
				options.showAnimationDuration = 0;
			}
			gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};
		var galleryElements = document.querySelectorAll(gallerySelector);
		for (var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i + 1);
			galleryElements[i].onclick = onThumbnailsClick;
		}
		var hashData = photoswipeParseHash();
		if (hashData.pid && hashData.gid) {
			openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
		}
	};

	initPhotoSwipeFromDOM('.gallery-list');

	// Flickity
	let $carousel = $('.slider-list');
	$carousel.flickity({
		cellAlign: 'left',
		contain: true,
		wrapAround: true,
		prevNextButtons: false,
		// autoPlay: 2000,
		on: {
			ready: function () {
				let dotted = $('.flickity-page-dots');
				paging = $('.slider-left');
				dotted.appendTo(paging);
			},
			change: function (index) {
				let number = $('.slider-paging');
				let indexPage = index + 1;
				number.text(indexPage.toString().padStart(2, 0));
			},
		},
	});

	$('.slider-right .--previous').on('click', function (e) {
		$carousel.flickity('previous');
	});
	$('.slider-right .--next').on('click', function (e) {
		$carousel.flickity('next');
	});

	$('.sliderdrag').flickity({
		cellAlign: 'left',
		contain: true,
		wrapAround: true,
		freeScroll: true,
		prevNextButtons: false,
		pageDots: false,
	});
});
