<?php   include('../../../route.php'); ?>

<?php 
// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username , 
    'pass' => $password, 
    'db'   => $database
); 
 
// DB table to use 
$table = 'health_profiles'; 

 
// Table's primary key 
$primaryKey = 'hp_id'; 
$query_btn = $_GET['query_btn'];


 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 

$columns = array(
    array( 'db' => 'disease_name',    'dt' => 0, 'field' => 'disease_name'),
    array( 'db' => 'first_name',    'dt' => 1, 'field' => 'first_name'),
    array( 'db' => 'middle_name',    'dt' => 2, 'field' => 'middle_name'),
    array( 'db' => 'last_name',    'dt' => 3, 'field' => 'last_name'),
    array( 'db' => 'barangay_name',    'dt' => 4, 'field' => 'barangay_name'),
    array( 'db' => 'gender',    'dt' => 5, 'field' => 'gender'),
    array( 'db' => 'age',    'dt' => 6, 'field' => 'age'),
    array( 'db' => 'contact',    'dt' => 7, 'field' => 'contact'),
    array( 'db' => "DATE_FORMAT(date,'%M %d, %Y')",    'dt' => 8, 'field' => "DATE_FORMAT(date,'%M %d, %Y')"),
    array( 'db' => 'phil_health_number',    'dt' => 9, 'field' => 'phil_health_number'),
    array( 'db' => 'hp_id',    'dt' => 10, 'field' => 'hp_id'),
); 
 
// Include SQL query processing class 
require '../ssp.class.php'; 

if($query_btn === "clicked")
{
    $gender = $_GET['gender'];
    $min_age = $_GET['min_age'];
    $max_age = $_GET['max_age'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
 

    $joinQuery = "FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    $where = "";

    $conditions = array();

    if($min_age != "NaN")
    {
        $conditions[] = "`age` >= '$min_age'";
    }

    if($max_age != "NaN")
    {
        $conditions[] = "`age` <= '$max_age'";
    }

    if($gender != "")
    {
        $conditions[] = "`gender` = '$gender'";
    }

    if($date_range_from != "")
    {
        $conditions[] = "`date` >= '$date_range_from'";
    }

    if($date_range_to != "")
    {
        $conditions[] = "`date` <= '$date_range_to'";
    }


    if (count($conditions) > 0) {
        $where = implode(' AND ', $conditions);
    }
  
}
else
{
    $joinQuery = "FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    $where = "";
}
 
// Output data as json format 


  echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery,$where ) );

 // print json_encode($where);

?>
