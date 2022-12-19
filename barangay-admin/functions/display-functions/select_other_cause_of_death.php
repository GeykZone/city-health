<?php   include('../../../route.php'); ?>
<?php
    $sql = "SELECT DISTINCT other_cause_of_death AS death_cause_by_other FROM `health_profiles` WHERE other_cause_of_death IS NOT NULL";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $death_cause_by_other = str_replace(' ', '_', $row['death_cause_by_other']);
    $death_cause_by_other_list[] = $death_cause_by_other." ".$death_cause_by_other;
    }

    print json_encode($death_cause_by_other_list);
    }
?>