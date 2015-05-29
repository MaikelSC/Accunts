<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_experiencia extends CI_Controller {


	function __construct()
	{
		parent::__construct();
		$this->VerificarAut();
	}	
	 
	 
	function AdicionarExperiencia(){
		 if (isset($_POST['Adicionar_Experiencia'])) {
			$experiencia = new stdClass();
            $experiencia->nombre = $_POST['nombre'];
			$experiencia->urlFoto = $_POST['urlFoto'];
			$experiencia->unidad = $_POST['unid'];
			$experiencia->email = $_POST['email'];
			$experiencia->texto = $_POST['cuerpo'];
			$adicionado = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_experiencia', $experiencia);				if(count($adicionado)>0)
				redirect('c_experiencia/EditarExperiencia/'.$adicionado);
			redirect('c_admin/Error');	
		}
		$this->load->view('paginas/admin/adicionarExperiencia');	
	} 
	
	function _ObtenerExperienciaDadoId($idExperiencia){
		$experiencia = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_experiencia', 'id_experiencia', $idExperiencia);
		return $experiencia;
	}
	
	 function EditarExperiencia($id = null){ 	
		 if (isset($_POST['Editar_Experiencia'])) {
			$experiencia = new stdClass();
            $experiencia->nombre = $_POST['nombre'];
			$experiencia->urlFoto = $_POST['urlFoto'];
			$experiencia->unidad = $_POST['unid'];
			$experiencia->email = $_POST['email'];
			$experiencia->texto = $_POST['cuerpo'];	
			
			$adicionado = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'tb_experiencia', 'id_experiencia', $experiencia);	
			redirect('c_experiencia/EditarExperiencia/'.$adicionado);
		}
		$experiencia = $this->_ObtenerExperienciaDadoId($id);
		if(count($experiencia)==0)
			redirect('c_admin/Error');
		$datos['experiencia'] = $experiencia;
		$this->load->view('paginas/admin/adicionarExperiencia', $datos);		
	}
	
	function ListarExperiencias(){
		$this->load->view('paginas/admin/listarExperiencias');
	}
	
	function DevolverListadoExperienciasAjax(){
		$cantidadXPagina = $this->input->post('cantXPag');
	    $posInicial = $this->input->post('inicio');
	    $atributo_ordenar = $this->input->post('ordX');
	    $direccion_orden = $this->input->post('dir');
		$experiencias = $this->M_reutilizacion->ListarTabla('tb_experiencia', $cantidadXPagina, $posInicial, $atributo_ordenar, $direccion_orden);
				
		$result->total = count($this->M_reutilizacion->ListarTabla('tb_experiencia'));
		$result->datos = $experiencias;
		echo(json_encode($result));
	}
	
	
	
	function DevolverFotosExperiencias(){
		$idAlbum = "";	
		$imagenes = $this->M_reutilizacion->ListarTabla('tb_foto_exp');
		$result->imagenes = $imagenes;
		echo(json_encode($result));
	}
	
	function GuardarFotoExperiencia(){
	    $direccion = 'application/imagenes/upload/fotoExp';
		$name = 'oculto';
	    $retorno = $this->M_reutilizacion->GuardarFoto($direccion, $name);
		if(!isset($retorno->error)){
			$imagen->src = 'fotoExp/'.$_FILES['oculto']['name'];
			$idImagen = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_foto_exp', $imagen); 
			$imagen = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_foto_exp', 'id_foto_exp', $idImagen);
			echo '<script> parent.$.JCP.upload.retorno('.json_encode($imagen).');</script>';
		}
		else{			
	    	echo '<script> parent.$.JCP.upload.retorno('+json_encode($retorno)+');</script>';
		}			    
	}
	
	function EliminarFotoExperiencia(){
		$id = $this->input->post('id');
		$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_foto_exp', 'id_foto_exp', $id);
		echo(json_encode($id));
	}
	
	function EliminarExperiencia(){
		$ids = $this->input->post('ids');
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_experiencia', 'id_experiencia', $id);
		}
		echo(json_encode(""));
	}
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>