<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_admin extends CI_Controller {

	var $priv;
	
	 function __construct()
	{
		parent::__construct();
//		$this->mensaje = $mensaje;		
		
	}	
	
	public function setMensaje($mensaje){
		$this->mensaje = $mensaje;
		redirect('c_admin/MostrarError');
	}
	 
	 function index()
	{
		$this->VerificarAut();
		$this->load->view('paginas/admin/admin');			
	}
	
	
	function Autenticar(){
		$usuario = $this->input->post('usuario');
//		$contra = md5($this->input->post('contra'));		
		$contrasena = $this->input->post('contra');		
		$resultUsuario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario', array('usuario','contrasena'), array($usuario, $contrasena));
//		$resultUsuario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_usuario', 'usuario','contrasena', $usuario);
		if($resultUsuario!= null){
				$Usuario = new stdClass();
				$Usuario->usuario = $resultUsuario->usuario;
				$Usuario->priv = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_privilegio', 'id_privilegio', $resultUsuario->id_privilegio)->valor;
				$this->session->set_userdata("usuario",$resultUsuario->usuario);
				
				switch ($Usuario->priv){
					case 'Administrador':
						$priv = 1;break;
					case 'Representante':
						$priv = 2;break;
					case 'Encargado Municipal':
						$priv = 3;break;
					case 'Encargado Provincial':
						$priv = 4;break;
					case 'Encargado Nacional':
						$priv = 5;break;				
				};
				
				$this->session->set_userdata("priv",$priv);	
				redirect('c_admin/Bienvenido');
		}
		else{
			$data['mensaje'] = 'Usuario o contraseña incorrectos';
			$this->load->view('paginas/admin/autenticacion', $data);
			
//			$Usuario->error = true;
//		    $Usuario->mensaje = "Usuario o contraseña erróneas";
			
		}		
//		echo(json_encode($Usuario));
	
	}
	
	function Bienvenido(){
//		$datos['priv'] = $this->priv;
//		print_r($this);
		$this->load->view('paginas/Autenticado');
	}
	
	function Desautenticar(){
		$this->VerificarAut();
		$this->session->unset_userdata("usuario");
		redirect('c_inicio/Autenticar');
	}
	
	
	function Error(){
		$this->VerificarAut();
		$datos['heading'] = 'Error';
		$datos['message'] = 'El elemento requerido no existe en la base de datos';
		$this->load->view('paginas/admin/error', $datos);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>