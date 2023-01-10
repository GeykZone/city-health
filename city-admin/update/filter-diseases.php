<div class="modal fade" id="filter-diseases" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 py-2 px-3 shadow-sm">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="filter_id" style="color: #ffff; font-weight:500;">Filter Statistic</h6>
        <button id="close_filter" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="disease_hp_filter_form" name="disease_hp_filter_form" method="post">

      <fieldset>

      <div class="mb-3">
        <label for="age_min" class="form-label">Min Age:</label>
        <input  type="number" id="age_min" class="form-control   barangay-form text-sm-start shadow-sm"  placeholder="Min Age">
        <div class="invalid-feedback">
        Invalid min age.
        </div>
        </div>

        <div class="mb-3">
        <label for="age_max" class="form-label">Max Age:</label>
        <input  type="number" id="age_max" class="form-control   barangay-form text-sm-start shadow-sm"  placeholder="Max Age">
        <div class="invalid-feedback">
        Invalid max age.
        </div>
        </div>

      <div class="mb-3">
        <label for="disease_range_from" class="form-label">Min Date:</label>
        <input  type="date" id="disease_range_from" class="form-control   barangay-form text-sm-start shadow-sm"  placeholder="From">
        <div class="invalid-feedback">
        Invalid min date.
        </div>
        </div>

        <div class="mb-3">
        <label for="disease_range_to" class="form-label">Max Date:</label>
        <input  type="date" id="disease_range_to" class="form-control   barangay-form text-sm-start shadow-sm"  placeholder="To">
        <div class="invalid-feedback">
        Invalid max date.
        </div>
        </div>

        <div class="mb-3" >
        <label for="disease_select_gender" class="form-label">Gender:</label>
        <select id="disease_select_gender"  name="add_hp_select_diseases" class="form-control gender barangay-form shadow-sm"> 
        <option value="">All Gender</option>
        <option value="Male">Male</option>
    <option value="Female">Female</option>
        </select>
        <div class="invalid-feedback">
        Invalid selection.
        </div>
        </div>

        <div class="mb-3">
          <label for="disease_selecte_barangay" class="form-label">Select Barangay:</label>
          <select id="disease_selecte_barangay"  name="disease_selecte_barangay" class="form-control gender barangay-form shadow-sm">
            <option value="">All Barangays</option>
            <?php
            include('functions/display-functions/select_barangays.php');
            ?>
        </select>
          <div class="invalid-feedback" id="PhilHealth_validator_label">
        Invalid selection.
          </div>
        </div>

      </fieldset>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
      <button  class="add-brgy btn rounded-2 border-0 shadow-sm"  id="disease_date_range_btn" type="button" style=" font-weight:bold; padding-top: 7px; padding-bottom: 7px; padding-right:20px; padding-left:20px;">FILTER</button>
      </div>
    </div>
  </div>
</div>