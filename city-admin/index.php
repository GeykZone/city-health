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
min-height: 455px;
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
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.yellow {
  background-image: url('../resourcess/images/yellow.png');
  background-size: cover;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
}

.orange {
  background-image: url('../resourcess/images/orange.png');
  background-size: cover;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  
}

.red {
  background-image: url('../resourcess/images/red.png');
  background-size: cover;
  width: 35px;
  height: 35px;
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

<div class="body flex-grow-1 px-5 pt-3  pb-3"> 
<div class="container-fluid">

<!--first-->
<div class="row mb-3">

  <div class="col-lg-12 col-sm-12">
  <div class="row ">
      <div class="col-lg-3 col-sm-6 mb-4">
        <div class="card bg-c-pink border-0 rounded-4 shadow-sm order-card"  style="height:150px;">
        <div class="card-body adjust_font_size">
        <h6 class="mb-3">New Cases</h6>
          <h2 class="text-end"><i class="fa-solid float-start"></i><span>455</span></h2>
          <p class="mb-2"><span>December 1, 2022 </span></p>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-sm-6 mb-4">
        <div class="card bg-c-green  border-0 rounded-4 shadow-sm order-card"  style="height:150px ;">
          <div class=" card-body adjust_font_size">
          <h6 class="mb-3">Inactive Cases</h6>
          <h2 class="text-end"><i class="fa-solid float-start"></i><span>455</span></h2>
          <p class="mb-2"><span>December 1, 2022 </span</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 mb-4">
        <div class="card bg-c-yellow  border-0 rounded-4 shadow-sm order-card"  style="height:150px ;">
          <div class=" card-body adjust_font_size">
          <h6 class="mb-3">Total Active Cases</h6>
          <h2 class="text-end"><i class="fa-solid float-start"></i><span>455</span></h2>
          <p class="mb-2"><span>December 1, 2022 </span> - <span>December 1, 2022</span></p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 mb-4">
        <div class="card bg-c-blue  border-0 rounded-4 shadow-sm order-card"  style="height:150px ;">
          <div class=" card-body adjust_font_size">
          <h6 class="mb-3">Total Active Diseases</h6>
          <h2 class="text-end"><i class="fa-solid float-start"></i><span>455</span></h2>
          <p class="mb-2"> <span>December 1, 2022 </span> - <span>December 1, 2022</span> </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-6 col-sm-12">
  <div class="row ">
      <div class="col-lg-4 col-sm mb-4">
        <div class="card bg-primary border-0 rounded-4 shadow-sm order-card"  style="height:100px;">
        <div class="card-body adjust_font_size">
            Barangay Health Satatistic
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-sm mb-4">
        <div class="card bg-info border-0 rounded-4 shadow-sm order-card"  style="height:100px ;">
          <div class=" card-body adjust_font_size">
             Disease Statistic
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm mb-4">
        <div class="card bg-c-blue  border-0 rounded-4 shadow-sm order-card"  style="height:100px ;">
          <div class=" card-body adjust_font_size">
           Time Span
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-sm-12 mb-4">
        <div class="card border-0 rounded-3 shadow-sm order-card" style="height:400px ;" >
          <div class=" card-header rounded-top-4 bg-info p-0  border-0 rounded-top-3 shadow-sm ">
          <h6 class="float-lg-start mt-2 mb-2 ms-3 float-md-start adjust_font_size  order-card">Current number of residents in each barangays</h6>
          </div>
          <div class=" card-body adjust_font_size">
            <div>
            <div  class="mb-3" id="hp_chart_row" style="height:325px;  min-width:100%;">
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
      <div class="card border-0 shadow-sm border-0 rounded-4 shadow-sm" style="min-height:523px ;">
        <div class=" card-header py-0  bg-info border-0 rounded-top-4 shadow-sm order-card" >
          <h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card"> Active health cases <span id="map_from"></span><span id="map_to"></span>.</h6>
        </div>
        <div class=" card-body">
        <div id="map_container" class=" card  rounded-4 border-0 shadow-sm">
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
<div class="col-md-12">
<div class="card mb-4">
<div class="card-header">Charts</div>
<div class="card-body">



<div class="container-fluid table-responsive">
<div class="row">
  <!--health diseases chart-->
  <div class="col-lg col-md-12" style="min-width: 400px ;">
    <hr class="mt-0">
    <div class="card-body">For chart health disease</div>
  </div>
    <!--health diseases chart end-->


  <!--prevalence chart-->
  <div class="col-lg col-md-12" style="min-width: 400px ;">
    <hr class="mt-0">
    <div class="card-body">For chart health disease</div>
  </div>
  <!--prevalence chart end-->

    <!--prevalence chart-->
    <div class="col-lg col-md-12" style="min-width: 400px ;">
    <hr class="mt-0">
    <div class="card-body">For chart health disease</div>
  </div>
  <!--prevalence chart end-->

  </div>
</div>


</div>
</div>
</div>
</div>
<!--Second -->


<!--Third-->
<div class="row">
<div class="col-md-12">
<div class="card mb-4">
<div class="card-header">Charts</div>
<div class="card-body">



<div class="container-fluid table-responsive">
<div class="row">
  <!--health diseases chart-->
  <div class="col-lg col-md-12" style="min-width: 400px ;">
    <hr class="mt-0">
    <div class="card-body">For chart health disease</div>
  </div>
    <!--health diseases chart end-->


  <!--prevalence chart-->
  <div class="col-lg col-md-12" style="min-width: 400px ;">
    <hr class="mt-0">
    <div class="card-body">For chart health disease</div>
  </div>
  <!--prevalence chart end-->

    <!--prevalence chart-->
    <div class="col-lg col-md-12" style="min-width: 400px ;">
    <hr class="mt-0">
    <div class="card-body">For chart health disease</div>
  </div>
  <!--prevalence chart end-->

  </div>
</div>


</div>
</div>
</div>
</div>
<!--Third-->




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

