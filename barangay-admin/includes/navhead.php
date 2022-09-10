<header class="header header-sticky mb-4">
        <div class="container-fluid">
          <button class="header-toggler px-md-0 me-md-3" type="button" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()">
            <svg class="icon icon-lg">
              <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
            </svg>
          </button>
          
          <ul class="header-nav">
            <li class="nav-title"><a style="font-weight: bold;">CITY HEALTH OFFICE</a></li>
          </ul>

          <ul class="header-nav ms-auto">
          </ul>
          
          <ul class="header-nav ms-3">
            <li class="nav-item dropdown"><a class="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-md"><img class="avatar-img" src="../resourcess/assets/img/avatars/profile.png" alt="user@email.com"></div>
              </a>
              <div class="dropdown-menu dropdown-menu-end pt-0">
                <div class="dropdown-header bg-light py-2">
                  <div class="fw-semibold">Account</div>
                </div>

                <a class="dropdown-item"  href="../logout.php">
                  <svg class="icon me-2">
                    <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>
                  </svg>Logout
                </a>

                <div class="dropdown-header bg-light py-2">
                  <div class="fw-semibold">Settings</div>
                </div>

                <a class="dropdown-item" href="#">
                  <svg class="icon me-2">
                    <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                  </svg> Update Password
                </a>
              </div>
            </li>
          </ul>
        </div>
