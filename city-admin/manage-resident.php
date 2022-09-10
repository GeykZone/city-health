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

<div class="body flex-grow-1 px-3">
<div class="container-lg">

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
<div class="card-header">Barangay Admins</div>
<div class="card-body">
<hr class="mt-0">
  <!-- /.row-->
  <div class="table-responsive">
    <table class="table border mb-0">

      <thead class="table-light fw-semibold">
        <tr class="align-middle">
          <th>Barangay</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr class="align-middle">
          <td>
            <div>Sample Barangay Name</div>
          </td>
          <td>
            <div>Sample Email for Barangay</div>
          </td>
          <td>
            <div class="dropdown">
              <button class="btn btn-transparent p-0" type="button" data-coreui-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg class="icon">
                  <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-options"></use>
                </svg>
              </button>
              <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#">Info</a><a class="dropdown-item" href="#">Edit</a><a class="dropdown-item text-danger" href="#">Delete</a></div>
            </div>
          </td>
        </tr>
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
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
