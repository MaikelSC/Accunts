// JavaScript Document
$(function()
{
	if($('html').find('title').text() == 'Adicionar Experiencia' || $('html').find('title').text() == 'Editar Experiencia'){
		var urls = $('#vistaPrevia').attr("src").split('/');
		if(urls[urls.length-2]+'/'+urls[urls.length-1] == 'imagenes/no1.jpg' ){
			$('#urlFoto').val("");
		}
			
		
		$('#urlBanner').click(function(){
				 var bloqueador = $('<div id="bloq" ></div>').prependTo($('html'));
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
							  id : 'Experiencias',
							  id_imagen: 'id_foto_exp',
							  css : {width:640,height:320},
							  urls:{
							  	 listar : 'c_experiencia/DevolverFotosExperiencias',
								 adicionar : 'c_experiencia/GuardarFotoExperiencia',
								 eliminar : 'c_experiencia/EliminarFotoExperiencia'
							  },
							  metodoBotonAccionar: function(imagenes){	
							  		imagenes.each(function(e){
										var name = $(this).attr("src").split('/')[$(this).attr("src").split('/').length-1];
											name = name.split('.')[0];
										$('#bannerUrl')
										.text(name);
										$('#vistaPrevia')
										.css({
											width:'80%',
											marginLeft:'10%',
											height:90
										})
										.attr("src", $(this).attr("src"));
										$('#urlFoto').val($('#bannerUrl').text());
										return;
									});		  		
							  		
							  },							  
							  tieneCss: true
					});bloqueador.height($('html').height());
									   });
		
			$('#textAExp').cleditor({
		    width:'99.5%',
			height:'300',
			urlsUpload:{
			  	 listar : 'c_noticia/DevolverImagenesNoticias',
				 adicionar : 'c_noticia/GuardarImagenNoticia',
				 eliminar : 'c_noticia/EliminarImagenNoticia'
			},
		});
	}
	else{
			$.JCP.Crear('listado',{
								 padre : $('#contListadoExperiencias'),
								 tituloTabla : 'Listado de Experiencias',
								 idTabla : 'listado_experiencias',
								 add : false,
								 btnAdicionar:false,
								  btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_experiencia/EditarExperiencia'
								 }],
								 urls:{
								 	listar:'c_experiencia/DevolverListadoExperienciasAjax',
									eliminar:'c_experiencia/EliminarExperiencia'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : {
										names:  Array('Nombre', 'Unidad', 'Email'),
									}								 	
								 },
								 cantXPag: {
								 	valores: Array("10","20","30","40")
								 },
								 consultaListar:{
								 		datosEnvio: {
										    cantXPag: 10,
										    inicio : 1,
											ordX : 'nombre',
											dir: 'asc'
										},
										datosRetorno: {
										campos : Array('id_experiencia', 'nombre', 'unidad', 'email')
										}
								 },							 
								 vacio: {
								 	mensajeVacio: 'No hay unidades que listar'
								 },		 								
					});
	}	
});