$.JCP.seleccionar = {
	crear: function Seleccionar(arregloParametros){
		$.extend(this, $.JCP.seleccionar.opcionesDefecto, arregloParametros);
		if(this.elementoMouseDown == undefined)
			this.elementoMouseDown = this.elementoContenedor;
	Seleccionar.prototype.declarar = function(){
		var obj = this;
		this.elementos.each(function(){
			$(this)
			.addClass('seleccionable');
			obj.declararEventosElemento($(this));
		});
		var obj = this;
		obj.elementoContenedor.css({/*overflow:'hidden'*/});
		this.elementoMouseDown.bind('mousedown', function(e){
				if(obj.eliminarAdemas !=null)
					$(obj.eliminarAdemas).remove();
				e.preventDefault();
				e.stopPropagation();
				var seleccionados = obj.elementos.filter('.seleccionado');
				seleccionados.each(function(){
					obj.desSeleccionarElemento($(this));
				});
			if(obj.shiftInicio != false){
				obj.shiftInicio.removeClass('shiftInicio');
				obj.shiftInicio = false;
			}
			if(obj.shiftFin != false){
				obj.shiftFin.removeClass('shiftFin');
				obj.shiftFin = false
			}
			obj.downX = e.pageX;
			obj.downY = e.pageY;
			obj.seleccion = $('<div id="seleccion"></div>').appendTo(obj.elementoContenedor);
			obj.elementoContenedor.css({position:'relative'});
			obj.seleccion.css({position:'absolute',zIndex:'600',backgroundColor:'#c6e2ff',opacity: 0.5,left:obj.downX - obj.seleccion.parent().offset().left,top:obj.downY - obj.seleccion.parent().offset().top});
			if(!obj.mostrarDivSeleccion)
				obj.seleccion.css({opacity: 0});
			$('html').bind('mousemove', function(e){
				var ancho = e.pageX - obj.downX;
				if(ancho < 0){
					var paraIzq = true;
		  			ancho = ancho*-1;
		  		}
		 		var alto = e.pageY - obj.downY;
		  		if(alto < 0){
					var paraArr = true;
					alto = alto*-1;
				}
				if(paraIzq){
					obj.seleccion.css({left: e.pageX - obj.seleccion.parent().offset().left});
				}
				if(paraArr){
					obj.seleccion.css({top:e.pageY - obj.seleccion.parent().offset().top});
				}
				obj.seleccion.css({height: alto,width: ancho});
					obj.seleccionarElementos();
			});
			$('html').bind('mouseup', function(e){
				e.preventDefault();
				e.stopPropagation();
				obj.seleccion.remove();
				$(this).unbind('mousemove');
				$(this).unbind('mouseup');
				var seleccionando = obj.elementos.filter('.seleccionando');
				seleccionando.each(function(){
					obj.seleccionarElemento($(this));
				});
			});
		});
	}
	
	Seleccionar.prototype.declararEventosElemento = function(elemento){
		var obj = this;
		this.elementoContenedor.bloqSeleccionNav();
		elemento.bind('mouseover', function(ev){
			if($('#seleccion').attr('id') == undefined && !$(this).hasClass('seleccionado')){
				$(this).css({cursor:'pointer'});
				if(!$(this).hasClass('seleccionado'))
					obj.seleccionandoElemento($(this));
			}
			if($(this).hasClass('seleccionado') || ev.ctrlKey){
				obj.evento(obj, $(this), 'mouseup');
			}
			else{
				obj.evento(obj, $(this), 'mousedown');
			}
		});
		elemento.bind('mouseout', function(){
			if($(this).hasClass('seleccionando'))
				obj.desSeleccionarElemento($(this));
			$(this).unbind('mouseup').unbind('mousedown');
		});}
		Seleccionar.prototype.evento = function(obj, elemento, mouse){
			if(mouse == 'mouseup'){
				elemento.bind('mousedown',function(e){
					e.stopPropagation()
				});
			}
			elemento.bind(mouse, function(e){
				if(obj.eliminarAdemas != null)
					$(obj.eliminarAdemas).remove();
					e.stopPropagation();
					e.preventDefault();
				if(!e.ctrlKey){
					obj.elementoContenedor.find('.seleccionado').each(function(){
						obj.desSeleccionarElemento($(this));
					});
					obj.seleccionarElemento($(this));
				}
				else{
					if($(this).hasClass('seleccionado')){
						obj.desSeleccionarElemento($(this));
					}
					else if($(this).hasClass('seleccionando')){
						obj.seleccionarElemento($(this));
					}
					else{
						obj.seleccionarElemento($(this));
					}
				}
				if(e.shiftKey && obj.shiftInicio != false){
					if(obj.shiftFin != false)
						obj.shiftFin.removeClass('shiftFin');
					obj.shiftFin = $(this);
					$(this).addClass('shiftFin');
					obj.seleccionarIntervalo();
				}
				else{
					if(!elemento.hasClass('shiftInicio')){
						if(obj.shiftInicio != false)
							obj.shiftInicio.removeClass('shiftInicio');
					obj.shiftInicio = $(this);
					$(this).addClass('shiftInicio');
					}
					else if(e.ctrlKey){
						obj.shiftInicio = false;
						$(this).removeClass('shiftInicio');
					}
				}
			});
		}
				
		Seleccionar.prototype.seleccionarElementos = function(){
			var obj = this;
			var seleccionables = this.elementos;
			seleccionables.each(function(){
				if($(this).hasClass('seleccionable')){
					if(obj.verificar($(this), obj.seleccion)){
						obj.seleccionandoElemento($(this));
					}
				}
				else if($(this).hasClass('seleccionando')){
					if(!obj.verificar($(this), obj.seleccion)){
						obj.desSeleccionarElemento($(this));
					}
				}
			});
		}
		
		Seleccionar.prototype.verificar = function(elemento, seleccion){
			if((seleccion.offset().left <= elemento.offset().left + elemento.width() && seleccion.offset().left + seleccion.width() >= elemento.offset().left) && (seleccion.offset().top <= elemento.offset().top + elemento.height() && seleccion.offset().top + seleccion.height() >= elemento.offset().top))
				return true;
			return false;	
		}
		
		Seleccionar.prototype.seleccionarIntervalo = function(){
			var activo = false;
			var obj = this;
			this.elementos.each(function(){
				if($(this).hasClass('shiftInicio') && $(this).hasClass('shiftFin')){
					obj.seleccionarElemento($(this));
				}
				else if($(this).hasClass('shiftInicio') || $(this).hasClass('shiftFin')){
					activo = !activo;obj.seleccionarElemento($(this));
				}
				else if(activo){
					obj.seleccionarElemento($(this));
				}
			});
		}
			
	    Seleccionar.prototype.seleccionarElemento = function(elemento){
			elemento.removeClass('seleccionando');
			elemento.removeClass('seleccionable');
			elemento.addClass('seleccionado');
		}
		
		Seleccionar.prototype.seleccionandoElemento = function(elemento){
			elemento.removeClass('seleccionable');
			elemento.removeClass('seleccionado');
			elemento.addClass('seleccionando');
		}
		
	    Seleccionar.prototype.desSeleccionarElemento = function(elemento){
			elemento.removeClass('seleccionando');
			elemento.removeClass('seleccionado');
			elemento.addClass('seleccionable');
		}
		
		Seleccionar.prototype.adicionarElemento = function(elemento, delante){
			elemento.addClass('seleccionable');
			this.declararEventosElemento(elemento);
			if(delante)
				this.elementos = $.merge(elemento, this.elementos);
			else 
				this.elementos = $.merge(this.elementos, elemento);
		};
		this.declarar();
	},
	opcionesDefecto: {
		mostrarDivSeleccion : true,
		elementoContenedor : $('html'),
		colorOriginalElemento: null,
		shiftInicio : false,
		shiftFin : false,
		eliminarAdemas : false,
	}
}