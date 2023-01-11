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
$table = 'users'; 

 
// Table's primary key 
$primaryKey = 'id'; 
 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 

$columns = array( 
    array( 'db' => 'barangay_name',    'dt' => 0, 'field' => 'barangay_name'),
    array( 'db' => 'username', 'dt' => 1, 'field' => 'username' ), 
    array( 'db' => "(CASE WHEN activated = 1 THEN 'Admin Activated' WHEN activated = 0 THEN 'Admin Deactivated' END)",  'dt' => 2, 'field' => "(CASE WHEN activated = 1 THEN 'Admin Activated' WHEN activated = 0 THEN 'Admin Deactivated' END)" ), 
); 
 
// Include SQL query processing class 
require '../ssp.class.php'; 

$joinQuery = ", activated, (CASE WHEN activated = 1 THEN 'Admin Activated' WHEN activated = 0 THEN 'Admin Deactivated' END) FROM `users` ";
$where = "`role`=2";


 
// Output data as json format 
echo json_encode( 
    SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where ) 
);

?>






