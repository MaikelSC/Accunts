$.JCP.formulario = {
	crear: function Formulario(arregloParametros){
		$.extend(this, $.JCP.formulario.opcionesDefecto, arregloParametros);
		this.objEnvio = $.extend({}, this.datosGenerales);
		
		
//-------------------------------construirFormulario--------------------------------------------------------
//Descripcion: es el metodo principal de este namespace, se encarga de crear la estructura que tendra el formulario y manda a ejecutar a los demas metodos que lo construyen. Crea la tabla padre de todas las demas, manda a crear las hijas y a llenarlas
//Parametros:
	//en este caso los parametros que utiliza son los de la clase formulario
//Retorno: vacio
        Formulario.prototype.construirFormulario = function(){		    
	        this.tabla = $.Elementos.crearTabla(this.objEnvio);
			this.filaBotones = $('<div id="filaBotones"></div>').insertAfter(this.tabla.tabla);
		    this.filaBotones.css({
//		 	  width:'100%',
			  height:'35px',
			  textAlign:'center',
//			  marginRight:10,
			  marginTop:10,
		   });		   
		} 

//-----------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------
		Formulario.prototype.crearBotonAdicionar = function(){
			var adicionar = $('<input id="adicionar" type="button" value="Adicionar"/>')
			.addClass('fm-boton')
			.appendTo(this.filaBotones);
			this.botonAdicionar = adicionar;
			var obj = this;
		 	adicionar.click(function(){
				var validacion = validarFormularioEnviar(obj.tabla.tabla, obj.vistas.adicionar.elementos);	
				if(validacion.correcto){
					var data = crearDatosEnvioDadoContenedor(obj.entidad, obj.tabla.tabla);
					$.consultaAjax.ejecutar({
						url: obj.vistas.adicionar.url,
						data: data,
						persistir: obj,
						accionCorrecta: obj.vistaMostrar						
					});
				}
				else{
					$.JCP.Crear('ventana',{
							id :'idventana',
//							padre : $('#td_interior'),
//							hijos : a,
							titulo : 'Error',
							ancho: 300,
							alto: 150,
							css : undefined,
							anclar: false,
							btncerrar:{
								texto: 'Cerrar'
							},
							fondoblq: false,
							mensaje: validacion.mensaje
					});
				}
						
			});
		}
	
		Formulario.prototype.crearBotonCargarEditar = function(){
			var editar = $('<input id="editar" type="button" value="Editar"/>')
			.addClass('fm-boton')
			.appendTo(this.filaBotones);
			this.botonEditar = editar;
			var obj = this;
		 	editar.click(function(){ 
			            var data = {id: $('#idElemento').val()};
						$.consultaAjax.ejecutar({
									url: obj.vistas.mostrar.url,
									data: data,
									persistir: obj,
									accionCorrecta: obj.cargarEditar						
									});
			});
		}
	
		Formulario.prototype.crearBotonGuardar = function(){
			var guardar = $('<input id="guardar" type="button" value="Guardar"/>')
			.addClass('fm-boton')
			.appendTo(this.filaBotones);
			this.botonGuardar = guardar;
			var obj = this;
		 	guardar.click(function(){ 
				var validacion = validarFormularioEnviar(obj.tabla.tabla, obj.vistas.editar.elementos);	
				if(validacion.correcto){
//			            var id = {id: obj.tabla.tabla.find('#id_elemento').val()};
						obj.setEntidad(obj.objEnvio.entidades.editar);
						var data = crearDatosEnvioDadoContenedor(obj.entidad, obj.tabla.tabla);
							data.id = $('#idElemento').val();
						$.consultaAjax.ejecutar({
									url: obj.vistas.editar.url,
									data: data,
									persistir: obj,
									accionCorrecta: obj.vistaMostrar						
								});
				}
				else{
					$.JCP.Crear('ventana',{
							id :'idventana',
//							padre : $('#td_interior'),
//							hijos : a,
							titulo : 'Error',
							ancho: 300,
							alto: 150,
							css : undefined,
							anclar: false,
							btncerrar:{
								texto: 'Cerrar'
							},
							fondoblq: false,
							mensaje: validacion.mensaje
					});
				}					
			});
		}
		
		Formulario.prototype.setEntidad = function(atributos){
			 this.entidad = new Entidad(atributos);
		}
		
		Formulario.prototype.vistaMostrar = function(data, obj){
			 obj.tabla.tabla.find('tbody').children().remove();
			 obj.filaBotones.children().remove();		
			 obj.objEnvio.tabla = obj.vistas.mostrar;
			 for(var i = 0;i< obj.objEnvio.tabla.elementos.length;i++){
			 	if(obj.objEnvio.tabla.elementos[i] != null)
			 		obj.objEnvio.tabla.elementos[i].valor = data[obj.objEnvio.tabla.elementos[i].id]
			 }
			 obj.objEnvio.tablaEnvio = obj.tabla;
			 obj.objEnvio.recargar = true;
			 obj.tabla = $.Elementos.crearTabla(obj.objEnvio); 
			 $('<input type="hidden" id="idElemento" value="'+data[obj.vistas.mostrar.id_elemento]+'"/>').appendTo(obj.tabla.tabla.find('tbody'));			 
			 obj.crearBotonCargarEditar();			
		}
	
		Formulario.prototype.cargarEditar = function(data, obj){
			 obj.tabla.tabla.find('tbody').children().remove();
			 obj.filaBotones.children().remove();		
			 obj.objEnvio.tabla = obj.vistas.editar;
			 for(var i = 0;i< obj.objEnvio.tabla.elementos.length;i++){
			 	if(obj.objEnvio.tabla.elementos[i] != null)
			 		obj.objEnvio.tabla.elementos[i].valor = data[obj.objEnvio.tabla.elementos[i].id]
			 }
			 obj.objEnvio.datos = data;
			 obj.objEnvio.tablaEnvio = obj.tabla;
			 obj.objEnvio.recargar = true;
			 obj.tabla = $.Elementos.crearTabla(obj.objEnvio); 
			 $('<input type="hidden" id="idElemento" value="'+data[obj.vistas.mostrar.id_elemento]+'"/>').appendTo(obj.tabla.tabla.find('tbody'));
			  obj.crearBotonGuardar();
		}
		
		if(this.objEnvio.editar != undefined){
			/*$.ajaxSetup({
				async: false
			});*/	
			var obj = this;
			$.consultaAjax.ejecutar({
									url: obj.objEnvio.editar.url,
									data: {id : obj.objEnvio.editar.id},
									persistir: obj,
									accionCorrecta: function(data){
											for(var o = 0; o< obj.vistas.editar.elementos.length;o++){
												if(obj.vistas.editar.elementos[o] != null)
			 										obj.vistas.editar.elementos[o].valor = data[obj.vistas.editar.elementos[o].id]
											}
											obj.objEnvio.tabla = obj.vistas.editar;
											obj.construirFormulario();
											obj.setEntidad(obj.objEnvio.entidades.editar);
										    obj.crearBotonGuardar();
											/*$.ajaxSetup({
												async: false
											});*/	
										}						
									});
		    
		}
		else{
			this.objEnvio.tabla = this.vistas.adicionar;
			this.construirFormulario();
			this.setEntidad(this.objEnvio.entidades.adicionar);
		    this.crearBotonAdicionar();
		}
		
 	},
	opcionesDefecto: {
		recargar: false,
	}
}

function validarFormularioEnviar(formulario, elementos){
	var retorno = {
		correcto: true
	};
		
	for(var i =0; i< elementos.length;i++){
		if(elementos[i]!= null && elementos[i].oblig){
			if(elementos[i].tipo <2){
				if(formulario.find('#'+elementos[i].id).val() == "" && elementos[i].oblig /*&& !formulario.find('#'+elementos[i].id).hasClass('fm-borde_error')*/){
					declararBordeError(formulario.find('#'+elementos[i].id));
					retorno.correcto = false;
					if(retorno.mensaje == undefined)
						retorno.mensaje = 'El campo '+formulario.find('#'+elementos[i].id).attr("name")+' es obligatorio';					
				}
				else if(formulario.find('#'+elementos[i].id).hasClass('fm-borde_error')){
					retorno.correcto = false;
					if(retorno.mensaje == undefined)
						retorno.mensaje = 'Los datos del campo '+formulario.find('#'+elementos[i].id).attr("name")+' no son validos';			
				}						
			}
			else if(elementos[i].tipo <3){
				if(formulario.find('#'+elementos[i].id).val() == -1 && !formulario.find('#'+elementos[i].id).hasClass('fm-borde_error')){
					declararBordeError(formulario.find('#'+elementos[i].id));
					retorno.correcto = false;
					if(retorno.mensaje == undefined)
						retorno.mensaje = 'El campo '+formulario.find('#'+elementos[i].id).attr("name")+' es obligatorio';								
				}
			}
		}
	}
	return retorno;	
}

function declararBordeError(elemento){
	elemento
	.removeClass('fm-borde_normal')
	.addClass('fm-borde_error')
	.one('click',function(){
		$(this)
		.removeClass('fm-borde_error')
		.addClass('fm-borde_normal');
		$('html').find('> #msg'+elemento.attr("id")).remove();
	});
}

var crearDatosEnvioDadoContenedor = function(entidad, contenedor, data){
        if(data == undefined)
	    	var data = {};
		for (i in entidad){
		        data[i] = contenedor.find('#'+i).val();
			}			
		return data
	}

