<div class="modal fade" id="edit-disease" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 shadow-sm">
        <h5 class="modal-title" id="exampleModalLabel" style="color: #ffff;">Edit the Disease's Name</h5>
        <svg class="c-icon" style="width: 20px; height:20px; margin-left: 7px; margin-top:5px; color:#ffff;">
        <use  xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-medical-cross"></use>
        </svg>
        <button id="close_edit_disease" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="edit_disease_form" name="edit_disease_form" method="post">
        <div class="mb-3">
          <label for="edited_disease" class="form-label">Disease*</label>
          <input type="text" name="edited_disease" class="form-control barangay-form" id="edited_disease" placeholder="Name of Disease">
          <div class="invalid-feedback">
            Please don't leave this area empty.
          </div>
        </div>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button type="btn" id="edit_disease_btn" class="addbtn add-brgy fw-bolder border-0 shadow-sm">Submit</button>
      </div>
    </div>
  </div>
</div>