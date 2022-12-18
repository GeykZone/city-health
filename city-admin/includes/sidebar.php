<div class="sidebar sidebar-dark sidebar-fixed  ui-widget-shadow <?php
if(!isset($_COOKIE["sidebar"])) {
  
} else {
  echo "sidebar-narrow-unfoldable";
}
?>" id="sidebar">
      <div class="sidebar-brand d-none d-md-flex">
          <div class= "sidebar-brand-full " ><img class="avatar-img avatar rounded-0 avatar-xxl" src="../resourcess/assets/img/avatars/city.png" alt="brand"></div>

          <div class="sidebar-brand-narrow p-1 border-0 shadow-sm bg-light rounded-circle" width="46" height="46" ><img class="avatar-img avatar rounded-0 avatar-md" src="../resourcess/assets/img/avatars/profile.png" alt="brand"></div>
      </div>
      <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
        <li class="nav-item" ><a class="nav-link " href="index.php" id="nav_dashboard">
          <i id="dashboard_icon" class=" nav-icon fa-solid fa-square-poll-vertical"  style="width: 20px; height:20px;"></i> Dashboard</a>
        </li>
        <li class="nav-title">MENU</li>
        <li class="nav-item" ><a class="nav-link" href="manage-barangay.php" id="nav_barangay">
        <i id="manage_barangay_icon" style="width: 20px; height:20px;" class=" nav-icon fa-solid"></i>Manage Barangays</a>
        </li>
        <li class="nav-item" ><a class="nav-link" href="manage-resident.php" id="nav_residents">
        <i id="manage_residents_icon" style="width: 20px; height:20px;" class=" nav-icon fa-solid"></i>Manage Residents</a>
        </li>
        <li class="nav-item" ><a class="nav-link" href="manage-user.php" id="nav_users">
        <i id="manage_users_icon" style="width: 20px; height:20px;" class=" nav-icon fa-solid"></i>Manage Users</a>
        </li>
        <li class="nav-item" ><a class="nav-link" href="manage-disease.php" id="nav_diseases">
        <i id="manage_diseases_Type_icon" style="width: 20px; height:20px;" class=" nav-icon fa-solid"></i>Manage Disease Types</a>
        </li>
        <li class="nav-item" ><a class="nav-link" href="manage-hp.php" id="nav_hp">
        <i id="manage_hp_icon" style="width: 20px; height:20px;" class=" nav-icon fa-solid"></i>Manage Health Profiles</a>
        </li>
      </ul>
      <button  class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>

    
<!--update password modal-->
<?php include('update/update-password.php') ?>
<!--update password modal end-->  

<!--update password modal-->
<?php include('update/update-username.php') ?>
<!--update password modal end--> 

