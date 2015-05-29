$(document).ready(function(){
	if($('title').text() == 'Adicionar Usuario' || $('title').text() == 'Editar Usuario'){
		var parametros = {
			  datosGenerales: {	
			  		padre : $('#cuerpo'),
//	                fieldset:true,
					titulo:"Adicionar Usuario",
					id:'gestionarnoticia',
					css: {
						width: '70%',
					},
//					align:'left',
					columnas : 2,
					entidades:{
						adicionar:['nombre','primer_apellido','segundo_apellido','usuario','contrasena','confirm','id_privilegio','telefono','email'],
						mostrar:['id_usuario', 'nombre','primer_apellido','segundo_apellido','usuario','contrasena','id_privilegio','telefono','email'],
						editar:['nombre','primer_apellido','segundo_apellido','usuario','contrasena','confirm','id_privilegio','telefono','email']
					}
				},	
				vistas:{
					adicionar:{
						titulo: 'Adicionar Usuario',
						elementos: [{
					   		label: 'Nombre',
							id: 'nombre',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo letras'
								}],
							}	
				   		},{
							label: 'Primer Apellidos',
							id: 'primer_apellido',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo letras'
								}],
							}	
						},{
							label: 'Segundo Apellido',
							id: 'segundo_apellido',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo letras'
								}],
							}	
						},{
							label: 'Usuario',
							id: 'usuario',
							tipo: 1,
							oblig: true,
							validacion:{
								eventos:[{
									evento: 'focusout',
									url: 'c_usuario/validarUsuario',
									mensaje: 'Este usuario ya esta registrado'
								}]
								
							}	
						},{
							label: 'Contraseña',
							id: 'contrasena',
							tipo: 1.1,
							oblig: true,
							validacion: {
								eventos: [{
									evento: 'focusout',
									campoIgual: {id: 'confirm', mensaje: true},
									mensaje: 'Las contraseñas no coinciden'
								}]
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
							label: 'Confirmar Contraseña',
							id: 'confirm',
							tipo: 1.1,
							oblig: true,
							validacion: {
								eventos: [{
									evento: 'focusout',
									campoIgual: {id: 'contrasena', mensaje: false},
									mensaje: 'Las contraseñas no coinciden'
								}]
							}	
						},{
							label: 'E-mail',
							id: 'email',
							tipo: 1,
							oblig: true,
							validacion: {
								eventos: [{
									evento: 'focusout',
									expresion: /^(.+\@.+\.+sld.cu)$/,
									mensaje: 'Dirección de correo no válida'
								}]
							}	
						},null,{
							label: 'Privilegio',
							id: 'id_privilegio',
							tipo: 2.1,
							oblig: true	
						}],
						url: 'c_usuario/AdicionarUsuario'
					},
					mostrar: {
						titulo: 'Mostrar Noticia',
						elementos: [{
					   		label: 'Nombre',
							id: 'nombre',
							tipo: 4,		
				   		},{
							label: 'Primer Apellidos',
							id: 'primer_apellido',
							tipo:4,
						},{
							label: 'Segundo Apellido',
							id: 'segundo_apellido',
							tipo: 4
						},{
							label: 'Usuario',
							id: 'usuario',
							tipo: 4							
						},{
							label: 'Teléfono',
							id: 'telefono',
							tipo: 4
						},{
							label: 'E-mail',
							id: 'email',
							tipo: 4,
						},null,{
							label: 'Privilegio',
							id: 'id_privilegio',
							tipo: 4,
						}],
						url: 'c_usuario/DevolverUsuario',
						id_elemento: 'id_usuario'
					},
					editar:{
						titulo: 'Editar Noticia',
						elementos: [{
					   		label: 'Nombre',
							id: 'nombre',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo números'
								}],
							}	
				   		},{
							label: 'Primer Apellidos',
							id: 'primer_apellido',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo números'
								}],
							}	
						},{
							label: 'Segundo Apellido',
							id: 'segundo_apellido',
							tipo: 1,
							oblig: true,
							validacion: {
								teclas : [{
									evento: 'keypress',
									expresion: /[a-zA-Z]/,
									mensaje: 'Este campo acepta solo números'
								}],
							}	
						},{
							label: 'Usuario',
							id: 'usuario',
							tipo: 1,
							oblig: true,
							validacion:{
								eventos:[{
									evento: 'focusout',
									url: 'c_usuario/validarUsuario',
									mensaje: 'Este usuario ya esta registrado'
								}]
								
							}	
						},{
							label: 'Contraseña',
							id: 'contrasena',
							tipo: 1.1,
							validacion: {
								eventos: [{
									evento: 'focusout',
									campoIgual: 'confirm',
									mensaje: 'Las contraseñas no coinciden'
								}]
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
							label: 'Confirmar Contraseña',
							id: 'confirm',
							tipo: 1.1,
							validacion: {
								eventos: [{
									evento: 'focusout',
									campoIgual: 'contrasena',
									mensaje: 'Las contraseñas no coinciden'
								}]
							}
						},{
							label: 'E-mail',
							id: 'email',
							tipo: 1,
							oblig: true,
							validacion: {
								eventos: [{
									evento: 'focusout',
									expresion: /^(.+\@.+\.+sld.cu)$/,
									mensaje: 'Dirección de correo no válida'
								}]
							}	
						},null,{
							label: 'Privilegio',
							id: 'id_privilegio',
							tipo: 2.1,
							oblig: true	
						}],
						url: 'c_usuario/EditarUsuario',
						id_elemento: 'id_usuario'
					}										  	
			  },										 
		};
		if($('title').text() == 'Editar Usuario'){
			parametros.datosGenerales.editar = {
				url: 'c_usuario/DevolverUsuario',
				id: $('#idElemento').val()
			}
		}
			
		$.JCP.Crear('formulario', parametros);
	}
	else if($('title').text() == 'Listar Usuarios'){
		$.JCP.Crear('listado',{
								 padre : $('#contList'),
								 tituloTabla : 'Listado de Usuarios',
								 idTabla : 'listado_usuarios',
//								 add : true,
//								 btnAdicionar:true,
								 btnAdicional :[{
								 	value  : 'Editar',
									href : 'c_usuario/Editar'
								 }],
								 urls:{
//								 	editar: 'c_nomenclador/EditarNomenclador',
								 	listar:'c_usuario/ListarUsuariosAjax',
									eliminar:'c_usuario/EliminarUsuario'
								 },
								 redimencionar: false,
								 estructura: {
									columnas : [{
										name: 'Nombre',
										id: 'nombre',
										ord: true
									},{
										name: 'Primer Apellido',
										id: 'primer_apellido',
										ord: true
									},{
										name: 'Segundo Apellido',
										id: 'segundo_apellido',
										ord: true
									},{
										name: 'Usuario',
										id: 'usuario',
										ord: true
									},{
										name: 'E-mail',
										id: 'email',
										ord: true
									},{
										name: 'Privilegio',
										id: 'id_privilegio',
										ord: true
									}]								 	
								 },
								 cantXPag: {
								 	valores: Array("10","20","60","80")
								 },
								 consultaListar:{
								 		datosEnvio: {
//										    cantXPag: 10,
										    inicio : 1,
											ordX : 'usuario',
											dir: 'asc',
//											nomenclador: nomenclador
										},
										idFila: 'id_usuario'
//										datosRetorno: {
//										campos : Array('id_noticia', 'titulo', 'subtitulo', 'publicado', 'fecha')
//										}
								 },
								 consultaAdicionar:{
//								 	    datosEnvio:editar,
//											tipos: Array(1, 1),
//											ids: Array( 'valor'),
//											names : Array('Titulooo', 'Fecha', 'Comentario' , 'Importancia', 'titulo1', 'Fecha2'), 
//										},
										/*datosRetorno:{
											tipos:Array(1, 1.3, 1, 1, 1, 1.3),
											ids: Array( 'valor')
										}*/	
								 },							 
								 vacio: {
								 	mensajeVacio: 'No hay usuarios que listar'
								 },		 								
					});
	}

});

/*$(document).ready(function(){
	if($('#mensError').length>0){
		$('#mensError').css({
			border:'1px solid red',
			padding:5,
			marginBottom:10,
			width:'89%',
			marginLeft:'5%'
		});
		
		$('#mensError').find('div').css({
			border:'1px solid red',
			color:'red',
			padding:5
		});
		
		setTimeout(function(){$('#mensError').fadeOut()}, 10000);
	}
	
	$('#confirma')
	.add($('#nuevaContra'))
	.each(function(){
		$(this).bind('keyup', function(){
			 if($('#nuevaContra').val() != "" && $('#confirma').val() != ""){
			 	if(!boolIgualPass()){
					if($('#contra').val() == "")
						$('#guardar').attr("disabled", "disabled");					
					$('#filaMsg').css({visibility:'inherit'});	
				}
				else{
					$('#filaMsg').css({visibility:'hidden'});
					if($('#contra').val() != "")
						$('#guardar').removeAttr("disabled");
				}
			 }
			 else{
			 	$('#filaMsg').css({visibility:'hidden'});
			 }				
		})
		/*$(this).click(function(){
			$('#filaMsg').css({visibility:'hidden'});
		})*/
	/*});
	
	$('#contra').blur(function(){
		if(!boolIgualPass() && $('#contra').val() != ""){
			$('#guardar').attr("disabled", "disabled");
		}
		else $('#guardar').removeAttr("disabled");
	})
	
});

function boolIgualPass(){
	if($('#nuevaContra').val() == $('#confirma').val() && $('#nuevaContra').val() != "" && $('#confirma').val() != "" )
		return true;
	return false;	
}*/