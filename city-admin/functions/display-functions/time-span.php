<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

    $barangay_name = $_GET['barangay_name'];
    $disease_type = $_GET['disease_type'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
    $case_status = $_GET['active_inactive'];
    $gender = $_GET['gender'];
    $min_age = $_GET['min_age'];
    $max_age = $_GET['max_age'];

    $current_year_from = $_GET['current_year_from'];
    $current_year_to = $_GET['current_year_to'];

    if($query_click == "clicked")
    {
        $query = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

        $conditions = array();
        
        if($barangay_name != "default")
        {
            $conditions[] = "`b`.`id`='$barangay_name'";
        }
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
        if($min_age != "default")
        {
            $conditions[] = "`age` >= '$min_age'";
        }
        if($max_age != "default")
        {
            $conditions[] = "`age` <= '$max_age'";
        }
        

        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions) . " ORDER BY `date` ASC ";
        }
        else
        {
            $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `date` ASC ";
        }

    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' ORDER BY `date` ASC";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $date = $row['date'];

        if($query_click == "clicked")
        {
            $query2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    
            $conditions2 = array();
            
            if($barangay_name != "default")
            {
                $conditions2[] = "`b`.`id`='$barangay_name'";
            }
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
            if($min_age != "default")
            {
                $conditions2[] = "`age` >= '$min_age'";
            }
            if($max_age != "default")
            {
                $conditions2[] = "`age` <= '$max_age'";
            }
    
            $new_sql = $query2;
            if (count($conditions2) > 0) {
              $new_sql .= " WHERE  `date` = '$date' AND " . implode(' AND ', $conditions2) . " ORDER BY `date` ASC ";
            }
            else
            {
            
                $new_sql .= " WHERE  `date` = '$date'  ORDER BY `date` ASC ";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` = '$date' ORDER BY `date` ASC";
        }
        

            $new_result = $conn->query($new_sql);
            if($new_result->num_rows > 0)
            {
                $new_result = mysqli_query($conn,$new_sql);
                $rowcount=mysqli_num_rows($new_result);
                $total_hp =  $rowcount;
            }
            else
            {
                $total_hp =  0;
            }
            

            $date_name = str_replace(' ', '_', $row['date']);
            $total_hp_number[] = $date_name." ".$total_hp;

    }
}
else
{
    $date_name = "Invalid_date Invalid";
    $total_hp_number[] = $date_name;
}
   
if(isset($_GET['total_hp']))
{   
    $total_hp_number = array_unique($total_hp_number);
    print json_encode($total_hp_number);
}

    



?>
