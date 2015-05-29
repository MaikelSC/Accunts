$.consultaAjax = {
    ejecutar : function(arregloParametros){
		var ajax = $.extend({}, this.opcionesDefecto, arregloParametros);
			ajax.url = $.urlServer+"/P2/index.php/" + ajax.url;
		$.ajax(ajax);
	},
	opcionesDefecto :{
	 	type: 'POST',
		dataType: 'json',
		urlBase: $.urlServer+"/P2/index.php/",
		accionCorrecta: false,
		accionError: false,
		data: false,
		beforeSend: false,
		success: function(data){
			if(data.error)
				if(!this.persistir)
					this.accionError(data);
				else
					this.accionError(data, this.persistir);
			else
				 if(data != undefined){
			        if(!this.persistir)
			   	         this.accionCorrecta(data); 
				    else
				         this.accionCorrecta(data, this.persistir);
	     		 }						
		},
		complete: false,
		error: false,
		timeout: 0,
		persistir: false
	}
}








function ConsultaAjax(url, data1, accionCorrecta, accionError , obj){
   var url = $.urlServer+"/P2/index.php/"+url;
  	$.ajax({
type: 'POST',
url: url,
dataType: 'json',
data:  data1 ,
success: function(data) {
     if (data.error == false)
	     if(obj != undefined)
            accionError(data, obj);
		 else	
		    accionError(data);
     else
         if(data != undefined){
	        if(obj != undefined)
	   	         accionCorrecta(data, obj); 
		    else
		         accionCorrecta(data);
	     }
   	      
},
error: function(data){
	alert('la consulta provoco un error');
}
});
}

/*function ConsultaAjax1(url, data1, accionCorrecta, accionError , obj){
   var url = $.urlServer+"/P2/index.php/"+url;
  	$.ajax({
type: 'POSTS',
url: url,
data:  data1 
});
}*/

 function incluir(direccion, funcion){
		$.getScript($.urlServer+'/P2/application/'+direccion, function() {
		if(funcion != undefined)
			funcion();
		});
	}