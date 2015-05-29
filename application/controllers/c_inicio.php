<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_inicio extends CI_Controller {


	function __construct()
	{
		parent::__construct();
	}	
	 
	 function index()
	{	
		
		$data['noticiasEnc'] = $this->prepararNoticiasEnc(3, TRUE);
		$data['listBannerUnidades'] = $this->prepararUnidadesPluggin();
		$data['inicio'] =  $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_general', 'nombre', 'inicio')->valor;
		$this->load->view('paginas/inicio', $data);
		
	}
	
	function QuienesSomos(){

		$data['quienesSomos'] =  $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_general', 'nombre', 'quienesSomos')->valor;
		$data['noticiasEnc'] = $this->prepararNoticiasEnc(3);
		$data['listBannerUnidades'] = $this->prepararUnidadesPluggin();
		$this->load->view('paginas/quienesSomos', $data);
	}
	
	function Experiencias($numPagina = 1){	
		$data['noticiasEnc'] = $this->prepararNoticiasEnc(3);
		$data['listBannerUnidades'] = $this->prepararUnidadesPluggin();
		$experiencias = $this->M_reutilizacion->ListarTabla('tb_experiencia',3,$numPagina,'id_experiencia','desc');
		if(count($experiencias) == 0){
			if($numPagina != 1)
				redirect('c_inicio/Experiencias/1');
			else
				$data['mensaje'] = "No existen testimonios publicados";
				$this->load->view('paginas/Experiencias', $data);	
			return;	
					
		}
		$paginacion = new stdClass();
		$paginacion->total = count($this->M_reutilizacion->ListarTabla('tb_experiencia'));
		$paginacion->cantPaginas = $paginacion->total/3;
		$paginacion->numPag = $numPagina;
		if($paginacion->total%3 > 0){
			$paginacion->cantPaginas = $paginacion->cantPaginas-(($paginacion->total%3)/3);
			$paginacion->cantPaginas++;
		}
		if($paginacion->cantPaginas > 1)
			$data['paginacion'] = $paginacion;
		$data['experiencias'] = $experiencias;
		$this->load->view('paginas/experiencias', $data);
	}
	
	
	function Contactos(){

		$data['noticiasEnc'] = $this->prepararNoticiasEnc(3);
		$data['listBannerUnidades'] = $this->prepararUnidadesPluggin();
		$this->load->view('paginas/contactos', $data);
	}	 
	
	function MostrarNoticia($id = null){;
		if($id == null){
			$noticias = $this->M_reutilizacion->ListarTabla('tb_noticia', 1, 1, 'fecha', 'desc');
			if(count($noticias)>0){
				$noticia = $noticias[0];
				$subcadenas = explode ( '-' ,$noticia->fecha);
				$subAux = explode ( ' ' ,$subcadenas[2]);					
				$result->dia = $subAux[0];
				$result->mes = $this->convertirMes($subcadenas[1]);
				$result->titulo = $noticia->titulo;
				$result->subtitulo = $noticia->subtitulo;
				$result->cuerpo = $noticia->cuerpo;
				$datos['noticia'] = $result;
			}
			
		}
		else
		{			
			$noticia = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_noticia', 'id_noticia', $id);
			if(count($noticia) >0){
				$subcadenas = explode ( '-' ,$noticia->fecha);
				$subAux = explode ( ' ' ,$subcadenas[2]);					
				$result->dia = $subAux[0];
				$result->mes = $this->convertirMes($subcadenas[1]);
				$result->titulo = $noticia->titulo;
				$result->subtitulo = $noticia->subtitulo;
				$result->cuerpo = $noticia->cuerpo;
				$datos['noticia'] = $result;
			}			
		}
		
		$datos['noticiasEnc'] = $this->prepararNoticiasEnc(5, TRUE);
		$datos['posInicial'] = 1;
		$datos['listBannerUnidades'] = $this->prepararUnidadesPluggin();
		$this->load->view('paginas/noticias', $datos);
	}
	
	function MostrarUnidad($id = null){
		if($id == null){
			$unid = $this->M_reutilizacion->ListarTabla('tb_unidad', 1, 1, 'nombre', 'asc');
			if(count($unid)>0)
				$unid= $unid[0];
		}
		else
		{
			$unid = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_unidad', 'id_unidad', $id);
		}
		$datos = array();
		if(count($unid) > 0 ){
			$result = new stdClass();
			$result->id = $unid->id_unidad;
			$result->url = $unid->urlFoto;
			$result->nombre = $unid->nombre;
			$result->texto = $unid->descripcion;
			$datos['unid'] = $result;
		}
		$this->load->view('paginas/unidades', $datos);
	}
	
	function prepararNoticiasEnc($cant, $fecha = null, $posInicial = 1, $dir = 'desc'){
		$noticias = $this->M_reutilizacion->ListarElementosDadoCampoValor('tb_noticia', 'publicado', 0, $cant, $posInicial, 'fecha', $dir);
		$resultNoticia = array();
		if(count($noticias) > 0){
			foreach($noticias as $noticia){
				$row = new stdClass();
				$row->noticia = strip_tags($noticia->cuerpo);
				$row->noticia = substr($row->noticia, 0, 73);				
				$row->id = $noticia->id_noticia;
				$resultNoticia[] = $row;
			}
			if($fecha)
				for($i =0; $i< count($noticias); $i++){
					$subAux = explode ( '-' ,$noticias[$i]->fecha);
					$subcadenas = explode  (" ",$subAux[2]);			
					$resultNoticia[$i]->dia = $subcadenas[0];
					$resultNoticia[$i]->mes = $this->convertirMes($subAux[1]);
				}
		}		
		return $resultNoticia;
	}
	
	function convertirMes($mes){
		switch($mes){
			case 1: return "ENE";break;
			case 2: return "FEB";break;
			case 3: return "MAR";break;
			case 4: return "ABR";break;
			case 5: return "MAY";break;
			case 6: return "JUN";break;
			case 7: return "JUL";break;
			case 8: return "AGO";break;
			case 9: return "SEP";break;
			case 10: return "OCT";break;
			case 11: return "NOV";break;
			default: return "DIC";break;
		}
	}
	
	function prepararUnidadesPluggin(){
		$unidades = $this->M_reutilizacion->ListarTabla('tb_unidad', null, null, 'nombre', 'asc');
		$resultUnid = array();
		if(count($unidades)>0)
		foreach($unidades as $unid){
			$row = new stdClass();
			$row->id = $unid->id_unidad;
			$row->nombre = $unid->nombre;
			$row->url = $unid->urlFoto;
			$resultUnid[] = $row;
		}
		return $resultUnid;
	}
	
	
	function DevolverNoticiasAjax(){
		$noticias = $this->prepararNoticiasEnc(5, true, $_POST['posInicial']+1, 'desc');
		if(count($noticias>0))		
		$result->posInicial = $_POST['posInicial']+1;
		$result->noticias = $noticias;
		echo(json_encode($result));
	}	
	
	function AdicionarMensaje(){
		$mensaje = new stdClass();
		$mensaje->nombre = $_POST['nombre'];
		$mensaje->email = $_POST['email'];
		$mensaje->telefono = $_POST['tel'];
		$mensaje->texto = $_POST['texto'];
		$idMensaje = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_mensaje', $mensaje);
	}
	
	
	function Autenticar(){
		$this->load->view('paginas/admin/autenticacion');
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>