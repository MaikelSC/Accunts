// JavaScript Document
$(function(){

			$.JCP.Crear('listado',{
								 padre : $('#contListadoMensajes'),
								 tituloTabla : 'Listado de Mensajes',
								 idTabla : 'listado_mensajes',
								 add : false,
								 btnAdicionar:false,
								 urls:{
								 	listar:'c_mensaje/DevolverListadoMensajesAjax',
									eliminar:'c_mensaje/EliminarMensaje'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : {
										names:  Array('Nombre', 'Email', 'Telefono'),
									}								 	
								 },
								 cantXPag: {
								 	valores: Array("10","20","40","80")
								 },
								 consultaListar:{
								 		datosEnvio: {
										    cantXPag: 10,
										    inicio : 1,
											ordX : 'nombre',
											dir: 'asc'
										},
										datosRetorno: {
										campos : Array('id_mensaje', 'nombre', 'email', 'telefono')
										}
								 },								 
								 vacio: {
								 	mensajeVacio: 'No hay mensajes que listar'
								 },	
								 filaOnClick : CargarTextoMensaje,
								 filaOnClickDestuir: OcultarTextMensaje								
					});	
});

function CargarTextoMensaje(id, numMen){
		$.consultaAjax.ejecutar({
					url: 'c_mensaje/DevolverTextoMensaje',
					data: {id:id},
					persistir: numMen,
					accionCorrecta: MostrarResultMensaje						
		});
} 

function MostrarResultMensaje(mensaje, numMen){
	$('#textoMensaje').find('.fm-titulo').text("Texto del mensaje numero "+numMen);
	$('#intTexMen').find('textarea').val(mensaje);
	if(!$('#textoMensaje').is(':visible')){
		$('#textoMensaje').fadeOut(1, function(){
			$('#cuerpoInt').css({
			display:'inline-block',	
			})
			.animate({
				height:$('#cuerpoInt').height()+ $('#textoMensaje').height()+26
			});
		})
		
	}
	$('#textoMensaje').fadeIn();
}

function OcultarTextMensaje(){
	if($('#textoMensaje').is(':visible')){
		$('#cuerpoInt').css({
			display:'inline-block',
		})
		.animate({
			height:$('#cuerpoInt').height()- $('#textoMensaje').height()-26
		}, function(){$('#textoMensaje').css("display", "none");});
	}
	
	
}