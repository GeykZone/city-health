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
    <li class="breadcrumb-item active"><span>Manage Diseases Type</span></li>
    <li class="breadcrumb-item active"><span>Health Diseases</span></li>
  </ol>
</nav>
</div>
</header>
<!--header end-->

<!-- add disease -->
<?php include "add/add-disease.php" ?>
<!-- add disease end -->

<!-- delete disease -->
<?php include "delete/delete-disease.php" ?>
<!-- delete disease end -->

<!-- edit disease -->
<?php include "update/edit-disease.php" ?>
<!-- edit disease end -->

<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3 pb-3"> 
<div class="container-fluid">

<!--Admins-->
<div class="row">
<div class="col-md-12">
<div class="card border-0 mb-4  shadow-sm remove_rounded">

  <div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
  <button type="button" id="refresh_table" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Health Diseases
  </div>

  <div class="card-body border-0 shadow-sm  remove_rounded"  id="wrapper" >

  <div class=" container-fluid">
    <div class=" dataTables_wrapper dt-bootstrap5 row" id="buttons">

    <div class="col-lg-12">
        <a style="padding-top: 7px; padding-bottom: 7px;" class="mb-3 border-0 shadow-sm addbtn add-brgy px-3 fw-bolder"  data-coreui-toggle="modal" id="add_disease" data-coreui-toggle="modal" href="#add-disease" role="button" >NEW <span class="fa-solid ms-1 fa-circle-plus"></a>
    </div>

    </div>
  </div>


    <div class="table-responsive container-fluid" >
    <table class="table table-striped table-borderless table-condensed w-100" id="diseases_table"> 
      <thead class="table-info fw-semibold shadow-sm">
        <tr class="align-middle">
          <th >Name of Disease</th>
          <th class="text-end px-3">Settings</th>
        </tr>
      </thead>

      <tbody class="align-middle shadow-sm"  id="types_of_disease_table"> 

      
      </tbody>

      <tfoot class=" table-secondary fw-semibold shadow-sm" id="th_1">
        <tr class="align-middle" >
          <td id="Name of Disease" style="min-width: 100px;"></td>
          <td id="settings" class=" text-end" style="min-width:100px;"></td>
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
<script id="manage_user" src="effects/manage-disease.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
