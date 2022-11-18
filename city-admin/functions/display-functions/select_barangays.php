<?php
  $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays`";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      if($resident_pick == "set")
      {
        ?>
      <option value="<?php echo $row['barangay_name']; ?>"><?php echo $row['barangay_name']; ?></option>
      <?php 
      }
      else
      {
        ?>
      <option value="<?php echo $row['id']; ?>"><?php echo $row['barangay_name']; ?></option>
      <?php 
      }
      
    }
    ?>
    <?php
      }
    ?>