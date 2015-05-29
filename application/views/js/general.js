// JavaScript Document
$(function()
{
	if($('html').find('title').text() == 'Adicionar Elemento' || $('html').find('title').text() == 'Editar Elemento'){		
		$('#textAGener').cleditor({
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
								 padre : $('#contListadoGenerales'),
								 tituloTabla : 'Listado de Generales',
								 idTabla : 'listado_generales',
								 add : false,
								 btnAdicionar:false,
								 btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_general/EditarGeneral'
								 }],
								 urls:{
								 	listar:'c_general/DevolverListadoGeneralesAjax',
									eliminar:'c_general/EliminarGeneral'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : {
										names:  Array('Nombre'),
									}								 	
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
										datosRetorno: {
										campos : Array('id_general', 'nombre')
										}
								 },						 
								 vacio: {
								 	mensajeVacio: 'No hay elementos que listar'
								 },		 								
					});
	}	
});