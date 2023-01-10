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
      top:0; 
      bottom:0; 
      width:100%; 
}

#map_container
{
  height:485px;
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
  width: 2em;
  height: 2em;
  border-radius: 50%;
  cursor: pointer;
}

.yellow {
  background-image: url('../resourcess/images/yellow.png');
  background-size: cover;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  cursor: pointer;
}

.orange {
  background-image: url('../resourcess/images/orange.png');
  background-size: cover;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  cursor: pointer;
  
}

.red {
  background-image: url('../resourcess/images/red.png');
  background-size: cover;
  width: 2em;
  height: 2em;
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

<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3  pb-3"> 
<div class="container-fluid">


<div class="row">

<div  class="col-lg-4 col-sm-12 mb-4 ">
      <div class="card bg-c-light_blue  border-0 rounded-4 shadow-sm order-card"  >
      <div class="card-body adjust_font_size row ">
      <div  class="col-12 " id="hp_chart_row_brgy" >
      <canvas class=" bg-c-metal_blue rounded-4 p-3"  id="hpChart_brgy"   style="width:100%;  max-height:580px ;"></canvas> 
      <div class="mt-2 row"><span class=" text-start col-6"><span class="shortCut_btn" id = "barangay_health_statistic_shorcut">Barangay Health Statistic</span></span><span class=" text-end col-6 pe-4" ><li class="fa-solid"></li></span></div>
      <div class="mt-1 fw-lighter opacity-75">One month ( <span class="oneMonthFrom mt-0"></span> - <span class="oneMonthTo mt-0"></span> )</div>
      </div>
      </div>
      </div>
    </div>

      <div  class="col-lg-4 col-sm-12 mb-4 ">
        <div class="card bg-c-light_blue border-0 rounded-4 shadow-sm order-card"  >
        <div class="card-body adjust_font_size row">
        <div  class="col-12" id="hp_chart_row_disease" >
        <canvas class="bg-c-metal_blue rounded-4 p-3"  id="hpChart_disease"   style="width:100%;  max-height:580px ;"></canvas> 
        <div class="mt-2 row"><span class=" text-start col-6"><span class="shortCut_btn"  id = "disease_statistic_shorcut" >DIsease Statistic</span></span><span class=" text-end col-6 pe-4" ><li class="fa-solid"></li></span></div>
      <div class="mt-1 fw-lighter opacity-75">One month ( <span class="oneMonthFrom mt-0"></span> - <span class="oneMonthTo mt-0"></span> )</div>
        </div>
        </div>
        </div>
      </div>

      <div  class="col-lg-4 col-sm-12 mb-4 ">
        <div class="card bg-c-light_blue border-0 rounded-4 shadow-sm order-card"  >
        <div class="card-body adjust_font_size row">
        <div  class="col-12" id="hp_chart_row_time" >
        <canvas class="bg-c-metal_blue rounded-4 p-3"  id="hpChart_time"   style="width:100%;  max-height:580px ;"></canvas> 
        <div class="mt-2 row"><span class=" text-start col-6 " ><span class="shortCut_btn" id = "timespan_statistic_shorcut">Time Span</span></span><span class=" text-end col-6 pe-4" ><li class="fa-solid"></li></span></div>
      <div class="mt-1 fw-lighter opacity-75">One month ( <span class="oneMonthFrom mt-0"></span> - <span class="oneMonthTo mt-0"></span> )</div>
        </div>
        </div>
        </div>
      </div>

</div>

<!--first-->
<div class="row ">
  <div class="col-lg-4 card-group col-sm-12">
  <div class="row ">

  <div class="col-lg-12 card-group col-sm-12">

  <div class="row pb-4">

  <div class="col-lg-12 col-sm-12  card-group mb-4 shortCut_btn" id="new_health_cases_btn">
      <div class="card  border-0 rounded-4 shadow-sm order-card" id="new_health_cases">
      <div class="card-body adjust_font_size row">
          <h4 >New Health Cases</h4>
          <p class="adjust_font_size fw-lighter opacity-75" >Current day ( <span class="today"></span> )</p>
          <h1><i class="fa-solid float-start"></i><span id="total_new_cases" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="newCasesPercent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>
          </div>
      </div>
    </div>
    <div class="col-lg-12  col-sm-12 card-group  shortCut_btn" id="total_health_cases_btn">
      <div class="card  border-0 rounded-4 shadow-sm order-card" id="total_health_cases">
      <div class="card-body adjust_font_size row">
          <h4 >Total Health Cases</h4>
          <p class="adjust_font_size fw-lighter opacity-75" >One month ( <span class="oneMonthFrom"></span> - <span class="oneMonthTo"></span> )</p>
          <h1><i class="fa-solid float-start"></i><span id="total_cases" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="casesPercent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>
          </div>
      </div>
    </div>

  </div>

  </div>



  </div>
  </div>

  <div class="col-lg-8 card-group mb-4">
    <div class="card border-0 rounded-3 shadow-sm">
    <div class=" card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card" >
        <h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Map Visualization<span id="map_record_info" class=" shortCut_btn"></span></h6>
      </div>
      <div class=" card-body">
      <div id="map_container" class=" card  rounded-3 border-0 shadow-sm">
      <div id="map" class=" w-100 rounded-4"></div>

      </div>
      </div>
  </div>
  </div>


  </div>

<!--first-->

<!--Second-->
<div class="row">

  <div class="col-lg-6 card-group   col-sm-12">
  <div class="card border-0 rounded-3 shadow-sm mb-4">
  <div class="card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card"><h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Top 3 diseases that has the most infected individuals</h6></div>
  <div class="card-body">
  <div class="container-fluid table-responsive">
  <div class="row">

  <div class="table-responsive ">
  <table class="table table-condensed">
    <thead>
      <tr>
        <th style="min-width:160px;" >
          Disease Name
        </th>
        <th  class="text-center">
          Cases Percentage
        </th>
        <th style="min-width: 160px;"  class="text-center">
          One Month Total
        </th>
        <th style="min-width: 130px;"  class="text-end">
          Total Increase
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

  <div class="col-lg-6 card-group col-sm-12">
  <div class="card border-0 rounded-3 shadow-sm mb-4">
  <div class="card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card"><h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Top 3 barangays with the highest number of health cases</h6></div>
  <div class="card-body">
  <div class="container-fluid table-responsive">
  <div class="row">

  <div class="table-responsive ">
  <table class="table table-condensed">
  <thead>
      <tr>
        <th style="min-width:160px;" >
          Barangay Name
        </th>
        <th  class="text-center">
          Cases Percentage
        </th>
        <th style="min-width: 160px;"  class="text-center">
          One Month Total
        </th>
        <th style="min-width: 130px;"  class="text-end">
          Total Increase
        </th>
      </tr>
    </thead>
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

