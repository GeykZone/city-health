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

<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3  pb-3"> 
<div class="container-fluid">

<!--first-->
<div class="row mb-1">

<!--new-->
  <div class="col-lg-12 col-sm-12 mb-lg-0 mb-md-0 mb-sm-3">
  <div class="row ">

  <div  class="col-lg-6 col-sm-12 mb-4 ">
        <div class="card bg-c-light_blue border-0 rounded-4 shadow-sm order-card"  >
        <div class="card-body adjust_font_size row">
        <div  class="col-12" id="hp_chart_row_disease" >
        <canvas class="bg-c-metal_blue rounded-4 p-3"  id="hpChart_disease"   style="width:100%;  max-height:280px ;"></canvas> 
        <div class="mt-2 row"><span class=" text-start col-6"><span class="shortCut_btn"  id = "disease_statistic_shorcut" >GHS Categorized by Diseases</span></span><span class=" text-end col-6 pe-4" ><li class="fa-solid"></li></span></div>
      <div class="mt-1 fw-lighter opacity-75">One month ( <span class="one_month_from mt-0"></span> - <span class="one_month_to mt-0"></span> )</div>
        </div>
        </div>
        </div>
      </div>

      <div  class="col-lg-6 col-sm-12 mb-4 mt-lg-0 mt-md-0 mt-sm-3 ">
        <div class="card bg-c-light_blue border-0 rounded-4 shadow-sm order-card"  >
        <div class="card-body adjust_font_size row">
        <div  class="col-12" id="hp_chart_row_time" >
        <canvas class="bg-c-metal_blue rounded-4 p-3"  id="hpChart_time"   style="width:100%;  max-height:280px ;"></canvas> 
        <div class="mt-2 row"><span class=" text-start col-6 " ><span class="shortCut_btn" id = "timespan_statistic_shorcut">GHS Categorized by Dates</span></span><span class=" text-end col-6 pe-4" ><li class="fa-solid"></li></span></div>
      <div class="mt-1 fw-lighter opacity-75">One month ( <span class="one_month_from mt-0"></span> - <span class="one_month_to mt-0"></span> )</div>
        </div>
        </div>
        </div>
      </div>

    </div>
  </div>
<!--new-->


  <div class="col-lg-12 col-sm-12">
  <div class="row">

  <div class="col-lg col-sm-12 card-group shortCut_btn" id="new_health_cases_btn">
      <div class="card bg-c-dark_green  border-0 rounded-4 shadow-sm order-card" id="new_health_cases">
      <div class="card-body adjust_font_size row">
          <h4 >New Health Cases</h4>
          <p class="adjust_font_size fw-lighter opacity-75" >Current day ( <span class="today"></span> )</p>
          <h1><i class="fa-solid float-start"></i><span id="total_new_cases" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="newCasesPercent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>
          </div>
      </div>
    </div>

  <div class="col-lg card-group col-sm-12 mt-lg-0 mt-sm-4">
      <div class="card  bg-c-dark_green border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "Indicataor"  >
        <div class=" card-body adjust_font_size row" id="total_health_cases_btn">
          <div class="">
          <div class="details_category_content border-0 shadow-sm d-flex py-2 bg-c-green mb-3 align-items-center rounded-5 text-white px-2 bd-highlight" id="cluster_tag">

            <div style="width:30px; height:30px;" class="rounded-circle d-flex align-items-center  justify-content-center bg-white bd-highlight">
            <div style="width:20px; height:20px;" id="marker_type" class="green"></div>
            </div>

            <label id="cluster" class="form-label ms-2 mt-2 bd-highlight"><span id="indicator_tag">Low</span> number of health cases </label>
            <label id="rank" class="form-label ms-2 mt-2 bd-highlight ms-auto me-2 d-none shortCut_btn"></label>
             
          </div>
          </div>

          <h4 >Total Health Cases</h4>
          <p class="adjust_font_size fw-lighter opacity-75" >One month ( <span class="one_month_from"></span> - <span class="one_month_to"></span> )</p>
          <h1><i class="fa-solid float-start"></i><span id="total_cases" style="margin-right: 10px;" class="float-end" >0</span></h1>
          <p  class="adjust_font_size"><span id="casesPercent"></span></p>
          <p  class="adjust_font_size fw-lighter opacity-75"><span class="click_to_see_more"></span></p>

        </div>
      </div>
  </div>
    
  <div class="col-lg card-group col-sm-12 mt-lg-0 mt-sm-4">
    <div class="card bg-c-opposite_blue  border-0 rounded-4 shadow-sm order-card shortCut_btn" id = "total_residents" >
      <div class=" card-body adjust_font_size row">

      <div class="">
        <div class="details_category_content border-0 shadow-sm align-middle d-flex pt-2 bg-c-light_blue mb-3 rounded-5 text-white px-2">
          <label style="margin-top: 3px;" id="cluster" class="form-label ms-2">Barangay <?php echo $admin_location; ?></label>
        </div>
        </div>
      <h4 >Total Number of Residents</h4>
      <p class=" adjust_font_size fw-lighter opacity-75">Current record ( Year <span id="year"></span> )</p>
      <h1 class="" ><span class="fa-solid float-start"></span> <span class="float-end" id="total_resident_number">0</span></h1>
      <p  class="adjust_font_size"><span id="resident_info"></span></p>
      <p class="adjust_font_size fw-lighter opacity-75" ><span class="">(Click to view the table)</span></p>
      </div>
    </div>
  </div>

    </div>
  </div>


  <div class=" col-12 mb-4  ">
    <div class="row">


  <!--shorcuts-->
  <div class="col-lg card-group col-sm-12 rounded-3 mt-4">
        <div class="card border-0 rounded-3 shadow-sm order-card" >
          <div class=" card-header rounded-top-3 bg-info p-0  border-0 shadow-sm ">
          <h6 class="float-lg-start mt-2 mb-2 ms-3 float-md-start adjust_font_size  order-card">Top 3 diseases that has the most infected individuals in barangay <?php echo $admin_location; ?>, Oroquieta City</h6>
          </div>
          <div class="card-body row">

          <div class="px-3">
            <p class="adjust_font_size text-dark  opacity-75" >One month ( <span class="one_month_from"></span> - <span class="one_month_to"></span> )</p>
        </div>

              <div class="table-responsive ">
              <table class="table table-condensed">
              <thead>
              <tr>
              <th style="min-width:180px;" >
              Disease Name
              </th>
              <th  class="text-center" style="min-width: 160px;">
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
  <!--shorcuts-->

    </div>
  </div>




</div>

<!--first-->

</div>
</div>


<!-- footer-->
<?php   include('includes/footer.php'); ?>
<!--Footer end-->

<!--scripts-->
<script>
  var my_barangay_name = <?php echo json_encode($admin_location); ?>;
  var my_barangay_id = <?php echo json_encode($admin_brg_id); ?> 
</script>

<script id="manage_user" src="effects/dashboard.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->

