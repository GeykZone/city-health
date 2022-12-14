<?php   include('../../../route.php'); ?>

<?php

$top_from = $_GET['top_from'];
$top_to = $_GET['top_to'];

if(isset($_GET['total_hp']))
{
    $sql = "SELECT COUNT(*) AS total_hp FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to' 
    ORDER BY total_hp DESC";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_hp[] = $row['total_hp'];

    }
    }
    print json_encode($total_hp);
}

if(isset($_GET['top_3_diseases']))
{
    $sql = "SELECT `hp`.`disease_id`,`d`.`disease_name`, COUNT(*) AS number_of_diseases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to' 
    GROUP BY `hp`.`disease_id` ORDER BY number_of_diseases DESC LIMIT 3";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $disease = str_replace(' ', '_', $row['disease_name']);
    $total_disease_count = $row['number_of_diseases'];

    $total_disease_number[] = $disease." ".$total_disease_count;

    }
    }
    print json_encode($total_disease_number);
}

if(isset($_GET['top_3_barangays']))
{
    $sql = "SELECT `r`.`barangay_id`,barangay_name, COUNT(*) AS number_of_barangays FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to' 
    GROUP BY `r`.`barangay_id` ORDER BY number_of_barangays DESC LIMIT 3";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $barangay = str_replace(' ', '_', $row['barangay_name']);
    $total_barangay_count = $row['number_of_barangays'];

    $total_barangay_number[] = $barangay." ".$total_barangay_count;

    }
    }
    print json_encode($total_barangay_number);
}

if(isset($_GET['newCases']))
{
    $sql = "SELECT COUNT(*) AS new_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_newCases_count = $row['new_cases'];

    $total_newCases_number[] = $total_newCases_count;

    }
    }
    else
    {
        $total_newCases_number[] = "0";
    }
    print json_encode($total_newCases_number);
}

if(isset($_GET['last_week_total_cases']))
{
    $sql = "SELECT COUNT(*) AS total_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_Cases_count = $row['total_cases'];

    $total_Cases_number[] = $total_Cases_count;

    }
    }
    else
    {
        $total_Cases_number[] = "0";
    }
    print json_encode($total_Cases_number);
}

if(isset($_GET['current_week_total_cases']))
{
    $sql = "SELECT COUNT(*) AS total_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_Cases_count = $row['total_cases'];

    $total_Cases_number[] = $total_Cases_count;

    }
    }
    else
    {
        $total_Cases_number[] = "0";
    }
    print json_encode($total_Cases_number);
}


?>