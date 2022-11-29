<div class="modal fade" id="add-barangay-resident" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-scrollable" >
<div class="modal-content">
<div class="modal-header bg-warning border-0 px-3 py-2 shadow-sm">
  <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
  <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">New Resident Record</h6>
  <button type="button" id="close_add_resident" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body border-0 shadow-sm">

  
<form action="" id="add_barangay_resident_form" name="add_barangay_resident_form" method="post">
  <div class="mb-3" id="select_brg_list">
  <label for="select_barangay" class="form-label">Barangay*</label>
  <select id="select_barangay"  name="select_barangay" class="form-control barangay-form shadow-sm">
      <option value="">Pick a barangay.</option>
  <?php
  include('functions/display-functions/select_barangays.php');
    ?>

  </select>
  <div class="invalid-feedback">
     Invalid selection.
  </div>
  </div>

  <fieldset id="fieldset1" disabled>
  <div class="mb-3">
    <label for="firstname" class="form-label">First Name*</label>
    <input type="text" name="firstname" class=" form-control barangay-form" id="firstname" placeholder="First name.">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
    <label for="middlename" class="form-label">Middle Name*</label>
    <input type="text" name="middlename" class=" form-control barangay-form" id="middlename" placeholder="Middle name.">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
    <label for="lastname" class="form-label">Last Name*</label>
    <input type="text" name="lastname" class=" form-control barangay-form" id="lastname" placeholder="Last name.">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
  <label for="birthdate" class="form-label">Date of Birth*</label>
    <input type="date" class="  birthdate form-control barangay-form text-sm-start" id="birthdate" name="birthdate" placeholder="Date of Birth">
    <div class="invalid-feedback">
    Invalid input.
    </div>
  </div>
  <div class="mb-3" id="select_gender_list">
    <label for="gender" class="form-label">Gender*</label>
    <select name="gender" id="gender" class="form-control gender barangay-form shadow-sm" >
    <option value="">Pick a gender.</option>
    <option value="M (Male)">M (Male)</option>
    <option value="F (Female)">F (Female)</option>
    </select>
    <div class="invalid-feedback">
    Invalid selection
    </div>
  </div>
  <div class="mb-3" id="select_status_list">
    <label for="civil_status" class="form-label">Civil Status*</label>
    <select name="civil_status" id="civil_status" class="form-control gender barangay-form shadow-sm" >
    <option value="">Pick a civil status.</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="widowed">Widowed</option>
    </select>
    <div class="invalid-feedback">
    Invalid selection.
    </div>
  </div>
  <div class="mb-3">
    <label for="contact" class="form-label">Contact No.*</label>
    <input type="number" name="contact" class="  form-control barangay-form" id="contact"
     onkeypress='return event.charCode>=48 && event.charCode<=57' ondrop="return false;" onpaste="return false;"
     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" placeholder="Contact No.">
    <div class="invalid-feedback" id="phno_validator_label">
    Invalid input.
    </div>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email Address</label>
    <input type="email" name="contact" class=" form-control barangay-form" id="email" placeholder="Email Address (Optional).">
    <div class="invalid-feedback">
      Invalid email address, email address must look like this (e.g. freed@email.com).
    </div>
  </div>
  </fieldset>
</form>

</div>
<div class="modal-footer border-0 shadow-sm">
  <button style="padding-top: 7px; padding-bottom: 7px;" type="btn"  id="add_resident_btn" class="addbtn add-brgy fw-bolder border-0 shadow-sm">SUBMIT</button>
</div>
</div>
</div>
</div>


