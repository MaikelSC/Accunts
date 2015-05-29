$.JCP.menu = {
	crear : function Menu(arregloParametros){
		$.extend(this, $.JCP.menu.opcionesDefecto, arregloParametros);
		var obj = this;
		/*Menu.prototype.declararMenu = function(){
//			var menu = $.extend({}, this);
			this.construirMenu(this);
		}*/
		
		Menu.prototype.construirMenu = function(menu){
			
			var contMenu = this.contMenu  = $('<div />')
			.css({
				display:'none'
			})
			.appendTo(menu.padre)
			
			var nuevoMenu = $('<ul />')			
			.addClass('fm-borde')
			.addClass('fm-menu')
			.css({
				padding:0,	
				display:'inline-block'			
			})			
			.appendTo(contMenu);
			
			for(var i =0; i< menu.items.length; i++){
				  this.agregarIttem(menu.items[i], nuevoMenu, menu.dir);
			}
			this.contMenu.fadeIn(0);
		}
		
		Menu.prototype.agregarIttem = function(subItem, padre, posPadre){
			var css = new Object();
			if(posPadre == 'hor'){
					css.display= 'inline-block';
					css.margin = 2;
					css.listStyle= 'none';
					css.position= 'relative';
			}
			else{
					css.display = 'block';
					css.listStyle = 'none';
					css.position = 'relative';
					css.margin = 2;				
			}
			
			var nuevoIttem = $('<li  ></li>')
			.css(css)
			.appendTo(padre)
			.addClass('fm-item')
			.addClass('fm-borde-transparent')
			.mouseover(function(){
				$(this).removeClass('fm-borde-transparent');
				$(this).addClass('fm-borde-redondeado');
				$(this).addClass('fm-item-focus');
				$(this).addClass('fm-borde3');
			})
			.mouseleave(function(){
				$(this).removeClass('fm-borde3');
				$(this).removeClass('fm-item-focus');
				$(this).addClass('fm-borde-transparent');
			});

			
			var vinculo = $('<a/>').css({
				paddingTop:5,
				padding:3,
			})
			.click(function(){
//				alert('s');
			})
			.appendTo(nuevoIttem);
			if(subItem.href != undefined)
				vinculo.attr("href", subItem.href);
			
			//			if(subItem.metodoClick != undefined)	
				/*vinculo.click(function(){
					alert('s');
//					alert(subItem.metodoClick);
//					subItem.metodoClick();
				});*/
			
			var span_texto  = $('<span >'+subItem.nombre+'</span>')
			.css({padding:3})
			.appendTo(vinculo);
			if(subItem.items != undefined){
				nuevoIttem
				.bind(this.eventoMostrarSubItem, function(){
						obj.mostrarItems($(this), posPadre, subItem.dir);
				})
				.bind('mouseleave', function(){
					obj.ocultarItems($(this));
				});
				
				var contSubMenu = $('<div />')
				 .css({
				 	position:'absolute',
					zIndex:'4',
				 	display:'none',
					paddingTop:3,
				 })
				 .appendTo(nuevoIttem);
				 if(subItem.dir == 'ver')
				 	contSubMenu.width(150);	
				 	
				 
				var nuevoSubMenu = $('<ul />')
				.css({
					padding:0,
					display:'inline-block',
				})
				.addClass('fm-submenu')
				.appendTo(contSubMenu);
				
				for(var i=0; i< subItem.items.length; i++){
					this.agregarIttem(subItem.items[i], nuevoSubMenu, subItem.dir);					
				}
			}
			
		}
		
		Menu.prototype.mostrarItems = function(ittem, posPadre, posIttem){
			 var ancho =0;			
			ittem.find('>div')
			.stop()
			.css({				
				width: 800,
				display: 'inherit'
			});
			if(posIttem == 'hor'){
				ittem.find('>div>ul>li').each(function(){
					ancho += $(this).width()+7;
				});
				
			}				
			else {
				ittem.find('>div>ul>li').each(function(){
					if($(this).width()+7 > ancho)
						ancho = $(this).width()+7;
				});
			}
			if(posPadre == 'hor'){
					ittem.find('>div').css({
						top:20,
						left:0
					})
				}
			else{
				ittem.find('>div').css({
					left:ittem.width()+2,
					top:-7
				})
			}	
				
			ittem.find('>div')
			.css({				
				width: ancho,
			});
		}
		
		Menu.prototype.ocultarItems = function(ittem){
			ittem.find('>div')
			.css({
				display:'none'
			})
		}
		
		this.construirMenu(this);
	},
	opcionesDefecto:{
		eventoMostrarSubItem : 'mouseover'
	}
}	