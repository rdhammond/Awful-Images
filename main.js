(function($) {
	'use strict';

	var IMG_PATTERN = /\[(t?img)-([^\]]+)\]/g;

	var options;

	function BuildUrl(filename) {
		return options.RootUrl
			? options.RootUrl + '/' + filename
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

			if (!/\./.test(filename)) {
				filename += '.' + (options.ImageExt === 'other' ? options.Other : options.ImageExt);
			}

			var url = BuildUrl(filename);

			if (!url) {
				result.push(text.substring(lastIndex, match.index + match[0].length));
			}
			else {
				if (lastIndex < match.index) result.push(text.substring(lastIndex, match.index));
				result.push('[' + keyword + ']' + url + '[/' + keyword + ']');
			}

			lastIndex = match.index + match[0].length;
		}

		if (result.length === 0) return text;

		if (lastIndex < text.length) result.push(text.substr(lastIndex));
		return result.join('');
	}

	function SubstituteTags() {
		if (!options) return true;

		var $post = $('.post-wrapper>textarea');
		var text = $post.val();

		text = ReplaceTags(text);
		$post.val(text);

		return true;
	}

	$(function() {
		chrome.storage.local.get('options', function(root) {
			options = root.options;
			$('#content>form').submit(SubstituteTags);
		});
	});

})(jQuery);
