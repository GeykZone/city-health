<?php 
include('includes/header.php');
include('includes/sidebar.php');
?>

<!--side bar-->
<!--side bar end-->

<div class="wrapper d-flex flex-column min-vh-100 bg-light">

<!--header-->
<?php   include('includes/navhead.php'); ?>
<div class=" header-divider"></div>
<div class="container-fluid">
<nav aria-label="breadcrumb">
  <ol class="breadcrumb my-0 ms-2">
    <li class="breadcrumb-item">
      <!-- if breadcrumb is single--><span>City Admin</span>
    </li>
    <li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
    <li class="breadcrumb-item active"><span>Inactive Health Cases</span></li>
  </ol>
</nav>
</div>
</header>
<!--header end-->

<!-- update hp -->
<?php include "update-hp.php" ?>
<!-- update hp end -->

<!-- active hp -->
<?php include "active-hp.php" ?>
<!-- active hp end -->

<div class="body flex-grow-1 px-5 pt-3"> 
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4 rounded-5 shadow-sm remove_rounded">

  <div class="hide_first_load d-none card-header p-3 border-0 shadow-sm rounded-5 remove_rounded">
  </div>

  <div class="card-body border-0 shadow-sm rounded-5 remove_rounded"  id="wrapper" >

      <div class="table-responsive-xxl" >
      <div class="d-flex">

      <div class="col-sm-6 text-sm-start d-none hide_first_load">
      <a id="toggle_chart1" >
      <span style="color: #294168bf;" class=" fa-solid align-content-center"></span> List of Inactive Health Cases
      </a>
      </div>

      <div class="col-sm-6 text-sm-end d-none hide_first_load dropdown-center">
      <a class="mb-3 border-0 shadow-sm addbtn add-brgy pt-1 pb-1 px-3 fw-bolder dropdown-toggle" id="hp_option" type="button" data-coreui-toggle="dropdown" aria-expanded="false">OPTIONS <span class="fa-solid"></span></a>
      <ul class="dropdown-menu align-content-center shadow border-0" id="hp_dropdown_options">
        <li><a class="dropdown-item" href="manage-hp.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Active List</a></li>
        <li><a class="dropdown-item" href="#"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Cluster Graph</a></li>
        <li><a class="dropdown-item" href="map-statistic.php"><span class="fa-solid" style="margin-right: 10px; color: #294168bf;"></span> Cluster Map</a></li>
      </ul>
      </div>

      </div> 

      <table class="table table-striped table-borderless table-condensed d-none w-100" id="hp_table"> 
        <thead class="table-info fw-semibold shadow-sm">
          <tr class="align-middle">
            <th id="#th">Disease</th>
            <th id="#th">First Name</th>
            <th id="#th">Middle Name</th>
            <th id="#th">Last Name</th>
            <th id="#th">Barangay</th>
            <th>Gender</th>
            <th>Age</th>
            <th id="#th">PhilHealth Id</th>
            <th id="#th">Contact No.</th>
            <th>HP Status</th>
            <th>Date Created</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm"  id="health_profiles_table"> 

        
        </tbody>
        
      </table>

      <div id="myProgress" class="rounded-4 border-1 shadow-sm">
      <div id="myBar" class=" rounded-4"></div>
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
<script id="manage_user" src="effects/inactive-list.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
