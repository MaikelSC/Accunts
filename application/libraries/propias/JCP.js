//alert($.browser.version.substr(0,3));para saber la version, para el navegador $.browser devuelve el nombre

$.JCP = {
	Crear : function(NameSpace, arregloParametros, funcion){
		if($.JCP.temaCargado != true){
			this.CargarTema(NameSpace, arregloParametros, funcion);
		}	
		else if($.JCP[NameSpace] == undefined){
		        if(arregloParametros.tieneCss)
					this.EstiloXDefecto(NameSpace, arregloParametros, funcion);
				else{
				    if(arregloParametros.sincrono)						
						$.ajaxSetup({
							async: false
						});					
					this.CargarArchivo(NameSpace, arregloParametros, funcion);
					if(arregloParametros.sincrono)
						$.ajaxSetup({
							async: true
						});
				}
		}
		else{
		    var objeto = new $.JCP[NameSpace].crear(arregloParametros);
				if(arregloParametros.persistirObj != undefined)
					arregloParametros.persistirObj[NameSpace] = objeto;					
			if(funcion)
				funcion(objeto);
			return objeto;
		}
	},
	CargarArchivo : function(NameSpace, arregloParametros, funcion){
		 if(arregloParametros.jquery == true)
		 	var url = $.urlServer+'/application/libraries/jquery/'+NameSpace+'/'+NameSpace+'.js';
		 else
		    var url = $.urlServer+'/application/libraries/propias/'+NameSpace+'.js';	
		$.getScript(url,
	    function() {
			$.ajaxSetup({
				async: true
			});
		   $.JCP.Crear(NameSpace, arregloParametros, funcion);
		});
	},
	EstiloXDefecto : function(NameSpace, arregloParametros, funcion){ 
		if(arregloParametros.jquery == true)
		 	var url = $.urlServer+'/application/libraries/jquery/'+NameSpace+'/'+NameSpace+'.css';
		 else
		    var url = $.urlServer+'/application/libraries/propias/css/'+NameSpace+'.css';	
		$('<link rel="stylesheet"  type="text/css" href="'+url+'" />')		
		.appendTo($('head'))
		.ready(function(){	
		 arregloParametros.tieneCss = false;		
		  	 $.JCP.Crear(NameSpace, arregloParametros, funcion);		  
		 });
	},
	CargarTema : function(NameSpace, arregloParametros, funcion){ 
		/*if(arregloParametros.jquery == true)
		 	var url = $.urlServer+'/P2/application/libraries/jquery/'+NameSpace+'/'+NameSpace+'.css';
		 else*/
		    var url = $.urlServer+'/application/libraries/propias/css/temas/'+$.estilo.tema+'/estilo.css';	
		$('<link id="cssTema" rel="stylesheet"  type="text/css" href="'+url+'" />')		
		.appendTo($('head'))
		.ready(function(){	
		 	 $.JCP.temaCargado = true;		
		  	 $.JCP.Crear(NameSpace, arregloParametros, funcion);		  
		 });
	}
	
}


$.estilo = {
	width: 1286,
	height: 774,
	tema: 'azul'
}
//$.urlServer = "http://10.0.0.230/P2";
$.urlServer = (String(document.location)).split('/index.php')[0];
$.urlIconos = $.urlServer.split('/');
$.urlIconos = 'url("/'+$.urlIconos[$.urlIconos.length-1]+'/application/libraries/propias/imagenes/';
//$.urlIconos = 'url("/P2/application/libraries/propias/imagenes/';


$.fn.centrar = function(x, y, referencia){
    var elemento = $(this);
    if(x == undefined || x == true)
		x = true;
	if(y == undefined || y == true)
		y = true;
	if(elemento.css("position") == 'relative')	
		var padre = elemento.parent();	
	else 
		var padre = $('html');	
	if(referencia == undefined){
		var referenciaX = 0;
		var referenciaY = 0;
	}	
	else{		
		var referenciaX = padre.offset().left - referencia.offset().left;
		var referenciaY = padre.offset().top - referencia.offset().top;
	} 	
	/*elemento.css({
		position:'relative',		
	});*/
	if(x == true)
	elemento.css({
		left:padre.width()/2-elemento.width()/2	- referenciaX/2	
	});
	if(y)
	elemento.css({
		top:padre.height()/2-elemento.height()/2 - referenciaY/2			
	});		
}

$.fn.bloqSeleccionNav = function(){
	$(this).css({userSelect: 'none', OUserSelect: 'none', MozUserSelect: 'none', KhtmlUserSelect: 'none', WebkitUserSelect: 'none', MsUserSelect:'none'
				});
}


$.consultaAjax = {
    ejecutar : function(arregloParametros){
		var ajax = $.extend({}, this.opcionesDefecto, arregloParametros);
			ajax.url = $.urlServer+"/index.php/" + ajax.url;
		$.ajax(ajax);
	},
	opcionesDefecto :{
	 	type: 'POST',
		dataType: 'json',
		urlBase: $.urlServer+"/index.php/",
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


$.fn.declararEvento = function(eventos, valores, metodos, salva){
  for(var i =0; i< eventos.length; i++){
  	$(this).bind(eventos[i], function(e) {
//	    alert(e.keyCode);
		for(var j =0; j< valores.length; j++){	
			var tecla = e.keyCode;		
		    var valor = valores[j];
		    var metodo = metodos[j];
			if (valor == tecla) {
			   if(salva != undefined)
	       	 	 metodo(salva);
			   else	
			     metodo();		 
	    	}
		}
	    
    });
  }	
}

function validarFormulario(idFormulario){
	var retorno = true;
	var formulario = $('#'+idFormulario);
	var elementos = formulario.find('input:text').add(formulario.find('input:hidden')).add(formulario.find('textarea'));
		elementos.each(function(){
			if($(this).hasClass('obligatorio')){
				var campo = null;				
				if($(this).attr("type") == "text" && $(this).val() == ""){
					var campo = $(this)
					.bind('mousedown', function(){
						$(this)
						.removeClass('menTextVacio')
						.unbind('mousedown');
					});
				}
				else if($(this).attr("type") == "hidden" && $(this).val() == ""){			
					campo = $(this).parent().find('#vistaPrevia');
					$('#urlBanner')
					.bind('mousedown', function(){
						campo
						.removeClass('menTextVacio');
						$(this).unbind('mousedown');
					});
				}
				else if($(this).val() == ""){
					 campo = $(this).closest('div #ag').parent();
				}
				if(campo != null){
					campo.addClass('menTextVacio');
					retorno = false;
					setTimeout(function(){
						campo.removeClass('menTextVacio');			
					}, 20000);					
				}									
			}			
		});
		if(!retorno)
			MostrarVentana('Existen campos obligatorios vacios');
		return retorno;
}

function MostrarVentana(){
	var bloq = $('<div ></div>')
	.css({
		position:'absolute',
		zIndex:'499',
		height:'100%',
		width:'100%',
		backgroundColor:'black',
		opacity:'0.6',
	})
	.prependTo($('html'));
	var ventana = $('<div id="tbodyAdmin"></div>')
	.css({
		position:'absolute',
		zIndex:'500',
		width:300,
		height:200,
		padding:2
	})
	.prependTo($('html'));
	var titulo = $('<div class="tituloForm">Error</div>')
	.appendTo(ventana);
	var contenido = $('<div class="label">Debe completar los campos obligatorios.</div>')
	.css({
		height:'58%',
		padding:'3%',
		fontSize:18
	})
	.appendTo(ventana);
	var botones = $('<div ></div>')
	.css({
		width:'100%',
		height:'17%',
		borderTop:'1px solid black',
		paddingTop:2
	})
	.appendTo(ventana);
	$('<input type="button" value="Cerrar" class="botonCont">')
	.css({
		backgroundColor:'#666666',
		height:'100%',
		float:'right'
	})
	.click(function(){
		bloq.remove();
		ventana.remove();
	})
	.appendTo(botones);
	ventana.centrar();	
}

$(document).ready(function(){
		if($("#slider").length>0)	
			$("#slider").easySlider({
				auto: true, 
				continuous: true,
				numeric:true
			});
			
			
			if($('#tablaMensaje').attr("id") != undefined){
				$('#tablaMensaje').find('input:text')
				.add($('#tablaMensaje').find('textarea'))
				.click(function(){
					if($(this).val() == $(this).attr("name")){
						$(this).val("");
						if($(this).parent().parent().next().attr('id') == 'err'+$(this).attr("id")) 
							$(this).parent().parent().next().remove();
					}					
				})
				.blur(function(){		
					if($(this).val() == "")
						$(this).val($(this).attr("name"));
				});
				$('#btnCerrar').click(function(){
					$('#tablaMensaje').find('input:text')
					.add($('#tablaMensaje').find('textarea'))
					.each(function(){
						$(this).val($(this).attr("name"));
					})
				});
			}
			
			
			$('#masNoticias')
			.click(function(){
				if(!$(this).hasClass("desact")){
					$(this).addClass("desact");
				if($('.visib').next().attr("id") == undefined){
					$.consultaAjax.ejecutar({
										url: 'c_inicio/DevolverNoticiasAjax',
										data:{
											posInicial : $('#posInicial').val()	
										},
										accionCorrecta: MostrarRestoNoticias						
										});
				}
				else{
					$('.visib').next().css("visibility", "inherit");
					$('#contNoticias')
					.animate({
						top : $('#contNoticias').offset().top - $('#contNoticias').parent().offset().top - $('.visib').height()-10
					}, function(){
						$('.visib')
						.removeClass('visib')
						.next()
						.addClass('visib');
						
						var exceso = parseInt($('.visib').offset().top) - parseInt($('#contNoticias').parent().offset().top);
//					
					if(exceso <3 )
						$('#contNoticias').css({top: $('#contNoticias').offset().top -$('#contNoticias').parent().offset().top - exceso});
						$('.visib').prev().css("visibility", "hidden");
						if($('.visib').next().attr("id") != undefined){
							$('#masNoticiasArr').next().fadeIn();
							$('#masNoticiasArr').fadeIn();
						}
						$('#masNoticias').removeClass("desact");
					});					
				  }	
			   }							
			});
			
			$('#masNoticiasArr')
			.click(function(){				
				if(!$(this).hasClass("desact") && $('.visib').prev().length>0){
					$(this).addClass("desact");
					$('.visib').prev().css("visibility", "inherit");
					$('#contNoticias')				
					.animate({
						top :$('#contNoticias').offset().top - $('#contNoticias').parent().offset().top + $('.visib').prev().height()
					}, function(){
						$('.visib')
						.removeClass('visib')
						.prev()
						.addClass('visib');
						var exceso = parseInt($('.visib').offset().top + $('.visib').height()) - parseInt($('#contNoticias').parent().offset().top + $('#contNoticias').parent().height());
	//					
						if(exceso > 0 )
							$('#contNoticias').css({top: $('#contNoticias').offset().top -$('#contNoticias').parent().offset().top - exceso});
						$('.visib').next().css("visibility", "hidden");
						if($('.visib').prev().attr("id") == undefined){
							$('#masNoticiasArr').next().fadeOut();
							$('#masNoticiasArr').fadeOut();
						}
						$('#masNoticiasArr').removeClass("desact")
					});
				}				
			});
			
			function MostrarRestoNoticias(data){
				if(data.noticias.length>0){
					$('#posInicial').val(data.posInicial);
					var nuevoDiv = $('#contNoticias').clone();
					var tabla = nuevoDiv.find('.visib');
					var filaSalva = tabla.find('tr:first').clone();
					var leerSalva = tabla.find('tr:eq(1)').clone();
					tabla.children().remove();
					for(var i=0; i < data.noticias.length; i++){					
						fila = filaSalva.clone();
						fila.find('div .titMinCal').text(data.noticias[i].mes);
						fila.find('div .contMiniCal').text(data.noticias[i].dia);				
						fila.find('td:eq(1)').find('p').text(data.noticias[i].noticia);;
						fila.appendTo(tabla);
						leer = leerSalva.clone();
						leer.find('a').attr("href", $.urlServer+"/index.php/c_inicio/MostrarNoticia/"+data.noticias[i].id);
						leer.appendTo(tabla);
					}
					$('#contenidoLatNot')
					.css({
						height:$('#contenidoLatNot').height(),
						overflow:'hidden'
						
					})
					tabla.appendTo($('#contNoticias'));
					$('#contNoticias')
					.animate({
						top : $('#contNoticias').offset().top - $('#contNoticias').parent().offset().top - $('.visib').height()
					}, function(){
						$('.visib')
						.removeClass('visib')
						.next()
						.addClass('visib');
						var exceso = parseInt($('.visib').offset().top + $('.visib').height()) - parseInt($('#contNoticias').parent().offset().top + $('#contNoticias').parent().height());
	//					
						if(exceso > 0 )
							$('#contNoticias').css({top: $('#contNoticias').offset().top -$('#contNoticias').parent().offset().top - exceso});
						
						$('.visib').prev().css("visibility", "hidden");
						
						if(!$('#masNoticiasArr').is(':visible')){
							$('#masNoticiasArr').fadeIn('fast');
							$('#masNoticiasArr').next().fadeIn();
						}							
						$('#masNoticias').removeClass("desact");	
					});				
										
				}
				else{
					$('#masNoticias').removeClass("desact");
				}				
			}
		
			
});	
		function enviarMensaje(){
			var ok = true;
			$('#tablaMensaje')
			.find('input:text')
			.add($('#tablaMensaje').find('textarea'))
			.each(function(){
				 if(!VeriricarCampo($(this)))
				 	ok = false;
			});	
				if(ok)
					$.consultaAjax.ejecutar({
							url: 'c_inicio/AdicionarMensaje',
							data: {nombre:$('#nombre').val(),email:$('#email').val(),tel:$('#telefono').val() != $('#telefono').attr("name")?$('#telefono').val():"", texto:$('#mensaje').val()},
//							persistir:true,
							accionCorrecta: mensajeAddicionado						
					});
		}
			
		function mensajeAddicionado(){
			
		}
		
		function VeriricarCampo(campo){
			if(!campo.parent().hasClass('noObl')){
				if(campo.val()== "" || (campo.val() == campo.attr("name"))){
					crearMensajeFlotante(campo);
					return false;
				}					
			}
			return true;	
		}
		
		function crearMensajeFlotante(campo ){
			if(campo.parent().parent().next().attr('id') != 'err'+campo.attr("id")) {
				var clone = campo.parent().parent().clone()
				.addClass('menFlot')
				.attr('id','err'+campo.attr("id"))
				.text("El campo "+campo.attr("name")+" es obligatorio")
				.insertAfter(campo.parent().parent());
				setTimeout(function(){
					clone
					.remove();				
				}, 20000);
			}
		}
		
			