<div class="modal fade" id="update_password" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 shadow-sm px-3 py-3">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">New Password</h6>
        <button id="close_update_pass" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

      <style>

      </style>
        
      <form action="" id="edit_disease_form" name="edit_disease_form" method="post" autocomplete="off">

      <div class="mb-2">
          <label for="old_pass" class="form-label">Password*</label>
          <input autocomplete="off" type="password" name="old_pass" class="shadow-sm form-control barangay-form" id="old_pass" placeholder="Password">
          <div class="old invalid-feedback">
          </div>
          <label id="old_pass_lbl" class="form-label mt-2 opacity-50"><input id="old_pass_checkbox" type="checkbox" onclick="showPassword('old_pass','old_pass_lbl','old_pass_span')" class="me-1"><span id="old_pass_span">Show Password</span></label>
        </div>

        <div class="mb-2">
          <label for="new_pass" class="form-label">New Password*</label> 
          <input autocomplete="off" type="password" name="new_pass" class="shadow-sm form-control barangay-form" id="new_pass" placeholder="New Password">
          <div class="new invalid-feedback">
          </div>
          <label id="new_pass_lbl" class="form-label mt-2 opacity-50"><input id="new_pass_checkbox" type="checkbox" onclick="showPassword('new_pass','new_pass_lbl','new_pass_span')" class="me-1"><span id="new_pass_span">Show Password</span></label>
        </div>

        <div class="mb-2">
          <label for="re_new_pass" class="form-label">Re-enter New Password*</label>
          <input autocomplete="off" type="password" name="re_new_pass" class="shadow-sm form-control barangay-form" id="re_new_pass" placeholder="Re-enter New Password">
          <div class="re invalid-feedback">
          </div>
          <label id="re_new_pass_lbl" class="form-label mt-2 opacity-50"><input id="re_new_pass_checkbox" type="checkbox" onclick="showPassword('re_new_pass','re_new_pass_lbl','re_new_pass_span')" class="me-1"><span id="re_new_pass_span">Show Password</span></label>
        </div>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button style="padding-top: 7px; padding-bottom: 7px;" type="btn" type="btn" id="update_pass_btn" class="addbtn add-brgy fw-bolder border-0 shadow-sm">SUBMIT</button>
      </div>
    </div>
  </div>
</div>