<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Autenticacion</title>
<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/jquery-1.5.1.js'></script>
<script type='text/javascript' src='<?=base_url()?>application/libraries/propias/JCP.js'></script>
<script type='text/javascript' src='<?=base_url()?>application/views/js/autenticar.js'></script>
<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/md5.js'></script>

<link href="<?=base_url()?>application/libraries/propias/css/temas/azul/estilo.css" rel="stylesheet" type="text/css" />
<link href="<?=base_url()?>application/views/templates/autenticacion.css" rel="stylesheet" type="text/css" />
</head>

<body>
<form  method="post" action="<?=site_url()?>/c_admin/Autenticar" onsubmit="return VeriricarAut()">
<div class="fm-borde fm-borde-redondeado" id="divAut"><div class="fm-titulo fm-borde fm-borde-redondeadoSup">Autenticar</div>
	<div id="izq">Introduzca un usuario y contrase&ntilde;a v&aacute;lidos para acceder a la administraci&oacute;n<br/><br/><a href="<?=base_url()?>">Ir a la p&aacute;gina de Inicio</a>
	<img  src="<?=base_url()?>/application/views/templates/imagenes/Padlock.png"/>
	</div>
	<div id="der"><table class="fm-borde fm-borde-redondeado" >
		<tr><td class="fm-label">Usuario:</td><td><input type="text" class="fm-text" name="usuario" id="usuario"/></td></tr>
		<tr><td class="fm-label">Contrase&ntilde;a:</td><td><input class="fm-text" type="password" name="contra" id="contra"/></td></tr>
		<tr><td colspan="4" id="filaMsg"><?=isset($mensaje)?$mensaje:''?></td ></tr>
		<tr><td colspan="4" id="botones"><input type="submit" class="fm-boton" id="acceder" value="Acceder"/><input type="button" class="fm-boton"  value="Cancelar"/></td></tr>
	</table></div>
</div>
</form>
</body>
</html>
