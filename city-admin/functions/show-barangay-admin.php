<?php   include('../../route.php'); ?>


<?php
$sql = "SELECT * FROM `users` WHERE `role` = '2' ORDER BY barangay_name";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

  while($row = $result->fetch_assoc()) { 

    ?>
      <tr class="bg-tr align-middle">
        <td>
          <div><?php echo $row['barangay_name']; ?></div>
        </td>
        <td>
          <div><?php echo $row['username']; ?></div>
        </td>
        <td>
          <div> <?php $admin_status = $row['activated']; 

          if($admin_status == 0)
          {
            ?> <div class="bg-dark text-white rounded-2 d-flex justify-content-center" type="button"  style="width:9rem">Deactivated</div><?php
          }
          else
          {
            ?><div class="bg-success text-white rounded-2 d-flex justify-content-center" type="button" style="width:9rem">Activated</div><?php
          }
          ?></div>
        </td>
        <td>
          <i class="edit_barangay_value btn_icon fas fa-undo-alt" data-coreui-toggle="modal" href="#reset_barangay" id="update_barangay_value" role="button"></i>
          <i class="edit_barangay_value btn_icon fas fa-trash" href="#delete_barangay_admin" data-coreui-toggle="modal" id="delete_barangay_admin_value" role="button"></i>
          <?php
          
          if($admin_status == 0)
          {
            ?> <i class="edit_barangay_value btn_icon fas fa-unlock" href="#delete_barangay" data-coreui-toggle="modal" id="edit_barangay_value" role="button"></i><?php
          }
          else
          {
            ?><i class="edit_barangay_value btn_icon fas fa-lock" href="#delete_barangay" data-coreui-toggle="modal" id="edit_barangay_value" role="button"></i><?php
          }
          ?>
          <i class="admin_table_is_loading spinner-border spinner-border-sm mt-2 d-none" style="color:#3b7ddd;"  id="admin_table_is_loading" role="button" disable></i>
        </td>
      </tr>
    <?php
  }
}
?>

<script>
$(document).ready(function () {
$("#first_load_barangay_admin_table").addClass("d-none");
$("#admin_table").removeClass("d-none");
load_data_tables();
});
</script>






