<?php   include('../../../route.php'); 
        include ('../barangay-admin-location.php'); 
?>

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
$query_btn = $_GET['query_btn'];
 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 

$columns = array( 
    array( 'db' => 'first_name', 'dt' => 0, 'field' => 'first_name' ), 
    array( 'db' => 'middle_name',  'dt' => 1, 'field' => 'middle_name' ), 
    array( 'db' => 'last_name',      'dt' => 2, 'field' => 'last_name' ), 
    array( 'db' => 'age',     'dt' => 3, 'field' => 'age' ), 
    array( 'db' => 'gender',    'dt' => 4, 'field' => 'gender' ),
    array( 'db' => "DATE_FORMAT(birthdate,'%M %d, %Y')",      'dt' => 5, 'field' => "DATE_FORMAT(birthdate,'%M %d, %Y')" ), 
    array( 'db' => 'civil',    'dt' => 6, 'field' => 'civil'),
    array( 'db' => 'contact',     'dt' => 7, 'field' => 'contact' ), 
    array( 'db' => 'email',    'dt' => 8, 'field' => 'email' ), 
    array( 'db' => 'resident_id',    'dt' => 9, 'field' => 'resident_id' ),
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
 

    $joinQuery = ", DATE_FORMAT(birthdate,'%M %d, %Y') FROM `{$table}` AS `r` LEFT JOIN `barangays` AS `b` ON (`b`.`id` = `r`.`barangay_id`)";
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
        $conditions[] = "`birthdate` >= '$date_range_from'";
    }

    if($date_range_to != "")
    {
        $conditions[] = "`birthdate` <= '$date_range_to'";
    }


    if (count($conditions) > 0) {
        $where = implode(' AND ', $conditions)." AND `barangay_id` = '$admin_brg_id'";
    }

}
else
{
    $joinQuery = ", DATE_FORMAT(birthdate,'%M %d, %Y') FROM `{$table}` AS `r` LEFT JOIN `barangays` AS `b` ON (`b`.`id` = `r`.`barangay_id`)";
    $where = " `barangay_id` = '$admin_brg_id' ";
}


// Output data as json format 
echo json_encode( 
    SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery,$where  ) 
);

?>
