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
left: 1;
margin-top: 11px;
opacity: 0.89;
}

#map_container
{
  height: 65vh;
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
  margin-bottom: 5px !important;
  width: 200px !important;
  margin-top: 8px;
}

@media (min-width: 768px) {

  .selectize-control
{
  width: 100px !important;
}

}

@media (min-width: 1400px) {
  
  .selectize-control
{
  width: 200px !important;
}
  
}

#range_break
{
  margin-left: -7px !important;
  margin-right: -7px !important;
}
</style>

<div class="wrapper d-flex flex-column min-vh-100 bg-light">

<!--header-->
<?php   include('includes/navhead.php'); ?>
<div class="header-divider"></div>
<div class="container-fluid">
<nav aria-label="breadcrumb">
<ol class="breadcrumb my-0 ms-2">
<li class="breadcrumb-item">
<!-- if breadcrumb is single--><span>City Admin</span>
</li>
<li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
    <li class="breadcrumb-item active"><span>Map Visualization</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<div class="body flex-grow-1 px-5 pt-3"> 
<div class="container-fluid">

<!--for map-->
<div class="card mb-4 border-0 shadow-sm">
<div class="card-header p-3 border-0 shadow-sm ">
</div>
<div class="card-body">
<div class="d-flex justify-content-between">
<div>
<h4 style="color: #294168bf; " class="card-title mb-2"><span style="margin-right: 10px;" class="fa-solid"></span>Map Visualization: <span id="map_year">2022</span> </h4>
<div class="row g-2 align-items-center mx-1">
<div class="col-auto" id="range_break">
    <span style="color: black ; margin-right: 5px;" class="form-text" >
      From: 
    </span>
  </div>
   <div class="col-auto">
    <input type="date" id="range_from" class="form-control  birthdate  barangay-form text-sm-start shadow-sm" aria-describedby="passwordHelpInline" placeholder="From">
  </div>
  <div class="col-auto" id="range_break">
    <span style="color: black ; margin-right: 5px; margin-left: 5px;"  class="form-text" >
      To: 
    </span>
  </div>
  <div class="col-auto">
    <input type="date" id="range_to" class="form-control birthdate  barangay-form text-sm-start shadow-sm" aria-describedby="passwordHelpInline" placeholder="To">
  </div>

  <div class="col-auto">
  <a  class="btn  all-cases  rounded-1 border-1 shadow-sm" id="all_cases" type="button" style="padding-top: 7px; padding-bottom: 7px; padding-right:20px; padding-left:20px; margin-left: 3px;">
  <span id="span_check" class="fa-regular"></span><span class=" mx-2" id="active only">Active Cases Only</span>
  </a>

  <a  class="btn active-only-hp  rounded-1 border-1 shadow-sm" id="active_only_btn" type="button" style="padding-top: 7px; display: none; padding-bottom: 7px; padding-right:20px; padding-left:20px; margin-left: 3px;">
  <span id="span_check" class="fa-solid"></span><span class=" mx-2" id="active only">Active Cases Only</span>
  </a>
  </div>
<!---->
  <div class="col-auto">
  <a class="btn add-brgy addbtn rounded-1 border-0 shadow-sm" id="date_range_btn" type="button" style=" font-weight:bold; padding-top: 7px; padding-bottom: 7px; padding-right:20px; padding-left:20px; margin-left: 3px;">
  <span class="fa-solid"></span> QUERY</a>
  </div>
</div>
</div>
<div class="btn-toolbar d-md-block" role="toolbar" aria-label="Toolbar with buttons">
<div class="d-grid gap-2 d-md-flex justify-content-sm-end">
<a class="border-0 shadow-sm addbtn add-brgy pt-1 pb-1 px-3 fw-bolder dropdown-toggle" id="hp_option" type="button" data-coreui-toggle="dropdown" aria-expanded="false">OPTIONS <span class="fa-solid"></span></a>
      <ul class="dropdown-menu align-content-center shadow border-0" id="hp_dropdown_options">
        <li><a class="dropdown-item" href="manage-hp.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Active List</a></li>
        <li><a class="dropdown-item" href="#"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Cluster Graph</a></li>
        <li><a class="dropdown-item" href="inactive-list.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Inactive List</a></li>
      </ul>
</div>
<div class="col-auto">
   <select id="select_diseases"  name="add_hp_select_diseases" class="form-control gender barangay-form shadow-sm" >
    <option value="">All Diseases</option>
    <?php
    include('functions/select_diseases.php');
    ?>
  </select>
</div>
</div>
</div>
<div id="map_container" class=" card mt-2 w-100 container-fluid rounded-2 mt-2 border-0 shadow-sm">
<div id="map" class=" w-100 rounded-3"></div>

<div id="menu" class=" rounded-3">
<input id="streets-v11" type="radio" name="rtoggle" value="streets" checked="checked">
<label for="streets-v11">streets</label>
<input id="light-v10" type="radio" name="rtoggle" value="light">
<label for="light-v10">light</label>
<input id="dark-v10" type="radio" name="rtoggle" value="dark">
<label for="dark-v10">dark</label>
<input id="satellite-streets-v11" type="radio" name="rtoggle" value="satellite">
<label for="satellite-streets-v11">satellite</label>
</div>

<div class="map-overlay rounded-2" id="legend"><h6 class=" mt-2"><button type="button" id="hide_overlay" style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class=" fa-solid "></button>Cluster Color Definition</h6></div>
<button type="button" id="show_overlay" style="color:#294168bf; margin-bottom:0px; margin-right: 5px;" class="btn-overlay  fa-solid "></button>

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

