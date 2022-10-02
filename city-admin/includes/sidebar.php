<div class="sidebar sidebar-dark sidebar-fixed  ui-widget-shadow <?php
if(!isset($_COOKIE["sidebar"])) {
  
} else {
  echo "sidebar-narrow-unfoldable";
}
?>" id="sidebar">
      <div class="sidebar-brand d-none d-md-flex">
          <div class= "sidebar-brand-full " ><img class="avatar-img avatar rounded-0 avatar-xxl" src="../resourcess/assets/img/avatars/city.png" alt="brand"></div>

          <div class="sidebar-brand-narrow" width="46" height="46" ><img class="avatar-img avatar rounded-0 avatar-md" src="../resourcess/assets/img/avatars/profile.png" alt="brand"></div>
      </div>
      <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
        <li class="nav-item"><a class="nav-link " href="index.php" id="nav_dashboard">
            <svg class="nav-icon">
              <use href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-barcode"></use>
            </svg> Dashboard</a></li>
        <li class="nav-title">MENU</li>
        <li class="nav-item"><a class="nav-link" href="manage-barangay.php" id="nav_barangay">
            <svg class="nav-icon">
              <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-map"></use>
            </svg>Manage Barangays</a>
        </li>
        <li class="nav-item"><a class="nav-link" href="manage-resident.php" id="nav_residents">
            <svg class="nav-icon">
              <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-layers"></use>
            </svg> Manage Residents</a>
        </li>
        <li class="nav-item"><a class="nav-link" href="manage-user.php" id="nav_users">
            <svg class="nav-icon">
              <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-people" ></use>
            </svg> Manage Users</a></li>
        <li class="nav-item"><a class="nav-link" href="manage-disease.php" id="nav_diseases">
            <svg class="nav-icon">
              <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-medical-cross"></use>
            </svg>Manage Diseases Type</a>
        </li>
        <li class="nav-item"><a class="nav-link" href="manage-hp.php" id="nav_hp">
            <svg class="nav-icon">
              <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-chart"></use>
            </svg>Manage Health Profiles</a>
        </li>
      </ul>
      <button  class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>

