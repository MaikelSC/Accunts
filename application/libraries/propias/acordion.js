
function crearAcordion(contenedor, elementos /*, idAcordion*/ ,nombreCSS, textoCSS, funcionCambio){   
   // var contenedor =  $('<div id= "este"></div>').appendTo(contenedor);
    contenedor.css({
			height:'550px',
			overflow:'auto'
		});
	var acordion = $('<div class = "acordion_cuerpo"></div>').appendTo(contenedor);
	for(var i = 0; i< elementos.length; i++){
		$('<h3 class = "acordion_titulos" ><a >'+elementos[i].nombre+'</a></h3>').appendTo(acordion);
		if(elementos[i].texto != null)
		$('<div class = "acordion_descripcion"><p class = "acordion_parrafos">'+elementos[i].texto+'</p></div>').appendTo(acordion);		
	}	
	/*acordion.find('h3').css(nombreCSS);	
	acordion.find('div').css({
	paddingTop:'0px'
	});
	acordion.find('div p').css(textoCSS);*/
	return acordion;
}