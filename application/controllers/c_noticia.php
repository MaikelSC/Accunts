<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_noticia extends CI_Controller {


	function __construct()
	{
		parent::__construct();
		$this->VerificarAut();
	}	 
	 
	function AdicionarNoticia(){
		 if (isset($_POST['Adicionar_Noticia'])) {	
			$noticia = new stdClass();
            $noticia->titulo = $_POST['titulo'];
			$noticia->subtitulo = $_POST['subtitulo'];
			$noticia->publicado = $_POST['publicado'] ;		
			$noticia->cuerpo = $_POST['cuerpo'];
			$noticia->fecha = $this->M_reutilizacion->ConvertirFecha($_POST['fecha']);
			$adicionado = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_noticia', $noticia);	
			redirect('c_noticia/EditarNoticia/'.$adicionado);
		}
		$datestring = "%Y-%m-%d %h:%i";
		$time = time();		
		$fecha = mdate($datestring, $time); 
		$datos['fecha'] = $this->M_reutilizacion->DesconvertirFecha($fecha);
		$this->load->view('paginas/admin/adicionarNoticia', $datos);	
	} 
	
	 function EditarNoticia($id = null){ 		
		 if (isset($_POST['Editar_Noticia'])) {
			$noticia = new stdClass();
            $noticia->titulo = $_POST['titulo'];
			$noticia->subtitulo = $_POST['subtitulo'];
			$noticia->publicado = $_POST['publicado'] ;		
			$noticia->cuerpo = $_POST['cuerpo'];	
			$adicionado = $this->M_reutilizacion->EditarElementoDadoCampoValor($id, 'tb_noticia', 'id_noticia', $noticia);
			if(count($adicionado)>0)
				redirect('c_noticia/EditarNoticia/'.$adicionado);
			redirect('c_admin/Error');				
		}
		$noticia = $this->_ObtenerNoticiaDadoId($id);
		if(count($noticia)==0)
			redirect('c_admin/Error');
		$datos['noticia'] = $noticia;
		$this->load->view('paginas/admin/adicionarNoticia', $datos);		
	}
	
	function _ObtenerNoticiaDadoId($idNoticia){
		$noticia = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_noticia', 'id_noticia', $idNoticia);
		if($noticia!= null)
		$noticia->fecha = $this->M_reutilizacion->DesconvertirFecha($noticia->fecha);
		return $noticia;
	}
	
	function ListarNoticias(){
		$this->load->view('paginas/admin/listarNoticias');
	}
	
	function DevolverListadoNoticiasAjax(){
		$cantidadXPagina = $this->input->post('cantXPag');
	    $posInicial = $this->input->post('inicio');
	    $atributo_ordenar = $this->input->post('ordX');
	    $direccion_orden = $this->input->post('dir');
		$noticias = $this->M_reutilizacion->ListarTabla('tb_noticia', $cantidadXPagina, $posInicial, $atributo_ordenar, $direccion_orden);
		$result->datos = array();
		if(count($noticias) > 0)
		foreach($noticias as $row){
			$noticia = new stdClass();
			$noticia->id_noticia = $row->id_noticia;
			$noticia->fecha = $this->M_reutilizacion->DesconvertirFecha($row->fecha);
			$noticia->titulo = $row->titulo;
			$noticia->subtitulo = $row->subtitulo;
			if($row->publicado == 0)
				$noticia->publicado = 'Si';
			else
				$noticia->publicado = 'No';	
			$result->datos[] = $noticia;
		}		
		$result->total = count($this->M_reutilizacion->ListarTabla('tb_noticia'));
		
		echo(json_encode($result));
	}
	
	
	
	function DevolverImagenesNoticias(){
		$idAlbum = "";
		$imagenes = $this->M_reutilizacion->ListarTabla('tb_imagen');
		$result->imagenes = $imagenes;
		echo(json_encode($result));
	}
	
	function GuardarImagenNoticia(){
	    $direccion = 'application/imagenes/upload/noticias';
		$name = 'oculto';
	    $retorno = $this->M_reutilizacion->GuardarFoto($direccion, $name);
		if(!isset($retorno->error)){
			$imagen->src = 'noticias/'.$_FILES['oculto']['name'];
			$idImagen = $this->M_reutilizacion->AdicionarElementoDadoValor('tb_imagen', $imagen); 
			$imagen = $this->M_reutilizacion->ObtenerElementoDadoCamposValores('tb_imagen', 'id_imagen', $idImagen);
			echo '<script> parent.$.JCP.upload.retorno('.json_encode($imagen).');</script>';
		}
		else{			
	    	echo '<script> parent.$.JCP.upload.retorno('.json_encode($retorno).');</script>';
		}			    
	}
	
	function EliminarImagenNoticia(){
		$id = $this->input->post('id');
		$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_imagen', 'id_imagen', $id);
		echo(json_encode($id));
	}
	
	function EliminarNoticia(){
		$ids = $this->input->post('ids');;
		foreach($ids as $id){
			$this->M_reutilizacion->EliminarElementoDadoCampoValor('tb_noticia', 'id_noticia', $id);
		}
		echo(json_encode(""));
	}
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>