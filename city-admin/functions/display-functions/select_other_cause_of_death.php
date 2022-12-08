<?php
    $sql = "SELECT DISTINCT other_cause_of_death AS death_cause_by_other FROM `health_profiles` WHERE other_cause_of_death IS NOT NULL";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
    ?>
    <option value="<?php echo $row['death_cause_by_other']; ?>"><?php echo $row['death_cause_by_other']; ?></option>
    <?php 
    }
    ?>
    <?php
    }
    ?>