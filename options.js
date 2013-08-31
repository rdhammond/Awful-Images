(function($) {
	'use strict';

	function ImageExt(value) {
		if (typeof value === 'undefined') {
			return $('#rdbOther').is(':checked')
				? $('#txtOther').val()
				: $('input:radio[name="ImageExt"]:checked').val()
			;
		}

		var $rdb = $('input:radio[name="ImageExt"][value="' + value + '"]');
		$rdb.prop('checked', true);
		$('#txtOther').prop('disabled', !$rdb.is('#rdbOther'));
	}

	function UpdateExamples() {
		$('.sample-url').text($('#txtRootUrl').val());
		$('.sample-ext').text(ImageExt());
	}

	function LoadModel(options) {
		$('#txtRootUrl').val(options.RootUrl);
		ImageExt(options.ImageExt);
		$('#txtOther').val(options.Other);

		UpdateExamples();
	}

	function GetModel(options) {
		return {
			RootUrl: $('#txtRootUrl').val(),
			ImageExt : $('input:radio[name="ImageExt"]:checked').val(),
			Other : $('#txtOther').val()
		};
	}

	function LoadOptions() {
		var options = chrome.storage.local.get('options', function(root) {
			LoadModel(root.options);
		});
	}

	function SaveOptions() {
		var options = GetModel();
		chrome.storage.local.set({options: options});
	}

	$(function() {
		$('input:radio, input:text').change(UpdateExamples);
		$('#btnSave').click(SaveOptions);

		LoadOptions();
	});

})(jQuery);
