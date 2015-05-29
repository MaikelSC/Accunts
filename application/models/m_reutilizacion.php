<?php
class M_reutilizacion extends CI_Model {

    function M_reutilizacion()
    {
        parent::__construct();       
    }	
	function AdicionarElementoDadoValor($tabla, $datos){
		$this->db->insert($tabla, $datos);
		return $this->db->insert_id();
	}
	
	// listar todos los elementos de una tabla..
	function ListarTabla($tabla, $cantidadXPagina = null, $posInicial = null, $atributo_ordenar = null, $direccion_orden = null){
		$this->db->select('*');
		$this->db->from($tabla);
		
		if( $direccion_orden == "asc")
	       $this->db->order_by($atributo_ordenar, "asc");
	     else if($direccion_orden == "desc")
	       $this->db->order_by($atributo_ordenar, "desc");
		 if($cantidadXPagina != null)  
		   $this->db->limit($cantidadXPagina, ($posInicial-1)*$cantidadXPagina);
		$consulta = $this->db->get();
		
    	if ($consulta->num_rows()==0)
			return null;
			$lista =  Array();
    	foreach ($consulta->result() as $row){
    		$lista[] = $row;
		}
		return $lista;
    }
	
	function ObtenerElementoDadoCamposValores($tabla, $campos , $valores){	   
	    $this->db->select('*');
		$this->db->from($tabla);
		if(is_array($campos))
			for($i = 0; $i<count($campos); $i++)
				$this->db->where($campos[$i], $valores[$i]);       	
		else
			$this->db->where($campos, $valores);
		$consulta = $this->db->get();
		if($consulta->num_rows() == 0)
			return null;  	
    	return $consulta->first_row();
    }
	
	
	// obtener lista de elementos de una tabla dado un campo de la tabla y un valor
	function ListarElementosDadoCampoValor($tabla, $campo ,$valor, $cantidadXPagina = null, $posInicial = null, $atributo_ordenar = null, $direccion_orden = null){
		$this->db->select('*');
		$this->db->from($tabla);
		if(is_array($campo))
        	for($i = 0; $i<count($campo); $i++)
    			$this->db->where($campo[$i], $valor[$i]);
		else
			$this->db->where($tabla.".".$campo, $valor);
		
	    if( $direccion_orden == "asc")
	       $this->db->order_by($atributo_ordenar, "asc");
	   else if($direccion_orden == "desc")
	       $this->db->order_by($atributo_ordenar, "desc");
		 if($cantidadXPagina != null)  
		   $this->db->limit($cantidadXPagina, ($posInicial-1)*$cantidadXPagina);
	$consulta = $this->db->get();
		
	if ($consulta->num_rows()==0)
			return null;
			$lista_elementos =  Array();
    	foreach ($consulta->result() as $row){
    		$lista_elementos[] = $row;
		}
		return $lista_elementos; 		
	}
	
	function ListarElementosJoinWhere($tabla , $tablaJoin  , $atributoTablaJoin , $arregloTablaJoin ,$arregloNombreAtributoParametro = null, $arregloAtributoParametro = null, 
   $cantidadXPagina = null, $posInicial = null, $atributo_ordenar = null, $direccion_orden = null, $operadorWhere= null){
		if($operadorWhere == null)
		$operadorWhere = '=';
        $this->db->select('*');
	    $this->db->from($tabla);
        $this->db->join($tablaJoin, $tablaJoin.".".$atributoTablaJoin." =".$tabla.".".$atributoTablaJoin);
	    if($arregloNombreAtributoParametro != null)
	   		for($i =0; $i< count($arregloNombreAtributoParametro) ; $i++)
       			$this->db->where($arregloTablaJoin[$i].".".$arregloNombreAtributoParametro[$i]." ".$operadorWhere, $arregloAtributoParametro[$i]);
	   
	   if( $direccion_orden == "asc")
	     $this->db->order_by($atributo_ordenar, "asc");
	   else if($direccion_orden == "desc")
	     $this->db->order_by($atributo_ordenar, "desc");
		 if($cantidadXPagina != null)  
		   $this->db->limit($cantidadXPagina, ($posInicial-1)*$cantidadXPagina);
		 
         $consulta = $this->db->get();
		 $resultado =  Array();
    	 foreach ($consulta->result() as $row){
    		$resultado[] = $row;
		 }		 
		 return $resultado;
    }  
	
	//Esto es para Devolver los elementos para llenar un combo
	function DevolverElementosComboAjax($idCombo , $tabla , $id_tabla){
		$listado = $this->ListarTabla($tabla);
		$result = array();
		foreach($listado as $row){
			$aux = new stdClass();
			$aux->id_item = $row->$id_tabla;
			$aux->nombre = $row->nombre;
			$result[] = $aux;
		}
		$combo = new stdClass();
		$combo->id_combo = $idCombo;
		$result[] = $combo;
		return $result;
	}
	
	function EditarElementoDadoCampoValor($id, $tabla, $idTabla, $datos){
		$this->db->update($tabla, $datos, $idTabla.' ='.$id);
    	return $id;
	}
	
	function EliminarElementoDadoCampoValor($tabla, $campo, $valor){
		$this->db->delete($tabla, array($campo => $valor));
	}
		
	// este metodo es para convertir la fecha a tipo Date para adicionarla en la bd
	function ConvertirFecha($fecha){
		$arreglo = split('/', $fecha);
		$fecha = $arreglo[2]."-".$arreglo[1]."-".$arreglo[0];
		return $fecha;
		
	    /*$arreglo = explode('/', $fecha);
		$ano = explode(' ', $arreglo[2]);
		$fecha = $ano[0]."-".$arreglo[1]."-".$arreglo[0]." ".$ano[1];
		return $fecha;*/
	}
	function DesconvertirFecha($fecha){
		$arreglo = split('-', $fecha);
		$fecha = $arreglo[2]."/".$arreglo[1]."/".$arreglo[0];
		return $fecha;
	   /* $arreglo = explode('-', $fecha);
		$dia = explode(' ', $arreglo[2]);
		$fecha = $dia[0]."/".$arreglo[1]."/".$arreglo[0]." ".$dia[1];
		return $fecha;*/
	}
	
	function BuscarEnArreglo($arreglo, $elemento){
       for($i = 0; $i < count($arreglo); $i++){
		   if($elemento == $arreglo[$i])
		   return $i;
	   }
       return false; 
	}	
	
	function GuardarFoto($direccion, $name, $tipo = null, $maxTamano = null ){
	    $result= new stdClass();
        if($maxTamano == null)
			$maxTamano = 10485760; //10MB
		if($tipo == null)
			$tipo2 = 'image';
		$tipo = substr($_FILES[$name]['type'], 0, 5);
		if (isset($_FILES[$name]['tmp_name'])) {
			if($tipo2 == $tipo){
				if($_FILES[$name]['size'] <= $maxTamano ){
					if(!copy($_FILES[$name]['tmp_name'], $direccion.'/'.$_FILES[$name]['name']))
					 	$result->error = 4;
				}
				else{
					$result->error = 3;
					$result->tamano = '10Mb';
				}
			}
			else{
				$result->error = 2;
				$result->tipo = 'Imagen';
			}
		}
		else{
			$result->error = 1;
		}
		return $result;
	}
}
    

