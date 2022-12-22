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
<!-- if breadcrumb is single--><span>Barangay Admin</span>
</li>
<li class="breadcrumb-item active"><span>Dashboard</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<style>
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
</style>

<!-- more details dashboard -->
<?php include "display/detail-dashboard.php" ?>
<!-- more details dashboard  end -->

<div class="body flex-grow-1 px-5 pt-3  pb-3"> 
<div class="container-fluid">

<!--first-->
<div class="row mb-1">

<!--new-->
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
<!--new-->


  <div class="col-lg-12 col-sm-12">
  <div class="row">

  <!--totals-->
  <div class="col-lg card-group col-sm-12 mt-lg-0">
      <div class="card  bg-c-dark_green border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "Indicataor"  >
        <div class=" card-body adjust_font_size row">
          <div class="">
          <div class="details_category_content border-0 shadow-sm align-middle d-flex pt-2 bg-c-green mb-3 rounded-5 text-white px-2" id="cluster_tag">
            <div style="width:30px; height:30px; margin-bottom:8px;" class="rounded-circle bg-white">
            <div style="width:20px; height:20px; margin-top:4px; margin-left:4px;" id="marker_type" class="green"></div>
            </div><label style="margin-top: 3px;" id="cluster" class="form-label ms-2"><span id="indicator_tag">Low</span> number of health cases</label>
          </div>
          </div>

          <p class="adjust_font_size fw-lighter opacity-75" ><span class="one_month_from"></span> - <span class="one_month_to"></span></p>

          <h4 id="hp_total_for_one_month">0 Total Health Case</h4>

          <p class="adjust_font_size fw-lighter opacity-75"><span class="">(Click to view the table)</span></p>
        </div>
      </div>
  </div>

  <div class="col-lg card-group col-sm-12 mt-lg-0 mt-sm-4">
    <div class="card bg-c-opposite_blue  border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "total_residents" >
      <div class=" card-body adjust_font_size row">

      <div class="">
        <div class="details_category_content border-0 shadow-sm align-middle d-flex pt-2 bg-c-light_blue mb-3 rounded-5 text-white px-2">
          <label style="margin-top: 3px;" id="cluster" class="form-label ms-2">Barangay <?php echo ucwords(strtolower($admin_location)); ?></label>
        </div>
        </div>
      <p class=" adjust_font_size fw-lighter opacity-75">Current total number of residents</p>
      <h4 class="" ><span class="fa-solid float-start"></span> <span class="float-end" id="total_resident_number">0</span></h4>
      <p class="adjust_font_size fw-lighter opacity-75" ><span class="">(Click to view the table)</span></p>
      </div>
    </div>
  </div>
  <!--totals-->

  <!--shorcuts-->
    <div class="col-lg-6 card-group col-sm-12 rounded-3 mt-lg-0 mt-sm-4">
        <div class="card border-0 rounded-3 shadow-sm order-card" >
          <div class=" card-header rounded-top-3 bg-info p-0  border-0 shadow-sm ">
          <h6 class="float-lg-start mt-2 mb-2 ms-3 float-md-start adjust_font_size  order-card">Shortcuts</h6>
          </div>
          <div class="card-body row">
      <div class="col-lg mt-lg-1 col-sm-12 ">
        <div class="card bg-c-blue  border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "disease_statistic_shorcut"  style="max-height:120px; height:150px; min-height:150px;">
          <div class=" card-body adjust_font_size row">
            <p class="adjust_font_size">Disease Statistic</p>
            <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
      <div class="col-lg mt-lg-1 mt-sm-3 col-sm-12 ">
        <div class="card  bg-c-light_blue border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "timespan_statistic_shorcut"   style="max-height:120px; height:150px; min-height:150px;">
          <div class=" card-body adjust_font_size row">
            <p class="adjust_font_size">Time Span</p>
            <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
      <div class="col-lg mt-lg-1 mt-sm-3 col-sm-12 ">
        <div class="card bg-c-medium_blue  border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "rec_death_statistic_shorcut"  style="max-height:120px; height:150px; min-height:150px;">
          <div class=" card-body adjust_font_size row">
           <p class="adjust_font_size">Deaths & Recoveries</p>
           <p class="adjust_font_size" style="position:absolute; bottom:0; margin-left:-3px;"><span class="fa-solid float-start"></span> <span class="fa-solid float-end"></span></p>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
  <!--shorcuts-->
    </div>
  </div>


<!--top 3-->
  <div class="col-lg-12 card-group col-sm-12 mt-4">
      <div class="card border-0 rounded-3 shadow-sm">
      <div class="card-header py-0  bg-info border-0 rounded-top-3 shadow-sm order-card"><h6 class="mt-2 mb-2  float-lg-start float-md-start adjust_font_size  order-card">Top 3 diseases that has the most infected individuals in barangay <?php echo ucwords(strtolower($admin_location)); ?></h6></div>
      <div class="card-body">
      <div class="container-fluid table-responsive">
      <div class="row">

      <div class="table-responsive">
      <table class="table table-condensed">
        <thead>
          <tr>
            <th style="min-width: 130px;">
              Disease Name
            </th>
            <th id="progress_hp">
              Progress
            </th>
            <th style="min-width: 130px;" class=" text-end">
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
</div>
<!--top 3-->
<!--first-->

</div>
</div>


<!-- footer-->
<?php   include('includes/footer.php'); ?>
<!--Footer end-->

<!--scripts-->
<script>
  var my_barangay_name = <?php echo json_encode(ucwords(strtolower($admin_location))); ?>;
  var my_barangay_id = <?php echo json_encode($admin_brg_id); ?> 
</script>

<script id="manage_user" src="effects/dashboard.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->

