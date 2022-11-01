<?php 
include('includes/header.php');
include('includes/sidebar.php');
?>
<!--side bar-->

<!--side bar end-->

<div class="wrapper d-flex flex-column min-vh-100 bg-light">

<!--header-->
<?php   include('includes/navhead.php'); ?>
<div class="header-divider"></div>
<div class="container-fluid">
<nav aria-label="breadcrumb">
<ol class="breadcrumb my-0 ms-2">
<li class="breadcrumb-item">
<!-- if breadcrumb is single--><span>City Admin</span>
</li>
<li class="breadcrumb-item active"><span>Manage Residents</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<!--add barangay resident modal-->
<?php include('add-resident.php'); ?>
<!--add barangay resident modal end-->


<!--delete barangay resident modal-->
<?php include('delete-resident.php'); ?>
<!--delete barangay resident modal end-->

<!--delete barangay resident modal-->
<?php include('update-resident.php'); ?>
<!--delete barangay resident modal end-->


<div class="body flex-grow-1 px-5 pt-3"> 
<div class="container-fluid">


<!--chart-->
<div class="row chart_container d-none">
<div class="col-md-12">
<div class="card border-0 mb-4 rounded-5 shadow-sm remove_rounded">

  <div class="hide_first_load d-none card-header p-3 border-0 shadow-sm rounded-5 remove_rounded">
  </div>

  <div class="card-body border-0 shadow-sm rounded-5 remove_rounded"  id="wrapper" >

    <!-- /.row-->
      <div  class="table-responsive-xxl">

      <div class=" mb-3 c1 row d-none" id="c1"><div class="toggle_chart1 col-md-12"><a id="toggle_chart1"><span style="color: #294168bf;" class=" fa-solid align-content-center"></span> Current Total Number of Barangay Residents</a></div></div>

      <div  class="mb-3 table-responsive-xxl d-none" id="residents_chart_row">
      <canvas class="d-none"  id="myChart" style="width:100%; height:100px ;"></canvas> 
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
<div class="card border-0 mb-4 rounded-5 shadow-sm remove_rounded">

<div class="hide_first_load d-none card-header p-3 border-0 shadow-sm rounded-5 remove_rounded">
  </div>

  <div class="card-body border-0 shadow-sm rounded-5 remove_rounded"  id="wrapper" >

      <div  class="table-responsive-xxl">
      <div class=" d-flex">

      <div class="col-sm-6 text-sm-start hide_first_load d-none">
      <a id="toggle_chart1" >
      <span style="color: #294168bf;" class=" fa-solid align-content-center"></span> Barangay Residents of Oroquieta
      </a>
      </div>

      <div class="col-sm-6 text-sm-end">
      <a class="mb-3 shadow-sm addbtn d-none add-brgy pt-1 pb-1 px-3 fw-bolder"  data-coreui-toggle="modal" href="#add-barangay-resident" id="add_resident" role="button">NEW <span class="fa-solid fa-circle-plus"></a>
      </div>

      </div> 

      <table class="table table-striped table-borderless  table-condensed d-none w-100" id="resident_table" > 
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
            <th>Contact No.</th>
            <th>Email Address</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm" > 
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
<script id="manage_user" src="effects/manage-resident.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
