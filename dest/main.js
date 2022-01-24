window.addEventListener('load', e => {
	// change background header
	const header = document.querySelector('.header');
	const slider = document.querySelector('.slider');
	let heightHeader = header.offsetHeight;
	let heightSlider = slider.offsetHeight;
	window.addEventListener('scroll', e => {
		if (window.pageYOffset > heightSlider - heightHeader) {
			header.classList.add('active');
		} else {
			header.classList.remove('active');
		}
	});

	// toggle navbar
	const hamburger = document.querySelector('.header-hamburger');
	const nav = document.querySelector('.navbar');
	hamburger.addEventListener('click', e => {
		e.target.classList.toggle('active');
		nav.classList.toggle('active');
	});
	function hideNav() {
		hamburger.classList.remove('active');
		nav.classList.remove('active');
	}
	// resize window
	window.addEventListener('resize', e => {
		let widthWindow = window.innerWidth;
		if (widthWindow > 767) {
			hideNav();
		}
	});

	// change language
	const currentLanguage = document.querySelector('.header-current span');
	const language = document.querySelectorAll('.header-sublang a');
	[...language].forEach(item =>
		item.addEventListener('click', e => {
			e.preventDefault();
			let currentLanguageText = currentLanguage.textContent;
			let languageText = item.textContent;
			item.textContent = currentLanguageText;
			currentLanguage.textContent = LanguageText;
		})
	);

	// back to top
	const backToTop = document.querySelector('#backtotop');
	const scProduct = document.querySelector('.products');

	backToTop.addEventListener('click', e => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});
	window.addEventListener('scroll', e => {
		if (window.pageYOffset >= scProduct.offsetTop - heightHeader) {
			backToTop.style.display = 'flex';
		} else {
			backToTop.style.display = 'none';
		}
	});

	// popup video
	const btnPlay = document.querySelectorAll('.products-video');
	const popupVideo = document.querySelector('.popup');
	const btnClose = document.querySelector('.popup-close');
	const iframe = document.querySelector('.popup iframe');
	function removePopup() {
		iframe.setAttribute('src', '');
		popupVideo.style.display = 'none';
	}
	btnPlay.forEach(item => {
		item.addEventListener('click', e => {
			let videoId = item.dataset.videoId;
			iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
			popupVideo.style.display = 'flex';
		});
	});

	btnClose.addEventListener('click', e => {
		removePopup();
	});
	popupVideo.addEventListener('click', e => {
		removePopup();
	});

	// Active menu
	const menuLinks = document.querySelectorAll('.menu-link');
	const sections = [];
	function removeActiveMenu() {
		menuLinks.forEach((item, index) => {
			item.classList.remove('active');
		});
	}
	menuLinks.forEach((menuLink, index) => {
		let className = menuLink.getAttribute('href').replace('#', '');
		let section = document.querySelector(`.${className}`);
		sections.push(section);
		menuLink.addEventListener('click', e => {
			e.preventDefault();
			window.scrollTo({
				top: section.offsetTop - heightHeader + 1,
				behavior: 'smooth',
			});
		});
	});

	window.addEventListener('scroll', e => {
		let positionScroll = window.pageYOffset;
		sections.forEach((section, index) => {
			if (positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight - heightHeader) {
				removeActiveMenu();
				menuLinks[index].classList.add('active');
			} else {
				menuLinks[index].classList.remove('active');
			}
		});
	});

	// Slider
	const sliderItems = document.querySelectorAll('.slider-item');
	const btnNext = document.querySelector('.control-btn.--next');
	const btnPrev = document.querySelector('.control-btn.--previous');
	const sliderPaging = document.querySelector('.slider-paging');
	const dots = document.querySelectorAll('.slider-dots .dot');
	let currentSlider = 0;

	sliderItems.forEach((item, index) => {
		if (item.classList.contains('active')) {
			currentSlider = index;
		}
	});

	function showPaging(index) {
		sliderPaging.textContent = `0${index}`;
	}
	showPaging(currentSlider + 1);

	dots[currentSlider].classList.add('active');
	dots.forEach((dot, index) =>
		dot.addEventListener('click', e => {
			changeActiveSlider(index);
		})
	);

	function changeActiveSlider(index) {
		sliderItems[currentSlider].classList.remove('active');
		sliderItems[index].classList.add('active');
		currentSlider = index;
		showPaging(currentSlider + 1);
		dots.forEach(dot => {
			dot.classList.remove('active');
		});
		dots[currentSlider].classList.add('active');
	}

	btnNext.addEventListener('click', e => {
		if (currentSlider < sliderItems.length - 1) {
			changeActiveSlider(currentSlider + 1);
		} else {
			changeActiveSlider(0);
		}
	});

	btnPrev.addEventListener('click', e => {
		if (currentSlider > 0) {
			changeActiveSlider(currentSlider - 1);
		} else {
			changeActiveSlider(sliderItems.length - 1);
		}
	});

	// Accordion
	const accordionHeaders = document.querySelectorAll('.accordion-header');
	accordionHeaders.forEach(item => item.addEventListener('click', handleAccordionClick));

	function handleAccordionClick(e) {
		const icon = e.target.querySelector('.accordion-header i');
		const content = e.target.nextElementSibling;
		content.style.height = `${content.scrollHeight}px`;
		content.classList.toggle('active');
		if (!content.classList.contains('active')) {
			content.style.height = `0`;
			icon.textContent = '+';
		} else {
			icon.textContent = '-';
		}
	}
});
