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
$table = 'residents'; 

 
// Table's primary key 
$primaryKey = 'resident_id'; 
 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 

$columns = array( 
    array( 'db' => 'barangay_name',    'dt' => 0, 'field' => 'barangay_name'),
    array( 'db' => 'first_name', 'dt' => 1, 'field' => 'first_name' ), 
    array( 'db' => 'middle_name',  'dt' => 2, 'field' => 'middle_name' ), 
    array( 'db' => 'last_name',      'dt' => 3, 'field' => 'last_name' ), 
    array( 'db' => 'age',     'dt' => 4, 'field' => 'age' ), 
    array( 'db' => 'gender',    'dt' => 5, 'field' => 'gender' ),
    array( 'db' => 'birthdate',      'dt' => 6, 'field' => 'birthdate' ), 
    array( 'db' => 'civil',    'dt' => 7, 'field' => 'civil'),
    array( 'db' => 'contact',     'dt' => 8, 'field' => 'contact' ), 
    array( 'db' => 'email',    'dt' => 9, 'field' => 'email' ), 
); 
 
// Include SQL query processing class 
require 'ssp.class.php'; 

$joinQuery = "FROM `{$table}` AS `r` LEFT JOIN `barangays` AS `b` ON (`b`.`id` = `r`.`barangay_id`)";


 
// Output data as json format 
echo json_encode( 
    SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery ) 
);

?>
