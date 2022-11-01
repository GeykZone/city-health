<?php   include('../../route.php'); ?>

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
    array( 'db' => 'phil_health_number',    'dt' => 7, 'field' => 'phil_health_number'),
    array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
    array( 'db' => 'case_status',    'dt' => 9, 'field' => 'case_status'),
    array( 'db' => 'date',    'dt' => 10, 'field' => 'date'),
    array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
); 
 
// Include SQL query processing class 
require 'ssp.class.php'; 

$joinQuery = "FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`id`) LEFT JOIN `diseases` AS `d` 
ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
$where = "`case_status`= 'Active'";


 
// Output data as json format 
echo json_encode( 
    SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery,$where ) 
);

?>
