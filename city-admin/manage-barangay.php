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
      <li class="breadcrumb-item active"><span>Manage Barangays</span></li>
    </ol>
  </nav>
</div>
</header>
<!--header end-->

<div class="body flex-grow-1 px-3">
<div class=" container-fluid">

<!--add barangay modal-->
<?php include('add-barangay.php') ?>
<!--add barangay modal end-->

<!--update barangay modal-->
<?php include('update-barangay.php') ?>
<!--update barangay modal end-->  

<!--delete barangay modal-->
<?php include('delete-barangay.php') ?>
<!--delete barangay modal end-->  


  <!--Admins-->
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <div class="card mb-4">
        <div class="card-header p-3" style="background-color:#3b7ddd;">

        <div class="row">
            <div class="col-sm-6">
              <h4 style="color:aliceblue;">Oroquieta City Barangays</h4>
            </div>
            <div class="col-sm-6 text-end">
            <a class="addbtn add-brgy px-4 fw-bolder" data-coreui-toggle="modal" href="#add-barangay" role="button">Barangay +</a>
            </div>
        </div>

        </div>
        <div class="card-body" id="wrapper">
        
        <hr class="mt-0">
          <!-- /.row-->


          <div class="table-responsive-xxl">
            <!--table-->
            <table class="table mb-0 d-none" id="barangay_table"> 
              <thead class=" table-info fw-semibold">
                <tr class="align-middle">
                  <th>Barangay</th>
                  <th>Latitude </th>
                  <th>longitude</th>
                  <th>Settings</th>
                </tr>
              </thead >

              <tbody id="show_barangay_list_table">

                
              </tbody>
            </table>
            <!--tabale end-->
            
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
<script src="effects/manage-barangay.js"></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
