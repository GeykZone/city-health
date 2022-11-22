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
        if($disease_type != "default" && $case_status != "default" && $gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `gender` = '$gender' ORDER BY `barangay_name` ASC";
        }
        else if($disease_type != "default" && $case_status != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' ORDER BY `barangay_name` ASC";
        }
        else if($disease_type != "default" && $gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `gender` = '$gender' ORDER BY `barangay_name` ASC";
        }
        else if($case_status != "default" && $gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `gender` = '$gender' ORDER BY `barangay_name` ASC";
        }
        else if($disease_type != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' ORDER BY `barangay_name` ASC";
        }
        else if($case_status != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' ORDER BY `barangay_name` ASC";
        }
        else if($gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `gender` = '$gender' ORDER BY `barangay_name` ASC";
        }
        else
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `barangay_name` ASC";
        }
    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' ORDER BY `barangay_name` ASC";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $brg_name = $row['barangay_name'];

        if($query_click == "clicked")
        {
            if($disease_type != "default" && $case_status != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `gender` = '$gender' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else if($disease_type != "default" && $case_status != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else if($disease_type != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `gender` = '$gender' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else if($case_status != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `gender` = '$gender' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else if($disease_type != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else if($case_status != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else if($gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `gender` = '$gender' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
            else
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
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
            

            $brgy = str_replace(' ', '_', $row['barangay_name']);
            $total_hp_number[] = $brgy." ".$total_hp;

    }
}
else
{
    $brgy = str_replace(' ', '_', 'No Records Found');
    $total_hp_number[] = $brgy." ".'0';
}
   
if(isset($_GET['total_hp']))
{   
    $total_hp_number = array_unique($total_hp_number);
    print json_encode($total_hp_number);
}

    



?>
