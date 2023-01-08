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
<li class="breadcrumb-item active"><span>Manage Residents</span></li>
<li class="breadcrumb-item active"><span>Barangay <?php echo ucwords(strtolower($admin_location)); ?> Residents</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<!--add barangay resident modal-->
<?php include('add/add-resident.php'); ?>
<!--add barangay resident modal end-->


<!--delete barangay resident modal-->
<?php include('delete/delete-resident.php'); ?>
<!--delete barangay resident modal end-->

<!--update barangay resident modal-->
<?php include('update/update-resident.php'); ?>
<!--update barangay resident modal end-->

<!-- filter resident -->
<?php include "update/filter-table.php" ?>
<!-- filter resident end -->


<div class="body flex-grow-1 px-5 pt-3  pb-3"> 
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm ">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button type="button" id="refresh_resident_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Barangay <?php echo ucwords(strtolower($admin_location)); ?> Residents
</div>

<div class="card-body border-0 shadow-sm "  id="wrapper" >

<div class=" container-fluid">
  <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">

  <div class="col-12 mb-lg-3 mb-sm-3 mt-lg-0 mt-sm-0 d-none" id="search_result"></div>

  <div class="col-lg-6  mb-lg-0  mb-sm-3 align-content-center hide_first_load dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" id="filter_this_table" data-coreui-toggle="modal" href="#filter_table" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
  </div>

  <div class="col-lg-6 text-lg-end">
      <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder"  data-coreui-toggle="modal" href="#add-barangay-resident" id="add_resident" role="button">NEW <span class="fa-solid ms-1 fa-circle-plus"></a>
  </div>

  </div>
</div>

<div  class="table-responsive container-fluid">

<table class="table table-striped table-borderless  table-condensed w-100" id="resident_table" > 
<thead class="table-info fw-semibold shadow-sm">
<tr class="align-middle">
      <th id="th">First Name</th>
      <th id="th">Middle Name</th>
      <th id="th">Last Name</th>
      <th>Age</th>
      <th>Gender</th>
      <th id="th">Date of Birth</th>
      <th>Status</th>
      <th id="th">Contact</th>
      <th id="th">Email</th>
      <th class="text-end px-4">Settings</th>
    </tr>
</thead>

  <tbody class="align-middle shadow-sm" > 
</tbody>

<tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1">
  <tr class="align-middle" >
    <td id="First Name" style="min-width: 100px;"></td>
    <td id="Middle Name" style="min-width: 125px;"></td>
    <td id="Last Name" style="min-width: 100px;"></td>
    <td id="Age" ></td>
    <td id="Gender"></td>
    <td id="Date of Birth" style="min-width: 130px;"></td>
    <td id="Status"></td>
    <td id="Contact" style="min-width: 100px;"></td>
    <td id="Email" class="text-center" style="min-width: 100px;"></td>
    <td id="settings" style="min-width:100px;"></td>
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
  var my_barangay_name = <?php echo json_encode(ucwords(strtolower($admin_location))); ?>;
  var my_barangay_id = <?php echo json_encode($admin_brg_id); ?> 
</script>

<script  src="effects/manage-resident.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
