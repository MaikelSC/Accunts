<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_nomenclador extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper('inflector');
	}	
	
	function index(){
		$this->load->view('paginas/Nomenclador');
	}
	
	function ListarNomencladores(){
		 $tablas =  $this->db->list_tables();
		 $result = array();
		 foreach($tablas as $tabla){
		    if(substr_count($tabla , "nom_") > 0){
			    $humnizada = $this->Humanizar($tabla);
				$humnizada->texto = "";
				$result[] = $humnizada;				
			}			
		 }
		 echo(json_encode($result));
	 }
	
	 function DefinirFilaEditar(){
	     $nomenclador = $this->input->post('nomenclador');
	     $nomenclador = $this->Deshumanizar($nomenclador);
//	     $auxIds = $this->db->list_fields($nomenclador);
	     $auxIds = $this->db->field_data($nomenclador);
		 $campos = array();
		 for($i = 1;$i<count($auxIds);$i++){
		 	$campo = new stdClass();
			$aux = str_replace("id_", "", $auxIds[$i]->name);
			$campo->name = $this->Humanizar($aux)->nombre;
			$campo->id = $auxIds[$i]->name;
			switch($auxIds[$i]->type){
				case 'string':
					$campo->tipo = 1;break;
				case 'date':
					$campo->tipo = 1.3;break;
				case 'int':
					if(substr_count($auxIds[$i]->name , "id_") > 0){
						$campo->tipo = 2.1;
					}
					else $campo->tipo = 1;		
			}
			if($campo->id == 'valor')
				array_unshift($campos , $campo);
			else
				$campos[] = $campo;
		 }
		 $result->campos = $campos;
		 $result->editar = true;
		 echo(json_encode($result));
	 }
	 
	 function ListarDatosNomenclador(){	     
	     $nomenclador = $this->input->post('nomenclador');
		 $cant = $this->input->post('cantXPag');
		 $inicio = $this->input->post('inicio');
		 $ordenarX = $this->input->post('ordX');
		 $direccion = $this->input->post('dir');		 
		 $tablaNom = $this->Deshumanizar($nomenclador);
		 $idTablaNom =  str_replace("nom_", "id_", $tablaNom);
		 if(substr_count($ordenarX , "id_") > 0){
		 	$tablaOrdX = str_replace("id_", "nom_", $ordenarX);
			
			$nomencladores = $this->M_reutilizacion->ListarElementosJoinWhere($tablaNom , $tablaOrdX  , $ordenarX , null, null, null, $cant, $inicio, $tablaOrdX.'.valor', $direccion);
			foreach($nomencladores as $row){
				$row->valor = $this->M_reutilizacion->ObtenerElementoDadoCamposValores($tablaNom, $idTablaNom, $row->$idTablaNom)->valor;
			}			
		 }
		 else
			 $nomencladores = $this->M_reutilizacion->ListarTabla($tablaNom, $cant, $inicio, $ordenarX, $direccion);		 
		 $campos = $this->db->field_data($tablaNom);
		 if(count($nomencladores)> 0)
		 foreach($nomencladores as $row){
			 foreach($campos as $campo){
			    if(substr_count($campo->name , "id_") > 0 && !$campo->primary_key){
					$tabla = str_replace("id_", "nom_", $campo->name);
					$campoAux = $campo->name;
				    $aux = $this->M_reutilizacion->ObtenerElementoDadoCamposValores($tabla, $campo->name, $row->$campoAux);
					$objAux = new stdClass();
					$objAux->id = $aux->$campoAux;
					$objAux->valor = $aux->valor;
					$row->$campoAux = $objAux;
				}	
			 }
		 }
		 $result->idFila = str_replace("nom_", "id_", $tablaNom);
		 $result->datos = $nomencladores;					
	     $result->total = count($this->M_reutilizacion->ListarTabla($tablaNom));	
		 echo(json_encode($result));
	 } 
	 
	 function EditarNomenclador(){
	     $nomenclador = $this->input->post('confMulti');// aqui se envia el nomenclador correspondiente
		 $nomenclador = $this->Deshumanizar($nomenclador);		 
		 $id = str_replace("nom_", "id_" , $nomenclador);
		 $camposPrev = $this->db->field_data($nomenclador);
		 $datos = new stdClass();
		 foreach($_POST as $key=>$value){
		 	if($key != 'confMulti' && $key != 'id')
		 		$datos->$key = $value;
		 }		 
		 if(isset($_POST['id']))
		 	$idElemento = $this->M_reutilizacion->EditarElementoDadoCampoValor($_POST['id'], $nomenclador, $id, $datos);
		else
			$idElemento = $this->M_reutilizacion->AdicionarElementoDadoValor($nomenclador, $datos);	
		 $elemento = $this->M_reutilizacion->ObtenerElementoDadoCamposValores($nomenclador, $id, $idElemento);		 
		 $campos = $this->db->field_data($nomenclador);
		 $result = new stdClass();
		 
		 foreach($campos as $campo){
		    if(substr_count($campo->name , "id_") > 0 && !$campo->primary_key){
				$tabla = str_replace("id_", "nom_", $campo->name);
				$campoAux = $campo->name;
			    $aux = $this->M_reutilizacion->ObtenerElementoDadoCamposValores($tabla, $campo->name, $elemento->$campoAux);
				$objAux = new stdClass();
				$objAux->id = $aux->$campoAux;
				$objAux->valor = $aux->valor;
				$elemento->$campoAux = $objAux;
			}	
		 }
		 $result = $elemento;
		 echo(json_encode($result));
	 }
	 
	 function ListarNomencladorCombo(){
	 	 $idNomenclador = $this->input->post('combo');
		 $nomenclador = str_replace('id_', 'nom_', $idNomenclador);
	 	 $datos = $this->M_reutilizacion->ListarTabla($nomenclador);
		 $result = array();
		 if(count($datos) > 0)
		 foreach($datos as $row){
			$fila= new stdClass();
			$fila->id_item = $row->$idNomenclador;
			$fila->valor = $row->valor;
			$result[] = $fila;
		 }
		 $combo = new stdClass();
		 $combo->id_combo = $idNomenclador;
		 $result[] = $combo;
		
		echo(json_encode($result));
	 }
	 
	 function EliminarNomenclador(){
	 	$ids = $this->input->post('ids');
		$nomenclador = $this->input->post('confMulti');
		$tabla = $this->Deshumanizar($nomenclador);
		$idNomenclador = str_replace("nom_", "id_" , $tabla); 
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor($tabla, $idNomenclador, $id);		
		}	
		$result->total = count($this->M_reutilizacion->ListarTabla($tabla));
		echo(json_encode($result));
	 }
	  
	 function Humanizar($tabla){
		$dato = str_replace("nom_", "" , $tabla );
	    $humanizada = new stdClass();
		$humanizada->nombre = humanize($dato);
	    $humanizada->nombre = str_replace(" ", " de " , $humanizada->nombre ); 
		return $humanizada;
	 }
	 
	 function Deshumanizar($tabla){	    
	    $tabla = "nom ".$tabla;
		$tabla = underscore($tabla);
		$tabla = str_replace("_de_", "_" , $tabla );
		return $tabla;
	 }
	 
	 
	 function Formulario(){
            $noticia->id_municipio = $_POST['id_municipio'];
			$noticia->nombre = $_POST['nombre'];
			$noticia->fecha = $_POST['fecha'] ;
			$noticia->fecha = $this->M_reutilizacion->ConvertirFecha($_POST['fecha']);
			$adicionado = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_formulario', $noticia);
			
			$formulario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_formulario','id_formulario', $adicionado);
			$formulario->fecha = $this->M_reutilizacion->DesConvertirFecha($formulario->fecha);
			$formulario->id_municipio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $formulario->id_municipio)->valor;
			echo(json_encode($formulario));	
	 }
	 
	 function DevolverFormulario(){
	 	$idFormulario = $_POST['id'];
		$formulario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_formulario','id_formulario', $idFormulario);
		$formulario->fecha = $this->M_reutilizacion->DesConvertirFecha($formulario->fecha);
		$data = new stdClass();
		$data->id = $formulario->id_municipio;
		$data->valor = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $formulario->id_municipio)->valor;
		$formulario->id_municipio = $data;
		echo(json_encode($formulario));
		
	 }
	 
	  function EditarFormulario(){
	 	$id= $_POST['id'];
		$formulario = new stdClass();
		$formulario->id_municipio = $_POST['id_municipio'];
		$formulario->nombre = $_POST['nombre'];
		$formulario->fecha = $this->M_reutilizacion->ConvertirFecha($_POST['fecha']);
		$idFormulario = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'tb_formulario', 'id_formulario', $formulario);
		$formulario = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_formulario','id_formulario', $idFormulario);
		$formulario->fecha = $this->M_reutilizacion->DesConvertirFecha($formulario->fecha);
		$formulario->id_municipio = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('nom_municipio', 'id_municipio', $formulario->id_municipio)->valor;
		echo(json_encode($formulario));
		
	 }
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */