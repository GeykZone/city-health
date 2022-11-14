<?php   include('../../route.php'); ?>

<?php 

$query_click = $_GET['query_click'];

$disease_type = $_GET['disease_type'];
$date_range_from = $_GET['date_range_from'];
$date_range_to = $_GET['date_range_to'];
$case_status = $_GET['active_inactive'];

$current_year_from = $_GET['current_year_from'];
$current_year_to = $_GET['current_year_to'];

$all_diseases_that_occured = $_GET['all_diseases_that_occured'];

if($query_click == "clicked")
{
    if($disease_type != "default" && $case_status != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured' && `case_status` = '$case_status' && `disease_id` = '$disease_type'";
    }
    else if($disease_type != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured' && `disease_id` = '$disease_type'";
    }
    else if($case_status != "default")
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured' && `case_status` = '$case_status' ";
    }
    else
    {
        $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured'";
    }
}
else
{
    $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `barangay_name` = '$all_diseases_that_occured'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        $get_disease_names[] = " ".$row['disease_name'];
    }

    
    $get_disease_names = array_unique($get_disease_names);

    if(isset($_GET['all_diseases_that_occured']))
    {
        print json_encode($get_disease_names);
    }
}

?>