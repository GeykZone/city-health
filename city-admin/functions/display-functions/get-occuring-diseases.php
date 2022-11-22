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

$all_diseases_that_occured = $_GET['all_diseases_that_occured'];

if($query_click == "clicked")
{
    if($disease_type != "default" && $case_status != "default" && $gender != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured'";
    }
    else if($disease_type != "default" && $case_status != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `barangay_name` = '$all_diseases_that_occured'";
    }
    else if($disease_type != "default" && $gender != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured'";
    }
    else if($case_status != "default" && $gender != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured'";
    }
    else if($disease_type != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `barangay_name` = '$all_diseases_that_occured'";
    }
    else if($case_status != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `barangay_name` = '$all_diseases_that_occured'";
    }
    else if($gender != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured' ";
    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured'";
    }
}
else
{
    $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `barangay_name` = '$all_diseases_that_occured' ";
}

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        $_disease_type =  $row['disease_name'];

        if($query_click == "clicked")
        {
            if($disease_type != "default" && $case_status != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else if($disease_type != "default" && $case_status != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `disease_id` = '$disease_type' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else if($disease_type != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else if($case_status != "default" && $gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else if($disease_type != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_id` = '$disease_type' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else if($case_status != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `case_status` = '$case_status' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else if($gender != "default")
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `gender` = '$gender' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
            else
            {
                $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
                WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `barangay_name` ASC";
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

        if($total_hp == 1)
        {
            $get_disease_names[] = "".$row['disease_name'].": ".$total_hp." Health Case";
        }
        else{

            $get_disease_names[] = "".$row['disease_name'].": ".$total_hp." Health Cases";
        }

       
    }

    
    $get_disease_names = array_unique($get_disease_names);

    if(isset($_GET['all_diseases_that_occured']))
    {
        print json_encode($get_disease_names);
    }
}

?>