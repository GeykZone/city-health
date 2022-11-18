<div class="modal fade" id="update-hp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 px-3 py-2 shadow-sm">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">Update Health Profile</h6>
        <button id="close_add_hp" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="update_hp_form" name="add_hp_form" method="post">

      <div class="mb-3" id="update_hp_select_brg_list">
        <label for="update_hp_select_barangay" id="wwww" class="form-label">Barangay*</label>
        <select id="update_hp_select_barangay"  name="update_hp_select_barangay" class="form-control barangay-form shadow-sm">
            <option value="">Pick a barangay.</option>
            <?php
            include('functions/display-functions/select_barangays.php');
            ?>

        </select>
        <div class="invalid-feedback">
            Please select a barangay for the resident.
        </div>
        </div>

        <fieldset id="fieldset2" disabled>

        <div class="mb-3" id="update_hp_select_resident_list">
        <label for="update_hp_select_resident" class="form-label">Resident Name*</label>
        <select id="update_hp_select_resident"  name="update_hp_select_resident" class="form-control gender barangay-form shadow-sm">
            <option value="">Select Resident.</option>
        </select>
        <div class="invalid-feedback">
        Please don't leave this area empty.
        </div>
        </div>

        <div class="mb-3" id="update_hp_select_diseases_list">
        <label for="update_hp_select_diseases" class="form-label">Type of Diseases*</label>
        <select id="update_hp_select_diseases"  name="update_hp_select_diseases" class="form-control gender barangay-form shadow-sm">
            <option value="">Select Type.</option>
            <?php
             include('functions/display-functions/select_diseases.php');
            ?>
        </select>
        <div class="invalid-feedback">
        Please don't leave this area empty.
        </div>
        </div>

        <div class="mb-3">
          <label for="update_philhealth" class="form-label">PhilHealth Id</label>
          <input type="number" name="update_philhealth" class="  form-control barangay-form" id="update_philhealth"
          onkeypress='return event.charCode>=48 && event.charCode<=57' ondrop="return false;" onpaste="return false;"
          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="12" placeholder="PhilHealth Id (Optional).">
          <div class="invalid-feedback" id="update_PhilHealth_validator_label">
          PhilHealth identification numbers should be 12 digits long.
          </div>
        </div>

        </fieldset>

      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button style="padding-top: 7px; padding-bottom: 7px;" type="btn" id="update_hp_btn" class="border-0 shadow-sm addbtn add-brgy fw-bolder">SUBMIT</button>
      </div>
    </div>
  </div>
</div>