<div class="modal fade" id="add-disease" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
      <div class="modal-header bg-warning">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #ffff;">Add Barangay</h5>
        <svg class="c-icon" style="width: 20px; height:20px; margin-left: 7px; margin-top:5px; color:#ffff;">
        <use  xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-medical-cross"></use>
        </svg>
        <button id="close_add_disease" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        
      <form action="" id="add_disease_form" name="add_disease_form" method="post">
        <div class="mb-3">
          <label for="disease" class="form-label">Disease*</label>
          <input type="text" name="disease" class="form-control barangay-form" id="disease" placeholder="Name of Disease">
          <div class="invalid-feedback">
            Please don't leave this area empty.
          </div>
        </div>
      </form>

      </div>
      <div class="modal-footer">
        <button type="btn" id="add_disease_btn" class="addbtn add-brgy fw-bolder">Submit</button>
      </div>
    </div>
  </div>
</div>