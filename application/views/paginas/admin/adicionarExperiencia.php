<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/admin.dwt" codeOutsideHTMLIsLocked="false" -->

<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<!-- InstanceBeginEditable name="doctitle" -->
<title><?=isset($universidad)?"Editar Experiencia":"Adicionar Experiencia"?></title>
<!-- InstanceEndEditable -->
<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/jquery-1.5.1.js'></script>
<script type='text/javascript' src='<?=base_url()?>application/libraries/propias/JCP.js'></script>

<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/easyslider/js/easySlider.js'></script>

<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/menuAdmin.js'></script>

<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/jquery.hoverIntent.minified.js'></script>


<link href="<?=base_url()?>application/libraries/jQuery/easyslider/css/screen.css" rel="stylesheet" type="text/css" />
<link href="<?=base_url()?>application/views/templates/plantilla.css" rel="stylesheet" type="text/css" />
<link href="<?=base_url()?>application/views/templates/menu.css" rel="stylesheet" type="text/css" />


<link href="<?=base_url()?>application/views/templates/skins/white.css" rel="stylesheet" type="text/css" />

<!-- InstanceBeginEditable name="head" -->

<link href="<?=base_url()?>application/libraries/propias/editor/jquery.cleditor.css" rel="stylesheet" type="text/css" />

<script type='text/javascript' src='<?=base_url()?>application/libraries/propias/editor/jquery.cleditor.js'></script>

<script type='text/javascript' src='<?=base_url()?>application/views/js/admin.js'></script>
<script type='text/javascript' src='<?=base_url()?>application/views/js/experiencia.js'></script>

<!-- InstanceEndEditable -->


</head>

<body>
<div ></div>
<table  border="0" id="cuerpo" >	
  <tr>
    <td><div><img src="<?=base_url()?>application/views/templates/imagenes/euroEstudios.png" name="EuroBanner" id="EuroBanner"/></div></td>
	<td id="contBanner2">
		<div id="redes">
		</div>
		<div id="rectangulo"></div>
		<div id="telefonos"><div id="labelTel"><span id="encTel">Tel.:</span> <span id="numTel">(02)254545454 / 54521452154</span></div></div>
		
	</td>
  </tr>
  <tr>
    <td colspan="2" id="padreMenu"><nav id="menu">
    <ul class="menu">
        <li><a href="<?=base_url()?>index.php/c_inicio" class="parent"><span>Inicio</span></a></li>
        <li><a href="<?=base_url()?>index.php/c_inicio/QuienesSomos" class="parent"><span>Quienes Somos</span></a></li>
        <li><a href="<?=base_url()?>index.php/c_inicio/MostrarUnidad"><span>Unidades</span></a></li>
        <li ><a href="<?=base_url()?>index.php/c_inicio/Experiencias"><span>Experiencias</span></a></li>
		<li><a href="<?=base_url()?>index.php/c_inicio/MostrarNoticia" class="parent"><span>Noticias</span></a></li>
		<li><a href="<?=base_url()?>index.php/c_inicio/Contactos" class="parent"><span>Contactos</span></a></li>
    </ul>
</nav></td>
  </tr>
  <tr><td colspan="2"> <div id="tbodyAdmin">
  		<table width="100%">  
		  <tr ><td colspan="2"><div class="tituloFormAdmin"><span>Formulario Administrador</span></div></td>
		  </tr>
		  <tr >
			<td colspan="2" >
			<div class="demo-container">
			<div id="menuAdmin" class="white">	
				<ul id="mega-menu-5" class="mega-menu">
			<li><a>Noticias</a>
				<ul>
					<li>
						<ul>
							<li><a href="<?=base_url()?>index.php/c_noticia/AdicionarNoticia">Adicionar Noticia</a></li>
							<li><a href="<?=base_url()?>index.php/c_noticia/ListarNoticias">Listar Noticias</a></li>
						</ul>
					</li>			
					
				</ul>
			</li>
			<li><a >Unidades</a>
				<ul>
					<li>
						<ul>
							<li><a href="<?=base_url()?>index.php/c_unidad/AdicionarUnidad ">Adicionar Unidad</a></li>
							<li><a href="<?=base_url()?>index.php/c_unidad/ListarUnidades">Listar Unidades</a></li>
						</ul>
					</li>			
					
				</ul>
			</li>			
			<li><a >Experiencias</a>
				<ul>
					<li>
						<ul>
							<li><a href="<?=base_url()?>index.php/c_experiencia/AdicionarExperiencia ">Adicionar Experiencias</a></li>
							<li><a href="<?=base_url()?>index.php/c_experiencia/ListarExperiencias">Listar Experiencias</a></li>
						</ul>
					</li>			
					
				</ul>
			</li>
			<li><a >Generales</a>
				<ul>
					<li>
						<ul>
							<li><a href="<?=base_url()?>index.php/c_general/AdicionarGeneral ">Adicionar Generales</a></li>
							<li><a href="<?=base_url()?>index.php/c_general/ListarGenerales">Listar Generales</a></li>
						</ul>
					</li>			
					
				</ul>
			</li>
			<li><a >Mensajes</a>
				<ul>
					<li>
						<ul>
							<li><a href="<?=base_url()?>index.php/c_mensaje/ListarMensajes ">Listar Mensajes</a></li>
						</ul>
					</li>			
					
				</ul>
			</li>
			<li><a href="<?=base_url()?>index.php/c_usuario/cambiarContra">Cambiar Contrase&ntilde;a</a>
			</li>
			<a href="<?=base_url()?>index.php/c_admin/Desautenticar" id="sessionUser">Cerrar Sesi&oacute;n</a>
		</ul>
		</div></div></td>
		  </tr>
		  <tr>
			 <td colspan="2" id="cuerpoInt"><!-- InstanceBeginEditable name="EditCuerpo" -->
	<div >
		<form method="post"  id="formAddExp" action="<?=isset($experiencia)?site_url("c_experiencia/EditarExperiencia/".$experiencia->id_experiencia):site_url("c_experiencia/AdicionarExperiencia")?>" onsubmit="return validarFormulario(this.id)"/>
		<table id="tablaForm" >
			<tr>
				<td colspan="4" class="tituloForm" ><?=isset($experiencia)?'Editar Experiencia':'Adicionar Experiencia'?></td>
			</tr>
			<tbody>
			<tr>
				<td class="label" width="20%">Nombre:</td>
				<td class="labelCampo" width="50%"><input type="text" id="nombre" name="nombre" class="textbox obligatorio"  value="<?=isset($experiencia)?$experiencia->nombre:""?>"/></td>
				<td></td>
				<td class="labelCampo" rowspan="4"><img id="vistaPrevia" class="vistaPrevia" src="<?=isset($experiencia)?base_url()."application/imagenes/upload/fotoExp/".$experiencia->urlFoto:base_url()."application/views/templates/imagenes/no1.jpg"?>"  style="width:80px;height:70px; padding:1px"/><br/><div class="label" style="text-align:center; font-size:14px" id="bannerUrl"></div><input  type="hidden" name="urlFoto" class="obligatorio" id="urlFoto" value="<?=isset($experiencia)?$experiencia->urlFoto:""?>" /> </td>
			</tr>
			<tr>
				<td class="label">Unidad:</td>
				<td class="labelCampo"><input type="text" id="unid"  name="unid" class="textbox obligatorio" value="<?=isset($experiencia)?$experiencia->unidad:""?>"/></td>
				<td class="label"><input type="button" class="botonCont" value="Foto" id="urlBanner" style="background-color:#666666;margin-left:5px;"/></td>			
			</tr>	
			<tr>
			<td class="label">Email:</td>
				<td class="labelCampo"><input type="text" id="email"  name="email" class="textbox" value="<?=isset($experiencia)?$experiencia->email:""?>"/></td>
				<td></td>
			</tr>
			<tr height="40px"><td></td></tr>		
			<tr>
				<td colspan="4" id="uplo"><div id ="ag" width="1300">
				<textarea cols="20" rows="8" id="textAExp" class="obligatorio" name="cuerpo"><?=isset($experiencia)?$experiencia->texto:""?></textarea></div></td>
			</tr>
			<tr>
				<td colspan="4" ><div >
				<input type="submit" class="botonCont" style="background-color:#666666;margin-left:5px;" value="<?=isset($experiencia)?"Guardar":"Adicionar"?>" name="<?=isset($experiencia)?"Editar_Experiencia":"Adicionar_Experiencia"?>" />
				</div></td>
			</tr>
			</tbody>		
		</table>
		</form>
	</div>
	
	<!-- InstanceEndEditable --></td>
		  </tr>
  </table>
  </div>
  </td>
  <tr >
    <td  colspan="2"  >
	<footer>
	<div  ><span>Centro de Informaci&oacute;n municipal de salud de Yaguajay-Copyright 2014 - Todos los derechos reservados</span></div><div style="float:right" ></div></footer></td>
	
  </tr>
</table>
</body>
<!-- InstanceEnd --></html>
