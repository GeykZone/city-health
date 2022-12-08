<div class="modal fade" id="filter_table" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" >
    <div class="modal-content">
      <div class="modal-header bg-warning border-0 py-2 px-3 shadow-sm">
      <span class=" fa-solid me-2" style="width: 15px; height:15px; color:#ffff;"></span>
        <h6 class="modal-title" id="filter_id" style="color: #ffff; font-weight:500;">Filter Table</h6>
        <button id="close_filter" type="button" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body border-0 shadow-sm">

        
      <form action="" id="disease_hp_filter_form" name="disease_hp_filter_form" method="post">

      <fieldset>

        <div class="mb-3" id="s_t">
        <label for="filter_status" class="form-label">Status:</label>
        <select id="filter_status"  name="filter_status" class="form-control gender barangay-form shadow-sm">
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive (All)">Inactive (All)</option>
            <option value="Inactive (Recovered)">Inactive (Recovered)</option>
            <option value="Inactive (Dead)">Inactive (Dead)</option>
        </select>
        <div class="invalid-feedback">
        Invalid selection.
        </div>
        </div>

        <div class="mb-3 d-none" id="co_d">
        <label for="select_cause_of_death" class="form-label">Cause of Death:</label>
        <select id="select_cause_of_death"  name="select_cause_of_death" class="form-control gender barangay-form shadow-sm">
            <option value="">All Deaths</option>
            <?php
              include('functions/display-functions/select_diseases.php');
            ?>
            <option value="Other">Other</option>
        </select>
        <div class="invalid-feedback">
        Invalid selection.
        </div>
        </div>

        <div class="mb-3 d-none" id="o_co_d">
        <label for="select_other_causes" class="form-label">Other Cause of Death:</label>
        <select id="select_other_causes"  name="select_other_causes" class="form-control gender barangay-form shadow-sm">
            <option value="">All Other Deaths (Not related to diseases)</option>
            <?php
              include('functions/display-functions/select_other_cause_of_death.php');
            ?>
        </select>
        <div class="invalid-feedback">
        Invalid selection.
        </div>
        </div>

        <div class="mb-3">
        <label for="age_min" class="form-label">Min Age:</label>
        <input  type="number" id="age_min" class="form-control birthdate  barangay-form text-sm-start shadow-sm"  placeholder="Min Age">
        <div class="invalid-feedback">
        Invalid min age.
        </div>
        </div>

        <div class="mb-3">
        <label for="age_max" class="form-label">Max Age:</label>
        <input  type="number" id="age_max" class="form-control birthdate  barangay-form text-sm-start shadow-sm"  placeholder="Max Age">
        <div class="invalid-feedback">
        Invalid max age.
        </div>
        </div>

      <div class="mb-3">
        <label for="range_from" class="form-label">Min Date:</label>
        <input  type="date" id="range_from" class="form-control birthdate  barangay-form text-sm-start shadow-sm"  placeholder="From">
        <div class="invalid-feedback">
        Invalid min date.
        </div>
        </div>

        <div class="mb-3">
        <label for="range_to" class="form-label">Max Date:</label>
        <input  type="date" id="range_to" class="form-control birthdate  barangay-form text-sm-start shadow-sm"  placeholder="To">
        <div class="invalid-feedback">
        Invalid max date.
        </div>
        </div>

      </fieldset>
      </form>

      </div>
      <div class="modal-footer border-0 shadow-sm">
      <button  class="add-brgy btn rounded-2 border-0 shadow-sm"
        id="date_range_btn" type="button" 
        style=" font-weight:bold; padding-top: 7px; padding-bottom: 7px; padding-right:20px; padding-left:20px;">FILTER</button>
    </div>
    </div>
  </div>
</div>