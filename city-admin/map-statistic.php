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
  height: 62vh;
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
  width: 40px;
  height: 40px;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  
}

.red {
  background-image: url('../resourcess/images/red.png');
  background-size: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 1000px !important;
  padding-bottom: -21px;  
  
}

.mapboxgl-popup-content {
  padding-top: 23px !important;
  text-align: start;
  font-family: 'Open Sans', sans-serif;
  border-radius: 10px !important;
  opacity: 0.8 !important;
}

.mapboxgl-popup-close-button
{
  display: none;
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

.selectize-control
{
  width: 200px !important;
 
}

.selectize-input
{
  padding-top: 6px !important;
  padding-bottom : 6px !important;
}


#range_break
{
  margin-left: -7px !important;
  margin-right: -7px !important;
}

.map-text {
position: absolute;
bottom: 0;
left: 0;
margin-right: 15px;
width: 1000px !important;
padding-left: 15px !important;
margin-bottom: 3px !important;
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

.map-text {
  width: 100px !important;
}
#map_text
{
  font-size: 8px !important;
}
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
.map-text {
  width: 100px !important;
}
#map_text
{
  font-size: 8px !important;
}
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
  .map-text {
  width: 1000px !important;
}
#map_text
{
  font-size: 13.5px !important;
}
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

<div class="body flex-grow-1 px-5 pt-3 pb-3"> 
<div class="container-fluid">

<!--for map-->
<div class="card mb-4 border-0 shadow-sm">
<div class="card-header p-3 border-0 shadow-sm bg-info">
</div>
<div class="card-body">

<div class="card-title mx-2 mb-3"  >
<button type="button" id="current_year" style="margin-right: 20px;" class="border-0 bg-transparent p-0"><span style="color: #294168bf; " class="fa-solid"></span></button>Map Visualization
</div>



<div class="container-fluid p-0">
  <div class="row">

    <div class="col-lg-9 px-1">
    <div class="container-fluid">
    <div class=" row row-cols-auto align-items-center">

    <div class="col mb-3 mb-lg-3 mb-sm-3" style="color:gray;">FROM :</div>

    <div class="col mb-3  mb-lg-3 mb-sm-3"><input type="date" id="range_from" class="form-control birthdate  barangay-form text-sm-start shadow-sm"  placeholder="From"></div>

    <div class="col mb-3  mb-lg-3 mb-sm-3" style="color:gray;">TO :</div>

    <div class="col mb-3  mb-lg-3 mb-sm-3"><input type="date" id="range_to" class="form-control birthdate  barangay-form text-sm-start shadow-sm"  placeholder="To"></div>
    
    <div class="col mb-3  mb-lg-3 mb-sm-3">  
      <a  class="btn  all-cases  rounded-1 border-1 shadow-sm" id="all_cases" type="button" >
      <span id="span_check" class="fa-regular"></span><span class=" mx-2" id="active only">Active Cases Only</span>
      </a>

      <a  class="btn active-only-hp d-none rounded-1 border-1 shadow-sm" id="active_only_btn" type="button" >
      <span id="span_check" class="fa-solid"></span><span class=" mx-2" id="active only">Active Cases Only</span>
      </a>
    </div>

    <div class="col mb-3  mb-lg-3 mb-sm-3">  
      <select id="select_diseases"  name="add_hp_select_diseases" class="form-control gender barangay-form shadow-sm">
        <option value="">All Diseases</option>
        <?php
        include('functions/select_diseases.php');
        ?>
      </select>
    </div>

    <div class="col mb-3 mb-lg-3 mb-sm-3">  <button  class="act_btn act_btn rounded-2 border-0 shadow-sm" id="date_range_btn" type="button" style=" font-weight:bold; padding-top: 7px; padding-bottom: 7px; padding-right:20px; padding-left:20px;">
      <span class="fa-solid"></span> FILTER</button>
    </div>  

    </div>
    </div>
    </div>

    <div class="col mb-3  mb-lg-3 mb-sm-3 col-lg-3 d-lg-flex d-md-block justify-content-end">
      <div class="col-auto">
      <a  class="border-0 shadow-sm addbtn add-brgy fw-bolder dropdown-toggle" id="hp_option" type="button" data-coreui-toggle="dropdown" aria-expanded="false">OPTIONS <span class="fa-solid ms-1"></span></a>
            <ul class="dropdown-menu align-content-center shadow border-0 mx-1" id="hp_dropdown_options">
              <li><a class="dropdown-item" href="manage-hp.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Active List</a></li>
              <li><a class="dropdown-item" href="#"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Cluster Graph</a></li>
              <li><a class="dropdown-item" href="inactive-list.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Inactive List</a></li>
            </ul>
      </div>
    </div>

  </div>
</div>

<div id="map_container" class=" card w-100 container-fluid rounded-2 mt-2 border-0 shadow-sm">
<div id="map" class=" w-100 rounded-3"></div>

<div id="menu" class="  rounded-3">
<input id="streets-v11" type="radio" name="rtoggle" value="streets" checked="checked">
<label for="streets-v11">streets</label>
<input id="light-v10" type="radio" name="rtoggle" value="light">
<label for="light-v10">light</label>
<input id="dark-v10" type="radio" name="rtoggle" value="dark">
<label for="dark-v10">dark</label>
<input id="satellite-streets-v11" type="radio" name="rtoggle" value="satellite">
<label for="satellite-streets-v11">satellite</label>
</div>

<div class="map-overlay d-none rounded-2" id="legend"><h6  class=" mt-2"><button type="button" id="hide_overlay" class="fa-solid"></button><span id="map_overlay">Cluster Color Definition</span></h6></div>
<button type="button" id="show_overlay" class="btn-overlay  fa-solid "></button>

<div class="map-text d-none"><h6 id="map_text" style="font-size: 13.5px;"><span id="map_from"></span><span id="map_to"></span><span id="map_disease"></span><span id="map_cases"></span></h6></div>



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

