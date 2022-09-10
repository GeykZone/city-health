<div class="modal fade" id="add-barangay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #ffff;">Add Barangay</h5>
        <svg class="c-icon" style="width: 20px; height:20px; margin-left: 10px; color:#ffff;">
        <use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-map"></use>
        </svg>
        <button id="close_add_barangay" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        
      <form action="" id="add_barangay_form" name="add_barangay_form" method="post">
        <div class="mb-3">
          <label for="barangay" class="form-label">Barangay*</label>
          <input type="text" name="barangay" class="form-control barangay-form" id="barangay">
          <div class="invalid-feedback">
            Please don't leave this area empty.
          </div>
        </div>
        <div class="mb-3">
          <label for="Latitude" class="form-label">Latitude*</label>
          <input type="number" name="Latitude" class="form-control barangay-form" id="Latitude">
          <div class="invalid-feedback">
            Please don't leave this area empty.
          </div>
        </div>
        <div class="mb-3">
          <label for="Longitude" class="form-label">Longitude*</label>
          <input type="number" name="Longitude" class="form-control barangay-form" id="Longitude">
          <div class="invalid-feedback">
            Please don't leave this area empty.
          </div>
        </div>
      </form>

      </div>
      <div class="modal-footer">
        <button type="btn" id="add_barangay_btn" class="addbtn add-brgy fw-bolder">Submit</button>
      </div>
    </div>
  </div>
</div>