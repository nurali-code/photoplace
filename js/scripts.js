$('.connect__btn').on('click', function () {
	$('.connect-box, .connect__btn').toggleClass('is_active')
})

$(function () {
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

	$('a[href*="#modal-"]').on('click', function (e) {
		e.preventDefault()
		showModal($(this).attr("href"));
		initializeRanges();
	});

	$('.modal__close').on('click', () => { hideModals(); });
	$(document).on('click', function (e) {
		if (!(
			($(e.target).parents('.modal-content').length) ||
			($(e.target).parents('.btn').length) ||
			($(e.target).hasClass('btn')) ||
			($(e.target).hasClass('modal-content'))
		) && $('body').hasClass('overflow')) { hideModals(); }
	});
});