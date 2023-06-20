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
    <li class="breadcrumb-item active"><span>Profiles & Stats</span></li>
    <li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
  </ol>
</nav>
</div>
</header>
<!--header end-->


<!-- add hp -->
<?php include "add/add-hp.php" ?>
<!-- add hp end -->

<!-- update hp -->
<?php include "update/update-hp.php" ?>
<!-- update hp end -->

<!-- delete hp -->
<?php include "delete/delete-hp.php" ?>
<!-- delete hp end -->

<!-- filter map hp -->
<?php include "update/filter-time.php" ?>
<!-- filter map end -->

<!-- more details hp -->
<?php include "display/detail-time.php" ?>
<!-- more details  end -->

<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3 pb-3"> 
<div class="container-fluid">

<!--chart-->
<div class="row chart_container mb-3" style="display: block;">
    <div class="col-md-12">
    <div class="card border-0 mb-4 shadow-sm remove_rounded">

    <div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
      <button type="button" id="current_year" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Time Series
    </div>

    <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >
      <div class="container-fluid mb-1 ">
        <div class="row">

        <div class="col-lg-6 col-md-6 col-sm-12 text-sm-start align-content-center dropdown-center">
          <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm  mb-3 me-2 addbtn add-brgy px-3 fw-bolder" id="sort_cases" role="button" >SORT <span class="fa-solid ms-1 fa-sort"></span></a>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 text-lg-end text-md-end text-sm-start align-content-center dropdown-center">
          <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm mb-3 addbtn add-brgy px-3 fw-bolder" id="filter_graph" data-coreui-toggle="modal" href="#filter-time" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
        </div>
      </div>
    </div>

    <!-- /.row-->
    <div  class="container-fluid table-responsive">
        <div class="row">

            <div  class="mb-3" id="hp_chart_row" style="min-height: 300px;  min-width:1200px;">
            <canvas class=""  id="hpChart"   style="width:100%;  max-height:580px ;"></canvas> 
            </div>

        </div>
    </div>

    <div class=" container-fluid mt-3">
      <div class="row ">
        <div class="col-12 d-flex text-dark" style=" opacity: 0.65;">
        <span class="fa-regular me-3" style="margin-top: 2px;"></span><h6 class=""><span id="map_disease"></span><span id="map_cases"></span><span id="map_from"></span><span id="map_to"></span><span id="map_barangay"></span><span id="map_gender"></span><span id="map_min_age"></span><span id="map_max_age"></span><span id="map_totals"></span></h6>
        </div>
      </div>
    </div>
        
      </div>
      
    </div>
    </div>
</div>
<!--chart end-->

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

  <div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
  <button type="button" id="refresh_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Health Profiles
  </div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >


  <div class=" container-fluid">
  <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">

  <div class="col-12 mb-lg-3 mb-sm-3 mt-lg-0 mt-sm-0 d-none" id="search_result"></div>

  <div class="col-lg-6  mt-lg-0 mt-sm-0 align-content-center hide_first_load dropdown-center">
     <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" id="add_hp" data-coreui-toggle="modal" href="#add-hp" role="button" >NEW <span class="fa-solid ms-1 fa-circle-plus"></span></a>
  </div>

  <div class="col-lg-6  text-lg-end align-content-center hide_first_load dropdown-center">
   <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" href="manage-resident.php" role="button" >RESIDENTS <span class="fa-solid ms-1 fa-user-group"></span></a>
  </div>
  </div> 
  </div>


  <div class=" table-responsive container-fluid"  id = "hp_table_container">

      <table class="table table-striped table-borderless rounded-3 table-condensed w-100" id="hp_table"> 
      <thead class="table-info  fw-semibold shadow-sm">
          <tr class="align-middle ">
            <th style="min-width: 105px;" class="th_diag">Diagnosis</th>
            <th id="th">First Name</th>
            <th id="th" >Middle Name</th>
            <th id="th">Last Name</th>
            <th id="th">Barangay</th>
            <th >Gender</th>
            <th >Age</th>
            <th>Contact</th>
            <th class="th_date" style="min-width: 137px; font-size:15px;">Date of Diagnosis</th>
            <th >PhilHealth</th>
            <th class="text-end px-4">Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm "  id="health_profiles_table"> 
        </tbody>

        <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1">
          <tr class="align-middle" >
            <td id="Diagnosis" style="min-width: 160px; font-size:8px;"></td>
            <td id="First Name" style="min-width: 100px;"></td>
            <td id="Middle Name" style="min-width: 125px;"></td>
            <td id="Last Name" style="min-width: 100px;"></td>
            <td id="Barangay" style="min-width: 130px;"></td>
            <td id="Gender" style="min-width: 73px;"></td>
            <td id="Age"  style="min-width: 54px;"></td>
            <td id="Contact" style="min-width: 100px;"></td>
            <td id="Date of Diagnosis" style="min-width: 137px;"></td>
            <td id="PhilHealth" style="min-width: 70px;"></td>
            <td id="settings" style="min-width:91px;"></td>
          </tr>
        </tfoot>
      
      </table>

      </div>

    <div class=" container-fluid" >
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
<script id="manage_user" src="effects/manage-hp.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
