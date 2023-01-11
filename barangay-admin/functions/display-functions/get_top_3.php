<?php   
include('../../../route.php'); 
include ('../barangay-admin-location.php'); 
?>


<?php

$top_from = $_GET['top_from'];
$top_to = $_GET['top_to'];
$barangay_id = $_GET['barangay_id'];

if(isset($_GET['total_hp']))
{
    $sql = "SELECT COUNT(*) AS total_hp FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE `barangay_id` = '$barangay_id' AND date BETWEEN '$top_from' AND '$top_to' 
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
    $sql = "SELECT t1.disease_id, t1.disease_name, t1.barangay_id, t1.c AS 'count within date range', t2.total AS 'total count' 
            FROM ( SELECT `hp`.`disease_id`, `d`.`disease_name`, `r`.barangay_id, COUNT(*) AS c 
            FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
            LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
            LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
            WHERE `barangay_id` = '$barangay_id' AND date BETWEEN '$top_from' AND '$top_to' GROUP BY `hp`.`disease_id` ) t1 
            JOIN ( SELECT `hp`.`disease_id`, COUNT(*) AS total FROM `health_profiles` AS `hp` 
            LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
            WHERE barangay_id = '$barangay_id' GROUP BY `hp`.`disease_id` ) t2 
            ON t1.disease_id = t2.disease_id ORDER BY t1.c DESC, t2.total ASC LIMIT 3";
    
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $disease = str_replace(' ', '_', $row['disease_name']);
    $total_disease_count = $row['count within date range'];
    $alltime_total_disease_count = $row['total count'];

    $total_disease_number[] = $disease." ".$total_disease_count." ".$alltime_total_disease_count;

    }
    }
    print json_encode($total_disease_number);
}

if(isset($_GET['newCases']))
{
    $sql = "SELECT COUNT(*) AS new_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date = '$top_to'  AND `barangay_id` = '$barangay_id'";

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

if(isset($_GET['details_for_newCases']))
{
    $sql = "SELECT d.disease_name, b.barangay_name, `date`,  DATE_FORMAT(date,'%M %d, %Y') AS created_date, COUNT(*) AS new_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date = '$top_to'  AND `barangay_id` = '$barangay_id' GROUP BY `date`, disease_name, barangay_name ORDER BY date DESC";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $new_cases =  $row['new_cases'];
    $total_newCases_count = number_format($new_cases, 0, '', ',');
    $disease_name = $row['disease_name'];
    $barangay_name = $row['barangay_name'];
    $date_created = $row['created_date'];

    if($total_newCases_count > 1)
    {
        $total_newCases_number[] = $total_newCases_count." new health cases caused by ".$disease_name." in barangay ".$barangay_name."";
    }
    else if($total_newCases_count < 1)
    {
        $total_newCases_number[] = "No Records Found";
    }
    else
    {
        $total_newCases_number[] = $total_newCases_count." new health case caused by ".$disease_name." in barangay ".$barangay_name."";
    }

    }
    }
    else
    {
        $total_newCases_number[] = "No Records Found";
    }

    $total_newCases_number = array_unique($total_newCases_number);
    print json_encode($total_newCases_number);
}

if(isset($_GET['totalCases']))
{
    $sql = "SELECT COUNT(*) AS cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to' AND `barangay_id` = '$barangay_id'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_cases_count = $row['cases'];

    $total_cases_number[] = $total_cases_count;

    }
    }
    else
    {
        $total_cases_number[] = "0";
    }
    print json_encode($total_cases_number);
}

if(isset($_GET['details_for_totalCases']))
{
    $sql = "SELECT d.disease_name, b.barangay_name, `date`,  DATE_FORMAT(date,'%M %d, %Y') AS created_date, COUNT(*) AS new_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE date BETWEEN '$top_from' AND '$top_to' AND `barangay_id` = '$barangay_id' GROUP BY `date`, disease_name, barangay_name ORDER BY date DESC";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $new_cases =  $row['new_cases'];
    $total_newCases_count = number_format($new_cases, 0, '', ',');
    $disease_name = $row['disease_name'];
    $barangay_name = $row['barangay_name'];
    $date_created = $row['created_date'];

    if($total_newCases_count > 1)
    {
        $total_newCases_number[] = $total_newCases_count." new health cases caused by ".$disease_name." on ".$date_created." in barangay ".$barangay_name."";
    }
    else if($total_newCases_count < 1)
    {
        $total_newCases_number[] = "No Records Found";
    }
    else
    {
        $total_newCases_number[] = $total_newCases_count." new health case caused by ".$disease_name." on ".$date_created." in barangay ".$barangay_name."";
    }

    }
    }
    else
    {
        $total_newCases_number[] =  "No Records Found";
    }

    $total_newCases_number = array_unique($total_newCases_number);
    print json_encode($total_newCases_number);
}

if(isset($_GET['display_total_residents']))
{
    $sql = "SELECT COUNT(*) AS total_resident FROM `residents`
    WHERE `barangay_id` = '$barangay_id' ";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_resident[] = $row['total_resident'];

    }
    }
    print json_encode($total_resident);
}

if(isset($_GET['top_3_barangays']))
{
    $sql = "SELECT t1.barangay_id, t1.barangay_name, t1.c AS 'count within date range', t2.total AS 'total count'
    FROM (
      SELECT `r`.`barangay_id`, `b`.`barangay_name`, COUNT(*) AS c
      FROM `health_profiles` AS `hp` 
      LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
      LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
      LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
      WHERE date BETWEEN '$top_from' AND '$top_to' 
      GROUP BY `b`.`barangay_name`
    ) t1
    JOIN (
      SELECT `r`.`barangay_id`, `b`.`barangay_name`, COUNT(*) AS total
      FROM `health_profiles` AS `hp`
      LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`)
      LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
      GROUP BY `b`.`barangay_name`
    ) t2
    ON t1.barangay_id = t2.barangay_id
    ORDER BY t1.c DESC, t2.total ASC, t1.barangay_name ASC limit 3;
    ";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $barangay = $row['barangay_name'];

    $total_barangay_number[] = $barangay;

    }
    }
    print json_encode($total_barangay_number);
}




?>