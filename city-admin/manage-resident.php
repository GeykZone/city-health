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
      <a class="addbtn add-brgy px-4 fw-bolder d-none" data-coreui-toggle="modal" href="#add-barangay-resident" id="add_resident" role="button">Resident +</a>
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

      <div id="myProgress" class=" rounded-4">
      <div id="myBar" class=" rounded-4"></div>
      </div>

          
      </div>

      <div  class="table-responsive-xxl d-none" id="residents_chart_row">
    <br>
    <br> 
    <hr class="mt-0">
        <table class="table mb-0">
        <thead class="table-info fw-semibold">
          <tr class="align-middle">
            <th style="width: 10% ;">Barangay</th>
            <th class=" text-center" style="width: 100% ;">Total Residents</th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
              <?php
                $old_sql = "SELECT * FROM `residents` LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id`";
                $old_rowcount = 0;
                if ($old_result = mysqli_query($conn,$old_sql))
                {
                  $old_rowcount=mysqli_num_rows($old_result);
                }


              $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays`";
              $brg_name = "";
              $result = $conn->query($sql);
              if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                ?>
                <tr class="align-middle">
                      <td>
                        <div><?php echo $row['barangay_name']; ?></div>
                      </td>
                      <td>
                        <div class="progress">
                          <div class=" progress-bar" role="progressbar" style="width:<?php 
                            $brg_name = $row['barangay_name'];
                            $rowcount = 0;
                            $total_residents = $rowcount;
                            $new_sql = "SELECT * FROM `residents` LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id` WHERE `barangay_name` = '$brg_name'";
                            $new_result = $conn->query($new_sql);
                            if($new_result->num_rows > 0)
                            {
                              $new_result = mysqli_query($conn,$new_sql);
                              $rowcount=mysqli_num_rows($new_result);
                              $total_residents =  $rowcount;
                              $rowcount = ($rowcount*100);
                              $rowcount = $rowcount /  $old_rowcount;
                              echo  $rowcount;
                            }
                            else
                            {
                              echo  $rowcount;
                            }

                          ?>%;  background-color:#3b7ddd;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" ></div>
                        </div>
                      </td>
                      <td>
                      <div class="clearfix">
                          <div class="float-start">
                            <div class="fw-semibold"><?php   echo $total_residents ?></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                <?php 
              }
              ?>
              <?php
                }
              ?>
        </tbody>
      </table>
    
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
