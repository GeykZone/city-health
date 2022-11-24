<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

    $barangay_name = $_GET['barangay_name'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
    $case_status = $_GET['active_inactive'];
    $gender = $_GET['gender'];

    $current_year_from = $_GET['current_year_from'];
    $current_year_to = $_GET['current_year_to'];

    if($query_click == "clicked")
    {
        if($barangay_name != "default" && $case_status != "default" && $gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `b`.`id` = '$barangay_name' && `gender` = '$gender' ORDER BY `disease_name` ASC";
        }
        else if($barangay_name != "default" && $case_status != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `b`.`id` = '$barangay_name' ORDER BY `disease_name` ASC";
        }
        else if($barangay_name != "default" && $gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `b`.`id` = '$barangay_name' && `gender` = '$gender' ORDER BY `disease_name` ASC";
        }
        else if($case_status != "default" && $gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `gender` = '$gender' ORDER BY `disease_name` ASC";
        }
        else if($barangay_name != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `b`.`id` = '$barangay_name' ORDER BY `disease_name` ASC";
        }
        else if($case_status != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' ORDER BY `disease_name` ASC";
        }
        else if($gender != "default")
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `gender` = '$gender' ORDER BY `disease_name` ASC";
        }
        else
        {
            $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
             WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' ORDER BY `disease_name` ASC";
        }
    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' ORDER BY `disease_name` ASC";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $disease_name = $row['disease_name'];

        if($query_click == "clicked")
        {
            if($barangay_name != "default" && $case_status != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `b`.`id` = '$barangay_name' && `gender` = '$gender' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else if($barangay_name != "default" && $case_status != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `b`.`id` = '$barangay_name' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else if($barangay_name != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `b`.`id` = '$barangay_name' && `gender` = '$gender' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else if($case_status != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `gender` = '$gender'  && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else if($barangay_name != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `b`.`id` = '$barangay_name' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else if($case_status != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else if($gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `gender` = '$gender' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
            else
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                 WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `disease_name` = '$disease_name' ORDER BY `disease_name` ASC";
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
            

            $disease = str_replace(' ', '_', $row['disease_name']);
            $total_hp_number[] = $disease." ".$total_hp;

    }
}
else
{
    $disease = str_replace(' ', '_', 'No Records Found');
    $total_hp_number[] = $disease." ".'N/A';
}
   
if(isset($_GET['total_hp']))
{   
    $total_hp_number = array_unique($total_hp_number);
    print json_encode($total_hp_number);
}

    



?>
