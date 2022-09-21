<div class="modal fade" id="update-barangay-resident" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-scrollable" >
<div class="modal-content">
<div class="modal-header bg-warning">
  <h5 class="modal-title" id="exampleModalLabel" style="color: #ffff;">Update Oroquieta City Resident</h5>
  <svg class="c-icon" style="width: 20px; height:20px; margin-left: 10px; color:#ffff;">
  <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-layers"></use>
  </svg>
  <button type="button" id="close_update_resident" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">

  
<form action="" id="update_barangay_resident_form" name="add_barangay_resident_form" method="post">

  <div class="mb-3">
  <label for="update_select_barangay" class="form-label">Barangay*</label>
  <select id="update_select_barangay"  name="update_select_barangay" class="form-control barangay-form">
      <option value="">Pick a barangay...</option>

  <?php
  $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      ?>
      
      <option value="<?php echo $row['barangay_name']; ?>"><?php echo $row['barangay_name']; ?></option>
      <?php 
    }
    ?>
    <?php
      }
    ?>

  </select>
  <div class="invalid-feedback">
      Please select a barangay for the resident.
  </div>
  </div>

  <fieldset id="fieldset2" disabled>
  <div class="mb-3">
    <label for="update_firstname" class="form-label">First Name*</label>
    <input type="text" name="update_firstname" class="form-control barangay-form" id="update_firstname" placeholder="First name.">
    <div class="invalid-feedback">
    Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_middlename" class="form-label">Middle Name*</label>
    <input type="text" name="update_middlename" class="form-control barangay-form" id="update_middlename" placeholder="Middle name.">
    <div class="invalid-feedback">
    Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_lastname" class="form-label">Last Name*</label>
    <input type="text" name="update_lastname" class="form-control barangay-form" id="update_lastname" placeholder="Last name.">
    <div class="invalid-feedback">
    Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
  <label for="update_birthdate" class="form-label">Date of Birth*</label>
    <input type="date" class="birthdate2 form-control barangay-form text-sm-start" id="update_birthdate" name="update_birthdate" placeholder="Date of Birth">
    <div class="invalid-feedback">
      Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_gender" class="form-label">Gender*</label>
    <select name="update_gender" id="update_gender" class="form-control gender barangay-form" >
    <option value="">Pick a gender.</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    </select>
    <div class="invalid-feedback">
      Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_civil_status" class="form-label">Civil Status*</label>
    <select name="update_civil_status" id="update_civil_status" class="form-control gender barangay-form" >
    <option value="">Pick a civil status.</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="Widowed">Widowed</option>
    </select>
    <div class="invalid-feedback">
      Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_contact" class="form-label">Contact No.*</label>
    <input type="number" name="update_contact" class="form-control barangay-form" id="update_contact"
     onkeypress='return event.charCode>=48 && event.charCode<=57' ondrop="return false;" onpaste="return false;"
     oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="10" placeholder="Contact No.">
    <div class="invalid-feedback" id="update_phno_validator_label">
    Please don't leave this area empty.
    </div>
  </div>
  <div class="mb-3">
    <label for="update_email" class="form-label">Email Address</label>
    <input type="email" name="update_email" class="form-control barangay-form" id="update_email" placeholder="Email Address.">
    <div class="invalid-feedback">
      Invalid email address, email address must look like this (e.g. freed@email.com).
    </div>
  </div>
  </fieldset>
</form>

</div>
<div class="modal-footer">
  <button type="btn"  id="update_resident_btn" class="addbtn add-brgy fw-bolder">Submit</button>
</div>
</div>
</div>
</div>


