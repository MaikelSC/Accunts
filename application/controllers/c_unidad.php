<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_unidad extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->VerificarAut();
	}
	
	function Adicionar(){
		$this->load->view('paginas/unidad/AdicionarUnidad');
	}
	
	function Editar($id){
		$datos['idUnidad'] = $id;
		$this->load->view('paginas/unidad/EditarUnidad', $datos);
	}
	
	function AdicionarUnidad(){
		$unidad = new stdClass();
		$unidad->nombre = $_POST['nombre'];
		$unidad->direccion = $_POST['direccion'];
		$unidad->director = $_POST['director'];
		$unidad->telefono = $_POST['telefono'];
		$unidad->codigo_postal = $_POST['codigo_postal'];
		$unidad->id_municipio = $_POST['id_municipio'];
		
		$idUnidad = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_unidad', $unidad);
		$result =$this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_unidad', 'id_unidad', $idUnidad); 
		$result->id_municipio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $result->id_municipio)->valor;
		echo(json_encode($result)); 		
	
	}
	
	function DevolverUnidad(){
		$id = $_POST['id'];
		$unidad =$this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_unidad', 'id_unidad', $id); 
		$mun = new stdClass();
		$mun->id = $unidad->id_municipio;
		$mun->valor = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $unidad->id_municipio)->valor;
		$unidad->id_municipio = $mun;
		echo(json_encode($unidad));
		
	}	
	
	function EditarUnidad(){
		$id = $_POST['id'];
		$unidad = new stdClass();
		$unidad->nombre = $_POST['nombre'];
		$unidad->direccion = $_POST['direccion'];
		$unidad->director = $_POST['director'];
		$unidad->telefono = $_POST['telefono'];
		$unidad->codigo_postal = $_POST['codigo_postal'];
		$unidad->id_municipio = $_POST['id_municipio'];
		
		$idUnidad = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'tb_unidad', 'id_unidad', $unidad);
		$result = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_unidad', 'id_unidad', $idUnidad);
		$result->id_municipio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $result->id_municipio)->valor;
		echo(json_encode($result));
	}
	 
	
	function Listar(){
		$this->load->view('paginas/unidad/ListarUnidades');
	}
	
	function ListarUnidadesAjax(){
		 $cant = $this->input->post('cantXPag');
		 $inicio = $this->input->post('inicio');
		 $ordenarX = $this->input->post('ordX');
		 $direccion = $this->input->post('dir');
		 if($ordenarX == 'id_municipio')
		 	$nomencladores = $this->M_reutilizacion->ListarElementosJoinWhere('tb_unidad' , 'nom_municipio'  , $ordenarX , null, null, null, $cant, $inicio,'nom_municipio.valor', $direccion);
		else	
		 	$nomencladores = $this->M_reutilizacion->ListarTabla('tb_unidad', $cant, $inicio, $ordenarX, $direccion);
		 
		 foreach($nomencladores as $nomenclador){
		 	 $aux = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $nomenclador->id_municipio);
					$objAux = new stdClass();
					$objAux->id = $aux->id_municipio;
					$objAux->valor = $aux->valor;
					$nomenclador->id_municipio = $objAux;
		 }
		 $result->datos = $nomencladores;
		 $result->idFila = 'id_unidad';
		 $result->total = count($this->M_reutilizacion->ListarTabla('tb_unidad'));
		 echo(json_encode($result));
	}
	
	function EliminarUnidad(){
		$ids = $this->input->post('ids');;
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_unidad', 'id_unidad', $id);
		}
		echo(json_encode(""));
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>