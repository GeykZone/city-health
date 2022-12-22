<div class="modal fade" id="update-barangay-resident" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-scrollable" >
<div class="modal-content">
<div class="modal-header bg-warning border-0 py-3 px-3 shadow-sm">
  <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
  <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">Update Resident Record</h6>
  <button type="button" id="close_update_resident" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body border-0 shadow-sm">

  
<form action="" id="update_barangay_resident_form" name="add_barangay_resident_form" method="post">

  <div class="mb-3" id="update_select_bgy_list">
  <label for="update_select_barangay" class="form-label">Barangay*</label>
  <select id="update_select_barangay"  name="update_select_barangay" class="form-control barangay-form shadow-sm">
      <option value="">Pick a barangay</option>

  <?php
    $resident_pick = "set";
    include('functions/display-functions/select_barangays.php');
    ?>

  </select>
  <div class="invalid-feedback">
    Invalid selection.
  </div>
  </div>

  <fieldset id="fieldset2" disabled>
  <div class="mb-3">
    <label for="update_firstname" class="form-label">First Name*</label>
    <input type="text" name="update_firstname" maxlength="45" class="form-control barangay-form" id="update_firstname" placeholder="First name">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_middlename" class="form-label">Middle Name*</label>
    <input type="text" name="update_middlename" maxlength="45" class="form-control barangay-form" id="update_middlename" placeholder="Middle name">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_lastname" class="form-label">Last Name*</label>
    <input type="text" name="update_lastname" maxlength="45" class="form-control barangay-form" id="update_lastname" placeholder="Last name">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
  <label for="update_birthdate" class="form-label">Date of Birth*</label>
    <input type="date" class="birthdate2 form-control barangay-form text-sm-start" id="update_birthdate" name="update_birthdate" placeholder="Date of Birth">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3" id="update_select_gender">
    <label for="update_gender" class="form-label">Gender*</label>
    <select name="update_gender" id="update_gender" class="form-control gender barangay-form shadow-sm" >
    <option value="">Pick a gender</option>
    <option value="M (Male)">M (Male)</option>
    <option value="F (Female)">F (Female)</option>
    </select>
    <div class="invalid-feedback">
    Invalid selection.
    </div>
  </div>
  <div class="mb-3" id="update_select_status">
    <label for="update_civil_status" class="form-label">Civil Status*</label>
    <select name="update_civil_status" id="update_civil_status" class="form-control gender barangay-form shadow-sm" >
    <option value="">Pick a civil status</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="Widowed">Widowed</option>
    </select>
    <div class="invalid-feedback">
    Invalid selection.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_contact" class="form-label">Contact No.*</label>
    <input type="number" name="update_contact" class="form-control barangay-form" id="update_contact"
     onkeypress='return event.charCode>=48 && event.charCode<=57' ondrop="return false;" onpaste="return false;"
     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" placeholder="Contact No">
    <div class="invalid-feedback" id="update_phno_validator_label">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_email" class="form-label">Email Address</label>
    <input type="email" name="update_email" maxlength="45" class="form-control barangay-form" id="update_email" placeholder="Email Address (Optional)">
    <div class="invalid-feedback">
      Invalid email address, email address must look like this (e.g. freed@email.com).
    </div>
  </div>
  </fieldset>
</form>

</div>
<div class="modal-footer border-0 shadow-sm">
  <button style="padding-top: 7px; padding-bottom: 7px;" type="btn"  id="update_resident_btn" class="addbtn add-brgy fw-bolder border-0 shadow-sm">SUBMIT</button>
</div>
</div>
</div>
</div>


