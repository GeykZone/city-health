<?php   include('../../../route.php'); ?>

<?php
    
    $hp_id_value = $_GET['hp_id_value'];  

    $sql = "SELECT *,  `c_o_d`.`disease_name` AS `death_cause` 
    FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`)
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    LEFT JOIN `diseases` AS `c_o_d` ON (`hp`.`cause_of_death` = `c_o_d`.`id`)  WHERE `hp_id` = '$hp_id_value'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
  
    if($row['death_cause'] === NULL)
    {
        $cause_of_death[] = $row[ "other_cause_of_death"];
    }
    else
    {
        $cause_of_death[] = $row[ "death_cause"];
    }

    $philnum[] = $row['phil_health_number'];
    $recovery[]= $row['recovery'];
    $recover_date[] = $row['date_of_recovery'];
    $death_date[] = $row['date_of_death'];
    $occurrence[] = $row['occurrence_number'];
    }     
    }

    if(isset($_GET['philnum']))
    {
        print json_encode($philnum);
    }
    if(isset($_GET['recover_date']))
    {
        print json_encode($recover_date);
    }
    if(isset($_GET['death_date']))
    {
        print json_encode($death_date);
    }
    if(isset($_GET['occurrence']))
    {
        print json_encode($occurrence);
    }
    if(isset($_GET['cause_of_death']))
    {

        print json_encode($cause_of_death);
    }
    if(isset($_GET['recovery']))
    {
        print json_encode($recovery);
    }
?>