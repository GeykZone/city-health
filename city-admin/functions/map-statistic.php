<?php   include('../../route.php'); ?>
<?php

    $case_status = $_GET['active_inactive'];

    if($case_status == "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    }
    elseif($case_status == "Active")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE `case_status` = '$case_status'";

    }

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $brg_name = $row['barangay_name'];
        
        $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE `barangay_name` = '$brg_name'";
                $new_result = $conn->query($new_sql);
                if($new_result->num_rows > 0)
                {
                    $new_result = mysqli_query($conn,$new_sql);
                    $rowcount=mysqli_num_rows($new_result);
                    $total_hp =  $rowcount;
                }
                
                
                $brgy = str_replace(' ', '_', $row['barangay_name']);
                $long_lat[] = $total_hp." ".$brgy." ".$row['long']." ".$row['lat'];

    }

    $long_lat = array_unique($long_lat);

    if(isset($_GET['long_lat']))
    {
        print json_encode($long_lat);
    }

    
    }


?>
