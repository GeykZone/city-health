<?php   include('../../../route.php'); ?>

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
    $sql = "SELECT `hp`.`disease_id`,`d`.`disease_name`, COUNT(*) AS number_of_diseases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE `barangay_id` = '$barangay_id' AND date BETWEEN '$top_from' AND '$top_to' 
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

if(isset($_GET['newCases']))
{
    $sql = "SELECT COUNT(*) AS new_cases FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE `barangay_id` = '$barangay_id' AND date BETWEEN '$top_from' AND '$top_to'";

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
    $sql = "SELECT *, DATE_FORMAT(date,'%M %d, %Y') AS created_date FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    WHERE `barangay_id` = '$barangay_id' AND date BETWEEN '$top_from' AND '$top_to' ORDER BY created_date DESC";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $sql_disease_type = $row['disease_id'];
    $sql_date = $row['date'];
    $sql_barangay = $row['barangay_id'];

    $sql2 = "SELECT * FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    WHERE date = '$sql_date' AND `disease_id` = '$sql_disease_type' AND `barangay_id` = ' $sql_barangay'  ORDER BY date DESC";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0)
    {
        $result2 = mysqli_query($conn,$sql2);
        $rowcount=mysqli_num_rows($result2);
        $new_cases =  $rowcount;
    }

    $total_newCases_count =  number_format($new_cases, 0, '', ',');
    $disease_name = $row['disease_name'];
    $barangay_name = $row['barangay_name'];
    $date_created = $row['created_date'];
 

    if($total_newCases_count > 1)
    {
        $total_newCases_number[] = $total_newCases_count." new health cases caused by ".$disease_name." on ".$date_created." in barangay ".$barangay_name."";
    }
    else if($total_newCases_count < 1)
    {
        $total_newCases_number[] = "There were no new health cases reported in Oroquieta City";
    }
    else
    {
        $total_newCases_number[] = $total_newCases_count." new health case caused by ".$disease_name." on ".$date_created." in barangay ".$barangay_name."";
    }

    }
    }
    else
    {
        $total_newCases_number[] = "There were no new health cases reported in Oroquieta City";
    }

    $total_newCases_number = array_unique($total_newCases_number);
    print json_encode($total_newCases_number);
}

if(isset($_GET['newDeaths']))
{
    $sql = "SELECT DISTINCT `hp`.`resident_id` cause_of_death FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE `barangay_id` = '$barangay_id' AND  cause_of_death IS NOT NULL AND date_of_death BETWEEN '$top_from' AND '$top_to' ";

    $result = $conn->query($sql);
    if($result->num_rows > 0)
    {
        $result = mysqli_query($conn,$sql);
        $rowcount=mysqli_num_rows($result);
        $new_deaths =  $rowcount;


        $total_newDeaths_count = $new_deaths;
        $total_newDeaths_number[] = $total_newDeaths_count;
    }
    else
    {
        $total_newDeaths_number[] = "0";
    }
    print json_encode($total_newDeaths_number);
}

if(isset($_GET['details_for_newDeaths']))
{
    $sql = "SELECT *, COUNT(*), hp.resident_id, DATE_FORMAT(date_of_death,'%M %d, %Y') AS created_date 
    FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`cause_of_death` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    WHERE `barangay_id` = '$barangay_id' AND  cause_of_death IS NOT NULL AND date_of_death BETWEEN '$top_from' AND '$top_to' GROUP BY hp.resident_id ORDER BY created_date DESC";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $sql_disease_type = $row['cause_of_death'];
    $sql_date = $row['date_of_death'];
    $sql_barangay = $row['barangay_id'];

    $sql2 = "SELECT DISTINCT `hp`.`resident_id` FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`cause_of_death` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    WHERE  `date_of_death` = '$sql_date' AND `cause_of_death` = '$sql_disease_type' AND `barangay_id` = ' $sql_barangay'  ORDER BY date_of_death DESC";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0)
    {
        $result2 = mysqli_query($conn,$sql2);
        $rowcount=mysqli_num_rows($result2);
        $new_deaths =  $rowcount;
    }
    
    $total_new_deaths_count =  number_format($new_deaths, 0, '', ',');
    $cause_of_death_disease = $row['disease_name'];
    $barangay_name = $row['barangay_name'];
    $date_created = $row['created_date'];

   
    if($total_new_deaths_count > 1)
    {
        $total_new_deaths_number[] = $total_new_deaths_count." new health-related deaths caused by ".$cause_of_death_disease." on ".$date_created." in barangay ".$barangay_name."";
    }
    else if($total_new_deaths_count < 1)
    {
        $total_new_deaths_number[] = "There were no new health-related deaths reported in Oroquieta City";
    }
    else
    {
        $total_new_deaths_number[] = $total_new_deaths_count." new health-related death caused by ".$cause_of_death_disease." on ".$date_created." in barangay ".$barangay_name."";

    }

    }
    }
    else
    {
        $total_new_deaths_number[] = "There were no new health-related deaths reported in Oroquieta City";
    }
    $total_new_deaths_number = array_unique($total_new_deaths_number);
    print json_encode($total_new_deaths_number);
}

if(isset($_GET['newRecoveries']))
{
    $sql = "SELECT COUNT(*) AS newRecoveries FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
    WHERE `barangay_id` = '$barangay_id' AND  `recovery` IS NOT NULL AND date_of_recovery BETWEEN '$top_from' AND '$top_to'";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    $total_newRecoveries_count = $row['newRecoveries'];

    $total_newRecoveries_number[] = $total_newRecoveries_count;

    }
    }
    else
    {
        $total_newRecoveries_number[] = "0";
    }
    print json_encode($total_newRecoveries_number);
}

if(isset($_GET['details_for_recoveries']))
{
    $sql = "SELECT *, DATE_FORMAT(date_of_recovery,'%M %d, %Y') AS created_date 
    FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    WHERE `barangay_id` = '$barangay_id' AND  `recovery` IS NOT NULL AND date_of_recovery BETWEEN '$top_from' AND '$top_to' ORDER BY created_date DESC";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

    
    $sql_disease_type = $row['disease_id'];
    $sql_date = $row['date_of_recovery'];
    $sql_barangay = $row['barangay_id'];

    $sql2 = "SELECT * FROM `health_profiles` AS `hp` 
    LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
    LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
    LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) 
    WHERE `recovery` IS NOT NULL AND date_of_recovery = '$sql_date' AND `disease_id` = '$sql_disease_type' AND `barangay_id` = ' $sql_barangay'  ORDER BY date_of_recovery DESC";
    $result2 = $conn->query($sql2);
    if($result2->num_rows > 0)
    {
        $result2 = mysqli_query($conn,$sql2);
        $rowcount=mysqli_num_rows($result2);
        $new_recoveries =  $rowcount;
    }

    $total_newRecoveries_count =  number_format($new_recoveries, 0, '', ',');
    $disease_name = $row['disease_name'];
    $barangay_name = $row['barangay_name'];
    $date_created = $row['created_date'];

   
    if($total_newRecoveries_count > 1)
    {
        $total_newRecoveries_number[] = $total_newRecoveries_count." new health recoveries from ".$disease_name." on ".$date_created." in barangay ".$barangay_name."";
    }
    else if($total_newRecoveries_count < 1)
    {
        $total_newRecoveries_number[] = "There were no new recoveries from health-related issues in Oroquieta City";
    }
    else
    {
        $total_newRecoveries_number[] = $total_newRecoveries_count." new health recovery from ".$disease_name." on ".$date_created." in barangay ".$barangay_name."";

    }

    }
    }
    else
    {
        $total_newRecoveries_number[] = "There were no new recoveries from health-related issues in Oroquieta City";
    }
    $total_newRecoveries_number = array_unique($total_newRecoveries_number);
    print json_encode($total_newRecoveries_number);
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




?>