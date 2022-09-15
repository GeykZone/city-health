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
$table = 'barangays'; 

 
// Table's primary key 
$primaryKey = 'id'; 
 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 

$columns = array( 
    array( 'db' => 'barangay_name',    'dt' => 0, 'field' => 'barangay_name'),
    array( 'db' => 'lat', 'dt' => 1, 'field' => 'lat' ), 
    array( 'db' => 'long',  'dt' => 2, 'field' => 'long' ), 
); 
 
// Include SQL query processing class 
require 'ssp.class.php'; 




 
// Output data as json format 
echo json_encode( 
    SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns) 
);

?>