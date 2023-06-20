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
  width: 2.6em;
  height: 2.6em;
  border-radius: 50%;
  cursor: pointer;
}

.yellow {
  background-image: url('../resourcess/images/yellow.png');
  background-size: cover;
  width: 2.6em;
  height: 2.6em;
  border-radius: 50%;
  cursor: pointer;
}

.orange {
  background-image: url('../resourcess/images/orange.png');
  background-size: cover;
  width: 2.6em;
  height: 2.6em;
  border-radius: 50%;
  cursor: pointer;
  
}

.red {
  background-image: url('../resourcess/images/red.png');
  background-size: cover;
  width: 2.6em;
  height: 2.6em;
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
width: 340px !important;
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
  width: 340px !important;
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
<li class="breadcrumb-item active"><span>Profiles & Stats</span></li>
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

<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3 pb-3"> 
<div class="container-fluid">

<!--for map-->
<div class="card mb-4 border-0 shadow-sm">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button type="button" id="current_year" style="margin-right: 10px;" class="border-0 bg-transparent .current_year"><span class="fa-solid text-light"></span></button>Map Visualization
</div>


<div class="container-fluid px-4">
  <div class="row">

  <div class="col-lg-6 col-md-12  text-lg-start text-md-start align-content-center dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm addbtn add-brgy me-lg-2 me-md-2 mb-lg-0 mb-md-3 mt-3 mb-sm-0 me-sm-2 me-lg-0 me-md-0 mb-lg-0 px-3 fw-bolder" id="filter_map" data-coreui-toggle="modal" href="#filter-map" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
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



    </div>
  </div>

  <div class=" container-fluid mb-3 px-4">
    <div class="row ">
    <div class=" col-lg-12 col-md-12 rounded-3 d-flex text-dark text-opacity-50">
    <span class="fa-regular me-3" style="padding-top:7px;"></span><h6 class=" mt-1"><span id="map_disease"></span><span id="map_cases"></span><span id="map_from"></span><span id="map_to"></span><span id="map_gender"></span><span id="map_min_age"></span><span id="map_max_age"></span><span id="map_record_info"></span><span id="map_totals"></span></h6>
    </div>
    </div>
  </div>
</div>
<!--for map end-->

<!--chart-->
<div class="row chart_container mb-3" style="display: block;" >
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button  id="current_cluster" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Cluster Tables
</div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >

    <!-- /.row-->

  <div class="container-fluid mb-3 ">
    <div class="row">

    <div class="btn-group col-lg-2 col-md-12">
      <button class="btn btn-secondary buttons-copy buttons-html5 shadow-sm border-2 py-2"  id="copytButton" controls = "cluster_table_container"  tabindex="0"  type="button"><span> COPY</span></button>
      <button class="btn btn-secondary buttons-excel buttons-html5 shadow-sm border-2 py-2" id="excelButton" tabindex="0"  type="button"><span> EXCEL</span></button>
      <button class="btn btn-secondary buttons-print shadow-sm border-2 py-2" tabindex="0"  id="printButton"   type="button"><span> PDF</span></button>
    </div>

    </div>
  </div>

    <div  class="container-fluid table-responsive">
    <div class="row" id="cluster_table_container">

    <!--green-->
    <div  class="card-group mb-4 col-md-12">
    <div class="card bg-c-dark_green border-0 rounded-4 shadow-sm order-card"  >
    <div class="card-body adjust_font_size row ">
    <div  class="col-12 " id="hp_chart_row_brgy" >
    <div class=" bg-white rounded-4 p-3 h-100"  id="cluster_green" >
      
      <div class=" bg-c-green rounded-5 py-4 p mb-3 position-relative" style=" font-weight:500;">
        <span class="fa-solid fa-circle-question position-absolute top-50 start-0 translate-middle-y shortCut_btn" id = "c_green_meaning" style = "font-size:30px; margin-left:10px"></span>
        <h6 class="position-absolute top-50 start-50 translate-middle">Cluster Green</h6>
      </div>
      <div class="row">

      <div class="table-responsive text-black">
      <table class="table table-condensed cluster_tables_wrapper " id ="cluster_green_table">
      <thead class=" bg-c-dark_green text-white">
          <tr>
            <th style="min-width:160px;" class = "text-start" >
              Barangay Name
            </th>
            <th style="min-width:160px;" class = "text-center" >
              Cases Percentage
            </th>
            <th style="min-width:160px;" class = "text-center" >
              Total Health Cases
            </th>
            <th style="min-width:160px;" class = "text-end" >
              Increase Percentage
            </th>
          </tr>
        </thead>
        <tbody id="cluster_green_tb">
        </tbody>
        <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1_green">
          <tr class="align-middle" >
            <td id="Barangay Name"  style="width:150px;"></td>
            <td id="Cases Percentage"  style="min-width:100px;"></td>
            <td id="Total Health Cases" style="width: 150;"></td>
            <td id="Increase Percentage" style="min-width: 100px;"></td>
          </tr>
        </tfoot>
      </table>
      </div>
      <div class="table-responsive" >
        <div class="dataTables_wrapper dt-bootstrap5 row" id="table_page_green">
        </div>
      </div>

      </div> 
    </div> 
    </div>
    </div>
    </div>
    </div>
    <!--green-->

    <!--yellow-->
    <div  class="card-group  mb-4 col-md-12">
    <div class="card bg-c-dark_yellow border-0 rounded-4 shadow-sm order-card"  >
    <div class="card-body adjust_font_size row">
    <div  class="col-12" id="hp_chart_row_disease" >
    <div class=" bg-white rounded-4 p-3 h-100"  id="cluster_yellow" >

    <div class=" bg-c-yellow rounded-5 py-4 p mb-3 position-relative" style=" font-weight:500;">
      <span class="fa-solid fa-circle-question position-absolute top-50 start-0 translate-middle-y shortCut_btn" id = "c_yellow_meaning" style = "font-size:30px; margin-left:10px"></span>
      <h6 class="position-absolute top-50 start-50 translate-middle">Cluster Yellow</h6>
    </div>

    <div class="row">

    <div class="table-responsive text-black">
    <table class="table table-condensed  " id ="cluster_yellow_table">
    <thead class=" bg-c-yellow  text-white">
          <tr>
            <th style="min-width:160px;" class = "text-start" >
              Barangay Name
            </th>
            <th style="min-width:160px;" class = "text-center" >
              Cases Percentage
            </th>
            <th style="min-width:160px;" class = "text-center" >
              Total Health Cases
            </th>
            <th style="min-width:160px;" class = "text-end" >
              Increase Percentage
            </th>
          </tr>
      </thead>
      <tbody id="cluster_yellow_tb">
      </tbody>
      <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1_yellow">
        <tr class="align-middle" >
          <td id="Barangay Name"  style="width:150px;"></td>
          <td id="Cases Percentage"  style="min-width:100px;"></td>
          <td id="Total Health Cases" style="width: 150;"></td>
          <td id="Increase Percentage" style="min-width: 100px;"></td>
        </tr>
      </tfoot>
    </table>
    </div>

    </div> 

    </div>
    </div>
    </div>
    </div>
    </div>
    <!--yellow-->

    <!--orange-->
    <div  class="card-group  mb-4 col-md-12">
    <div class="card bg-c-orange border-0 mb-lg-0 mb-sm-2 rounded-4 shadow-sm order-card"  >
    <div class="card-body adjust_font_size row">
    <div  class="col-12" id="hp_chart_row_time" >
    <div class=" bg-white rounded-4 p-3 h-100"  id="cluster_orange" >

    <div class=" bg-c-orange rounded-5 py-4 p mb-3 position-relative" style=" font-weight:500;">
      <span class="fa-solid fa-circle-question position-absolute top-50 start-0 translate-middle-y shortCut_btn" id = "c_orange_meaning" style = "font-size:30px; margin-left:10px"></span>
      <h6 class="position-absolute top-50 start-50 translate-middle">Cluster Orange</h6>
    </div>

    <div class="row">

    <div class="table-responsive text-black">
    <table class="table table-condensed " id ="cluster_orange_table">
    <thead class=" bg-c-dark_orange text-white">
          <tr>
            <th style="min-width:160px;" class = "text-start" >
              Barangay Name
            </th>
            <th style="min-width:160px;" class = "text-center" >
              Cases Percentage
            </th>
            <th style="min-width:160px;" class = "text-center" >
              Total Health Cases
            </th>
            <th style="min-width:160px;" class = "text-end" >
              Increase Percentage
            </th>
          </tr>
      </thead>
      <tbody id="cluster_orange_tb">
      </tbody>
      <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1_orange">
        <tr class="align-middle" >
          <td id="Barangay Name"  style="width:150px;"></td>
          <td id="Cases Percentage"  style="min-width:100px;"></td>
          <td id="Total Health Cases" style="width: 150;"></td>
          <td id="Increase Percentage" style="min-width: 100px;"></td>          
        </tr>
      </tfoot>
    </table>
    </div>

    </div> 

    </div>
    </div>
    </div>
    </div>
    </div>
    <!--orange-->

    </div>
    </div>
    
  </div>
  
</div>
</div>
</div>
<!--chart end-->


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

