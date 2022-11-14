<header class="header text-light header-sticky p-0 mb-4 border-0 shadow-sm ">
        <div class="container-fluid border-0 shadow-sm p-2 bg-info ">
          <button class="header-toggler text-light px-md-2 me-md-3" type="button" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()">
          <i class="fa-solid fa-bars"></i>
          </button>
          
          <ul class="header-nav">
            <li class="nav-title"><a style="font-weight: bold;">CITY HEALTH OFFICE</a></li>
          </ul>

          <div class="header-nav ms-auto ">
          </div>
          
          <ul class="header-nav ms-3 rounded-circle bg-light me-1"  id="account_menu">
            <li class="nav-item dropdown  "><a class="nav-link py-1 px-1 shadow-sm" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-lg shadow-sm"><img class="avatar-img" src="../resourcess/assets/img/avatars/profile.png" alt="user@email.com"></div>
              </a>
              <div class="dropdown-menu dropdown-menu-start pt-0 pb-0 border-0 shadow-lg ui-widget-shadow rounded-3 h-auto">
                <div class="dropdown-header text-light py-2 border-0 shadow-sm rounded-top" style="background-color: #0059b3;">
                  <div class="fw-semibold ">Account</div>
                </div>

                <a class="dropdown-item " href="../logout.php">
                <span class="fa-solid fa-right-from-bracket"></span> Logout
                </a>

                <a class="dropdown-item rounded-bottom" href="#">
                <span class="fa-solid fa-pen-to-square"></span> Update Password
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="container-fluid pt-2 pb-2" id="account_view">

