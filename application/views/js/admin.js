$(document).ready(function(){
        
		var atribMenu = {
			padre: $('nav'),
			id: 'menuPrincipal',
			dir: 'hor',
			itmes : DevolverMenuAdmin()
		}; 
	   
	    $.JCP.Crear('menu', atribMenu);
		
		/*$('#padreMenuAdmin').empty();*/
		
		/*$('#mega-menu-5').dcMegaMenu({
		rowItems: '3',
		speed: 0,
//		effect: 'slide',
//		event: 'click',
//		fullWidth: false
	});*/
		/*$.JCP.Crear('menu',{
								 padre : $('#padreMenuAdmin'),
								 id : 'idmenuAdmin',
								 css : undefined,
								 dir: 'hor',
								 items:[{
								 	nombre: 'Noticias',
									dir:'ver',
									 items:[{
									 	nombre: 'Adicionar Noticia',
										href: $.urlServer+'/P2/index.php/c_noticia/AdicionarNoticia'
									 },{
									 	nombre: 'Listar Noticias',
										href: $.urlServer+'/P2/index.php/c_noticia/ListarNoticias'
									 }]
								 },{
								 	nombre: 'Universidades',
									dir:'ver',
									items:[{
									 	nombre: 'Adicionar Universidad',
										href: $.urlServer+'/P2/index.php/c_universidad/AdicionarUniversidad'
									 },{
									 	nombre: 'Listar Universidades',
										href: $.urlServer+'/P2/index.php/c_universidad/ListarUniversidades'
									 }]
								 },{
								 	nombre: 'Experiencias',
									dir:'ver',
									items:[{
									 	nombre: 'Adicionar Experiencia',
										href: $.urlServer+'/P2/index.php/c_experiencia/AdicionarExperiencia'
									 },{
									 	nombre: 'Listar Experiencias',
										href: $.urlServer+'/P2/index.php/c_experiencia/ListarExperiencias'
									 }]
								 }]
								 
								
								})*/

});

function DevolverMenuAdmin(){
	datos = [{
		nombre: 'Nomenclador',
		dir: 'ver',
		items: [{
				nombre: 'Listar Nomenclador'
			},{
				nombre: 'Usuario',
				dir: 'ver',
				items: [{
					nombre: 'Adicionar Usuario',
				},{
					nombre: 'Listar Usuarios'
				}]
			}]
	}];
	return datos;
}