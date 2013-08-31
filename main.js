(function($) {
	'use strict';

	var LOCALSTORAGE_KEY = 'awful_images_options';
	var IMG_PATTERN = /\[(t?img)-([^\]]+)\]/g;

	var options = null;

	function BuildUrl(filename) {
		return options.BaseUrl
			? options.BaseUrl + '/' + filename
			: null
		;
	}

	function ReplaceTags(text) {
		var match;

		var result = [];
		var lastIndex = 0;

		while (match = IMG_PATTERN.exec(text)) {
			var keyword = match[1];
			var filename = match[2];

			if (filename.indexOf('.') < 0) {
				filename += '.' + options.ImageExt === 'other'
					? options.Other
					: options.ImageExt
				;
			}

			var url = BuildUrl(filename);

			if (!url) {
				result.push(text.substring(lastIndex, match.index + match[0].length));
			}
			else {
				result.push(text.substring(lastIndex, match.index);
				result.push('[' + keyword + ']' + url + '[/' + keyword + ']');
			}

			lastIndex = match.index + match[0].length;
		}

		return result.length > 0 ? result.join('') : text;
	}

	function SubstituteTags() {
		if (options === null) return true;

		var $post = $('.post-wrapper>textarea');
		var text = $post.val();

		text = ReplaceTags(text);
		$post.val(text);

		return true;
	}

	$(function() {
		options = localStorage[LOCALSTORAGE_KEY];
		$('#content>form').submit(SubstituteTags);
	});

})(jQuery);
