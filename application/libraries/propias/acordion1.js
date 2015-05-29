$.JCP.acordion1 = {
    objTemp : null,
	crear : function Acordion1(arregloParametros){
		$.extend(this, $.JCP.acordion1.opcionesDefecto, arregloParametros);
		var obj = this;
		Acordion1.prototype.construirAcordion = function(){
			this.contenedor = $('<ul></ul>')
//			.addClass('fm-menu')
			.css({
//				border:'1px solid red',
//				backgroundColor:'blue',
				float:'left',
				height:'100%',
				width:200
			})
			.appendTo(this.padre);
			
			this.pedirDatos();
		}
		
		Acordion1.prototype.pedirDatos = function(){
			$.consultaAjax.ejecutar({
				url: obj.urls.listarTodos,
//				data: obj.consultaListar.datosEnvio,
				persistir: obj,
				accionCorrecta: obj.llenarAcordion
			});
		}
		
		Acordion1.prototype.llenarAcordion = function(data){
			for(var i=0; i<data.length;i++){
				elemento = $('<li></li>')
				.addClass('fm-item')
				.addClass('fm-menu')
				.addClass('fm-borde')
				.addClass('fm-borde-redondeado')				
				.css({
					margin:2,
					padding:5,
					listStyle: 'none'					
				})
				.hover(function(){
					$(this)
					.removeClass('fm-menu')
					.css({
						cursor:'pointer'
					})
				}, function(){
					$(this)
					.addClass('fm-menu')
					.css({
						cursor:'none'
					})
				})
				.click(function(){
					if(!$(this).find('div').hasClass('acordAct')){
						if(obj.acordAct!= undefined){
							obj.acordAct
							.removeClass('acordAct')
//							.removeClass('fm-titulo2')
							.slideUp();
						}
						obj.acordAct = $(this).find('div')
						.addClass('acordAct')
//						.addClass('fm-titulo2')
						.slideDown();
					}
					if(obj.funcionClick != undefined)
						obj.funcionClick($(this).find('span').text());							
				})
				.appendTo(obj.contenedor);
				
				$('<a><span>'+data[i].nombre+'</span></a>')				
				.appendTo(elemento);
				
				$('<div>'+data[i].texto+'</div>')
				.css({
					display:'none',
					height:40
				})
				.appendTo(elemento);
			}
		}
		
		this.construirAcordion();
	},
	opcionesDefecto:{
		
	}
}