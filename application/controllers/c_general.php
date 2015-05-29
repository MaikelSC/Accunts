<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_general extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->VerificarAut();
	}	 
	 
	function AdicionarGeneral(){
		 if (isset($_POST['Adicionar_General'])) {
			$general = new stdClass();
            $general->nombre = $_POST['nombre'];
			$general->valor = $_POST['cuerpo'];
			$adicionado = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_general', $general);	
			redirect('c_general/EditarGeneral/'.$adicionado);
		}
		$this->load->view('paginas/admin/adicionarGeneral');	
	} 
	
	function _ObtenerGeneralDadoId($idGeneral){
		$general = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_general', 'id_general', $idGeneral);
		return $general;		
	}
	
	 function EditarGeneral($id = null){ 		
		 if (isset($_POST['Editar_General'])) {
			$general = new stdClass();
			$general->nombre = $_POST['nombre'];
			$general->valor = $_POST['cuerpo'];;		
			$adicionado = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'tb_general', 'id_general', $general);	
			if(count($adicionado)>0)
				redirect('c_general/EditarGeneral/'.$adicionado);	
			redirect('c_admin/Error');				
		}
		$general = $this->_ObtenerGeneralDadoId($id);
		if(count($general)==0)
			redirect('c_admin/Error');		
		$datos['general'] = $general;
		$this->load->view('paginas/admin/adicionarGeneral', $datos);			
	}
	
	function ListarGenerales(){
		$this->load->view('paginas/admin/listarGenerales');
	}
	
	function DevolverListadoGeneralesAjax(){
		$cantidadXPagina = $this->input->post('cantXPag');
	    $posInicial = $this->input->post('inicio');
	    $atributo_ordenar = $this->input->post('ordX');
	    $direccion_orden = $this->input->post('dir');
		$generales = $this->M_reutilizacion->ListarTabla('tb_general', $cantidadXPagina, $posInicial, $atributo_ordenar, $direccion_orden);
				
		$result->total = count($this->M_reutilizacion->ListarTabla('tb_general'));
		$result->datos = $generales;
		echo(json_encode($result));
	}
	
	function EliminarGeneral(){
		$ids = $this->input->post('ids');
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_general', 'id_general', $id);
		}
		echo(json_encode(""));
	}
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>