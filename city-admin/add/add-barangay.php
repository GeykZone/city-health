<div class="modal fade" id="add-barangay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
    <div class="modal-header bg-warning border-0 shadow-sm px-3 py-2">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">New Barangay Information</h6>
        <button id="close_add_barangay" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="add_barangay_form" name="add_barangay_form" method="post">
        <div class="mb-3">
          <label for="barangay" class="form-label">Barangay*</label>
          <input type="text" name="barangay" maxlength="45" class="form-control barangay-form" id="barangay" placeholder="Barangay">
          <div class="invalid-feedback">
            Invalid input.
          </div>
        </div>
        <div class="mb-3">
          <label for="Latitude" class="form-label">Latitude*</label>
          <input type="number" name="Latitude" class="form-control barangay-form" id="Latitude" placeholder="Latitude">
          <div class="invalid-feedback">
          Invalid input.
          </div>
        </div>
        <div class="mb-3">
          <label for="Longitude" class="form-label">Longitude*</label>
          <input type="number" name="Longitude" class="form-control barangay-form" id="Longitude" placeholder="Longitude">
          <div class="invalid-feedback">
          Invalid input.
          </div>
        </div>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button style="padding-top: 7px; padding-bottom: 7px;" type="btn" id="add_barangay_btn" class="addbtn add-brgy fw-bolder border-0 shadow-sm">SUBMIT</button>
      </div>
    </div>
  </div>
</div>