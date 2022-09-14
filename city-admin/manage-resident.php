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


<!--add barangay resident modal-->
<?php include('delete-resident.php'); ?>
<!--add barangay resident modal end-->

<div class="body flex-grow-1 px-3">
<div class="container-fluid">

<!--Charts-->
<div class="row">
<div class="col-md-12">
<div class="card mb-4">
<div class="card-header">Charts</div>
<div class="card-body">

  <div class="row">

    <!--health diseases chart-->
    <div class="col-sm-6">
      <hr class="mt-0">
      <div class="card-header">For chart health disease</div>
    </div>
      <!--health diseases chart end-->


    <!--prevalence chart-->
    <div class="col-sm-6">
      <hr class="mt-0">
      <div class="card-header">For chart health disease</div>
    </div>
    <!--prevalence chart end-->

  </div>

</div>
</div>
</div>
</div>
<!--Charts end-->


<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card mb-4">

  <div class="card-header p-3" style="background-color:#3b7ddd;">
  
  <div class="row">
      <div class="col-sm-6">
        <h4 style="color:aliceblue;">Oroquieta City Residents List</h4>
      </div>
      <div class="col-sm-6 text-end">
      <a class="addbtn add-brgy px-4 fw-bolder" data-coreui-toggle="modal" href="#add-barangay-resident" role="button">Resident +</a>
      </div>
  </div> 
  </div>

  <div class="card-body"  id="wrapper" >
            
  <hr class="mt-0">
    <!-- /.row-->
      <div  class="table-responsive-xxl">
      <table class="table  mb-0 d-none w-100" id="resident_table" > 
        <thead class="table-info fw-semibold">
          <tr class="align-middle">
            <th>Barangay</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Civil Status</th>
            <th>Contact No.</th>
            <th>Email Address</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody> 
        </tbody>
      </table>

      <div class="d-flex align-items-center mb-3 mt-3 bg-warning p-2 rounded-2" style="color: white;" id="first_load_barangay_admin_table">
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span style="padding-left:10px;"></span>
      <strong>Updating Table....</strong>
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
