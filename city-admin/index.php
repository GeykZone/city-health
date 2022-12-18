<?php 

include('includes/header.php');
include('includes/sidebar.php');
?>

<!--side bar-->

<!--side bar end-->

<div class="wrapper d-flex flex-column min-vh-100" style="background-color: #e2e7e9;">

<!--header-->
<?php   include('includes/navhead.php'); ?>
<nav aria-label="breadcrumb">
<ol class="breadcrumb my-0 ms-2">
<li class="breadcrumb-item active">
<!-- if breadcrumb is single--><span>City Admin</span>
</li>
<li class="breadcrumb-item active"><span>Dashboard</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<style>
 
#map 
{ 
  position: absolute; 
  top: 0; 
  bottom: 0; 
  width: 100%; 
}

#map_container
{
min-height: 524px;
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
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.yellow {
  background-image: url('../resourcess/images/yellow.png');
  background-size: cover;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.orange {
  background-image: url('../resourcess/images/orange.png');
  background-size: cover;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  
}

.red {
  background-image: url('../resourcess/images/red.png');
  background-size: cover;
  width: 30px;
  height: 30px;
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
  height: 105px;
  padding-top: 20px;
  align-self: center;
}
</style>

<!-- more details dashboard -->
<?php include "display/detail-dashboard.php" ?>
<!-- more details dashboard  end -->

<div class="body flex-grow-1 px-5 pt-3  pb-3"> 
<div class="container-fluid">

<!--first-->
<div class="row mb-1">

  <div class="col-lg-12 col-sm-12">
  <div class="row ">
      <div class="col-lg card-group mb-4 shortCut_btn" id="new_health_cases_btn">
        <div class="card bg-c-yellow border-0 rounded-4 shadow-sm order-card">
        <div class="card-body adjust_font_size row">
          <h4 >New Health Cases</h4>
          <p class="adjust_font_size fw-lighter opacity-75" ><span class="sevenDaysFrom"></span> - <span class="sevenDaysTo"></span></p>
          <h1><i class="fa-solid float-start"></i><span id="total_new_cases" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="newCasesPercent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>
          </div>
        </div>
      </div>
      <div class="col-lg card-group mb-4 shortCut_btn" id="new_deaths_btn">
        <div class="card bg-c-pink border-0 rounded-4 shadow-sm order-card">
        <div class="card-body adjust_font_size row">
          <h4 >New Health-related Deaths</h4>
          <p class="adjust_font_size fw-lighter opacity-75" ><span class="sevenDaysFrom"></span> - <span class="sevenDaysTo"></span></p>
          <h1><i class="fa-solid float-start"></i><span id="total_new_deaths" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="newDeathsPercent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>
          </div>
        </div>
      </div>
      <div class="col-lg card-group mb-4 shortCut_btn" id="new_recoveries_btn">
        <div class="card bg-c-green border-0 rounded-4 shadow-sm order-card">
        <div class="card-body adjust_font_size row">
          <h4 >New Health Recoveries</h4>
          <p class="adjust_font_size fw-lighter opacity-75" ><span class="sevenDaysFrom"></span> - <span class="sevenDaysTo"></span></p>
          <h1><i class="fa-solid float-start"></i><span id="total_newRecoveries" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="newRecoveries_percent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-6 col-sm-12">
  <div class="row ">
    <div class="col-lg-12 col-sm-12 rounded-3 mb-4">
        <div class="card border-0 rounded-3 shadow-sm order-card" >
          <div class=" card-header rounded-top-3 bg-info p-0  border-0 shadow-sm ">
          <h6 class="float-lg-start mt-2 mb-2 ms-3 float-md-start adjust_font_size  order-card">Shortcuts</h6>
          </div>
          <div class=" card-body  row pb-3">
          <div id = "barangay_health_statistic_shorcut" class="col-lg-3 mt-lg-0 mt-sm-3 col-sm shortCut_btn">
        <div class="card bg-c-dark_blue border-0 rounded-4 shadow-sm order-card"  style="max-height:120px; height:100px; min-height:100px;">
        <div class="card-body adjust_font_size row">
            <p class="adjust_font_size col-12">Barangay Health Statistic</p>
            <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
      <div id = "disease_statistic_shorcut"  class="col-lg-3 mt-lg-0 col-sm mt-sm-3 shortCut_btn">
        <div class="card bg-c-blue  border-0 rounded-4 shadow-sm order-card"  style="max-height:120px; height:100px; min-height:100px;">
          <div class=" card-body adjust_font_size row">
            <p class="adjust_font_size">Disease Statistic</p>
            <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
      <div id = "timespan_statistic_shorcut" class="col-lg-3 mt-lg-0 col-sm mt-sm-3 shortCut_btn">
        <div class="card  bg-c-light_blue border-0 rounded-4 shadow-sm order-card"  style="max-height:120px; height:100px; min-height:100px;">
          <div class=" card-body adjust_font_size row">
            <p class="adjust_font_size">Time Span</p>
            <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
      <div id = "rec_death_statistic_shorcut" class="col-lg-3 mt-lg-0 col-sm mt-sm-3 shortCut_btn">
        <div class="card bg-c-medium_blue  border-0 rounded-4 shadow-sm order-card"   style="max-height:120px; height:100px; min-height:100px;">
          <div class=" card-body adjust_font_size row">
           <p class="adjust_font_size">Deaths & Recoveries</p>
           <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
     
      <div class="col-lg-12 col-sm-12 mb-4">
        <div class="card border-0 rounded-3 shadow-sm order-card" style="height:400px ;" >
          <div class=" card-header rounded-top-3 bg-info p-0  border-0 rounded-top-3 shadow-sm ">
          <h6 class="float-lg-start mt-2 mb-2 ms-3 float-md-start adjust_font_size  order-card">Current number of residents in each barangays</h6>
          </div>
          <div id="myChart_container" class=" card-body adjust_font_size shortCut_btn">
            <div>
            <div  class="mb-3" id="hp_chart_row" style="height:335px;  min-width:100%;">
              <canvas class=""  id="myChart"></canvas> 
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="col-lg-6 col-sm-12">
  <div class="row ">
    <div class="col  col-sm-12 mb-4">
      <div class="card border-0 shadow-sm border-0 rounded-3 shadow-sm">
        <div class=" card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card" >
          <h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Map visualization<span id="map_record_info" class=" shortCut_btn"></span></h6>
        </div>
        <div class=" card-body">
        <div id="map_container" class=" card  rounded-3 border-0 shadow-sm">
        <div id="map" class=" w-100 rounded-4"></div>

        </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</div>
<!--first-->

<!--Second-->
<div class="row">

  <div class="col-lg-6 col-sm-12">
  <div class="card border-0 rounded-3 shadow-sm mb-4">
  <div class="card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card"><h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Top 3 diseases that has the most infected individuals</h6></div>
  <div class="card-body">
  <div class="container-fluid table-responsive">
  <div class="row">

  <div class="table-responsive">
  <table class="table table-condensed">
    <thead>
      <tr>
        <th style="width:130px;">
          Disease Name
        </th>
        <th>
          Progress
        </th>
        <th style="min-width: 130px;">
          Total Infected
        </th>
      </tr>
    </thead>
    <tbody id="top_three_diseases">
    </tbody>
  </table>
  </div>

  </div>
  </div>
  </div>
  </div>
  </div>

  <div class="col-lg-6 col-sm-12">
  <div class="card border-0 rounded-3 shadow-sm mb-4">
  <div class="card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card"><h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Top 3 barangays with the highest number of health cases</h6></div>
  <div class="card-body">
  <div class="container-fluid table-responsive">
  <div class="row">

  <div class="table-responsive">
  <table class="table table-condensed">
    <thead>
      <tr>
        <th style="width:130px;">
          Barangay Name
        </th>
        <th>
          Progress
        </th>
        <th style="min-width: 150px;">
          Total Health Cases
        </th>
      </tr>
    </thead>
    <tbody id="top_three_barangays">
    </tbody>
  </table>
  </div>

  </div>
  </div>
  </div>
  </div>
  </div>

</div>
<!--Second -->
</div>
</div>


<!-- footer-->
<?php   include('includes/footer.php'); ?>
<!--Footer end-->

<!--scripts-->
<script id="manage_user" src="effects/dashboard.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->

