AOS.init({ offset: 50, duration: 1000, });
$('[data-adjust]').each(function () { $(this).html(`<span>${$(this).html()}</span>`); });

function adjustFontSize() {
	const windowWidth = $(window).width();
	const padding = windowWidth > 1800 ? 80 : windowWidth > 991 ? 86 : windowWidth > 720 ? 40 : 32;
	$('[data-adjust]').each(function () {
		const $parent = $(this);
		const dataAdjust = $parent.attr('data-adjust');
		const $span = $parent.find('span');
		let maxFontSize, lineHeight;

		if (dataAdjust === 'tab' && windowWidth <= 720) {
			maxFontSize = 202;
			lineHeight = 165;
		} else if (dataAdjust === 'tab' && windowWidth <= 991 && windowWidth > 720) {
			maxFontSize = 340;
			lineHeight = 275;
		} else {
			const isNone = dataAdjust === 'none' || dataAdjust === 'tab';
			maxFontSize = isNone ? Infinity : windowWidth > 1800 ? 386 : windowWidth > 991 ? 265 : windowWidth > 720 ? 148 : 71;
			lineHeight = Math.round(maxFontSize * 0.82);
		}

		let fontSize = parseInt($span.css('font-size'), 10);
		$span.css({ 'font-size': maxFontSize + 'px', 'line-height': lineHeight + 'px' });


		while ($span.outerWidth() >= windowWidth - padding) {
			fontSize--;
			$span.css({ 'font-size': fontSize + 'px', 'line-height': Math.round(fontSize * 0.82) + 'px' });
		}

		while ($span.outerWidth() < windowWidth - padding && fontSize < maxFontSize) {
			fontSize++;
			$span.css({ 'font-size': fontSize + 'px', 'line-height': Math.round(fontSize * 0.82) + 'px' });
		}
	});
}

$('.menu__open, a.menu__link, .menu__close').on('click', function () {
	$('.menu__open, .header-menu, body').toggleClass('is_active')
})

$('.ddown__btn').on('click', function () {
	if ($(this).parents('.ddown').hasClass('is_active')) {
		$(this).parents('.ddown').removeClass('is_active');
		$('.ddown-content').slideUp(250);
	} else {
		$('.ddown-content').not($(this).next()).slideUp(250);
		$(this).next().slideDown(250);
		setTimeout(() => { $('.ddown').not($(this).parents('.ddown')).removeClass('is_active') }, 250);
		$(this).parents('.ddown').addClass('is_active');
	}
})

const options = { root: null, rootMargin: '0px', threshold: 0.5 };
let observer;
function initObserver() {
	observer?.disconnect();
	observer = new IntersectionObserver(handleIntersection, options);
	document.querySelectorAll('.observe, .mob-observe')
		.forEach(el => (window.innerWidth < 991 || !el.classList.contains('mob-observe')) && observer.observe(el));
}

function handleIntersection(entries) {
	entries.forEach(({ target: video, isIntersecting }) => {
		video[isIntersecting ? 'play' : 'pause']();
		video.addEventListener("contextmenu", e => e.preventDefault(), false);
		video.hasAttribute("controls") && video.removeAttribute("controls");
	});
}
initObserver();
window.addEventListener('resize', initObserver);

$(window).on('scroll', function () {
	if ($(this).scrollTop() > 0 && $('header').hasClass('watch')) { $('header').addClass('fixed'); }
	else { $('header').removeClass('fixed'); }
});

$('a[href*="#"]').on('click', function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top - $('.header').innerHeight(),
	}, 450)
});

$('.hero-slides').slick({
	infinite: true,
	dots: false,
	fade: true,
	arrows: true,
	slidesToShow: 1,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 991,
			settings: "unslick"
		},
	]
});
$('.sl').slick({
	infinite: true,
	draggable: false,
	fade: true,
	dots: false,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 1500,
	slidesToShow: 1,
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 768,
			settings: { vertical: false, }
		},
	]
});

$('.btn-tab').on('click', function () {
	const selectedTab = $(this).data('tab');
	$('.btn-tab').removeClass('is_active');
	$(this).addClass('is_active');
	$('.example-wrap .item').each(function () {
		const hashtags = $(this).find('.item-title p').text();
		$(this).toggleClass('is_show', selectedTab === '#all' || hashtags.includes(selectedTab))
			.toggleClass('is_hide', selectedTab !== '#all' && !hashtags.includes(selectedTab));
	});
	AOS.refresh();
});

$(".example .item, .more-item").on('mouseenter', function () {
	if (window.innerWidth >= 991 && $(this).find('video').length > 0) {
		$(this).find('video')[0].play(); // Вызов play() для видео
	}
});

$(".example .item, .more-item").on('mouseleave', function () {
	if (window.innerWidth >= 991 && $(this).find('video').length > 0) {
		$(this).find('video')[0].pause(); // Вызов pause() для видео
	}
});

$(document).on('afterLoad.fb onSlideChange.fb', function (e, instance, slide) {
	const $video = slide.$content.find('source');
	slide.$content.removeClass('--hor --ver');
	if ($video.length > 0) {
		const src = $video.attr('src') || '';
		slide.$content.addClass(src.includes('hor-') ? '--hor' : '--ver');
	}
});

$('.description-slider').slick({
	infinite: true,
	draggable: false,
	dots: false,
	swipe: false,
	fade: true,
	arrows: false,
	slidesToShow: 1,
	adaptiveHeight: true,
});

$('.description-navbtn').on('click', function () {
	$(this).addClass('is_active').siblings().removeClass('is_active');
	$('.description-slider').slick('slickGoTo', $(this).index());
});

$(document).ready(function () {
	$('.example-wrap .item').each(function () {
		const pTtag = $(this).find('.item-title p').eq(0).text() + " <br> " + $(this).find('.item-title p').eq(1).text();
		$(this).find('[data-fancybox]').attr('data-caption', pTtag);
	});
	$('.interactives-slider').slick({
		infinite: false,
		dots: false,
		arrows: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1700,
				settings: { slidesToShow: 4, }
			},
			{
				breakpoint: 1200,
				settings: { slidesToShow: 3, }
			},
			{
				breakpoint: 991,
				settings: "unslick"
			},
		]
	}); $('.interactives-slider').on('swipe', function () { updateInteractiveItems() });
	$('.item-imgs').slick({
		infinite: false,
		draggable: false,
		dots: false,
		arrows: true,
		slidesToShow: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 991,
				settings: { draggable: true, }
			},
		]
	});
	$('.item-imgs').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		let nextSlideElement = $(slick.$slides[nextSlide]);
		if (nextSlideElement.is('video')) { nextSlideElement[0].play(); }
	});
	function updateInteractiveItems() {
		if (window.innerWidth >= 991) {
			const $items = $(".interactives .item");
			const itemWidth = $items.eq(0).width();
			const $firstItemBox = $(".item-box").eq(0).css('transform', 'scale(1)');
			const itemBoxWidth = $firstItemBox.width();
			const calcVal = (itemBoxWidth - itemWidth) / 2;
			$firstItemBox.css('transform', '');

			$items.each(function () {
				const $itemBox = $(this).find('.item-box');
				const offset = $itemBox.offset().left;
				const windWidth = offset + itemWidth * 2 + calcVal;
				$itemBox.removeClass('--right --left')
				$itemBox
					.toggleClass('--left', offset <= calcVal)
					.toggleClass('--right', windWidth >= window.innerWidth && offset > calcVal);
			});
		} else return false
	} updateInteractiveItems();
	$(window).on('resize', updateInteractiveItems);
	$(".interactives .item").on('mouseenter', function () {
		if (window.innerWidth >= 991) {
			$('.interactives .slick-list').not('.item-imgs .slick-list').css('z-index', '1111');
			$('.interactives .slick-arrow').not('.item-imgs .slick-arrow').addClass('--blur')
			$(this).find('.item-ic video')[0].play();
			$(this).find('.item-imgs video').each(function () {
				$(this).hasClass('slick-current') ? $(this)[0].play() : false;
			})
			$(".interactives .item").not($(this)).addClass('blur')
		}
	});
	$(".interactives .item").on('mouseleave', function () {
		if (window.innerWidth >= 991) {
			$('.interactives .slick-list').not('.item-imgs .slick-list').css('z-index', '1')
			$(".interactives .item").removeClass('blur')
			$('.interactives .slick-arrow').not('.item-imgs .slick-arrow').removeClass('--blur')
			$(this).find('video').each(function () { $(this)[0].pause() })
		}
	});
	adjustFontSize();
}); $(window).resize(adjustFontSize);

function compensateForScrollbar() {
	var scrollbarWidth = window.innerWidth - $(document).width();
	if ($('body').hasClass('overflow')) {
		$('body').css('padding-right', '0');
		$('header').css('padding-right', '0');
	}
	else if (scrollbarWidth > 0) {
		$('header').css('padding-right', scrollbarWidth + 'px');
		$('body').css('padding-right', scrollbarWidth + 'px');
	}
}
function showModal(id) {
	hideModals()
	compensateForScrollbar()
	$(id).addClass('active');
	$('body').addClass('overflow')
}
function hideModals() {
	$('.modal-content').css('transform', '');
	$('.modal').removeClass('active');
	compensateForScrollbar()
	$('body').removeClass('overflow')
};

$(function () {
	$('[data-modal]').on('click', function (e) {
		showModal('#' + $(this).data("modal"));
	});
	$('.modal__close').on('click', () => { hideModals(); });
	$(document).on('click', function (e) {
		if (!(
			($(e.target).parents('.modal-content').length) ||
			($(e.target).parents('.btn').length) ||
			($(e.target).hasClass('menu__link')) ||
			($(e.target).hasClass('btn')) ||
			($(e.target).hasClass('modal-content'))
		) && $('body').hasClass('overflow')) { hideModals(); }
	});
});

$(function () {
	if (window.innerWidth <= 720) {
		var xDown = null;
		var yDown = null;
		var isTouching = false;
		var currentModal = null; // Текущее модальное окно
		var currentModalContent = null; // Контент текущего модального окна

		var startUp = 0;
		var endUp = 0;

		// Обработка touchstart
		$(document).on('touchstart', '.modal', function (evt) {
			currentModal = $(this); // Запоминаем текущее модальное окно
			currentModalContent = currentModal.find('.modal-content'); // Находим его контент

			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
			isTouching = true;
			startUp = evt.touches[0].clientY;
		});

		// Обработка touchmove
		$(document).on('touchmove', '.modal', function (evt) {
			if (!isTouching || !currentModal) return;

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;
			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				// При движении вниз
				endUp = -(startUp - yUp);
				if (yDiff > 0) {
					// Движение вниз
				} else {
					if ($('body').hasClass('overflow')) {
						currentModalContent.addClass('drag');
						// Получаем текущую трансформацию translateY
						currentModalContent.css('transform', 'translateY(' + endUp + 'px)');
					}
				}
			}
			xDown = xUp;
			yDown = yUp;
		});

		// Обработка touchend
		$(document).on('touchend', '.modal', function () {
			if (!currentModal) return;

			isTouching = false;
			currentModalContent.removeClass('drag');

			if (endUp >= 120) {
				hideModals(currentModal); // Закрываем текущее модальное окно
				setTimeout(() => {
					currentModalContent.css('transform', '');
					endUp = 0;
				}, 300);
			} else {
				currentModalContent.css('transform', 'translateY(0px)'); // Возвращаем контент на место
			}

			// Сбрасываем текущее модальное окно
			currentModal = null;
			currentModalContent = null;
		});

	}
});

$("form").submit(function () {
	const thisBnt = $(this).find('.btn');
	$(thisBnt).attr('disabled', true)
	$.ajax({
		type: "post",
		method: 'post',
		url: "send.php",
		data: $(this).serialize(),
		// success: function (response) {},
		// error: function (error) { console.error(error); }
	}).done(function () {
		$(thisBnt)
			.removeClass('--arr --star')
			.addClass('--sent')
			.text('Заявка отправлена');

		hideModals();
		showModal('#modal-done');
	}); return false;
});