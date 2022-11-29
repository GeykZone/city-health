<div class="modal fade" id="add-barangay-admin" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" >
<div class="modal-content">
<div class="modal-header bg-warning border-0 shadow-sm px-3 py-2">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">New Barangay Admin Account</h6>
  <button type="button" id="close_add_barangay_admin" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body border-0 shadow-sm">

  
<form action="" id="add_barangay_admin_form" name="add_barangay_admin_form" method="post">
  <div class="mb-3">
  <label for="select_barangay" class="form-label">Barangay*</label>
  <select id="select_barangay"  name="select_barangay" class="form-control barangay-form shadow-sm">
  <option value="">Pick a barangay.</option>
  <?php
   include('functions/display-functions/select_barangays.php');
    ?>
  </select>
  <div class="invalid-feedback">
      Please select a barangay to assign an admin.
  </div>
  </div>

  <fieldset disabled >
  <div class="mb-3">
    <label for="default_username" class="form-label">Default username*</label>
    <input type="text" name="default_username" class="shadow-sm form-control barangay-form" id="default_username" value="Please select a barangay.">
  </div>
  <div class="mb-3">
    <label for="default_password" class="form-label">Default Password*</label>
    <input type="text" name="default_password" class="shadow-sm form-control barangay-form" id="default_password" value="Please select a barangay.">
  </div>
  </fieldset>
</form>

</div>
<div class="modal-footer border-0 shadow-sm">
  <button style="padding-top: 7px; padding-bottom: 7px;" type="btn"  id="add_barangay_admin_btn" class="border-0 shadow-sm addbtn add-brgy fw-bolder">SUBMIT</button>
</div>
</div>
</div>
</div>


