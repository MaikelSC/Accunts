$.JCP.mover = {
	crear : function Mover(arregloParametros){
//		this.elementoAccion = arregloParametros.elementoAccion;
		$.extend(this, $.JCP.mover.opcionesDefecto, arregloParametros);
		if(this.elementoEntrada == undefined)
			this.elementoEntrada = this.elementoAccion;	
//			this.elementoEntrada = arregloParametros.elementoEntrada;
//		else
				
			this.padre = this.elementoAccion.parent();
//		this.eventoEntrada = arregloParametros.eventoEntrada;
//		this.eventoSalida = arregloParametros.eventoSalida;
//		this.bloqFondo = true;	
//		if(arregloParametros.blqFondo != undefined)
//			this.blqFondo = arregloParametros.blqFondo;
		

		this.elementoEntrada.css({
			userSelect: 'none', OUserSelect: 'none', MozUserSelect: 'none', KhtmlUserSelect: 'none', WebkitUserSelect: 'none', MsUserSelect:'none'
		});
		var obj = this;
//-------------------------BloquearFondo----------------------------------------------------------------------
//Descripcion: utiliza un div del tamaño del html de la pagina ubicado por encima de los elementos de la pagina y por debajo del elemento que se va a mover, para bloquear el fondo 
//Parametros:
	//ninguno
//Retorno: vacio
		Mover.prototype.BloquearFondo = function(){alert('ss');
		var bloqueador = $('<div id="bloqueador"></div>').prependTo($('html'));
	    bloqueador.css({
				     position:'absolute',
				     width:$('html').width(),
				     height:$('html').height(),
				     zIndex:'2'
				    });
		this.elementoAccion.css({position:'relative', zIndex:'3'});
		}
//------------------------------------------------------------------------------------------------------------
//-------------------------definirEvento----------------------------------------------------------------------
//Descripcion: declara el evento por el cual se desea mover un elemento determinado y con respecto a quien se movera
//Parametros:
	//evento: este parametro es opcional, se utiliza para el caso que se quiera redefinir el evento lanzado
//Retorno: vacio
	  Mover.prototype.definirEvento = function(evento){
	       $('html').css({
		   		overflow:'hidden'
		   });
	   	   this.eventoEntrada = evento!= undefined ? evento : this.eventoEntrada;
	   	   var obj = this;
//		   alert(obj.elementoAccion.css("position"));
		   if(obj.elementoAccion.css("position") == 'absolute'){
		   		obj.XInicial = 0;
	   	   		obj.YInicial = 0;
		   }
		   else{
		   		obj.XInicial = this.elementoAccion.offset().left - this.padre.offset().left;
	   	  	    obj.YInicial = this.elementoAccion.offset().top - this.padre.offset().top;
		   }
//		   alert(obj.XInicial);	   	   
	   this.elementoEntrada.bind(this.eventoEntrada, function(e){
	   	   e.preventDefault();
	       obj.elementoEntrada.css({cursor:'move'});
	       /*$.JCP.mover.obj = obj;	*/	   
		   obj.AccionEvento(e);
		   e.stopPropagation();
		   $('html').bind(obj.eventoSalida, function(e){
	      		obj.DesAccionEvento(e);
	   	   });
	   });
	   
	
	  }
	  
	  //-------------------------DesAccionEvento--------------------------------------------------------------------
//Descripcion: funcion para parar la ejecucion del evento cuando se levanta el mouse
//Parametros:
	//e: este parametro es el evento pero en este momento no se utiliza
//Retorno: vacio
	  Mover.prototype.DesAccionEvento = function(e){
//	     var obj  = $.JCP.mover.obj;
//	     var cont =  $.JCP.mover.obj.elementoEntrada;
		 obj.elementoAccion.css("zIndex", obj.salvaZindex);
		 obj.elementoEntrada.css({cursor:'default'});
	     $('html').unbind('mousemove');
		 if(obj.blqFondo)
	     	$('#bloqueador').remove();
	  }
	  
//-------------------------AccionEvento-----------------------------------------------------------------------
//Descripcion: funcion para mover un elemento con respecto a otro elemento de la pagina dado un evento determinado
//Parametros:
	//e: este parametro es el evento capturado
//Retorno: vacio	
	  Mover.prototype.AccionEvento = function(e){
	  if(this.blqFondo){
			this.BloquearFondo();
		}
//	  var obj  = $.JCP.mover.obj;
	  var cont =  obj.elementoAccion;
	  obj.X = e.pageX; //posicion del evento click
	  obj.Y = e.pageY; 
	
	  cont.css({
//	   position:'relative'	   	
	   });
	   if(cont.css("postition") == 'relative'){
	   		var x = cont.offset().left -  cont.parent().offset().left - obj.XInicial;
			var y = cont.offset().top -  cont.parent().offset().top - obj.YInicial;
	   }	   		
	   else{
	   		var x = cont.offset().left/* - obj.XInicial*/;	
	   		var y = cont.offset().top/* - obj.XInicial*/;	
	   }
	   		   
//	   alert(cont.offset().left);
//	   alert(obj.XInicial);
//	   alert(cont.offset().left -  cont.parent().offset().left);
//	   alert(obj.XInicial);
	   obj.salvaZindex = cont.css("zIndex");	
	      
	   $('html').bind('mousemove', function(e){
	   		   e.preventDefault();
//			     alert(x + e.pageX - obj.X);			   
	           cont.css({
	             left:x + e.pageX - obj.X,
	             top: y + e.pageY - obj.Y,
	   			 zIndex:'1000'
	           });
//			   alert(e.pageX - obj.X);
          if(cont.offset().left <  cont.parent().offset().left){
           cont.css({
             left: -obj.XInicial
           })
          }
          else if(cont.offset().left+ cont.width()  > cont.parent().offset().left + cont.parent().width()){
		  cont.css({
             left:cont.parent().width() - obj.XInicial - cont.width()
           }) 
          }
		  if(cont.offset().top <  cont.parent().offset().top){
		  	cont.css({
             top: - obj.YInicial
           })
		  } 
		  else if(cont.offset().top + cont.height()  > cont.parent().offset().top + cont.parent().height()){
		  cont.css({
             top: cont.parent().height() - obj.YInicial - cont.height()
           }) 
          }        
	   });   
	  };
//----------------------------------------------------------------------------------------------------------
       this.definirEvento();
	},
	opcionesDefecto : {
		bloqFondo:true,
		
	}
}

