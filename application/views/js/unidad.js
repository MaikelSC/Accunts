// JavaScript Document
$(function()
{
	if($('title').text() == 'Adicionar Unidad' || $('html').find('title').text() == 'Editar Unidad'){
		var parametros = {
			  datosGenerales: {	
			  		padre : $('#cuerpo'),
//	                fieldset:true,
					titulo:"Adicionar Unidad",
					id:'gestionarnoticia',
					css: {
						width: '70%',
					},
//					align:'left',
					columnas : 2,
					entidades:{
						adicionar:['nombre','direccion','telefono','codigo_postal','director','id_municipio'],
						mostrar:['nombre','direccion','telefono','codigo_postal','director','id_municipio'],
						editar:['nombre','direccion','telefono','codigo_postal','director','id_municipio']
					}
				},	
				vistas:{
					adicionar:{
						titulo: 'Adicionar Unidad',
						elementos: [{
					   		label: 'Nombre',
							id: 'nombre',
							tipo: 1,
							oblig: true,	
				   		},{
							label: 'Dirección',
							id: 'direccion',
							tipo: 1,
							oblig: true,
						},{
							label: 'Director',
							id: 'director',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo letras',
									maxOcurrencias: 4
								}],
							}		
						},{
							label: 'Teléfono',
							id: 'telefono',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /\d/,
									mensaje: 'Este campo acepta solo números',
									maxOcurrencias: 4
								},{
									evento: 'keydown',
									cantidad: 7,
									mensaje: 'Este campo no puede exceder 7 digitos',
									maxOcurrencias: 4
								}],
								eventos:[{
										evento: 'focusout',
										cantSalida: 7,
										mensaje: 'Este campo debe tener 7 digitos'
								}]
							}
								
						},{
							label: 'Codigo Postal',
							id: 'codigo_postal',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas: [{
									evento: 'keypress',
									expresion: /\d/,
									mensaje: 'Este campo acepta solo números',
									maxOcurrencias: 4
								}]
							}	
						},{
							label: 'municipio',
							id: 'id_municipio',
							tipo: 2.1,
							oblig: true	
						}],
						url: 'c_unidad/AdicionarUnidad'
					},
					mostrar: {
						titulo: 'Mostrar Unidad',
						elementos: [{
					   		label: 'Nombre',
							id: 'nombre',
							tipo: 4,		
				   		},{
							label: 'Direccion',
							id: 'direccion',
							tipo:4,
						},{
							label: 'Director',
							id: 'director',
							tipo: 4
						},{
							label: 'Teléfono',
							id: 'telefono',
							tipo: 4
						},{
							label: 'Código Postal',
							id: 'codigo_postal',
							tipo: 4,
						},{
							label: 'Municipio',
							id: 'id_municipio',
							tipo: 4,
						}],
						url: 'c_unidad/DevolverUnidad',
						id_elemento: 'id_unidad'
					},
					editar:{
						titulo: 'Editar Noticia',
						elementos: [{
					   		label: 'Nombre',
							id: 'nombre',
							tipo: 1,
							oblig: true,	
				   		},{
							label: 'Dirección',
							id: 'direccion',
							tipo: 1,
							oblig: true,
						},{
							label: 'Director',
							id: 'director',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo letras',
									maxOcurrencias: 4
								}],
							}		
						},{
							label: 'Teléfono',
							id: 'telefono',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /\d/,
									mensaje: 'Este campo acepta solo números',
									maxOcurrencias: 4
								},{
									evento: 'keydown',
									cantidad: 7,
									mensaje: 'Este campo no puede exceder 7 digitos',
									maxOcurrencias: 4
								}],
								eventos:[{
										evento: 'focusout',
										cantSalida: 7,
										mensaje: 'Este campo debe tener 7 digitos'
								}]
							}
								
						},{
							label: 'Codigo Postal',
							id: 'codigo_postal',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas: [{
									evento: 'keypress',
									expresion: /\d/,
									mensaje: 'Este campo acepta solo números',
									maxOcurrencias: 4
								}]
							}	
						},{
							label: 'municipio',
							id: 'id_municipio',
							tipo: 2.1,
							oblig: true	
						}],
						url: 'c_unidad/EditarUnidad',
						id_elemento: 'id_unidad'
					}										  	
			  },										 
		};
		if($('title').text() == 'Editar Unidad'){
			parametros.datosGenerales.editar = {
				url: 'c_unidad/DevolverUnidad',
				id: $('#idElemento').val()
			}
		}
			
		$.JCP.Crear('formulario', parametros);
	
		/*var urls = $('#vistaPrevia').attr("src").split('/');
		if(urls[urls.length-2]+'/'+urls[urls.length-1] == 'imagenes/no1.jpg' ){
			$('#urlFoto').val("");
		}
		
		$('#urlBanner').click(function(){*/
				 /*var bloqueador = $('<div id="bloq" ></div>').prependTo($('html'));
				bloqueador.css({
				     position:'absolute',
				     width:'100%',
				     height:'100%',
					 backgroundColor:'black',
					 opacity:0.5,
				     zIndex:4
				    });
				var padreUpload = $('<div/>')
				.css({
					position:'absolute',
					zIndex:5,
					left:$('html').width()/2-270,
					top:$('html').height()/2-310,
				})
				.prependTo($('html'));
				
				$('html').declararEvento(Array("keypress"), Array("27"), Array(function(){bloqueador.remove();padreUpload.remove();$('html').unbind('keypress');}));
					$.JCP.Crear('upload', {
		                      padre : padreUpload,
							  id : 'Unidades',
							  id_imagen: 'id_banner',
							  css : {width:640,height:320},
							  urls:{
							  	 listar : 'c_unidad/DevolverBannerUnidades',
								 adicionar : 'c_unidad/GuardarBannerUnidad',
								 eliminar : 'c_unidad/EliminarBannerUnidad'
							  },
							  metodoBotonAccionar: function(imagenes){	
							  		imagenes.each(function(e){
										$('#bannerUrl').text($(this).attr("src").split('/')[$(this).attr("src").split('/').length-1]);
										$('#vistaPrevia')
										.css({
											width:'60%',
											marginLeft:'20%',
											height:55
										})
										.attr("src", $(this).attr("src"));
										$('#urlFoto').val($('#bannerUrl').text());
										return;
									});		  		
							  		
							  },							  
							  tieneCss: true
					});bloqueador.height($('html').height());
									   });
		
			$('#textAUnid').cleditor({
		    width:'99.5%',
			height:'300',
			urlsUpload:{
			  	 listar : 'c_noticia/DevolverImagenesNoticias',
				 adicionar : 'c_noticia/GuardarImagenNoticia',
				 eliminar : 'c_noticia/EliminarImagenNoticia'
			},
		});*/
	}
	else{
			$.JCP.Crear('listado',{
								 padre : $('#contList'),
								 tituloTabla : 'Listado de Unidades',
								 idTabla : 'listado_unidades',
//								 add : false,
								 btnAdicionar:false,
								 btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_unidad/Editar'
								 }],
								 urls:{
								 	listar:'c_unidad/ListarUnidadesAjax',
									eliminar:'c_unidad/EliminarUnidad'
								 },
								 redimencionar: false,
								 estructura: {
									 	columnas: [{
											name: 'Nombre',
											id: 'nombre',
											ord: true
										},{
											name: 'Director',
											id: 'director',
											ord: true
										},{
											name: 'Teléfono',
											id: 'telefono',
											ord: true
										},{
											name: 'Código Postal',
											id: 'codigo_postal',
											ord: true
										},{
											name: 'Municipio',
											id: 'id_municipio',
											ord: true
										}/*,{
											name: 'Privilegio',
											id: 'id_privilegio',
											ord: true
									 	}*/]
								 },								
								 cantXPag: {
								 	valores: Array("10","3","30","40")
								 },
								 consultaListar:{
								 		datosEnvio: {
										    cantXPag: 10,
										    inicio : 1,
											ordX : 'nombre',
											dir: 'asc'
										},
										idFila: 'id_unidad'
								 },						 
								 vacio: {
								 	mensajeVacio: 'No hay unidades que listar'
								 },		 								
					});
	}	
});