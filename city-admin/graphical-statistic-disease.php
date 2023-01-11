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
<li class="breadcrumb-item active"><span>Manage Health Profiles</span></li>
<li class="breadcrumb-item active"><span>Disease Statistic Graph</span></li>
</ol>
</nav>
</div>
</header>
<!--header end-->


<!-- filter map hp -->
<?php include "update/filter-diseases.php" ?>
<!-- filter map end -->

<!-- more details hp -->
<?php include "display/detail-disease.php" ?>
<!-- more details  end -->


<div class="body flex-grow-1 px-lg-5 px-sm-0 pt-3  pb-3"> 
<div class="container-fluid">


<!--chart-->
<div class="row chart_container mb-3" style="display: block;">
<div class="col-md-12">
<div class="card border-0 mb-4 shadow-sm remove_rounded">

<div class="bg-info card-header border-0 shadow-sm text-bg-primary" id="menu_tittle" style=" font-weight:500;">
<button type="button" id="current_year" style="margin-right: 10px;" class="border-0 bg-transparent"><span class="fa-solid text-light"></span></button>Disease Statistic Graph
</div>

  <div class="card-body border-0 shadow-sm remove_rounded"  id="wrapper" >

  <div class="container-fluid mb-1 ">
  <div class="row">

  <div class="col-lg-6 col-md-12 text-md-start align-content-center dropdown-center">
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm  mb-3 me-2 addbtn add-brgy px-3 fw-bolder" id="sort_cases" role="button" >SORT <span class="fa-solid ms-1 fa-sort"></span></a>
  </div>

  <div class="col-lg-6 col-md-12 text-lg-end text-md-start align-content-center dropdown-center">
  <?php include('includes/options.php'); ?>
  <a style="padding-top: 7px; padding-bottom: 7px;" class=" border-0 shadow-sm mb-3 addbtn add-brgy px-3 fw-bolder" id="filter_graph" data-coreui-toggle="modal" href="#filter-diseases" role="button" >FILTER <span class="fa-solid ms-1 fa-filter"></span></a>
  </div>


  </div>
</div>
    <!-- /.row-->
<div  class="container-fluid table-responsive">
<div class="row">

<div  class="mb-3" id="hp_chart_row" style="min-height: 300px;  min-width:1200px;">
<canvas class=""  id="hpChart"   style="width:100%;  max-height:580px ;"></canvas> 
</div>

</div>
</div>

<div class=" container-fluid mt-3">
  <div class="row ">
    <div class="col-12 d-flex text-dark" style=" opacity: 0.65;">
    <span class="fa-regular me-3" style="margin-top: 2px;"></span><h6 class=""><span id="map_cases"></span><span id="map_from"></span><span id="map_to"></span><span id="map_gender"></span><span id="map_barangay"></span><span id="map_min_age"></span><span id="map_max_age"></span><span id="map_totals"></span></h6>
    </div>
  </div>
</div>
    
  </div>
  
</div>
</div>
</div>
<!--chart end-->

</div>
</div>


<!-- footer-->
<?php   include('includes/footer.php'); ?>
<!--Footer end-->

<!--scripts-->
<script id="manage_user" src="effects/graphical-statistics-diseases.js" ></script>
<!--scripts end-->

<!--scripts-->
<?php include('includes/scripts.php'); ?>
<!--scripts end-->
