$(document).ready(function(){  

//	MostrarFormulario();
	      
		var atrib = {
			padre: $('#contAcord'),
			urls: {
				listarTodos: 'c_nomenclador/ListarNomencladores',
			},
			funcionClick: CargarNomenclador			
//			items : DevolverMenu()
		}; 
        
	   
	    $.JCP.Crear('acordion1', atrib);		
		

});

function CargarNomenclador(nomenclador){
	$.consultaAjax.ejecutar({
				url: 'c_nomenclador/DefinirFilaEditar',
				data: {nomenclador : nomenclador},
				persistir: nomenclador,
				accionCorrecta: CrearListadoNomenclador
			});
}

function CrearListadoNomenclador(data, nomenclador){
	$('#contList').empty();
	if(data.editar){
		var editar = {
			elementos : [],
			objeto : nomenclador
		};
		for(var i=0;i<data.campos.length;i++){
			var aux = data.campos[i];
				aux.ord = true;
				editar.elementos.push(aux);
		}
	}
	$.JCP.Crear('listado',{
								 padre : $('#contList'),
								 tituloTabla : 'Listado de Noticias',
								 idTabla : 'listado_'+nomenclador,
								 add : true,
//								 btnAdicionar:true,
								 btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_nomenclador/EditarNomenclador'
								 }],
								 urls:{
								 	editar: 'c_nomenclador/EditarNomenclador',
								 	listar:'c_nomenclador/ListarDatosNomenclador',
									eliminar:'c_nomenclador/EliminarNomenclador'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : data.campos								 	
								 },
								 cantXPag: {
								 	valores: Array("10","20","60","80")
								 },
								 consultaListar:{
								 		datosEnvio: {
//										    cantXPag: 10,
										    inicio : 1,
											ordX : 'valor',
											dir: 'asc',
											nomenclador: nomenclador
										},
										idFila: 'id_noticia'
//										datosRetorno: {
//										campos : Array('id_noticia', 'titulo', 'subtitulo', 'publicado', 'fecha')
//										}
								 },
								 consultaAdicionar:{
								 	    datosEnvio:editar,
//											tipos: Array(1, 1),
//											ids: Array( 'valor'),
//											names : Array('Titulooo', 'Fecha', 'Comentario' , 'Importancia', 'titulo1', 'Fecha2'), 
//										},
										/*datosRetorno:{
											tipos:Array(1, 1.3, 1, 1, 1, 1.3),
											ids: Array( 'valor')
										}*/	
								 },
								 multiObjeto: true,
								 nomencladorMultiObj: nomenclador,								 
								 vacio: {
								 	mensajeVacio: 'No hay elementos que listar'
								 },		 								
					});
}