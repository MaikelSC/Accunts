<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_mensaje extends CI_Controller {


	function __construct()
	{
		parent::__construct();
		$this->VerificarAut();
	}	
	 
	
	function DevolverTextoMensaje(){
		$mensaje = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_mensaje', 'id_mensaje', $_POST['id']);
		$result = $mensaje->texto;
		echo(json_encode($result));
	}
	
	
		
	function ListarMensajes(){
		$this->load->view('paginas/admin/listarMensajes');
	}
	
	function DevolverListadoMensajesAjax(){
		$cantidadXPagina = $this->input->post('cantXPag');
	    $posInicial = $this->input->post('inicio');
	    $atributo_ordenar = $this->input->post('ordX');
	    $direccion_orden = $this->input->post('dir');
		$mensajes = $this->M_reutilizacion->ListarTabla('tb_mensaje', $cantidadXPagina, $posInicial, $atributo_ordenar, $direccion_orden);
				
		$result->total = count($this->M_reutilizacion->ListarTabla('tb_mensaje'));
		$result->datos = $mensajes;
		echo(json_encode($result));
	}
	
	
	
	function EliminarMensaje(){
		$ids = $this->input->post('ids');
//		 print_r($ids);
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_mensaje', 'id_mensaje', $id);
		}
		echo(json_encode(""));
	}
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>