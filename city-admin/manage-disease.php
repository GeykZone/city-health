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
    <li class="breadcrumb-item active"><span>Manage Diseases Type</span></li>
  </ol>
</nav>
</div>
</header>
<!--header end-->

<div class="body flex-grow-1 px-5 pt-3"> 
<div class="container-fluid">

<!-- add disease -->
<?php include "add-disease.php" ?>
<!-- add disease end -->

<!-- delete disease -->
<?php include "delete-disease.php" ?>
<!-- delete disease end -->

<!-- edit disease -->
<?php include "edit-disease.php" ?>
<!-- edit disease end -->

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4 rounded-5 shadow-sm remove_rounded">

  <div class="hide_first_load d-none card-header p-3 border-0 shadow-sm rounded-5 remove_rounded">
  </div>

  <div class="card-body border-0 shadow-sm rounded-5 remove_rounded"  id="wrapper" >

      <div class="table-responsive-xxl" >
      <div class="d-flex">

      <div class="col-sm-6 text-sm-start hide_first_load d-none">
      <a id="toggle_chart1" >
      <span style="color: #294168bf;" class=" fa-solid align-content-center"></span> Types of Health Diseases
      </a>
      </div>

      <div class="col-sm-6 text-sm-end">
      <a class="mb-3 shadow-sm addbtn d-none add-brgy pt-1 pb-1 px-3 fw-bolder" id="add_disease" data-coreui-toggle="modal" href="#add-disease" role="button" >NEW <span class="fa-solid fa-circle-plus"></span></a>
      </div>

      </div> 

      <table class="table table-striped table-borderless table-condensed d-none w-100" id="diseases_table"> 
        <thead class="table-info fw-semibold shadow-sm">
          <tr class="align-middle">
            <th>Name of Disease</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm"  id="types_of_disease_table"> 

        
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
<script id="manage_user" src="effects/manage-disease.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
