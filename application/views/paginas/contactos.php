<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/plantilla.dwt" codeOutsideHTMLIsLocked="false" -->

<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Contactos</title>
<!-- InstanceEndEditable -->
<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/jquery-1.5.1.js'></script>

<script type='text/javascript' src='<?=base_url()?>application/libraries/propias/JCP.js'></script>
<script> if($.browser.msie && $.browser.version < 9.0 )
			alert('Esta version del navegador no sorporta correctamente los contenidos del sitio. Utilice otro navegador o en caso de usar Internet Explorer, instale la version 9 o superior.');
</script>
<script type='text/javascript' src='<?=base_url()?>application/libraries/jQuery/easyslider/js/easySlider.js'></script>

<link href="<?=base_url()?>application/libraries/jQuery/easyslider/css/screen.css" rel="stylesheet" type="text/css" />
<link href="<?=base_url()?>application/views/templates/plantilla.css" rel="stylesheet" type="text/css" />
<link href="<?=base_url()?>application/views/templates/menu.css" rel="stylesheet" type="text/css" />
<!-- InstanceBeginEditable name="head" -->



<!-- InstanceEndEditable -->


</head>

<body>
<div ></div>
<table   id="cuerpo" >
  <tr>
    <td><div><img src="<?=base_url()?>application/views/templates/imagenes/euroEstudios.png" name="EuroBanner" id="EuroBanner"/></div></td>
	<td id="contBanner2">
		<div id="redes">
		</div>
		<div id="rectangulo"></div>
		<div id="telefonos"><div id="labelTel"><span id="encTel">Tel.:</span> <span id="numTel">55 2330 / 55 3234</span></div></div>
		
	</td>
  </tr>
  <tr>
    <td colspan="2" id="padreMenu"><div id="menu">
    <ul class="menu">
        <li><a href="<?=base_url()?>index.php/c_inicio" class="parent"><span>Inicio</span></a></li>
        <li><a href="<?=base_url()?>index.php/c_inicio/QuienesSomos" class="parent"><span>Quienes Somos</span></a></li>
        <li><a href="<?=base_url()?>index.php/c_inicio/MostrarUnidad"><span>Unidades</span></a></li>
        <li ><a href="<?=base_url()?>index.php/c_inicio/Experiencias"><span>Experiencias</span></a></li>
		<li><a href="<?=base_url()?>index.php/c_inicio/MostrarNoticia" class="parent"><span>Noticias</span></a></li>
		<li><a href="<?=base_url()?>index.php/c_inicio/Contactos" class="parent"><span>Contactos</span></a></li>
    </ul>
</div></td>
  </tr>
  <tr>
  
   
  	<td id="bannerUnidadess" colspan="2" >
	   <div id="padreSlider">	
		<? if(isset($listBannerUnidades)) {?>
			<div id="slider">
				<ul>
					<? foreach($listBannerUnidades as $unid) {  ?>				
						<li><a href="<?=site_url("c_inicio/MostrarUnidad/".$unid->id)?>"><img src="<?=base_url()?>application/imagenes/upload/banners/<?=($unid->url)?>" alt="Css Template Preview" /> <div id="fondoNombreUnidad"></div><div id="nombreUnidad"><?=$unid->nombre?></div></a></li>
				
					<?}?>
			
				</ul>
			</div>	
		<? }
		else if(isset($unid)){ ?>
			<div><img class="imgUni" src="<?=base_url()?>application/imagenes/upload/banners/<?=($unid->url)?>" alt="Css Template Preview" /></div>
		<?}?>
			
	   </div>		
	</td>
  </tr>
  <tr>
    <td colspan="2" id="cuerpoInt"><!-- InstanceBeginEditable name="EditCuerpo" -->
	<div class="contInterior" style="width:58%">
		<div >
			<div class="textEnc" >CONTACTOS</div>
				<div class="contenidoCuerpo">
				<span style="font-weight:bold">Centro de Informaci&oacute;n Yaguajay<br/></span>
				<span><span style="font-weight:bold">Dir:</span> Ave. Emilio N&uacute;&ntilde;ez # 21. Yaguajay. Sancti Sp&iacute;ritus.</span><br /><br />
				<span><span style="font-weight:bold">Telf:</span> 55 2330/55 3234 <span style="font-weight:bold; padding-left:10px">Email:</span>webmaster.yag@ssp.sld.cu</span><br /><br />
				<span style="font-weight:bold">Horario normal de atenci&oacute;n<br/></span>
				<span>Lunes a Viernes de 8:00 a 12:00 y 13:00 a 16:30</span><br /><br />
				</div>
				
				<div class="textEnc" >MAPA DE UBICACI&Oacute;N</div>
				<div class="contenidoCuerpo">
					<img style="border:1px solid #666666; width:100%" src="<?=base_url()?>application/views/templates/imagenes/ubi.png"/>
				</div>			
				
		</div>
	</div>
	<div class="contInterior" style="float:right;width:34%">
		<div >
			<div class="textEnc" >FORMULARIO</div>
			<table id="tablaMensaje" width="100%">
			<tr>
				<td><input class="campoContac"  name="Su Nombre" type="text" value="Su Nombre" id="nombre"/></td>
			</tr>
			<tr>
				<td><input class="campoContac" name="Su Email" type="text" value="Su Email" id="email"/></td>
			</tr>
			<tr>
				<td class="noObl"><input class="campoContac" name="Telefono" type="text" value="Telefono" id="telefono" /></td>
			</tr>
			<tr>
				<td><textarea  class="campoContac" name="Mensaje" style="height:358px" id="mensaje">Mensaje</textarea></td>
			</tr>
			<tr><td align="right"><input id="btnCerrar" type="button" value="borrar" class="botonCont"style="background-color:#666666;margin-right:5px;" ><input type="button" value="enviar" class="botonCont" onclick="enviarMensaje()"></td></tr>
			</table>					
				
		</div>
	</div>		
	<!-- InstanceEndEditable --></td>
  </tr>
  <tr><td colspan="2">
  	<div id="redesFoot">
		</div>
  </td></tr>
  <tr >
    <td  colspan="2"  >
	<footer>
	<div  ><span>Centro de Informaci&oacute;n municipal de salud de Yaguajay-Copyright 2014 - Todos los derechos reservados</span></div><div style="float:right" ></div></footer></td>
	
  </tr>
</table>
</body>
<!-- InstanceEnd --></html>
