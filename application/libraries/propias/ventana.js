$.JCP.ventana = {
 crear: function Ventana(arregloParametros){
	  $.extend(this, $.JCP.ventana.opcionesDefecto, arregloParametros);
	  var obj = this;

//---------------------------BloquearFondo---------------------------------------------------------------------
//Descripcion: utiliza un div del tamaño del html de la pagina ubicado por encima de los elementos de la pagina y por debajo del elemento que se va a mover, para bloquear el fondo 
//Parametros:
	//ninguno
//Retorno: vacio
		Ventana.prototype.BloquearFondo = function(contenedor){		
		var bloqueador = this.bloqueador = $('<div id="bloq" class = "fm-bloqFondo"></div>').prependTo($('html'));
	    bloqueador.css({
				     position:'absolute',
				     width:$('html').width(),
				     height:$('html').height(),
				     zIndex:'2'
				    });
		contenedor.css({position:'relative', zIndex:'3'});
		}
//------------------------------------------------------------------------------------------------------------
//-------------------------------mostrarVentana---------------------------------------------------------------
//Descripcion: crea el div contenedor de la ventana, el titulo y los botones correspondientes, luego utiliza el plugging para darle movimiento.
//Parametros:
	//en este caso los parametros que utiliza son los de la clase ventana.
//Retorno: vacio
	  Ventana.prototype.mostrarVentana = function(){
	  if(this.mensaje != false)
	  	this.construirMensaje();
	  
	  this.padre.css({
//	  	backgroundColor:'yellow'
//	  	border:'1px solid red'
	  })
	   this.contenedor = $('<div id="cont'+this.id+'"></div>')
		   .addClass('fm-form')
		   .addClass('fm-ventana')
		   .addClass('fm-borde')
		   .addClass('fm-borde-redondeado')
		   .css({
				position:'relative',
				zIndex:'800',
//				top:-500
//				backgroundColor:'red',
//				border:'1px solid green'
			}) 
		   .prependTo(this.padre);
		   
		  if(arregloParametros.padre == undefined){
		  	this.contenedor.css({
				position:'absolute',
//				zIndex:'5'
			})
		  }
		  	 
	    var titulo = $('<div id="titulo_'+this.id+'">'+this.titulo+'</div>').prependTo(this.contenedor)
		   .addClass('fm-titulo')
		   .addClass('fm-borde')
		   .addClass('fm-borde-redondeadoSup')
		   .css({
		   		borderLeft:0,
		   		borderRight:0,
		   		borderTop:0,
		   });
		
		this.interior = $('<div id="interior'+this.id+'"></div>')
		.css({
//			width:'100%',
			display:'block',
			padding:10,
			textAlign:'center'
		})
		.appendTo(this.contenedor);  
		   
	   
	   if(this.botones || this.btncerrar){
	   		this.filaBotones = $('<div id="filaBotones"></div>')
			.css({
			  height:'35px',
			  textAlign:'center',
//			  marginRight:10,
			  marginTop:10,
		   })
		   .appendTo(this.contenedor);
		   if(this.btncerrar)
				 $.Elementos.crearBoton({id:'cerrar',name: 'Cerrar',click: obj.cerrarVentana})
				.appendTo(obj.filaBotones)
//			.addClass('fm-cerrarBtn');
//		ClickCerrar(cerrar, this.contenedor);
	   }
	   if(this.fondoblq){
	   	this.BloquearFondo(this.contenedor);
	   }
	   if(this.hijos != undefined){
	   	if(this.hijos.length > 0){
			this.hijos.each(function(){
				$(this).appendTo(obj.interior)
				.css({
					margin:'2px'
				 });
			});
	   	}
	   }
	   if(this.ancho!= undefined)
	   	   this.contenedor.width(this.ancho);
	   if(this.alto != undefined)
	   	   this.contenedor.height(this.alto);
		  this.contenedor.centrar(); 
	   this.contenedor.css({
//	   		marginLeft: this.contenedor.parent().width()/2 - this.contenedor.width()/2,
//			marginTop: this.contenedor.parent().height()/2 - this.contenedor.height()/2,
	   });
	   if(!this.anclar){
	   	 var ventana = $.JCP.Crear('mover',{
									elementoEntrada :titulo,
									elementoAccion: this.contenedor,
									eventoEntrada : 'mousedown',
									eventoSalida : 'mouseup',
									blqFondo:false,
									persistirObj: this
									});
	    /* var parametros = {
	                elementos : this.contenedor,
					dir : {
						der: true,
						abj: true
					},
				}
				$.JCP.Crear('redimencionar', parametros);*/								
	   }
	  
}
	
	Ventana.prototype.botones = function(){
		
	}
	
	Ventana.prototype.construirMensaje = function(){
		var mensaje = $('<div>'+this.mensaje+'</div>')
		.css({
			color:'red'
		});
		this.hijos = mensaje ;
	}
//----------------------------------------------------------------------------------------------------------
	Ventana.prototype.cerrarVentana = function(){
		obj.contenedor.remove();
		obj.bloqueador.remove();
	}
	
	/*var ClickCerrar = function(cerrar, contenedor){
		cerrar.bind('mousedown', function(e){
			contenedor.remove();
			e.stopPropagation();
//			$('#bloq').remove();
			obj.bloqueador.remove();
		});
    }*/
	this.mostrarVentana();
 },
 opcionesDefecto:{
 	padre: $('html'),
	mensaje: false
 }
}