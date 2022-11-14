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
<li class="breadcrumb-item active"><span>Current Number of Residents in Barangays</span></li>
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


<div class="body flex-grow-1 px-5 pt-3  pb-3"> 
<div class="container-fluid">


<!--chart-->
<div class="row chart_container  mb-3">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

  <div class="hide_first_load bg-info card-header p-3 border-0 shadow-sm remove_rounded">
  </div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >

    <!-- /.row-->
      <div  class="table-responsive-xxl">

      <div class=" mb-3 c1 row " id="c1"><div class="toggle_chart1 col-md-12"><a id="toggle_chart1"><span style="color: #294168bf; margin-right: 10px;" class=" fa-solid align-content-center"></span> Current Number of Residents in Barangays</a></div></div>

      <div  class="mb-3 table-responsive-xxl " id="residents_chart_row">
      <canvas class=""  id="myChart" style="width:100%; height:500px ;"></canvas> 
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
<div class="card border-0 mb-4 shadow-sm remove_rounded">

<div class="hide_first_load bg-info card-header p-3 border-0 shadow-sm remove_rounded">
  </div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >

      <div  class="table-responsive-xxl">
      <div class=" d-flex">

      <div class="col-sm-6 text-sm-start hide_first_load ">
      <a id="toggle_chart1" >
      <span style="color: #294168bf; margin-right: 10px;" class=" fa-solid align-content-center"></span> Barangay Residents of Oroquieta
      </a>
      </div>

      <div class="col-sm-6 text-sm-end">
      <a class="mb-3 shadow-sm addbtn add-brgy pt-1 pb-1 px-3 fw-bolder"  data-coreui-toggle="modal" href="#add-barangay-resident" id="add_resident" role="button">NEW <span class="fa-solid fa-circle-plus"></a>
      </div>

      </div> 

      <table class="table table-striped table-borderless  table-condensed w-100" id="resident_table" > 
      <thead class="table-info fw-semibold shadow-sm">
      <tr class="align-middle">
            <th >Barangay</th>
            <th >First Name</th>
            <th >Middle Name</th>
            <th >Last Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th >Date of Birth</th>
            <th>Status</th>
            <th>Contact No.</th>
            <th>Email Address</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody class="align-middle shadow-sm" > 
        </tbody>
      </table>

      <div id="myProgress" class="rounded-4 d-none border-1 shadow-sm">
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
