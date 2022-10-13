<div class="modal fade" id="update-barangay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
<div class="modal-content">
<div class="modal-header bg-warning shadow-sm border-0">
<h5 class="modal-title" id="exampleModalLabel" style="color: #ffff;">Update Barangay</h5>
<svg class="c-icon" style="width: 20px; height:20px; margin-left: 10px; color:#ffff;">
<use xlink:href="../resourcess/vendors/@coreui/icons/svg/free.svg#cil-map"></use>
</svg>
<button type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body border-0 shadow-sm">


<form action="" id="update_barangay_form" name="update_barangay_form" method="post">
<div class="mb-3">
  <label for="update_barangay" class="form-label">Barangay*</label>
  <input type="text" name="update_barangay" class="form-control barangay-form" id="update_barangay" placeholder="Barangay">
  <div class="invalid-feedback">
    Please don't leave this area empty.
  </div>
</div>
<div class="mb-3">
  <label for="update_Latitude" class="form-label">Latitude*</label>
  <input type="number" name="update_Latitude" class="form-control barangay-form" id="update_Latitude" placeholder="Latitude">
  <div class="invalid-feedback">
    Please don't leave this area empty.
  </div>
</div>
<div class="mb-3">
  <label for="update_Longitude" class="form-label">Longitude*</label>
  <input type="number" name="update_Longitude" class="form-control barangay-form" id="update_Longitude" placeholder="Longiude">
  <div class="invalid-feedback">
    Please don't leave this area empty.
  </div>
</div>
</form>

</div>
<div class="modal-footer border-0 shadow-sm">
<button id="update_barangay_btn" class="addbtn add-brgy border-0 shadow-sm">Update</button>
</div>
</div>
</div>
</div>