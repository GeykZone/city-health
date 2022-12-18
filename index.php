<?php include('login.php') ?>
<?php include('includes/head.php') ?>
<body>
    <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card-group d-block d-md-flex row">
              <div class="card col-md-7 p-4 mb-0">
                <div class="card-body">

                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>

                  <form action="" id="login_form" name="login_form" method="post">
                  <div class="input-group mb-3"><span class="input-group-text">
                      <svg class="icon">
                        <use xlink:href="resourcess/vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                      </svg></span>
                    <input name="username" maxlength="45" id="username" class="form-control" type="text" placeholder="Username">
                    <div class="invalid-feedback" id="invalid_username">
                      Please don't leave this area empty.
                    </div>
                  </div>
                  <div class="input-group mb-2"><span class="input-group-text">
                      <svg class="icon">
                        <use xlink:href="resourcess/vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                      </svg></span>
                    <input name="password" maxlength="25" id="password" class="form-control" type="password" placeholder="Password">
                    <div class="invalid-feedback" id="invalid_password">
                    </div>
                  </div>

                  <div class="mb-3 ms-2">
                  <label id="old_pass_lbl" class="form-label col-lg-6 col-md-12 opacity-50">
                  <input id="old_pass_checkbox" type="checkbox" onclick="showPassword('password','old_pass_lbl','old_pass_span')" class="me-1">
                  <span id="old_pass_span">Show Password</span>
                  </label>
                  </div>

                  <div class="input-group mb-4 row ">
                  <label class="custom-control rounded-3 py-2 ms-2 bg-light custom-checkbox col-lg-12 col-md-12  opacity-50 " id="rember_check">
                      <input type="checkbox" class="custom-control-input" name="checkbox" id="checkbox" onclick="rembMe('rember_check')">
                      <span class="custom-control-indicator"></span>
                      <span class="custom-control-description">Remember me</span>
                  </label>
                  </div>
                  <div class="row">
                    <div class="col-6">
                     <a class="btn btn-primary px-4" id="login_btn" name="login_btn">Login</a>
                    </div>
                  </div>            
                  </form>
                  

                </div>
              </div>
              <div class="card col-md-5 text-white py-5" style="background: #3b7ddd;">
                <div class="card-body text-center">
                  <div>
                    <div><img  class="img-fluid" style="width: 150px;" src="resourcess/assets/img/avatars/profile.png" alt="user@email.com"></div>
                    <br>
                    <h2>HEALTH PROFILE CLUSTERING SYSTEM</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <?php include('includes/footer.php') ?>