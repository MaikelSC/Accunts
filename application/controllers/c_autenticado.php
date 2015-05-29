<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

 class c_autenticado extends CI_Controller {
	
	 function __construct()
	{
		parent::__construct();
//		$this->mensaje = $mensaje;		
		
	}
	
	function adminAutenticado(){
//		print_r("asfd");
		$this->load->view('paginas/noticias');
	}	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
?>