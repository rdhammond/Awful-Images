(function($) {
	'use strict';

	var LOCALSTORAGE_KEY = 'awful_images_options';
	var TIMG_PATTERN = /\[timg-([^\]]+)\]/g;
	var IMG_PATTERN = /\[img-([^\]]+)\]/g;

	var options = null;

	function SubstituteTags() {
		var $post = $('.post-wrapper>textarea');
		var text = $post.val();

		// ** TODO: Substitute as appropriate.
		text.replace(TIMG_PATTERN, '[timg]$1[/timg]');
		text.replace(IMG_PATTERN, '[img]$1[/img]');
		$post.val(text);

		return true;
	}

	$(function() {
		options = localStorage[LOCALSTORAGE_KEY];
		$('#content>form').submit(SubstituteTags);
	});

})(jQuery);
