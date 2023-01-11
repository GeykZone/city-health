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
<li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
<li class="breadcrumb-item active"><span>Disease Statistic Table</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->


<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3  pb-3"> 
<div class="container-fluid">


<!-- filter map hp -->
<?php include "update/filter-diseases.php" ?>
<!-- filter map end -->


<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4  shadow-sm remove_rounded">

  <div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
  <button type="button" id="current_year" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Disease Statistic Table
  </div>  

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >

      <div class=" container-fluid">
        <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">

        <div class="col-12 mb-lg-3 mb-sm-3 mt-lg-0 mt-sm-0 d-none" id="search_result"></div>

        <div class="col-lg-6 col-md-12 text-md-start align-content-center dropdown-center">
        <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm mb-3 addbtn add-brgy px-3 fw-bolder" id="filter_graph" data-coreui-toggle="modal" href="#filter-diseases" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
        </div>

        <div class="col-lg-6 col-md-12 text-lg-end text-md-start align-content-center dropdown-center">
        <?php include('includes/options.php'); ?>
        </div>

        </div>
      </div>

      <div class="table-responsive container-fluid" >
      <table class="table table-striped table-borderless table-condensed  mb-0 w-100" id="barangay_health_statistic"> 
        <thead class="table-info fw-semibold shadow-sm">
          <tr class="align-middle">
          <th>Diagnosis</th>
          <th class="text-center">Age Range</th>
          <th class="text-center">Gender</th>
          <th class="text-end px-4">Total Health Cases</th>
          </tr>
        </thead>

        <tbody class=" align-middle shadow-sm" id="show_barangay_health_statistic_table"> 
        </tbody>

        
        <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1">
          <tr class="align-middle" >
            <td id="Diagnosis"  style="width:200px"></td>
            <td id="Age Range" style="min-width: 100px;"></td>
            <td id="Gender" style="min-width: 100px;"></td>
            <td id="Total Health Cases" style="width:165px;"></td>
          </tr>
        </tfoot>
        
      </table>
      </div>

      <div class="table-responsive container-fluid" >
        <div class="dataTables_wrapper dt-bootstrap5 row" id="table_page">
        </div>
      </div>
    
  </div>
</div>
</div>
</div>
<!--Admins end-->

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

<script src="effects/tabular-statistic-disease.js"></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
