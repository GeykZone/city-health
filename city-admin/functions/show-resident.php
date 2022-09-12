<?php   include('../../route.php'); ?>


<?php
$sql = "SELECT * FROM barangays INNER JOIN residents ON barangays.id = residents.barangay_id ORDER BY residents.first_name";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        ?>
          <tr class="bg-tr align-middle">
            <td>
              <div><?php echo $row['first_name']." ".$row['middle_name']." ".$row['last_name']; ?></div>
            </td>
            <td>
              <div><?php echo $row['age']; ?></div>
            </td>
            <td>
              <div><?php echo $row['gender']; ?></div>
            </td>
            <td>
              <div><?php echo $row['birthdate']; ?></div>
            </td>
            <td>
              <div><?php echo $row['civil']; ?></div>
            </td>
            <td>
              <div><?php echo $row['barangay_name']; ?></div>
            </td>
            <td>
              <div><?php echo $row['contact']; ?></div>
            </td>
            <td>
              <div><?php echo $row['email']; ?></div>
            </td>
            <td >
              <i class="edit_barangay_value update btn_icon fas fa-edit" data-coreui-toggle="modal" href="#update-barangay" id="edit_barangay_value" role="button" onclick="modal_open();"></i>
              <i class="edit_barangay_value btn_icon fas fa-trash" href="#delete_barangay" data-coreui-toggle="modal" id="edit_barangay_value" role="button" onclick="modal_open();"></i>
              <i class="barangay_table_is_loading spinner-border spinner-border-sm mt-2 d-none" style="color:#3b7ddd;"  id="barangay_table_is_loading" role="button" disable></i>
            </td>
          </tr>
        <?php
      }
}
?>

<script>
$(document).ready(function () {
$("#first_load_barangay_admin_table").addClass("d-none");
$("#resident_table").removeClass("d-none");
load_data_tables();
});
</script>






