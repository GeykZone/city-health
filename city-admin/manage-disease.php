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
    <li class="breadcrumb-item active"><span>Manage Diseases Type</span></li>
  </ol>
</nav>
</div>
</header>
<!--header end-->

<div class="body flex-grow-1 px-3">
<div class="container-fluid">

<!-- add disease -->
<?php include "add-disease.php" ?>
<!-- add disease end -->

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card mb-4">

  <div class="card-header p-3" style="background-color:#3b7ddd;">
  
  <div class="row">
      <div class="col-sm-6">
        <h4 style="color:aliceblue;">Types of Health Diseases</h4>
      </div>
      <div class="col-sm-6 text-end">
      <a class="addbtn d-none add-brgy px-4 fw-bolder" id="add_disease" data-coreui-toggle="modal" href="#add-disease" role="button" >Disease +</a>
      </div>
  </div> 
  </div>

  <div class="card-body"  id="wrapper" >
            
  <hr class="mt-0">
    <!-- /.row-->
      <div class="table-responsive-xxl" >
      <table class="table d-none mb-0 w-100" id="diseases_table"> 
        <thead class="table-info fw-semibold">
          <tr class="align-middle">
            <th>Name of Disease</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody id="types_of_disease_table"> 

        
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
<script id="manage_user" src="effects/manage-disease.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
