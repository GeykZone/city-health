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

<div class="body flex-grow-1 px-3">
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card mb-4">

  <div class="card-header p-3" style="background-color:#3b7ddd;">
  
  <div class="row">
      <div class="col-sm-6">
        <h4 style="color:aliceblue;">Residents of Oroquieta City</h4>
      </div>
      <div class="col-sm-6 text-end">
      <a class="addbtn add-brgy px-4 fw-bolder d-none"  data-coreui-toggle="modal" href="#add-barangay-resident" id="add_resident" role="button">Resident +</a>
      </div>
  </div> 
  </div>

  <div class="card-body"  id="wrapper" >

    <!-- /.row-->
      <div  class="table-responsive-xxl">

      <div class=" mb-3 c1 row d-none" id="c1"><div class="toggle_chart1 col-md-12"><a id="toggle_chart1"><span style="color: #294168bf;" class=" fa-solid align-content-center"></span> Current Total Number of Barangay Residents</div></a></div>
      <hr class="mt-0">

      <div  class="mb-3 table-responsive-xxl d-none" id="residents_chart_row">
      <canvas class="d-none"  id="myChart" style="width:100%; height:100px ;"></canvas> 
      <hr class="mt-3 d-none" id="chart_line">
      </div>

      <table class="table  mb-0 d-none w-100" id="resident_table" > 
        <thead class="table-info fw-semibold">
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

        <tbody> 
        </tbody>
      </table>

      <div id="myProgress" class=" mt-3 rounded-4">
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
