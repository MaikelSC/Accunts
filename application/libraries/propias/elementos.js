$.Elementos = {
	deshabilitar : false,//si es true cuando crea los campos los deshabilita
	labels: true, // si es true por cada campo te crea la columna del label	 	
	crearTabla:function(parametros){
	//alert(parametros.validacion);
			 var result = {};
			 if(parametros.deshabilitar)
			 	this.deshabilitar = true;
			 if(parametros.labels == false)
			 	this.labels = parametros.labels;	
	         if(parametros.recargar != true){
			 	if(parametros.contenedor == false)
			 	 	var contenedor= parametros.padre;
			 	else	
	         		var contenedor = $('<div id="Cont'+parametros.id+'"></div>').appendTo(parametros.padre);
				var css = {
					width: '95%',
					margin: '2.5%'
				};
				$.extend(css, parametros.css);
					
				contenedor
				.addClass('fm-form')
				.addClass('fm-borde')
				.addClass('fm-borde-redondeado')
				.css(css)	
			 	var padre = contenedor;
				 if(parametros.fieldset){
			 		contenedor =  fileSet =  this.crearFieldSet(parametros.titulo, parametros.align);
					fileSet.appendTo(padre);
				
			 	}
			 	else if(parametros.tabla.titulo != undefined){
			 		var titulo = result.titulo = $('<div class="titulo">'+parametros.tabla.titulo+'</div>').appendTo(contenedor);
				    	 titulo
						 .addClass('fm-titulo')
						 .addClass('fm-borde')
						 .addClass('fm-borde-redondeadoSup')
						 .css({
//					 		width:'99%',
							borderRight:0,
							borderLeft:0,
							borderTop:0,
							height:'25px'
						});
				 }	 
	         	var tabla = result.tabla = $('<table />')
				.css({
					width:'100%',
					marginTop:7,
					borderCollapse:'collapse'
				})
				.appendTo(contenedor);
			 	if(parametros.id != undefined)
			 		tabla.attr("id", parametros.id);
			 }
			 else{	
			 	result.titulo = parametros.tablaEnvio.titulo;	
				result.tabla = parametros.tablaEnvio.tabla;	
			 	if(parametros.tabla.titulo != undefined)
					result.titulo.text(parametros.tabla.titulo);
			 }	         
			 var cantFilas = 0;
			 var parametrosFila = {
					    padre: tabla,
						pos: cantFilas
					};
			 var cantFilas = parametros.tabla.elementos.length/parametros.columnas;
			 if(parametros.tabla.elementos.length%parametros.columnas >0)
			 	cantFilas = parseInt(cantFilas)+1;
			var inicio = 0;	
			 for(var i =0; i< cantFilas; i++){
					var subCadena = parametros.tabla.elementos.slice(inicio, inicio+parametros.columnas);
					inicio+=parametros.columnas;
					this.crearFila(subCadena, result.tabla);
			 } 		         	
			return result;		
	},
	
	 crearFila : function(elementos, padre){
           var fila = $('<tr></tr>')
		   .css({
		   		height:25
		   })
		   .appendTo(padre)	
		   for(var i =0; i< elementos.length; i++){
		   		this.crearColumna(elementos[i], fila, elementos.length);
		   }
		   return fila;		   		   			   
	},
	
	crearColumna : function(parametros, padre, cantColum){
	    if(parametros != null){		
			if(parametros.tipo == 'tabla'){
				var columna = $('<td></td>')			
				.appendTo(padre);
					parametros.elementos[0].padre = columna;
				this.crearTabla(parametros.elementos[0]);
			}
			else{			
		        if(parametros.label !=  undefined){			   	   
					var label = $('<td class="fm-label"></td>')
					.css({
						width:padre.width()/2/cantColum-40
					})
					.appendTo(padre);			
					label.text(parametros.label);
			    } 
				var columna = $('<td></td>')
				.css({
					width:padre.width()/2/cantColum+40
				})
				.appendTo(padre);
				parametros.padre = columna;
				var elemento = this.crearElemento(parametros);
				if(elemento.parent().length == 0)
						elemento.appendTo(columna);
			}
		}
		else{
			$('<td colspan="2"></td>').appendTo(padre);
		}	
	},
//-------------------------------------crearElemento----------------------------------------------------------
//Descripcion: Es una especie de funcion controladora que decide la funcion que se ejecutara para crear un tipo de elemento u otro segun el valor de la variable tipo.
//Parametros:
	//tipo: tipo de elemento a crear
	//id: id del elemento
	//name: nombre del elemento
	//padreElemento: el padre del elemento
//Retorno: el elemento creado
//    crearElemento : function(tipo, id, name, validacion, atributos){
    crearElemento : function(param){
		if(param.tipo<2)
			var elemento = this.crearText(param);
		else if(param.tipo < 3)
		    var elemento = this.crearSelect(param);
		else if(param.tipo < 4)
		    var elemento = this.crearBoton(param);
		else if (param.tipo < 5)
			var elemento = this.crearLabel(param);	
		else if(param.tipo == 10)	{
		    var elemento = $.JCP.Crear('cleditor',{
			                              padre:padreElemento,
										  tieneCss: true,
	                                      jquery:true,
										  id:id,
										  name:name,
		                                  width:300
	                                      }
	       );	
		} 
		
		/*if(atributos != undefined)
			for(i in atributos){
				elemento.attr(i, atributos[i])
			} */ 
		if(param.oblig)
			elemento.addClass('campo_oblig')			
		return elemento;	
	},
//------------------------------------------------------------------------------------------------------------
//-------------------------------------crearLabel--------------------------------------------------------------
//Descripcion: crea un label
//Parametros: 
	//id: su id
	//name: su name y Texto
//Retorno: la caja de texto
    crearLabel : function(parametros){
		var label = $('<label id="'+parametros.id+'" name="'+parametros.name+'" class="fm-label">'+parametros.valor+'</label>');
		return label;
	},

//------------------------------------------------------------------------------------------------------------
//-------------------------------------crearText--------------------------------------------------------------
//Descripcion: crea los tipos de cajas de text conocidas en dependencia del tipo que se desee crear
//Parametros: 
	//tipo: tipo de caja de texto a crear que puede ser incluso un datepicker
	//id: su id
	//name: su name
//Retorno: la caja de texto
//	crearText : function(tipo, id, name, validacion, atributos){
	crearText : function(elemento){
		switch(elemento.tipo){
			case 1: var textbox = $('<input id="'+elemento.id+'" name="'+elemento.label+'" type="text" class = "fm-campos_texto fm-borde_normal"/>');
			break;
			case 1.1: var textbox = $('<input id="'+elemento.id+'" name="'+elemento.label+'" type="password" class = "fm-campos_texto fm-borde_normal"/>');
			break;
			case 1.3:var textbox = $('<input id="'+elemento.id+'" name="'+elemento.label+'" type="text" class = "fm-campos_texto fm-borde_normal"/>').appendTo(elemento.padre);			
					  $.JCP.Crear('cargarDatepicker',{textbox: textbox});break;
		}
		/*if(validacion != null){
			var divmsg = $('<div id="div_msg"></div>');
			textbox.blur(function(){
					if(!validacion.test($(this).val())){
						divmsg.appendTo('html');
						divmsg.text('Introdusca valor');
						divmsg.css({
				            border: '1px solid #530466', 
							position:'absolute',
							top: $(this).offset().top -$(this).height() - 5,
							left: $(this).offset().left + $(this).width()- 5,
							zIndex: 5,
							opacity: 0.9,
							backgroundColor:'#d30a41',
							color:'#000000',
							boxShadow: '0 0 6px #000000',
				   			borderRadius:'3px 3px 3px 3px'
						});
						setTimeout(function(){
						 if(divmsg.attr('id').length > 0)
							divmsg.remove();
						}, 2000);
					}
		});
		textbox.focus(function(){
			divmsg.remove();
		});
		}*/
//		textbox.appendTo(elemento.padre);

		if(elemento.validacion!= undefined){			
			if(elemento.validacion.teclas!= undefined)
				for(var i=0; i< elemento.validacion.teclas.length; i++){
						DefinirAccionTecla(textbox, elemento.validacion.teclas[i]);
				}
			if(elemento.validacion.eventos!= undefined)
				for(var i=0; i< elemento.validacion.eventos.length; i++){
						DefinirAccionEvento(textbox, elemento.validacion.eventos[i], elemento.valor);
				}				
		}
				
		if(elemento.valor != null)
			textbox.val(elemento.valor);	
		return textbox;
	},
//------------------------------------------------------------------------------------------------------------
//-------------------------------------crearSelect------------------------------------------------------------
//Descripcion: Dado un nombre y un id se crea un combobox y se carga con los valores que se le entren por data
//Parametros: 
	//tipo: el tipo que no se utiliza en este caso
	//id: id del combo
	//name: el name del combo 
//Retorno: se devuelve el propio combobox
	crearSelect : function(elemento){
	    var select = $('<select id="'+elemento.id+'" name="'+elemento.label+'" class = "fm-campos_texto fm-borde_normal"/>');   
		if(elemento.valor != undefined){
		    $('<option value="'+elemento.valor.id+'">'+elemento.valor.valor+'</option>').appendTo(select);
//			$('<option value="'+elemento.data[id].id+'">'+elemento.data[id].valor+'</option>').appendTo(select);
		}
		else{
			$('<option value="-1">Seleccione</option>').appendTo(select);
		}
		if(elemento.tipo == 2.1){
			$.consultaAjax.ejecutar({
				url: 'c_nomenclador/ListarNomencladorCombo',
				data: {combo : elemento.id},
				persistir: select,
				accionCorrecta: function(data){
					for(var i=0; i<data.length-1;i++){
//						alert(data[i].id);
//						alert(select.val());
//						alert(data[i].id_item);
						if(data[i].id_item != select.val())
							$('<option value="'+data[i].id_item+'">'+data[i].valor+'</option>').appendTo(select);
					}
				}
			});
		}			 
		return select;
	},
//-----------------------------------------------------------------------------------------------------------

//-------------------------------------crearBoton------------------------------------------------------------
//Descripcion: Dado un nombre y un id se crea un boton
//Parametros: 
	//id: id del boton 
	//name:  name del boton que en este caso seria el value que se muestra
//Retorno: se devuelve el propio boton;
	crearBoton : function(parametros){
	    var boton = $('<input type="button" class="fm-boton" id="'+parametros.id+'" value="'+parametros.name+'"/>');
		if(parametros.click != undefined)
			boton.click(parametros.click);
		return boton;
	},
//------------------------------------------------------------------------------------------------------------

//-------------------------------------crearFieldSet----------------------------------------------------------
//Descripcion: se crea un fieldset para agrupar varios elementos que vendrian en un contenedor e este caso
//Parametros: 
	//id: id del fielset
	//hijo: contenedor con los elementos
	//titulo: titulo o leyenda 
	//alinTitulo: alineacion a la izq, al centro o la dercha del titulo
//Retorno: devuelve el propio fieldset
	crearFieldSet : function(titulo, alingTitulo, id){
		var field = $('<fieldset ></fieldset>');
		if(titulo != undefined)
			var titulo = $('<legend align = "'+alingTitulo+'">'+titulo+'</legend>').appendTo(field);
		if(id != undefined){
			field.attr("id", "fs_"+id);
			if(titulo != undefined)
				field.attr("id", "fs_"+id+"_titulo");
		}
        return field;
	},
//------------------------------------------------------------------------------------------------------------
}
//-----------------------------------------------centrar------------------------------------------------------
//Descripcion: metodo para centrar un elemento conrespecto a una referencia dada
//Parametros:
	//elemento: elemento para centrar
	//x, y: valores booleanos para centrar o no en cada eje, si es undefined toma valor true
	//referencia: elemento con respecto al que se va a centrar, sino se pasa se centra con respecto al padre
//Retorno: vacio
$.fn.centrar = function(x, y, referencia){
    var elemento = $(this);
    if(x == undefined || x == true)
		x = true;
	if(y == undefined || y == true)
		y = true;
	var padre = elemento.parent();	
	if(referencia == undefined){
		var referenciaX = 0;
		var referenciaY = 0;
	}	
	else{		
		var referenciaX = padre.offset().left - referencia.offset().left;
		var referenciaY = padre.offset().top - referencia.offset().top;
	} 	
	/*elemento.css({
		position:'relative',		
	});*/
	if(x == true)
	elemento.css({
		left:padre.width()/2-elemento.width()/2	- referenciaX/2	
	});
	if(y)
	elemento.css({
		top:padre.height()/2-elemento.height()/2 - referenciaY/2			
	});		
}
$.fn.bloqSeleccionNav = function(){
	$(this).css({userSelect: 'none', OUserSelect: 'none', MozUserSelect: 'none', KhtmlUserSelect: 'none', WebkitUserSelect: 'none', MsUserSelect:'none'
				});
}
//------------------------------------------------------------------------------------------------------------
$.fn.desplazarA = function(parametros){
   	var elemento = $(this);
	var x = elemento.offset().left;
	var y = elemento.offset().top;
	var ancho = elemento.width();
	var alto = elemento.height();
	
	if(parametros.referencia != undefined){
		x = parametros.referencia.elemento.offset().left;
		if(parametros.referencia.x != undefined)
		 	x += parametros.referencia.x;
		y = parametros.referencia.elemento.offset().top;
		if(parametros.referencia.y != undefined)
		 	y += parametros.referencia.y;
		if(parametros.referencia.redimencionar){
			var ancho = parametros.referencia.elemento.width();
				if(parametros.referencia.ancho != undefined)
		 			ancho -= parametros.referencia.ancho;
			var alto = parametros.referencia.elemento.height();
				if(parametros.referencia.alto != undefined)
		 			alto -= parametros.referencia.alto;
		}	
	}
	if(parametros.x != undefined)
		x = parametros.x;	
	if(parametros.y != undefined)
		y = parametros.y;
	if(parametros.redimencionar){
		 ancho = parametros.ancho;
		 alto = parametros.alto;
	}
	var css = {
		position:'absolute',
	}
	if(parametros.css != undefined){
		$.extend(css, parametros.css);
	}	
	elemento.css(css);
	elemento.animate({
		left: x,
		top: y,
		height: alto,
		width : ancho		
	}, function(){
			if(parametros.callback != undefined)
				parametros.callback($(this), parametros.referencia.elemento);	
	});	
}

$.fn.declararEvento = function(eventos, valores, metodos, salva){
  for(var i =0; i< eventos.length; i++){
  	$(this).bind(eventos[i], function(e) {
//	    alert(e.keyCode);
		for(var j =0; j< valores.length; j++){	
			var tecla = e.keyCode;		
		    var valor = valores[j];
		    var metodo = metodos[j];
			if (valor == tecla) {
			   if(salva != undefined)
	       	 	 metodo(salva);
			   else	
			     metodo();		 
	    	}
		}
	    
    });
  }	
}

function ValidarTecla(e, patron, cant){// 1 A la función se le pasa el objeto event
     
    tecla = (document.all) ? e.keyCode : e.which; // 2 Aquí hay que distinguir si el navegador es Internet Explorer (IE) document.all u otro, porque ya os habreis dado cuenta que no todos los navegadores son iguales. Si el navegador es IE se asigna a la variable tecla el valor de e.keyCode, en caso contrario se asigna el valor de e.which. En los dos casos se obtiene el valor ASCII de la tecla pulsada.
    if (tecla==8 || tecla ==32/*Espacio*/) return true; // 3 En esta línea se comprueba si es la tecla pulsada es la tecla de retroceso y en ese caso la función termina (retorna). De esta forma se permite borrar caracteres.
//    if(text.value.length == 7)// esto es para que sean solo 7 numeros
//	 return false;	
//	patron =/\d/; // 4 Solo acepta números
    te = String.fromCharCode(tecla); // 5 Se pasa el valor ASCII de la variable tecla a su carácter correspondiente
    //alert(te);
	return patron.test(te); // 6 Si el carácter coincide con el patrón, la función devuelve true, si no coincide devuelve false.
}

function DefinirAccionTecla(elemento, pos){
	elemento.bind(pos.evento,function(e){		
		tecla = (document.all) ? e.keyCode : e.which
			if(tecla == 8) {EliminarMsgCampoError(elemento); return true;}
		if(pos.cantidad != undefined){
			if($(this).val().length == pos.cantidad){
				if(CalcularMostrarMensaje(pos))
					MensajeCampoError($(this), pos.mensaje, true);
				return false;
			}
		}	
		else{
			var result = ValidarTecla(e, pos.expresion);
			if(result == false){
				if(pos.mensaje != undefined )
					if(CalcularMostrarMensaje(pos))	
						MensajeCampoError($(this), pos.mensaje, true);
			}
			else
				EliminarMsgCampoError(elemento);	
				return result;
		}	
	});
}

function CalcularMostrarMensaje(pos){
	if(pos.maxOcurrencias != undefined){		
			if(pos.ocurrencias == undefined){				
				pos.ocurrencias = 1;return false;
			}
			else{
				if(pos.ocurrencias != pos.maxOcurrencias){
					pos.ocurrencias++;
					return false;
				}
				else{ pos.ocurrencias = 0;}	
			}
	}
	return true;
}

function DefinirAccionEvento(elemento, pos, valor){
	elemento.bind(pos.evento,function(e){
	   if($(this).val().length >0){
	   		if(pos.url != undefined && elemento.val() != valor){
				$.consultaAjax.ejecutar({
					url: pos.url,
					data: {valor :elemento.val()},
					persistir: elemento,
					accionCorrecta: function(data, elemento){
						if(data == true)
							MensajeCampoError(elemento, pos.mensaje);
					}						
				});
			}
			else if(pos.expresion != undefined){
				if(!pos.expresion.test(elemento.val()))
					MensajeCampoError(elemento, pos.mensaje);
			}
			else if(pos.cantSalida > $(this).val().length){
				MensajeCampoError($(this), pos.mensaje);
			}
			else if(pos.campoIgual != undefined){
				campoIgual = $('#'+pos.campoIgual.id);
				if(campoIgual.val() != elemento.val()){
					if(pos.campoIgual.mensaje){
						MensajeCampoError(elemento, pos.mensaje);
						declararBordeError(campoIgual);
					}
					else{
						declararBordeError(elemento);
						MensajeCampoError(campoIgual, pos.mensaje);
					}					
				}
				else{
					EliminarMsgCampoError(campoIgual);
				}
			}			
		}
	});	
}

function MensajeCampoError(elemento, mensaje, todo){
	if($('html').find('> #msg'+elemento.attr("id")).length ==0){
		 $('<div id="msg'+elemento.attr("id")+'" class="fm-msg_campo_error">'+mensaje+'</div>')
		.css({
			top: elemento.offset().top - elemento.height()-10,
			left: elemento.offset().left,
		})
		.addClass('fm-borde_error')
		.addClass('fm-borde-redondeado')
		.appendTo($('html'));
		 declararBordeError(elemento);
	}
	else{
		$('html').find('> #msg'+elemento.attr("id")).text(mensaje);
	}
	setTimeout(function(){
		$('html').find('> #msg'+elemento.attr("id")).remove();
		if(todo)
			elemento
			.removeClass('fm-borde_error')
			.addClass('fm-borde_normal');		
	}, 2000);	
}

function EliminarMsgCampoError(elemento){
	$('html').find('> #msg'+elemento.attr("id")).remove();
	 elemento
	.removeClass('fm-borde_error')
	.addClass('fm-borde_normal');
}

/*$.fn.desbaratar = function(nuevaImagen){
    
	var elemento  = $(this);
//	elemento.fadeOut();
//	alert(elemento.offset().left);
	$.arregloDesbaratar =  null;
	
	$.arrAbj(elemento);
//	$.IzqDer(elemento);
	var Nopropio = $.trans(elemento);
//	var Nopropio = $.cuadros(elemento);
	elemento.remove();
	
	if(Nopropio!= true){
		var cantAncho = parseInt(elemento.width()/40);
		var cantAlto = parseInt(elemento.height()/40);		
		
		var itera = 1;
		var arregloEfectuar = $.arregloDesbaratar;
		for(var i =0; i < cantAncho*cantAlto; i+=cantAncho){
			var aEfectuar = arregloEfectuar.slice(i, i+cantAncho);
			aEfectuar.each(function(){
			var ele = $(this);
			setTimeout(function(){
				ele.animate({opacity:0}, function(){
					$(this).remove();
				});
			}, itera);
			});		
			itera+=50;
		}
	}
	
//	$.arregloDesbaratar.remove();
	$.arregloDesbaratar =  null;
	
}*/

$.arrAbj = function(elemento){
	var cantAncho = parseInt(elemento.width()/40);
	var cantAlto = parseInt(elemento.height()/40);
//	alert(cantAncho);
	for(var i =0; i< cantAlto; i++){
		for(var j =0; j< cantAncho;j++){		
			var ancho = 40;
			var alto = 40;
			if(i == cantAlto-1){
				if(elemento.height()>i*40)
					alto = elemento.height()- i*40;
			}
			if(j == cantAncho-1){
				if(elemento.width()> j*40)
					ancho = elemento.width()-j*40;
			}
			
			var copia = $('<div class="eleDesbara"></div>')	
			.prependTo($('html'))
			.css({
				position:'absolute',
				height:alto,
				width:ancho,
//				backgroundColor:'pink',
				top:elemento.offset().top+i*40,
				left:elemento.offset().left+j*40,
				zIndex:'5000',
				overflow: 'hidden',
	           	whiteSpace: 'nowrap',
//				backgroundColor:''
			});
			var img = $('<img/>')
			.attr("src", elemento.attr("src"))
			.css({
				width:elemento.width(),
				height:elemento.height(),
				position:'relative',
				top:(copia.offset().top- elemento.offset().top)*-1,
				left:(copia.offset().left- elemento.offset().left)*-1,
			})
			.appendTo(copia);	
			if($.arregloDesbaratar == null)
				$.arregloDesbaratar = copia;
			else
				$.merge($.arregloDesbaratar, copia);			
		}
	}
}

$.IzqDer = function(elemento){
	var cantAncho = parseInt(elemento.width()/40);
	var cantAlto = parseInt(elemento.height()/40);
//	alert(cantAncho);
	for(var i =0; i< cantAncho; i++){
		for(var j =0; j< cantAlto;j++){		
			var ancho = 40;
			var alto = 40;
			if(i == cantAncho-1){
				if(elemento.width()>i*40)
					ancho = elemento.width()- i*40;
			}
			if(j == cantAlto-1){
				if(elemento.height()> j*40)
					alto = elemento.height()-j*40;
			}
			
			var copia = $('<div class="eleDesbara"></div>')	
			.prependTo($('html'))
			.css({
				position:'absolute',
				height:alto,
				width:ancho,
//				backgroundColor:'pink',
				top:elemento.offset().top+j*40,
				left:elemento.offset().left+i*40,
				zIndex:'5000',
				overflow: 'hidden',
	           	whiteSpace: 'nowrap',
//				backgroundColor:''
			});
			var img = $('<img/>')
			.attr("src", elemento.attr("src"))
			.css({
				width:elemento.width(),
				height:elemento.height(),
				position:'relative',
				top:(copia.offset().top- elemento.offset().top)*-1,
				left:(copia.offset().left- elemento.offset().left)*-1,
			})
			.appendTo(copia);	
			if($.arregloDesbaratar == null)
				$.arregloDesbaratar = copia;
			else
				$.merge($.arregloDesbaratar, copia);			
		}
	}
}

$.trans = function(elemento){
	var cantAncho = parseInt(elemento.width()/40);
	var cantAlto = parseInt(elemento.height()/40);
//	alert(cantAncho);
	for(var i =0; i< cantAncho; i++){
		for(var j =i; j >=0 ;j--){
			var ancho = 40;
			var alto = 40;
			if(i == cantAncho-1){
				if(elemento.width()>i*40){
					ancho = elemento.width()- i*40;
				}
			}
			/*if(j == cantAlto-1){
				if(elemento.height()> j*40)
					alto = elemento.height()-j*40;
			}*/
			
			var copia = $('<div class="eleDesbara"></div>')	
			.prependTo($('html'))
			.css({
				position:'absolute',
				height:alto,
				width:ancho,
//				backgroundColor:'pink',
				top:elemento.offset().top+j*40,
				left:elemento.offset().left+i*40,
				zIndex:'5000',
				overflow: 'hidden',
	           	whiteSpace: 'nowrap',
//				backgroundColor:''
			});
			var img = $('<img/>')
			.attr("src", elemento.attr("src"))
			.css({
				width:elemento.width(),
				height:elemento.height(),
				position:'relative',
				top:(copia.offset().top- elemento.offset().top)*-1,
				left:(copia.offset().left- elemento.offset().left)*-1,
			})
			.appendTo(copia);	
			if($.arregloDesbaratar == null)
				$.arregloDesbaratar = copia;
			else
				$.merge($.arregloDesbaratar, copia);			
		}
		
		for(var j =i; j >=0 ;j--){
			var ancho = 40;
			var alto = 40;
			/*if(i == cantAncho-1){
				if(elemento.width()>i*40)
					ancho = elemento.width()- i*40;
			}
			if(j == cantAlto-1){
				if(elemento.height()> j*40)
					alto = elemento.height()-j*40;
			}*/
			
			var copia = $('<div class="eleDesbara"></div>')	
			.prependTo($('html'))
			.css({
				position:'absolute',
				height:alto,
				width:ancho,
//				backgroundColor:'pink',
				top:elemento.offset().top+i*40,
				left:elemento.offset().left+j*40,
				zIndex:'5000',
				overflow: 'hidden',
	           	whiteSpace: 'nowrap',
//				backgroundColor:''
			});
			var img = $('<img/>')
			.attr("src", elemento.attr("src"))
			.css({
				width:elemento.width(),
				height:elemento.height(),
				position:'relative',
				top:(copia.offset().top- elemento.offset().top)*-1,
				left:(copia.offset().left- elemento.offset().left)*-1,
			})
			.appendTo(copia);	
			if($.arregloDesbaratar == null)
				$.arregloDesbaratar = copia;
			else
				$.merge($.arregloDesbaratar, copia);			
		}
	}
	
	var itera = 1;
		var arregloEfectuar = $.arregloDesbaratar;
		for(var i =0; i < cantAncho+1; i++){
			var aEfectuar = arregloEfectuar.slice(i, (i+1)*(i+1));
			aEfectuar.each(function(){
			var ele = $(this);
			setTimeout(function(){
				ele.animate({opacity:0}, function(){
					$(this).remove();
				});
				/*ele.fadeOut(500, function(){
	//				$(this).remove();
				});*/
			}, itera);
			});		
			itera+=50;
		}
	return true;	
}


$.cuadros = function(elemento){
	var cantAncho = parseInt(elemento.width()/60);
	var cantAlto = parseInt(elemento.height()/60);
//	alert(cantAncho);
	for(var i =0; i<= cantAlto; i++){
		for(var j =0; j<= cantAncho;j++){		
			var ancho = 60;
			var alto = 60;
			if(i == cantAlto){
				if(elemento.height()>i*60)
					alto = elemento.height()- i*60;
			}
			if(j == cantAncho){
				if(elemento.width()> j*60)
					ancho = elemento.width()-j*60;
			}
			
			var copia = $('<div class="eleDesbara"></div>')	
			.prependTo($('html'))
			.css({
				position:'absolute',
				height:alto,
				width:ancho,
//				backgroundColor:'pink',
				top:elemento.offset().top+i*60,
				left:elemento.offset().left+j*60,
				zIndex:'5000',
				overflow: 'hidden',
	           	whiteSpace: 'nowrap',
//				backgroundColor:''
			});
			var img = $('<img/>')
			.attr("src", elemento.attr("src"))
			.css({
				width:elemento.width(),
				height:elemento.height(),
				position:'relative',
				top:(copia.offset().top- elemento.offset().top)*-1,
				left:(copia.offset().left- elemento.offset().left)*-1,
			})
			.appendTo(copia);	
			if($.arregloDesbaratar == null)
				$.arregloDesbaratar = copia;
			else
				$.merge($.arregloDesbaratar, copia);			
		}
	}
	$.arregloDesbaratar.each(function(){
		$(this).animate({
			height:0,
			width:0,
			left: $(this).offset().left + $(this).width()/2,
			top: $(this).offset().top + $(this).height()/2,
		}, 1500, function(){
			$(this).remove();
		})
	});
	return true;
}


$.estilo = {
	width: 1286,
	height: 774,
	tema: 'azul'
}


function Entidad(atributos) {
    for(var i = 0; i< atributos.length; i++){
		this[atributos[i]] = "";
	}
}

function PasarParciales(obj , objFinal, atributos , inicio, fin) {
    for(var i = 0; i< atributos.length; i++){
	    if(obj[atributos[i]] != undefined)
		objFinal[atributos[i]] =  obj[atributos[i]].slice(inicio, fin);
	}
}

$.urlIconos = 'url("/cantante/application/libraries/propias/imagenes/';

/*var crearDatosEnvioDadoContenedor = function(entidad, contenedor, data, claseRequisito){
        if(data == undefined)
	    	var data = {};
		for (i in entidad){
				if(claseRequisito != undefined){
					if(contenedor.find('#'+i).hasClass(claseRequisito))
		       			 data[i] = contenedor.find('#'+i).val();
				}
				else	
					data[i] = contenedor.find('#'+i).val();
			}			
		return data
	}*/

