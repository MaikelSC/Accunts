$(document).ready(function(){        
		var atribMenu = {
			padre: $('nav'),
			id: 'menuPrincipal',
			dir: 'hor',
			items : DevolverMenu()
		}; 
        
	   
	    $.JCP.Crear('menu', atribMenu);		
		

});

function DevolverMenu(){
	var datos;
	if($('#priv').val() == '1')
		datos = DevolverMenuAdmin();
	else if($('#priv').val() == '2')	
		datos = DevolverMenuRepresentante();
	return datos;	
}

function DevolverMenuAdmin(){
	datos = [{
		nombre: 'Nomenclador',
		dir: 'ver',
		items: [{
				nombre: 'Listar Nomenclador',
				href: $.urlServer+'/index.php/c_nomenclador'
				}]
		},{
		nombre: 'Usuario',
		dir: 'ver',
		items: [{
				nombre: 'Adicionar Usuario',
				href: $.urlServer+'/index.php/c_usuario/Adicionar'
			},{
				nombre: 'Listar Usuarios',
				href: $.urlServer+'/index.php/c_usuario/Listar'
			}]
		},{
		nombre: 'Unidad',
		dir: 'ver',
		items: [{
				nombre: 'Adicionar Unidad',
				href: $.urlServer+'/index.php/c_unidad/Adicionar'
			},{
				nombre: 'Listar Unidades',
				href: $.urlServer+'/index.php/c_unidad/Listar'
			}]
		}];
	return datos;
}

function DevolverMunicipal(){
	datos = [{
		nombre: 'Solicitud',
		dir: 'ver',
		items: [{
				nombre: 'Listar Solicitudes'
				}]
		},{
		nombre: 'Usuario',
		dir: 'ver',
		items: [{
				nombre: 'Adicionar Usuario',
			},{
				nombre: 'Listar Usuarios'
			}]
		}];
	return datos;
}

function DevolverProvincial(){
	datos = [{
		nombre: 'Solicitud',
		dir: 'ver',
		items: [{
				nombre: 'Listar Solicitudes'
				}]
		},{
		nombre: 'Usuario',
		dir: 'ver',
		items: [{
				nombre: 'Adicionar Usuario',
			},{
				nombre: 'Listar Usuarios'
			}]
		}];
	return datos;
}

function DevolverRepresentante(){
	datos = [{
		nombre: 'Solicitud',
		dir: 'ver',
		items: [{
				nombre: 'Listar Solicitudes'
				}]
		},{
		nombre: 'Usuario',
		dir: 'ver',
		items: [{
				nombre: 'Adicionar Usuario',
			},{
				nombre: 'Listar Usuarios'
			}]
		}];
	return datos;
}