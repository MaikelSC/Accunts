$.JCP.cargarDatepicker = {
	crear: function(arregloParametros){
		if($.JCP.datepicker != true){
				$.ajaxSetup({
						async: false
					});
			$('<link rel="stylesheet"  type="text/css" href="'+$.urlServer+'/application/libraries/jQuery/css/datepicker.css" />')		
			.appendTo($('head'))
			.ready(function(){	
				$.getScript($.urlServer+'/application/libraries/jQuery/jquery.ui.datepicker.js',
			    function() {
					$.JCP.datepicker = true;
					arregloParametros.textbox.datepicker({
								showOn: "button",
								buttonImage:  $.urlServer+'/application/libraries/jQuery/css/images/calendario.gif',
								 buttonImageOnly: true,
								dateFormat: 'dd/m/yy',
								/*onSelect: function() {
								if(metodoSelect != undefined)
								   metodoSelect(textbox);}*/
						 }); 
					//alert('asdf');
					$.ajaxSetup({
						async: true
					});
				});	
				 
			 });
		}
		else{
			arregloParametros.textbox.datepicker({
								showOn: "button",
								buttonImage:  $.urlServer+'/application/libraries/jQuery/css/images/calendario.gif',
								buttonImageOnly: true,
								dateFormat: 'dd/m/yy',
								/*onSelect: function() {
								if(metodoSelect != undefined)
								   metodoSelect(textbox);}*/
						 });
		}				 
		
	}
}