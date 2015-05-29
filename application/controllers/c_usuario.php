<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_usuario extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->VerificarAut();
	}
	
	function Adicionar(){
		$this->load->view('paginas/AdicionarUsuario');
	}
	
	function Editar($id){
		$datos['idUsuario'] = $id;
		$this->load->view('paginas/EditarUsuario', $datos);
	}
	
	function AdicionarUsuario(){
		$usuario = new stdClass();
		$usuario->nombre = $_POST['nombre'];
		$usuario->primer_apellido = $_POST['primer_apellido'];
		$usuario->segundo_apellido = $_POST['segundo_apellido'];
		$usuario->usuario = $_POST['usuario'];
		$usuario->contrasena = $_POST['contrasena'];
		$usuario->email = $_POST['email'];
		$usuario->telefono = $_POST['telefono'];
		$usuario->id_privilegio = $_POST['id_privilegio'];
		
		$idUsuario = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_usuario', $usuario);
		$result =$this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario', 'id_usuario', $idUsuario); 
		/*$mun = new stdClass();
		$mun->id = $result->id_privilegio;*/
//		$mun->valor = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_privilegio', 'id_privilegio', $result->id_privilegio)->valor;
		$result->id_privilegio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_privilegio', 'id_privilegio', $result->id_privilegio)->valor;
		echo(json_encode($result)); 		
	
	}
	
	function DevolverUsuario(){
		$id = $_POST['id'];
		$usuario =$this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario', 'id_usuario', $id); 
		$mun = new stdClass();
		$mun->id = $usuario->id_privilegio;
		$mun->valor = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_privilegio', 'id_privilegio', $usuario->id_privilegio)->valor;
		$usuario->id_privilegio = $mun;
		$usuario->contrasena = "";
		echo(json_encode($usuario));
		
	}	
	
	function EditarUsuario(){
		$id = $_POST['id'];
		$usuario = new stdClass();
		$usuario->nombre = $_POST['nombre'];
		$usuario->primer_apellido = $_POST['primer_apellido'];
		$usuario->segundo_apellido = $_POST['segundo_apellido'];
		$usuario->usuario = $_POST['usuario'];
		$usuario->contrasena = $_POST['contrasena'];
		$usuario->email = $_POST['email'];
		$usuario->telefono = $_POST['telefono'];
		$usuario->id_privilegio = $_POST['id_privilegio'];
		
		$idUsuario = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'tb_usuario', 'id_usuario', $usuario);
		$result = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario', 'id_usuario', $idUsuario);
		$result->id_privilegio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_privilegio', 'id_privilegio', $result->id_privilegio)->valor;
		echo(json_encode($result));
	}
	
	
	function ValidarUsuario(){
		$usuario = $_POST['valor'];
		$result = false;
		$consulta = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario','usuario',$usuario);
		if($consulta != null)
			$result = true;
		echo(json_encode($result));	
	}
	 
	 function cambiarContra($error = false){
	 	$datos['mal'] = $error;
	 	$this->load->view('paginas/admin/cambiarContra', $datos);	
	 }
	 
	 function cambiarPass()
	{
		$pass = $_POST['contra'];
		$nuevaContra = $_POST['nuevaContra'];
		$confirma = $_POST['confirma'];
		if($confirma == $nuevaContra){
			$usuario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario', array('usuario', 'contra'), array($this->session->userdata['usuario'], md5($pass)));
			if($usuario != null){
				$user->contra = md5($nuevaContra);
				$this->M_reutilizacion->EditarElementoDadoCampoValor($usuario->id_usuario, 'tb_usuario', 'id_usuario', $user);
				redirect('c_admin');
			}
		}
		$error = true;
		redirect('c_usuario/cambiarContra/'.$error);
		
	}
	
	function Listar(){
		$this->load->view('paginas/ListarUsuarios');
	}
	
	function ListarUsuariosAjax(){
		 $cant = $this->input->post('cantXPag');
		 $inicio = $this->input->post('inicio');
		 $ordenarX = $this->input->post('ordX');
		 $direccion = $this->input->post('dir');
		 if($ordenarX == 'id_privilegio')
		 	$nomencladores = $this->M_reutilizacion->ListarElementosJoinWhere('tb_usuario' , 'nom_privilegio'  , $ordenarX , null, null, null, $cant, $inicio,'nom_privilegio.valor', $direccion);
		else	
		 	$nomencladores = $this->M_reutilizacion->ListarTabla('tb_usuario', $cant, $inicio, $ordenarX, $direccion);
		 
		 foreach($nomencladores as $nomenclador){
		 	 $aux = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_privilegio', 'id_privilegio', $nomenclador->id_privilegio);
					$objAux = new stdClass();
					$objAux->id = $aux->id_privilegio;
					$objAux->valor = $aux->valor;
					$nomenclador->id_privilegio = $objAux;
					$nomenclador->contrasena = null;
		 }
		 $result->datos = $nomencladores;
		 $result->idFila = 'id_usuario';
		 $result->total = count($this->M_reutilizacion->ListarTabla('tb_usuario'));
		 echo(json_encode($result));
	}
	
	function EliminarUsuario(){
		$ids = $this->input->post('ids');;
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_usuario', 'id_usuario', $id);
		}
		echo(json_encode(""));
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>