function MostrarFormulario(){

   $('#cuerpo').children().remove();
   var elementos =  
		[{
	   		label: 'Fecha',
			id: 'fecha',
			tipo: 2,		
   		},{
			label: 'Titulo',
			id: 'titulo',
			tipo: 2,
		},{
			label: 'Nombre',
			id: 'nombre',
			tipo: 1,
		}];
   
  
//   var expreg = Array(/\w/, /\w/,/\w/,/\w/);
  
   var urls = {
   		adicionar: 'c_nomenclador/Formulario',
		cargarEditar: 'c_noticia/DevolverFormulario',
		guardar:'c_noticia/EditarFormulario'
   };
   
   
   
    var noticia = $.JCP.Crear('formulario', {
  										  datosGenerales: {	
										  		padre : $('#cuerpo'),
//	                                            fieldset:true,
												titulo:"Crear Noticia",
												id:'gestionarnoticia',
												align:'left',
												columnas : 2,
												urls: urls,
												entidades:{
													adicionar:['id_municipio','nombre','fecha'],
													mostrar:['id_municipio', 'nombre', 'fecha'],
													editar:['id_municipio', 'nombre', 'fecha']
												}
											},	
											vistas:{
												adicionar:{
													titulo: 'Adicionar Noticia',
													elementos: [{
												   		label: 'Fecha',
														id: 'fecha',
														tipo: 1.3,		
											   		},{
														label: 'Municipio',
														id: 'id_municipio',
														tipo: 2.1,
													},{
														label: 'Nombre',
														id: 'nombre',
														tipo: 1,
													}],
													url: 'c_nomenclador/Formulario'
												},
												mostrar: {
													titulo: 'Mostrar Noticia',
													elementos: [{
												   		label: 'Fecha',
														id: 'fecha',
														tipo: 4,		
											   		},{
														label: 'Titulo',
														id: 'id_municipio',
														tipo: 4,
													},{
														label: 'Nombre',
														id: 'nombre',
														tipo: 4,
													}],
													url: 'c_nomenclador/DevolverFormulario',
													id_elemento: 'id_formulario'
												},
												editar:{
													titulo: 'Editar Noticia',
													elementos: [{
												   		label: 'Fecha',
														id: 'fecha',
														tipo: 1.3,		
											   		},{
														label: 'Titulo',
														id: 'id_municipio',
														tipo: 2.1,
													},{
														label: 'Nombre',
														id: 'nombre',
														tipo: 1,
													}],
													url: 'c_nomenclador/EditarFormulario',
													id_elemento: 'id_formulario'
												}
//											    names : labels,
//											    ids : ids,
//												expreg: expreg										  	
										  },
//										  hijos: elementos
										  /*{
										  hijos:[/*{
										        fieldset:false,
												titulo:"Crear Noticia",
												id:'crearnoticia',
												align:'left',
												tipos : tipos,
												columnas : 1,
											    names : labels,
											    ids : ids,
												expreg: expreg
//										        }] */
   										});
										
   
   
   
   
 /* var noticia = $.JCP.Crear('formulario', {
  										  datosGenerales: {	
	                                          padre : $('#td_interior'),
											  id : 'gestionarNoticia',
											  titulo : "Adicionar Noticia",
											  css : undefined,
											  tipos: Array('tabla','tabla'),
										      columnas : 2,
											  urls : urls,										  	
										  },
										  hijos:[{
										        fieldset:false,
												titulo:"Crear Noticia",
												id:'crearnoticia',
												align:'left',
												tipos : tipos,
												columnas : 1,
											    names : labels,
											    ids : ids,
												expreg: expreg
										        },{
												fieldset:true,
												titulo: "Crear1 Noticia1",
												id: 'crearnoticia1',
												align:'right',
												columnas :  1,
												tipos : tipos1,
											    names : labels1,
											    ids : ids1,
												expreg: expreg1	
												}] 
   										},
										NoticiaPosterior);
										*/
}
function NoticiaPosterior(noticia){
    noticia.idObj = 'id_noticia';
    noticia.setEntidad(Array('titulo', 'fecha', 'contenido', 'importancia', 'titulo1', 'fecha1'));
	
	noticia.construirFormulario();
	var datosMostrar = {
		titulo: 'Mostrar Noticia',
		hijos : Array({
		   			titulo: 'Mostrar Crear Noticia',
					tipos: Array(1,1.3,1,1,1.3),
					names: Array('Titulooo', 'Fecha', 'Comentario', 'Importancia', 'Fecha2'),
					ids: Array('titulo', 'fecha', 'contenido', 'importancia', 'fecha2'),
				}, null)
		
	};
	noticia.setVistaMostrar(datosMostrar);
	var datosCargarEditar = {
		titulo: 'Editar Noticia',
		hijos : Array({
		   			titulo: 'Editar Noticia555'
				}, null)
		
	};
	noticia.setCargarEditar(datosCargarEditar);
//	noticia.setEntidadCargarEditar(Array('titulo', 'fecha', 'contenido'));
//alert(noticia.aqui);
	
//	alert('asdf');
//	var textarea = $('<textarea>sdf</textarea>').appendTo($('body'));
	/*var a = $.JCP.Crear('cleditor',{
	                                      padre:$('body'),
										  tieneCss: true,
	                                      jquery:true,
		                                  width:300
	                                      }
	);*/
	
	/*var upload = $.JCP.Crear('upload', {
                                          padre : $('body'),
										  id : 'cargarImagenes',
										  titulo : "Cargar Imagenes",
										  css : undefined,
										  url : 'c_administrador/DevolverImagenes',
										  mensajeVacio: 'No hay imagenes para mostrar'  
   										},
										UploadPosterior);*/
										
}

function UploadPosterior(upload){
	upload.construirUpload();
}
