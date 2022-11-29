<?php 

include('includes/header.php');
include('includes/sidebar.php');
?>

<!--side bar-->

<!--side bar end-->

<style>


#map { position: absolute; 
top: 0; 
bottom: 0; 
left: 0;
right: 0;
}

#menu {
position: absolute;
background: #efefef;
padding: 10px;
font-family: 'Open Sans', sans-serif;
margin-top: 11px;
opacity: 0.89;
margin-right: 20px !important;
}

#map_container
{
  height: 64vh;
}

.mapboxgl-ctrl-bottom-right
{
  display: none !important;
}

.mapboxgl-ctrl-logo
{
  display: none !important;
}

.green {
  background-image: url('../resourcess/images/green.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.yellow {
  background-image: url('../resourcess/images/yellow.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.orange {
  background-image: url('../resourcess/images/orange.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  
}

.red {
  background-image: url('../resourcess/images/red.png');
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}


.mapboxgl-popup-content {
  position:static;
  padding-left: 23px;
  padding-right: 23px;
  font-family: 'Open Sans', sans-serif;
  border-radius: 25px !important;
  opacity: 1 !important;
  width: auto;
  height: 110px;
  padding-top: 20px;
  align-self: center;
}

.map-overlay {
position: absolute;
bottom: 0;
right: 0;
background: #fff;
margin-right: 15px;
font-family: Arial, sans-serif;
overflow: auto;
border-radius: 3px;
width: 305px !important;
height: 180px !important;
margin-bottom: 15px !important;
padding-left: 20px !important;
opacity: 0.89;
}

.btn-overlay {
position: absolute;
bottom: 0;
right: 0;
margin-right: 20px !important;
font-family: Arial, sans-serif;
overflow: auto;
border-radius: 3px;
width: 17px !important;
height: 17px !important;
margin-bottom: 20px !important;
opacity: 0.89;
display: none;
}

#legend {
padding: 10px;
padding-bottom: -8px !important;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
line-height: 18px;
height: 150px;
margin-bottom: 40px;
width: 100px;
}

.legend-key {
display: inline-block;
border-radius: 20%;
width: 15px;
height: 15px;
margin-right: 10px;
margin-top: 10px;
}



#range_break
{
  margin-left: -7px !important;
  margin-right: -7px !important;
}


#map_overlay
{
  font: 15px !important

}

#hide_overlay
{
  color:#294168bf;
  margin-bottom:0px; 
  margin-right: 5px;
  font-size: 15px ;
}

#show_overlay
{
  color:#294168bf;
  margin-bottom:0px; 
  margin-right: 5px;
  font-size: 15px ;
}

@media (min-width: 100px) {
.map-overlay {
  width: 100px !important;
  font-size: 8px !important;
}
#map_overlay
{
  font-size: 8px !important
}
.legend-key {
width: 6px;
height: 6px;
margin-right: 8px;
margin-top: 8px;
}

#hide_overlay
{
  font-size: 8px ;
}

#show_overlay
{
  font-size: 8px ;
}
}

@media (min-width: 768px) {
.map-overlay {
  width: 100px !important;
  font-size: 8px !important;
}
#map_overlay
{
  font-size: 8px !important

}
.legend-key {
width: 6px;
height: 6px;
margin-right: 8px;
margin-top: 8px;
}

#hide_overlay
{
  font-size: 8px ;
}

#show_overlay
{
  font-size: 8px ;
}
}


@media (min-width: 992px) {
.map-overlay {
  width: 305px !important;
  height: 190px !important;
  font-size: 15px !important;
}
#map_overlay
{
  font-size: 15px !important
  

}

.legend-key {
width: 15px;
height: 15px;
margin-right: 10px;
margin-top: 10px;
}

#hide_overlay
{
  font-size: 15px ;
}

#show_overlay
{
  font-size: 15px ;
}
}

</style>

<div class="wrapper d-flex flex-column min-vh-100 bg-light">

<!--header-->
<?php   include('includes/navhead.php'); ?>
<nav aria-label="breadcrumb">
<ol class="breadcrumb my-0 ms-2">
<li class="breadcrumb-item active">
<!-- if breadcrumb is single--><span>City Admin</span>
</li>
<li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
    <li class="breadcrumb-item active"><span>Map Visualization</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<!-- filter map hp -->
<?php include "update/filter-map.php" ?>
<!-- filter map end -->

<!-- more details hp -->
<?php include "display/detail-map.php" ?>
<!-- more details  end -->

<div class="body flex-grow-1 px-5 pt-3 pb-3"> 
<div class="container-fluid">

<!--for map-->
<div class="card mb-4 border-0 shadow-sm">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button type="button" id="current_year" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Map Visualization
</div>


<div class="container-fluid px-4">
  <div class="row">

  <div class="col-lg-6 col-md-12 mt-3 text-lg-start text-md-start align-content-center dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" id="filter_map" data-coreui-toggle="modal" href="#filter-map" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
  </div>

  <div class="col-lg-6 col-md-12 mt-3 text-lg-end align-content-center dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" me-2 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder dropdown-toggle"  id="hp_option" type="button" data-coreui-toggle="dropdown" aria-expanded="false">OPTIONS <span class="fa-solid ms-1"></span></a>
  <ul class="dropdown-menu align-content-center shadow border-0" id="hp_dropdown_options">
    <li><a class="dropdown-item" href="manage-hp.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Health Profiles</a></li>
    <li><a class="dropdown-item" href="graphical-statistic.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Graphical Statistic</a></li>
    <li><a class="dropdown-item" href="map-statistic.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Map Visualization</a></li>
  </ul>
  </div>

  </div>
</div>


<div class="card-body px-4">
<div id="map_container" class=" card w-100 container-fluid table-responsive rounded-2 border-0 shadow-sm">
<div id="map" class=" w-100 rounded-3"></div>

<div id="menu" class="  rounded-3">
<input id="light-v10" type="radio" name="rtoggle" value="light" checked="checked">
<label for="light-v10">light</label>
<input id="streets-v8" type="radio" name="rtoggle" value="streets" >
<label for="streets-v8">Colored</label>
<input id="navigation-night-v1" type="radio" name="rtoggle" value="dark">
<label for="navigation-night-v1">dark</label>
<input id="satellite-streets-v12" type="radio" name="rtoggle" value="satellite">
<label for="satellite-streets-v12">satellite</label>
</div>

<div class="map-overlay d-none rounded-2" id="legend"><h6  class=" mt-2"><button type="button" id="hide_overlay" class="fa-solid"></button><span id="map_overlay">Cluster Color Definition</span></h6></div>
<button type="button" id="show_overlay" class="btn-overlay  fa-solid "></button>

</div>
</div>

<div class=" container-fluid mb-3 px-4">
  <div class="row ">
  <div class=" col-lg-12 col-md-12 rounded-3 d-flex text-dark text-opacity-50">
  <span class="fa-regular me-3" style="padding-top:7px;"></span><h6 class=" mt-1"><span id="map_disease"></span><span id="map_cases"></span><span id="map_from"></span><span id="map_to"></span><span id="map_gender"></span>.</h6>
  </div>
  </div>
</div>
</div>
<!--for map end-->


</div>
</div>


<!-- footer-->
<?php   include('includes/footer.php'); ?>
<!--Footer end-->

<!--scripts-->
<script id="manage_user" src="effects/map-statistic.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->

