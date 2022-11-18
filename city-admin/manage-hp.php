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
    <li class="breadcrumb-item active"><span>Health Profiles</span></li>
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
<?php include "update/inactive-hp.php" ?>
<!-- delete hp end -->

<!-- active hp -->
<?php include "update/active-hp.php" ?>
<!-- active hp end -->

<div class="body flex-grow-1 px-5 pt-3 pb-3"> 
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

  <div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
  <button type="button" id="refresh_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Health Profiles
  </div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >


  <div class=" container-fluid">
  <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">
  <div class="col-lg-2  mb-3 text-sm-start  hide_first_load">
    <label for="range_from"  class="mb-1 text-secondary">Start Date :</label>
  <input type="date" id="range_from" class="form-control birthdate text-sm-start shadow-sm"  placeholder="From">
  </div>

  <div class="col-lg-2 mb-3 text-sm-start  hide_first_load">
  <label for="range_to"  class="mb-1 text-secondary">End Date :</label>
  <input type="date" id="range_to" class="form-control birthdate  text-sm-start shadow-sm" placeholder="From">
  </div>

  <div class="col-lg-2 mb-3 mt-1 text-sm-start  hide_first_load">
    <br class=" d-sm-none d-lg-block d-none">
  <button  class="filter_btn rounded-2 border-0 shadow-sm" id="date_range_btn" type="button" style="width:115px; font-weight:bold; padding-top: 7px; padding-bottom: 7px; padding-right:20px; padding-left:20px;">
      <span class="fa-solid me-1"></span> FILTER</button>
  </div>

  <div class="col-lg-6 col-md-6 text-lg-end mt-1 align-content-center hide_first_load dropdown-center">
  <br class=" d-sm-none d-lg-block d-none">
  <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 me-2 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder dropdown-toggle" id="hp_option" type="button" data-coreui-toggle="dropdown" aria-expanded="false">OPTIONS <span class="fa-solid ms-1"></span></a>
  <ul class="dropdown-menu align-content-center shadow border-0" id="hp_dropdown_options">
    <li  id="show_inactive" type="button" ><a class="dropdown-item"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Inactive List</a></li>
    <li class="d-none" id="show_active"  type="button"><a class="dropdown-item" ><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Active List</a></li>
    <li><a class="dropdown-item" href="#"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Cluster Graph</a></li>
    <li><a class="dropdown-item" href="map-statistic.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Cluster Map</a></li>
  </ul>
  
  <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" id="add_hp" data-coreui-toggle="modal" href="#add-hp" role="button" >NEW <span class="fa-solid ms-1 fa-circle-plus"></span></a>
  </div>
  </div> 
  </div>


  <div class=" table-responsive container-fluid" >

      <table class="table table-striped table-borderless rounded-3 table-condensed w-100" id="hp_table"> 
      <thead class="table-info  fw-semibold shadow-sm">
          <tr class="align-middle ">
            <th id="th">Disease</th>
            <th id="th">First Name</th>
            <th id="th" >Middle Name</th>
            <th id="th">Last Name</th>
            <th id="th">Barangay</th>
            <th >Gender</th>
            <th >Age</th>
            <th id="th">PhilHealth</th>
            <th>Contact</th>
            <th id="th">Date Created</th>
            <th >Status</th>
            <th class="text-end px-4">Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm "  id="health_profiles_table"> 
        </tbody>

        <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1">
          <tr class="align-middle" >
            <td id="Disease" style="min-width: 100px;"></td>
            <td id="First Name" style="min-width: 100px;"></td>
            <td id="Middle Name" style="min-width: 125px;"></td>
            <td id="Last Name" style="min-width: 100px;"></td>
            <td id="Barangay" style="min-width: 130px;"></td>
            <td id="Gender" style="min-width: 73px;"></td>
            <td id="Age"  style="min-width: 55px;"></td>
            <td id="PhilHealth"style="min-width: 100px;" ></td>
            <td id="Contact" style="min-width: 100px;"></td>
            <td id="Date created" style="min-width: 100px;"></td>
            <td id="status" style="min-width: 70px;"></td>
            <td id="settings" style="min-width:100px;"></td>
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
