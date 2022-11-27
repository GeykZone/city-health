<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

    $disease_type = $_GET['disease_type'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
    $case_status = $_GET['active_inactive'];
    $gender = $_GET['gender'];

    $current_year_from = $_GET['current_year_from'];
    $current_year_to = $_GET['current_year_to'];

    if($query_click == "clicked")
    {
        $query = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

        $conditions = array();
        
        if($disease_type != "default")
        {
            $conditions[] = "`disease_id`='$disease_type'";
        }
        if($case_status != "default")
        {
            $conditions[] = "`case_status`='$case_status'";
        }
        if($gender != "default")
        {
            $conditions[] = "`gender`='$gender'";
        }


        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions) . " ORDER BY `barangay_name` ASC ";
        }
        else
        {
            $sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `barangay_name` ASC ";
        }
    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' ORDER BY `barangay_name` ASC ";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $brg_name = $row['barangay_name'];

        if($query_click == "clicked")
        {
            $query2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    
            $conditions2 = array();
            
            if($disease_type != "default")
            {
                $conditions2[] = "`disease_id`='$disease_type'";
            }
            if($case_status != "default")
            {
                $conditions2[] = "`case_status`='$case_status'";
            }
            if($gender != "default")
            {
                $conditions2[] = "`gender`='$gender'";
            }
    
    
            $new_sql = $query2;
            if (count($conditions2) > 0) {
              $new_sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions2) . " && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC ";
            }
            else
            {
                $new_sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC ";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `barangay_name` = '$brg_name'  ORDER BY `barangay_name` ASC ";
        }   
        

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