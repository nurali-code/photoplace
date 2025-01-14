function compensateForScrollbar() {
	var scrollbarWidth = window.innerWidth - $(document).width();
	if ($('body').hasClass('overflow')) { $('body').css('margin-right', '0'); }
	else if (scrollbarWidth > 0) { $('body').css('margin-right', scrollbarWidth + 'px'); }
}
function showModal(id) {
	hideModals()
	compensateForScrollbar()
	$(id).addClass('active');
	$('body').addClass('overflow')
}
function hideModals() {
	$('.modal').removeClass('active');
	compensateForScrollbar()
	$('body').removeClass('overflow')
};
$(function () {
	$('a[href*="#modal-"]').on('click', function (e) {
		e.preventDefault()
		showModal($(this).attr("href"));
	});
	$('.modal__close').on('click', () => { hideModals(); });
	$(document).on('click', function (e) {
		if (!(
			($(e.target).parents('.modal-content').length) ||
			($(e.target).parents('.btn').length) ||
			($(e.target).parents('.connect__btn').length) ||
			($(e.target).hasClass('connect__btn')) ||
			($(e.target).hasClass('btn')) ||
			($(e.target).hasClass('modal-content'))
		) && $('body').hasClass('overflow')) { hideModals(); }
	});
});

$('.connect__btn').on('click', function () {
	$('.connect-box, .connect__btn').toggleClass('is_active')
})

$(document).on('click', function (e) {
	if (!(($(e.target).parents('.connect').length) ||
		($(e.target).hasClass('connect'))
	) && $('.connect__btn').hasClass('is_active')) { $('.connect-box, .connect__btn').toggleClass('is_active') }
});

$(function () {
	if (window.innerWidth <= 720) {
		var xDown = null;
		var yDown = null;
		var isTouching = false;
		var modal = $('#modal-request');
		var modalContent = modal.find('.modal-content');

		var startUp = 0;
		var endUp = 0;
		$('.modal').on('touchstart', function (evt) {
			xDown = evt.touches[0].clientX;
			yDown = evt.touches[0].clientY;
			isTouching = true;
			startUp = evt.touches[0].clientY;
		});

		$('.modal').on('touchmove', function (evt) {
			if (!isTouching) { return; }

			var xUp = evt.touches[0].clientX;
			var yUp = evt.touches[0].clientY;
			var xDiff = xDown - xUp;
			var yDiff = yDown - yUp;

			if (Math.abs(xDiff) < Math.abs(yDiff)) {
				// При движении вниз
				endUp = -(startUp - yUp);
				if (yDiff > 0) { } else {
					if ($('body').hasClass('overflow')) {
						// Получаем текущую трансформацию translateY
						modalContent.css('transform', 'translateY(' + endUp + 'px)'); // Следуем за пальцем вниз
					}
				}
			}
			xDown = xUp;
			yDown = yUp;
		});

		$('.modal').on('touchend', function () {
			isTouching = false;
			console.log(endUp);
			if (endUp >= 200) {
				hideModals('#modal-request');
				setTimeout(() => {
					modalContent.css('transform', '');
					endUp = 0;
				}, 300);
			} else {
				modalContent.css('transform', 'translateY(' + 0 + 'px)'); // Следуем за пальцем вниз
			}

		});
	}
})
