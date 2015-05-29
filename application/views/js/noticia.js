$(function()
{
	if($('html').find('title').text() == 'Adicionar Noticia' || $('html').find('title').text() == 'Editar Noticia'  ){
		$('#textA').cleditor({
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
								 padre : $('#contListadoNoticias'),
								 tituloTabla : 'Listado de Noticias',
								 idTabla : 'listado_noticias',
								 add : false,
								 btnAdicionar:false,
								 btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_noticia/EditarNoticia'
								 }],
								 urls:{
								 	listar:'c_noticia/DevolverListadoNoticiasAjax',
									eliminar:'c_noticia/EliminarNoticia'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : [{
										name: 'Titulo',
										campo: 'titulo',
										ord: true
//										name:  Array('Titulooo', 'Subtitulo', 'Publicado' , 'Fecha')
									},{
										name: 'Subtitulo',
										campo: 'subtitulo',
										ord: true
//										name:  Array('Titulooo', 'Subtitulo', 'Publicado' , 'Fecha')
									},{
										name: 'Publicado',
										campo: 'publicado'
//										name:  Array('Titulooo', 'Subtitulo', 'Publicado' , 'Fecha')
									},{
										name: 'Fecha',
										campo: 'fecha',
										ord: true
//										name:  Array('Titulooo', 'Subtitulo', 'Publicado' , 'Fecha')
									}]								 	
								 },
								 cantXPag: {
								 	valores: Array("10","20","60","80")
								 },
								 consultaListar:{
								 		datosEnvio: {
										    cantXPag: 10,
										    inicio : 1,
											ordX : 'fecha',
											dir: 'asc'
										},
										idFila: 'id_noticia'
//										datosRetorno: {
//										campos : Array('id_noticia', 'titulo', 'subtitulo', 'publicado', 'fecha')
//										}
								 },								 
								 vacio: {
								 	mensajeVacio: 'No hay noticias que listar'
								 },		 								
					});
	}
});



// JavaScript Document
/*$(function()
{
	if($('html').find('title').text() == 'Adicionar Noticia' || $('html').find('title').text() == 'Editar Noticia'  ){
		$('#textA').cleditor({
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
								 padre : $('#contListadoNoticias'),
								 tituloTabla : 'Listado de Noticias',
								 idTabla : 'listado_noticias',
								 add : false,
								 btnAdicionar:false,
								 btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_noticia/EditarNoticia'
								 }],
								 urls:{
								 	listar:'c_noticia/DevolverListadoNoticiasAjax',
									eliminar:'c_noticia/EliminarNoticia'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : {
										names:  Array('Titulooo', 'Subtitulo', 'Publicado' , 'Fecha')
									}								 	
								 },
								 cantXPag: {
								 	valores: Array("10","20","60","80")
								 },
								 consultaListar:{
								 		datosEnvio: {
										    cantXPag: 10,
										    inicio : 1,
											ordX : 'fecha',
											dir: 'asc'
										},
										datosRetorno: {
										campos : Array('id_noticia', 'titulo', 'subtitulo', 'publicado', 'fecha')
										}
								 },								 
								 vacio: {
								 	mensajeVacio: 'No hay noticias que listar'
								 },		 								
					});
	}
});*/