(function($) {
	'use strict';

	var LOCALSTORAGE_KEY = 'awful_image_options';

	function LoadImgur(options) {
		$('#rdbImgur').prop('checked', true);
		$('#divImgur').show();
		$('#txtLocalPath').val(options.LocalPath);
		$('#divPrivate').hide();
	}

	function LoadPrivate(options) {
		$('#divImgur').hide();
		$('#divPrivate').show();
		$('#rdbPrivate').prop('checked', true);
		$('#txtBaseUrl').val(options.BaseUrl);
	}

	function LoadOptions() {
		var options =
			localStorage[LOCALSTORAGE_KEY]
			|| { LinkType: 'imgur', LocalPath: '' }
		;

		if (options.linkType === 'imgur') {
			LoadImgur(options);
		}
		else {
			LoadPrivate(options);
		}
	}

	function SaveOptions() {
		var options = {};

		if ($('#rdbImgur').prop('checked')) {
			options.LinkType = 'imgur';
			options.LocalPath = $('#txtLocalPath').val();
		}
		else {
			options.LinkType = 'private';
			options.LocalPath = $('#txtBaseUrl').val();
		}

		localStorage[LOCALSTORAGE_KEY] = options;
	}

	$(function() {
		LoadOptions();
		$('#btnSave').click(SaveOptions);
	});

})(jQuery);
