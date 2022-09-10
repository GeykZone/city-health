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
<li class="breadcrumb-item active"><span>Manage Users</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->

<!--add barangay admin modal-->
<?php include('add-barangay-admin.php'); ?>
<!--add barangay admin modal end-->

<!--reset barangay admin modal-->
<?php include('reset-barangay-admin.php'); ?>
<!--reset barangay admin modal end-->

<!--delete barangay admin modal-->
<?php include('delete-barangay-admin.php'); ?>
<!--delete barangay admin modal end-->

<!--delete barangay admin modal-->
<?php include('activate-barangay-admin.php'); ?>
<!--delete barangay admin modal end-->

<div class="body flex-grow-1 px-3">
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card mb-4">

  <div class="card-header p-3" style="background-color:#3b7ddd;">
  
  <div class="row">
      <div class="col-sm-6">
        <h4 style="color:aliceblue;">Barangay Admin List</h4>
      </div>
      <div class="col-sm-6 text-end">
      <a class="addbtn add-brgy px-4 fw-bolder" data-coreui-toggle="modal" href="#add-barangay-admin" role="button">Admin +</a>
      </div>
  </div> 
  </div>

  <div class="card-body"  id="wrapper" >
            
  <hr class="mt-0">
    <!-- /.row-->
      <div class="table-responsive-xxl" >

    

      <table class="table  mb-0 d-none " id="admin_table" > 
        <thead class="table-info fw-semibold">
          <tr class="align-middle">
            <th>Barangay</th>
            <th>Username</th>
            <th>Status</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody id="barangay_admin_table"> 

        

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
<script id="manage_user" src="effects/manage-user.js" ></script>
<!--scripts end-->


<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->

