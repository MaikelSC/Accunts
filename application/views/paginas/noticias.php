<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/plantilla.dwt" codeOutsideHTMLIsLocked="false" -->

<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Mostrar Noticia</title>
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
	<div class="contInterior">
		<div id="divNoticia" >
			<div class="titulos"><div>Noticias</div></div>
			<div style="height:20px"></div>
			<div class="contMinCal" style="width:65px;float:left;display:inline-block;margin-right:10px"><div class="titMinCal"><?=isset($noticia)?$noticia->mes:''?></div><div class="contMiniCal"><?=isset($noticia)?$noticia->dia:''?></div></div>
			    <div class="contenidoCuerpo" style="width:84%;float:right" >				
				<div class="titArticulo" ><?=isset($noticia)?$noticia->titulo:''?></div>
				<div class="subTitArticulo" ><?=isset($noticia)?$noticia->subtitulo:''?></div>
				<div style="height:20px"></div>
				<div ><?=isset($noticia)?$noticia->cuerpo:''?></div>
			</div>
		</div>
	</div>
	<aside class="latInterior">	
		<div class="modulo">
			<div class="titulosMedianos">Noticias</div>
			<div >
			<input type="hidden" id="posInicial" value="1" />
			<div  id="masNoticiasArr" ><span class="leerMas" style="font-size:17px">M&Aacute;S NOTICIAS</span></div>
			<div style="border-top:3px dotted #003366"></div>
			<div id="contenidoLatNot">			
			
			<div id="contNoticias" style="position:relative"> 
			<table class="visib" >
			<? if(count($noticiasEnc) >0)
				foreach($noticiasEnc as $noticia) {?>
				<tr style="height:100px"><? if($noticia->dia){?>
						<td ><div class="contMinCal"><div class="titMinCal"><?=$noticia->mes?></div><div class="contMiniCal"><?=$noticia->dia?></div></div></td>
				  <? } ?>
				  <td width="80%"><p class="pLatNot"><?=$noticia->noticia?></p></td></tr> 
				<tr><td  align="right" colspan="2"><a style="text-decoration:none" href="<?=site_url("c_inicio/MostrarNoticia/".$noticia->id)?>"/><span class="leerMas">LEER M&Aacute;S</span></td></tr>
			<? }?>	
			</table>
			</div>
			</div>
			<div style="border-top:3px dotted #003366;"></div>
			<div  id="masNoticias" ><span class="leerMas" style="font-size:17px">M&Aacute;S NOTICIAS</span></div>
			</div>
		</div>
	</aside>	
	
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
