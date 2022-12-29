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
    <li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
    <li class="breadcrumb-item active"><span>Barangay <?php echo ucwords(strtolower($admin_location)); ?> Health Profiles</span></li>
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

<!-- active hp -->
<?php include "update/active-hp.php" ?>
<!-- active hp end -->

<!-- delete hp -->
<?php include "delete/delete-hp.php" ?>
<!-- delete hp end -->

<!-- occurence hp -->
<?php include "add/add-hp-occurrence.php" ?>
<!-- occurence hp end -->

<!-- detail hp -->
<?php include "display/detail-resident-hp.php" ?>
<!-- detail hp end -->

<!-- filter hp -->
<?php include "update/filter-table.php" ?>
<!-- filter hp end -->

<!-- update occurence hp -->
<?php include "update/update-hp-occurrence.php" ?>
<!-- update occurence hp end -->

<div class="body flex-grow-1 px-5 pt-3 pb-3"> 
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

  <div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
  <button type="button" id="refresh_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Barangay <?php echo ucwords(strtolower($admin_location)); ?> Health Profiles
  </div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >


  <div class=" container-fluid">
  <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">

  <div class="col-12 mb-2" id="search_result"></div>

  <div class="col-lg-6  mt-1 mb-2 mb-lg-0 mb-md-2 mb-sm-2 align-content-center hide_first_load dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" id="filter_this_table" data-coreui-toggle="modal" href="#filter_table" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
  </div>

  <div class="col-lg-6  text-lg-end mt-1 align-content-center hide_first_load dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 me-2 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder dropdown-toggle" id="hp_option" type="button" data-coreui-toggle="dropdown" aria-expanded="false">OPTIONS <span class="fa-solid ms-1"></span></a>
  <ul class="dropdown-menu align-content-center shadow border-0" id="hp_dropdown_options">
  <li><a class="dropdown-item" href="manage-hp.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Health Profiles</a></li>
    <li><a class="dropdown-item"  href="graphical-statistic-disease.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Graphical Statistic</a></li>
  </ul>
  
  <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" id="add_hp" data-coreui-toggle="modal" href="#add-hp" role="button" >NEW <span class="fa-solid ms-1 fa-circle-plus"></span></a>
  </div>
  </div> 
  </div>


  <div class=" table-responsive container-fluid" >

      <table class="table table-striped table-borderless rounded-3 table-condensed w-100" id="hp_table"> 
      <thead class="table-info  fw-semibold shadow-sm">
          <tr class="align-middle ">
            <th style="min-width: 105px;" class="th_diag">Diagnosis</th>
            <th id="th">First Name</th>
            <th id="th" >Middle Name</th>
            <th id="th">Last Name</th>
            <th >Gender</th>
            <th >Age</th>
            <th>Contact</th>
            <th class="th_date" style="min-width: 137px;">Date of Diagnosis</th>
            <th >Status</th>
            <th class="text-end px-4">Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm "  id="health_profiles_table"> 
        </tbody>

        <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1">
          <tr class="align-middle" >
            <td id="Diagnosis" style="min-width: 110px; font-size:8px;"></td>
            <td id="First Name" style="min-width: 100px;"></td>
            <td id="Middle Name" style="min-width: 125px;"></td>
            <td id="Last Name" style="min-width: 100px;"></td>
            <td id="Gender" style="min-width: 73px;"></td>
            <td id="Age"  style="min-width: 55px;"></td>
            <td id="Contact" style="min-width: 100px;"></td>
            <td id="Date of Diagnosis" style="min-width: 137px;"></td>
            <td id="status" style="min-width: 70px;"></td>
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

<!--scripts  -->
<script>
  var my_barangay_name = <?php echo json_encode(ucwords(strtolower($admin_location))); ?>;
  var my_barangay_id = <?php echo json_encode($admin_brg_id); ?> 
</script>

<script src="effects/manage-hp.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
