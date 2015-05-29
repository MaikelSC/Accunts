$.JCP.listado = {
    objTemp : null,
	crear : function Listado(arregloParametros){
		$.extend(this, $.JCP.listado.opcionesDefecto, arregloParametros, $.Elementos);
		var obj = this;
		Listado.prototype.construirTabla = function(){
			if($('#'+this.idTabla).attr("id") == undefined){
				this.contenedorTabla = $('<div class="contTablaListar" id="cont'+this.idTabla+'"></div>').appendTo(this.padre);
				this.contenedorTabla.css({width:96*this.padre.width()/100,margin:'2%',});
				this.contenedorTabla.addClass('fm-form').addClass('fm-borde').addClass('fm-borde-redondeado');
				if(this.tituloTabla != false){
					this.divTituloTabla = $('<div class="tituloTablaListar"><span>'+this.tituloTabla+'</span></div>').addClass('fm-titulo').addClass('fm-borde-redondeadoSup').appendTo(this.contenedorTabla);
				}
				if(this.botones)this.cargarBotones();
					this.cargarCantXPagina();
				this.cargarEstructura();
				this.cargarContenido();
			}
			else{
				this.tabla = $('#'+this.idTabla);
				this.contenedorTabla = this.tabla.parent().parent();
				this.tituloTabla = this.tabla.find('.tituloTablaListar');this.estructura = this.tabla.find('estruc'+this.idTabla);
				this.filaColumnas = this.tabla.parent().parent().find('#filaColumnas');
			}
			this.pedirDatos();
	   } 
		Listado.prototype.cargarCantXPagina = function(){
			if(this.cantXPag.padre == undefined)
				this.cantXPag.padre = this.divTituloTabla;
			this.contCantXPag = $('<div></div>').appendTo(this.cantXPag.padre);
			this.contCantXPag.css({float:'right'});
			this.selectCantXPag = $('<select id="cantXPag'+this.idTabla+'" class="cantXPag"/>').appendTo(this.contCantXPag);
			for(var i = 0; i < this.cantXPag.valores.length; i++){
				var option = $('<option value="'+this.cantXPag.valores[i]+'">'+this.cantXPag.valores[i]+'</option>').appendTo(this.selectCantXPag);
			}
			var obj = this;this.selectCantXPag.change(function(){obj.consultaListar.datosEnvio.inicio = 1;obj.pedirDatos();});
		}
		
		Listado.prototype.cargarBotones = function(){
			if(this.contenedorTabla.find('#contBotones'+this.idTabla).attr("id") == undefined)
			  this.contBotones = $('<div id="contBotones'+this.idTabla+'"></div>').appendTo(this.contenedorTabla);
			else this.contBotones = this.contenedorTabla.find('.contBotonesListar');
			this.contBotones.css({paddingLeft:2,borderLeft:0,borderRight:0,}).addClass('fm-titulo2').addClass('fm-borde');
			
			if(this.add){
				var btnAdicionar = this.botonAdic =  $('<input type="button" class="fm-boton" value="Adicionar"/>')
					btnAdicionar
					.addClass('fm-boton')
					.appendTo(this.contBotones)
					.click(function(){
//					   obj.filaGrupos.fadeIn(0);
					   if(obj.contenido.find('filaVacia').length > 0)
					   		obj.vacia.remove();
					   if(obj.contenido.find('.guiaEditar').length == 0){
							var guiaEditar = $('<div class="fila guiaEditar"></div>')
							.addClass('fm-borde2')
							.prependTo(obj.contenido)
							.css({
								height:25,
								borderBottom:0,
								borderLeft:0,
								borderRight:0,
							});		
							var numFila = obj.numFila.clone();
								numFila.height(23);
								numFila.text('1')
								numFila.appendTo(guiaEditar);
							for(var k =0 ; k< obj.estructura.columnas.length;k++){
									var columna =  $('<div class="'+k+'"></div>')
									.css({
										display:'inline-block',										
										width:obj.filaColumnas.find('.'+k).width()
									})
									.appendTo(guiaEditar);
									var label = $('<div class="labelList fm-borde2"></div>')
									.css({
										borderLeft:0,
										borderTop:0,
										borderBottom:0,
										height:25
									})
									.appendTo(columna);
							    }					
				    		obj.construirFilaEditar(guiaEditar, true);
						}
						if(obj.contenido.find('#filaVacia'+obj.idTabla).length > 0)
					      obj.vacia.remove();					
//					    obj.scroll.mostrarScroll();								
					});				
//					obj.objEnvioAdicionar = new Entidad(obj.consultaAdicionar.datosEnvio.ids);// crea el obj para enviar
			}
			
			if(this.btnEliminar){
				var btnEliminar = this.botonElim =  $('<input type="button" class="fm-boton" value="Eliminar"/>');			
				btnEliminar
				.addClass('fm-boton').appendTo(this.contBotones);
				btnEliminar.click(function(){
						var seleccionados = obj.contenido.find('>.seleccionado');
						var arreglo = Array();
						seleccionados.each(function(){arreglo.push($(this).attr("id"));});
						var data = {};
						data.ids = arreglo;
						if(obj.multiObjeto)
							data.confMulti = obj.nomencladorMultiObj;
						$.consultaAjax.ejecutar({url: obj.urls.eliminar,data: data,persistir: obj,accionCorrecta: obj.filasEliminadas});
				});
			}
			if(obj.btnAdicional != undefined)
				for(var i=0;i<this.btnAdicional.length;i++){
					var vinculo = $('<a href='+$.urlServer+'/index.php/'+this.btnAdicional[i].href+'/></a>')
					.click(function(e){e.preventDefault();})
					.appendTo(this.contBotones);
					$('<input type="button"  class="fm-boton" value="'+this.btnAdicional[i].value+'"/>')
					.addClass('fm-boton')
					.appendTo(vinculo)
					.click(function(){if(obj.contenido.find('>.seleccionado:first').attr("id")!= undefined)document.location.href=$(this).parent().attr("href")+"/"+obj.contenido.find('>.seleccionado:first').attr("id");});
				}
		}
		
		Listado.prototype.construirFilaEditar = function(guiaEditar, filaNueva){
			obj.guiaEditar = guiaEditar;
		    if(obj.contenido.find('.filaEditar').length == 0 ){
				if(!obj.filaColumnas.is(':visible'))
					obj.filaColumnas.fadeIn(1);
				obj.filaEditar = $('<div class="filaEditar"></div>')
				.css({					
					position:'absolute',
					zIndex:'400',
					height:29,
					width:obj.contenido.width(),
					top:guiaEditar.offset().top - obj.contenido.offset().top-3,
					left:-1
				})
				.addClass('fm-form')
				.addClass('fm-borde')
				.mousedown(function(e){
					e.stopPropagation();
				})				
			    .prependTo(obj.contenido);
				
				var numFila = obj.numFila
					.clone()
					.css({
						borderBottom:0,
						height:28
					})
					.text(obj.guiaEditar.find('.numFila:first').text())
					.appendTo(obj.filaEditar);
			  	 for(var k =0 ; k< obj.estructura.columnas.length;k++){
			   			if(obj.filaColumnas.is(':visible')){
							var anchoCol =obj.filaColumnas.find('.'+k).width()-2; 
						}
						else	
							var anchoCol = (obj.tabla.width()-21)/obj.estructura.columnas.length;
						var columna = $('<div class="'+k+'"></div>')
						.css({display:'inline-block',height:17, width: anchoCol,borderTop:0,borderLeft:0})
						.appendTo(obj.filaEditar);
						var label = obj.filaColumnas.find('.'+k).find('.labelList')
						.clone()
						.css({whiteSpace: 'nowrap' ,overflow:'hidden',width:anchoCol});
						label.children().remove();
						label.appendTo(columna);
						var elemAux = new Object();
						for(var l in obj.consultaAdicionar.datosEnvio.elementos[k]){
							elemAux[l] = obj.consultaAdicionar.datosEnvio.elementos[k][l];		
						}
						if(filaNueva != true){
							if(elemAux.tipo > 2 && elemAux.tipo < 3){
								elemAux.valor = {
									id: obj.guiaEditar.find('.'+columna.attr("class")).find('.labelList').attr("id"),
									valor: obj.guiaEditar.find('.'+columna.attr("class")).text()
								};								
							}
							else
								elemAux.valor = obj.guiaEditar.find('.'+columna.attr("class")).text();
								
						}							
						$.Elementos.crearElemento(elemAux).appendTo(label);
					}
					obj.filaBotonesEditar = $('<div class="filaBotonesEditar"></div>')
					.prependTo(obj.contenido)
					.addClass('fm-form')
					.addClass('fm-borde')
					.addClass('fm-borde-redondeadoInf')
					.css({
						width:160,
						height:30,
						zIndex:'401',
						position:'absolute',
						borderTop:0,
						paddingLeft:6,
						top:guiaEditar.offset().top - obj.contenido.offset().top-3 +obj.filaEditar.height()-2,
						left:obj.tabla.width()/2 - 100,
					});
					var enviarEditar = $.Elementos.crearBoton({id:'enviarEdi',name: 'Guardar',click: obj.adicionarAlListado})
					.css({
						height:23,
						width:75,
						paddingTop:1
					})
					.appendTo(obj.filaBotonesEditar);
					var cancelarEditar = $.Elementos.crearBoton({id:'eliminarEdi',name: 'Cancelar'})
					.css({
						height:23,
						width:75,
						paddingTop:1
					})
					.click(function(){
						 obj.filaEditar.remove();
						 obj.filaBotonesEditar.remove();
						 obj.contenido.children('.guiaEditar').remove();
						 if(obj.contenido.children().length == 0)
						 	obj.mensajeVacio();
//						 obj.scroll.mostrarScroll();		
					})
					.appendTo(obj.filaBotonesEditar);				
					if(obj.vacia!= undefined && obj.vacia.is(':visible'))
						obj.vacia.remove()	
			}
			else{
			     if(!guiaEditar.hasClass('guiaEditar')){
				 		obj.contenido.children('.guiaEditar').remove();
				 }
				 obj.filaEditar.desplazarA({
				 						referencia : {
													elemento : guiaEditar,
													y :- obj.contenido.offset().top -3,									
												},
												x :0		
				   					    });
				 obj.filaBotonesEditar.desplazarA({
				 						referencia : {
													elemento : guiaEditar,
													y :- obj.contenido.offset().top -3 + obj.filaEditar.height()				
												},
												x :obj.tabla.width()/2 - 100		
				   					    });
				obj.filaEditar.find('.numFila:first').text(obj.guiaEditar.find('.numFila:first').text());
				for(var k =0; k< obj.estructura.columnas.length; k++){
					var columna = obj.filaEditar.find('.'+k);
					var label = columna.find('.labelList');
					label.empty();
					var elemAux = new Object();
					for(var l in obj.consultaAdicionar.datosEnvio.elementos[k]){
						elemAux[l] = obj.consultaAdicionar.datosEnvio.elementos[k][l];		
					}
					if(elemAux.tipo > 2 && elemAux.tipo < 3){
						elemAux.valor = {
							id: obj.guiaEditar.find('.'+columna.attr("class")).find('.labelList').attr("id"),
							valor: obj.guiaEditar.find('.'+columna.attr("class")).text()
						};
						
					}
					else
						elemAux.valor = obj.guiaEditar.find('.'+columna.attr("class")).text();
				    $.Elementos.crearElemento(elemAux).appendTo(label);
				}												
			}			
		}
		
		Listado.prototype.adicionarAlListado = function(){
			var entidad = {};
			for(var i = 0; i< obj.consultaAdicionar.datosEnvio.elementos.length; i++){
				entidad[obj.consultaAdicionar.datosEnvio.elementos[i].id] = "";
			}
						
			var data = crearDatosEnvioDadoContenedor(entidad, obj.filaEditar);
			if(obj.multiObjeto)
				data.confMulti = obj.nomencladorMultiObj;
		
			if(!obj.guiaEditar.hasClass('guiaEditar')){
				data.id = obj.guiaEditar.attr("id"); 
			}
			$.consultaAjax.ejecutar({
							url: obj.urls.editar,
							data: data,
							persistir: obj,
							accionCorrecta: obj.actualizarFila						
						});
		}
		
		Listado.prototype.actualizarFila = function(data, obj){
			var guiaEditar = obj.guiaEditar;
			for(var j =0; j< obj.estructura.columnas.length; j++){
				if(data[obj.estructura.columnas[j].id].id != undefined){
					guiaEditar.find('.'+(j)+'>div').attr("id", data[obj.estructura.columnas[j].id].id);
					guiaEditar.find('.'+(j)+'>div').text(data[obj.estructura.columnas[j].id].valor);
				}
				else	
					guiaEditar.find('.'+(j)+'>div').text(data[obj.estructura.columnas[j].id]);
			}
			if(guiaEditar.hasClass('guiaEditar')){
				guiaEditar.attr('id', data[obj.consultaListar.idFila]);
				obj.contenido.find('>div:not(.guiaEditar)').find('.numFila:first').each(function(){
					$(this).text(parseInt($(this).text())+1);
				});
			}
			if(obj.seleccionar != undefined)
				obj.seleccionar.adicionarElemento(guiaEditar, true);
			else
				obj.declararSeleccionar();							
			guiaEditar
			.dblclick(function(){
				obj.construirFilaEditar($(this));
			})
			.removeClass('guiaEditar');
			obj.filaEditar.remove();
			obj.filaBotonesEditar.remove();
			obj.botonElim.removeAttr("disabled");
		}
	 
		Listado.prototype.filasEliminadas = function(data, obj){obj.pedirDatos();}
		
		Listado.prototype.cargarEstructura = function(){
			this.contenedorInterno = $('<div id="interno'+this.idTabla+'"/>')
			.appendTo(this.contenedorTabla)
			.css({height:320,overflowX: 'hidden',whiteSpace: 'nowrap',margin:7,backgroundColor:'#FBFBF7'})
			.addClass('fm-borde2');
//			var anchoContTabla = this.contenedorInterno.width();
			this.contTabla = $('<div/>')
			.appendTo(this.contenedorInterno);
			this.tabla = $('<div id="'+this.idTabla+'"/>')
			.css({borderTop:0,borderLeft:0,borderRight:0})
			.appendTo(this.contTabla);
			this.filaColumnas= $('<div id="grupos'+this.idTabla+'"/>')
			.css({height:25})
			.appendTo(this.tabla)
			.addClass('fm-titulo3');
			this.numFila = $('<div class="numFila"></div>')	
			.appendTo(this.filaColumnas);
			this.numFila
			.addClass('fm-borde2')
			.css({width:20,float:'left',borderLeft:0,borderTop:0,borderBottom:0});
			this.crearFilaColumnas(this.estructura.columnas );
		}
		
		Listado.prototype.configDatosOrdX = function(){
			if(obj.flechaOrd == undefined){
				obj.flechaOrd = $('<img class="flechaOrd" src="'+$.urlServer+'/application/libraries/propias/imagenes/abj.png")" ></img>')
				.css({marginLeft:5})
				.insertAfter(obj.filaGrupos.find('.confColumna').next());
			}
			else{
				obj.flechaOrd.insertAfter(obj.filaGrupos.find('.confColumna').next());
				obj.flechaOrd.attr("src", $.urlServer+"/application/libraries/propias/imagenes/abj.png");
			}
			var cont = obj.filaGrupos.find('.confColumna').parent().parent().attr("class");
			obj.consultaListar.datosEnvio.ordX = obj.estructura.columnas[(parseInt(cont))].campo;
			obj.consultaListar.datosEnvio.dir = 'desc';
			obj.pedirDatos();
		}
		
		Listado.prototype.crearFilaColumnas = function(columnas){
			var obj = this;
			var filaColumnas = this.filaColumnas;
			for(var j = 0; j< columnas.length; j++){
				var columna = $('<div class="'+(j)+'"></div>')
				.css({borderLeft:0,borderTop:0,borderBottom:0,width:(obj.tabla.width()-21)/columnas.length,whiteSpace: 'nowrap',})
				.appendTo(filaColumnas);
				var label = $('<div class="labelList"></div>')
				.addClass('fm-borde2')
				.css({borderLeft:0,borderTop:0,borderBottom:0,height:25})
				.appendTo(columna);
				if(j == columnas.length-1)label.css({borderRight : '5px'});
				var texto = $('<span>'+columnas[j].name+'</span>')
				.appendTo(label);
				columna.css({display:'inline-block',});
				if(columnas[j].ord)
				label.click(function(){
					if($(this).find('.flechaOrd').length == 0){
						var cont = $(this).parent().attr("class");
						obj.consultaListar.datosEnvio.ordX = columnas[cont].id;
						obj.consultaListar.datosEnvio.dir = 'asc';
						obj.pedirDatos();
						var l = $(this);
						if(obj.flechaOrd == undefined){
							obj.flechaOrd = $('<img class="flechaOrd" src="'+$.urlServer+'/application/libraries/propias/imagenes/arr.png")" ></img>').css({marginLeft:5}).insertAfter(l.find('span'));
						}
						else{
							obj.flechaOrd.insertAfter(l.find('span'));
							obj.flechaOrd.attr("src", $.urlServer+"/application/libraries/propias/imagenes/arr.png");
						}
					}
					else{
						if(obj.consultaListar.datosEnvio.dir == 'asc'){
							obj.consultaListar.datosEnvio.dir = 'desc';
							obj.flechaOrd.attr("src", $.urlServer+"/application/libraries/propias/imagenes/abj.png");
						}
						else{
							obj.consultaListar.datosEnvio.dir = 'asc';
							obj.flechaOrd.attr("src", $.urlServer+"/application/libraries/propias/imagenes/arr.png");
						}
						obj.pedirDatos();
					}
				})
				.hover(function(){$(this).css({cursor:'pointer'})}, function(){$(this).css({cursor:'normal'})});
			}
		}
				
		Listado.prototype.cargarContenido = function(){	
			this.contenidoScroll = $('<div id="contenidoScroll'+this.idTabla+'"></div>')
			.css({backgroundColor:'white',whiteSpace: 'nowrap',})
			.appendTo(this.tabla);
			this.contenido = $('<div id="contenido'+this.idTabla+'"></div>')
			.appendTo(this.contenidoScroll)
			.addClass('fm-borde2').css({borderTop:0,borderLeft:0,borderRight:0,position:'relative'});
		}
		
		Listado.prototype.pedirDatos = function(obj){
			if(obj == undefined)var obj = this;
			if(obj.selectCantXPag!= undefined)
				obj.consultaListar.datosEnvio.cantXPag = obj.selectCantXPag.val();
			$.consultaAjax.ejecutar({
				url: obj.urls.listar,
				data: obj.consultaListar.datosEnvio,
				persistir: obj,
				accionCorrecta: obj.llenarTabla
			});
			if(obj.filaOnClickDestuir != false)
				obj.filaOnClickDestuir();
			this.ponerCargador();
		}
		
		Listado.prototype.llenarTabla = function(data, obj){
			if(obj.multiObjeto){
				obj.consultaListar.idFila = data.idFila;	
			}
//			obj.contenido = $('#contenido'+obj.idTabla);			
			if(data.datos != null && data.datos.length > 0){
				obj.contenido.empty();
				if(obj.contenedorTabla.find('.filaBotonesEditar:first').length > 0)obj.filaBotonesEditar.remove();
				for(var i =0; i< data.datos.length; i++){
//					var campos = obj.estructura.columnas.campos;
					if(i%2==0)var clase = 'fm-form2';
					else var clase = 'fm-elemAlterna';
					var fila = $('<div id="'+data.datos[i][obj.consultaListar.idFila]+'" class="fila"></div>')
					.appendTo(obj.contenido)
					.addClass('fm-borde2')
					.addClass(clase)
					.css({borderBottom:0,borderLeft:0,borderRight:0,height:25,});
					if(obj.add)
					fila.dblclick(function(){
						obj.construirFilaEditar($(this));
					});
					var claseGrupos = 0;
					var numFila = obj.numFila.clone();
					numFila.text(i+1);
					numFila.css({borderBottom:0,}).appendTo(fila);
					for(var j =0; j<obj.estructura.columnas.length; j++){
						var columna = $('<div class="'+j+'"></div>')
						.appendTo(fila);
						columna.css({display:'inline-block',height:17,});
						var label = obj.filaColumnas.find('.'+j).find('.labelList')
						.clone()
						.css({whiteSpace: 'nowrap' ,overflow:'hidden',width:obj.filaColumnas.find('.'+j).find('.labelList').width()});
						label.children().remove();
						if(data.datos[i][obj.estructura.columnas[j].id].id != undefined){
							label.attr("id", data.datos[i][obj.estructura.columnas[j].id].id);
							label.text(data.datos[i][obj.estructura.columnas[j].id].valor);
						}
						else	
							label.text(data.datos[i][obj.estructura.columnas[j].id]);
						label.appendTo(columna);
						if(j < obj.estructura.columnas.length-1){
							columna.css({borderLeft:0,borderTop:0,borderBottom:0,});
						}
					}
				}				
				if(obj.filaOnClick != false)
				obj.contenido
				.find('.fila')
				.bind('click', function(){
					obj.filaOnClick($(this), obj);
				});
				if(data.total > obj.consultaListar.datosEnvio.cantXPag){
					obj.mostrarPaginacion(data.total);
				}
				else if(obj.contPaginacion != undefined){
					obj.contPaginacion.remove();
					obj.contPaginacion = undefined;
				}
				obj.declararSeleccionar();
				obj.botonElim.removeAttr("disabled", "disabled");}else obj.mensajeVacio();
		}
			
		Listado.prototype.declararSeleccionar = function(){
			$.JCP.Crear('seleccionar',{elementos :obj.contenido.find('.fila'),mostrarDivSeleccion: false,elementoContenedor: obj.tabla,elementoMouseDown: obj.contenedorInterno,persistirObj : obj,	eliminarAdemas : '.divPropCol,.propAct'});
		}
			
		Listado.prototype.mostrarPaginacion = function(total){
			var obj = this;
			var cantPaginas = total/this.consultaListar.datosEnvio.cantXPag - total%this.consultaListar.datosEnvio.cantXPag/this.consultaListar.datosEnvio.cantXPag;
			if(total%this.consultaListar.datosEnvio.cantXPag != 0)cantPaginas++;
			if(this.contPaginacion == undefined){
				this.contPaginacion = $('<div class="contPag"></div>')
				.appendTo(this.contenedorTabla);
				this.contPaginacion.css({width:'100%',height:25});
				this.paginacion =  $('<div></div>').appendTo(this.contPaginacion);
				this.paginacion.css({display:'inline',position:'relative'});
			}
			this.paginacion.empty();
			if(this.consultaListar.datosEnvio.inicio > 1){
				var anterior = $('<label class = "pagNumeros">Anterior</label>')
				.appendTo(this.paginacion)
				.click(function(){
					obj.consultaListar.datosEnvio.inicio--;
					obj.pedirDatos();});
			}
			for(var i = 0; i< cantPaginas; i++){
				var numero = i+1;
				var elemento = $('<label id="'+numero+'" class = "pagNumeros">'+numero+'</label>')
				.appendTo(this.paginacion);
				if(i+1 == obj.consultaListar.datosEnvio.inicio){
					elemento.css({fontWeight: "500"});
				}
				elemento.click(function(){
					obj.consultaListar.datosEnvio.inicio = $(this).attr("id");
					obj.pedirDatos();
				});
			}
			if(this.consultaListar.datosEnvio.inicio < cantPaginas){
				var siguiente = $('<label class = "pagNumeros">Siguiente</label>')
				.appendTo(this.paginacion);
				siguiente.click(function(){
					obj.consultaListar.datosEnvio.inicio++;
					obj.pedirDatos();
				});
			}
			this.paginacion.centrar();
		}
		
		Listado.prototype.ponerCargador = function(){obj.contenido.empty();}
		Listado.prototype.mensajeVacio = function(){
			this.botonElim.attr("disabled", "disabled");
			this.filaColumnas.fadeOut(0);
			this.contenido.empty();
			this.vacia  = $('<div class="filaVacia"></div>').appendTo(this.contenido);
			var columnaVacia = $('<span>'+this.vacio.mensajeVacio+'</span>').appendTo(this.vacia);
		};
		this.construirTabla();
	},
	opcionesDefecto : {
		tituloTabla : false,
		botones: true,
		btnAdicionar : false,
		btnEliminar : true,
		scrollLateral : true,
		cantXPag: {valores: Array("10","20","50","100")},
		filaOnClick :false,
		filaOnClickDestuir : false,
		multiObjeto: false
	}
}