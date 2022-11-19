<div class="modal fade" id="add-disease" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
    <div class="modal-content">
    <div class="modal-header bg-warning border-0 shadow-sm px-3 py-3">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="exampleModalLabel" style="color: #ffff; font-weight:500;">New Disease Name</h6>
        <button id="close_add_disease" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="add_disease_form" name="add_disease_form" method="post">
        <div class="mb-3">
          <label for="disease" class="form-label">Disease*</label>
          <input type="text" name="disease" class="shadow-sm form-control barangay-form" id="disease" placeholder="Name of Disease">
          <div class="invalid-feedback">
            Please don't leave this area empty.
          </div>
        </div>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
        <button style="padding-top: 7px; padding-bottom: 7px;" type="btn" id="add_disease_btn" class="border-0 shadow-sm addbtn add-brgy fw-bolder">SUBMIT</button>
      </div>
    </div>
  </div>
</div>