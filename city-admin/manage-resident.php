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
<li class="breadcrumb-item active"><span>Manage Residents</span></li>
<li class="breadcrumb-item active"><span>Barangay Residents</span></li>
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

<!--delete barangay resident modal-->
<?php include('update/update-resident.php'); ?>
<!--delete barangay resident modal end-->


<div class="body flex-grow-1 px-5 pt-3  pb-3"> 
<div class="container-fluid">


<!--chart-->
<div class="row chart_container mb-3" style="display: none;">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button type="button" id="refresh_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Current Number of Residents in Each Barangays
</div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >

    <!-- /.row-->
      <div  class="container-fluid">

      <div  class="mb-3" id="residents_chart_row">
      <canvas class=""  id="myChart" style="width:100%; max-height:500px ;"></canvas> 
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
<div class="card border-0 mb-4 shadow-sm ">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button type="button" id="refresh_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Barangay Residents
</div>

<div class="card-body border-0 shadow-sm "  id="wrapper" >

<div class=" container-fluid">
  <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">
  
  <div class="col-lg-6">
      <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder" type="button" id="show_graph" role="button"><span id="show_graph_txt">OPEN CHART </span><span class=" ms-1 fa-solid"></span></a>
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
      <th id="th">Barangay</th>
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
    <td id="Barangay" style="min-width: 100px;"></td>
    <td id="First Name" style="min-width: 100px;"></td>
    <td id="Middle Name" style="min-width: 125px;"></td>
    <td id="Last Name" style="min-width: 100px;"></td>
    <td id="Age" ></td>
    <td id="Gender"></td>
    <td id="Date of Birth"></td>
    <td id="Status"></td>
    <td id="Contact" style="min-width: 100px;"></td>
    <td id="Email" class="text-center" style="min-width: 100px;"></td>
    <td id="settings" style="min-width:100px;"></td>
  </tr>
</tfoot>
</table>

<div id="myProgress" class="rounded-4 d-none border-1 shadow-sm">
<div id="myBar" class=" rounded-4"></div>
</div>
   
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
<script id="manage_user" src="effects/manage-resident.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
