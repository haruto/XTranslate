// @project XTranslate (vendors/google.js)
// @url https://github.com/extensible/XTranslate

XTranslate.vendors.add('Google', 'http://translate.google.com', function(evt)
{
	var
		text = evt.data,
		port = evt.source;
	
	ajax({
		url: this.url + [
			'/translate_a/t?client=t',
			'&sl='+ lang.from,
			'&tl='+ lang.to,
			'&text='+ encodeURIComponent(text)
		].join(''),
		
		complete: function( response )
		{
			var data = eval('('+ response +')');
			
			var html = [
				'<div class="XTranslate_result Powered_by_Google">',
					'<div class="XTranslate_result_main">',
						data[0][0][0],
					 '</div>',
					function()
					{
						return data[1]
							? data[1].map(function( wordtype )
							{
								return [
									'<dl class="XTranslate_wordtype">',
										'<dt>'+ wordtype[0] +'</dt>',
										'<dd>'+ wordtype[1].join(', ') +'</dd>',
									'</dl>'
								].join('')
							}).join('')
							: '';
					}(),
				'</div>'
			].join('');
			
			port.postMessage({
				html: html,
				response: response
			});
		}
	});
});
