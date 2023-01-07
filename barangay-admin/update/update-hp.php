<div class="modal fade" id="update-hp" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" id="update_hp_modal_id" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 px-3 py-2 shadow-sm">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">Edit Health Profile</h6>
        <button id="close_add_hp" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="update_hp_form" name="add_hp_form" method="post">

      <div class="mb-3" id="u_p_d">
        <label for="update_hp_Diagnosis" class="form-label">Diagnosis*</label>
        <select id="update_hp_Diagnosis"  name="update_hp_Diagnosis" class="form-control gender barangay-form shadow-sm">
            <option value="">Select Type</option>
        </select>
        <div class="invalid-feedback">
        Invalid selection.
        </div>
      </div>

      <div class="mb-3">
        <label for="update_date_of_diagnosis" class="form-label">Date of Diagnosis*</label>
        <input type="date" class=" form-control barangay-form text-sm-start" id="update_date_of_diagnosis" name="update_date_of_diagnosis" placeholder="Date of Diagnosis">
        <div class="invalid-feedback">
        Invalid date.
        </div>
      </div>

      <div class="mb-3">
          <label for="update_philhealth" class="form-label">PhilHealth Number</label>
          <input type="number" name="update_philhealth" class="  form-control barangay-form" id="update_philhealth"
          onkeypress='return event.charCode>=48 && event.charCode<=57' ondrop="return false;" onpaste="return false;"
          oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="12" placeholder="PhilHealth Id (Optional)">
          <div class="invalid-feedback" id="update_PhilHealth_validator_label">
          PhilHealth identification numbers should be 12 digits long.
          </div>
      </div>


    
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button style="padding-top: 7px; padding-bottom: 7px;" type="btn" id="update_hp_btn_edit" class=" border-0 shadow-sm addbtn add-brgy fw-bolder">SUBMIT</button>
      </div>
    </div>
  </div>
</div>