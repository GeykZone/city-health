<div class="modal fade" id="edit-disease" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 shadow-sm px-3 py-2">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">Update Disease Name</h6>
        <button id="close_edit_disease" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="uppdate_disease_form" name="edit_disease_form" method="post">
        <div class="mb-3">
          <label for="edited_disease" class="form-label">Disease*</label>
          <input type="text" name="edited_disease" class="shadow-sm form-control barangay-form" id="edited_disease" placeholder="Name of Disease">
          <div class="invalid-feedback">
          Invalid input.
          </div>
        </div>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button style="padding-top: 7px; padding-bottom: 7px;" type="btn" type="btn" id="edit_disease_btn" class="addbtn add-brgy fw-bolder border-0 shadow-sm">SUBMIT</button>
      </div>
    </div>
  </div>
</div>