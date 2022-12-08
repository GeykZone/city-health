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
$date_range_from = $_GET['date_range_from'];
$date_range_to = $_GET['date_range_to'];
 
// Array of database columns which should be read and sent back to DataTables. 
// The `db` parameter represents the column name in the database.  
// The `dt` parameter represents the DataTables column identifier. 

$columns = array(
    array( 'db' => 'occurrence_number',    'dt' => 0, 'field' => 'occurrence_number'),
    array( 'db' => 'disease_name',    'dt' => 1, 'field' => 'disease_name'),
    array( 'db' => 'first_name',    'dt' => 2, 'field' => 'first_name'),
    array( 'db' => 'middle_name',    'dt' => 3, 'field' => 'middle_name'),
    array( 'db' => 'last_name',    'dt' => 4, 'field' => 'last_name'),
    array( 'db' => 'barangay_name',    'dt' => 5, 'field' => 'barangay_name'),
    array( 'db' => 'gender',    'dt' => 6, 'field' => 'gender'),
    array( 'db' => 'age',    'dt' => 7, 'field' => 'age'),
    array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
    array( 'db' => 'date',    'dt' => 9, 'field' => 'date'),
    array( 'db' => 'case_status',    'dt' => 10, 'field' => 'case_status'),
    array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
); 
 
// Include SQL query processing class 
require '../ssp.class.php'; 

if($query_btn === "clicked")
{
    $filter_status = $_GET['filter_status'];
    $min_age = $_GET['min_age'];
    $max_age = $_GET['max_age'];
    $cause_of_death = $_GET['cause_of_death'];
    $other_cause = $_GET['other_cause'];

    $joinQuery = ", DATE_FORMAT(date,'%M %d, %Y') AS date FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    $where = "";

    if($filter_status === "Inactive (Recovered)")
    {
        $joinQuery = ", DATE_FORMAT(date_of_recovery,'%M %d, %Y') AS date_of_recovery FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
        $where = "";

        $columns = array(
            array( 'db' => 'occurrence_number',    'dt' => 0, 'field' => 'occurrence_number'),
            array( 'db' => 'disease_name',    'dt' => 1, 'field' => 'disease_name'),
            array( 'db' => 'first_name',    'dt' => 2, 'field' => 'first_name'),
            array( 'db' => 'middle_name',    'dt' => 3, 'field' => 'middle_name'),
            array( 'db' => 'last_name',    'dt' => 4, 'field' => 'last_name'),
            array( 'db' => 'barangay_name',    'dt' => 5, 'field' => 'barangay_name'),
            array( 'db' => 'gender',    'dt' => 6, 'field' => 'gender'),
            array( 'db' => 'age',    'dt' => 7, 'field' => 'age'),
            array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
            array( 'db' => 'date_of_recovery',    'dt' => 9, 'field' => 'date_of_recovery'),
            array( 'db' => 'case_status',    'dt' => 10, 'field' => 'case_status'),
            array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
        ); 
    }
    else  if($filter_status === "Inactive (Dead)")
    {
        if($cause_of_death != "")
        {
            if($cause_of_death != "Other")
            {
                $joinQuery = ", DATE_FORMAT(date_of_death,'%M %d, %Y') AS date_of_death FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
                ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)  LEFT JOIN `diseases` AS `c_o_d` ON (`hp`.`cause_of_death` = `c_o_d`.`id`)";
                $where = "";
        
                $columns = array(
                    array( 'db' => 'phil_health_number',    'dt' => 0, 'field' => 'phil_health_number'),
                    array( 'db' => 'COALESCE(c_o_d.disease_name)',    'dt' => 1, 'field' => 'COALESCE(c_o_d.disease_name)'),
                    array( 'db' => 'first_name',    'dt' => 2, 'field' => 'first_name'),
                    array( 'db' => 'middle_name',    'dt' => 3, 'field' => 'middle_name'),
                    array( 'db' => 'last_name',    'dt' => 4, 'field' => 'last_name'),
                    array( 'db' => 'barangay_name',    'dt' => 5, 'field' => 'barangay_name'),
                    array( 'db' => 'gender',    'dt' => 6, 'field' => 'gender'),
                    array( 'db' => 'age',    'dt' => 7, 'field' => 'age'),
                    array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
                    array( 'db' => 'date_of_death',    'dt' => 9, 'field' => 'date_of_death'),
                    array( 'db' => 'case_status',    'dt' => 10, 'field' => 'case_status'),
                    array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
                );
            }
            else
            {
                $joinQuery = ", DATE_FORMAT(date_of_death,'%M %d, %Y') AS date_of_death FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
                ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
                $where = "";
        
                $columns = array(
                    array( 'db' => 'phil_health_number',    'dt' => 0, 'field' => 'phil_health_number'),
                    array( 'db' => 'other_cause_of_death',    'dt' => 1, 'field' => 'other_cause_of_death'),
                    array( 'db' => 'first_name',    'dt' => 2, 'field' => 'first_name'),
                    array( 'db' => 'middle_name',    'dt' => 3, 'field' => 'middle_name'),
                    array( 'db' => 'last_name',    'dt' => 4, 'field' => 'last_name'),
                    array( 'db' => 'barangay_name',    'dt' => 5, 'field' => 'barangay_name'),
                    array( 'db' => 'gender',    'dt' => 6, 'field' => 'gender'),
                    array( 'db' => 'age',    'dt' => 7, 'field' => 'age'),
                    array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
                    array( 'db' => 'date_of_death',    'dt' => 9, 'field' => 'date_of_death'),
                    array( 'db' => 'case_status',    'dt' => 10, 'field' => 'case_status'),
                    array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
                );
            }    
        }
        else
        {
            $joinQuery = ", hp.resident_id, COUNT(*),  DATE_FORMAT(date_of_death,'%M %d, %Y') AS date_of_death FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) LEFT JOIN `diseases` AS `c_o_d` ON (`hp`.`cause_of_death` = `c_o_d`.`id`)";
            $where = "";
    
            $columns = array(
                array( 'db' => 'phil_health_number',    'dt' => 0, 'field' => 'phil_health_number'),
                array( 'db' => "COALESCE(c_o_d.disease_name, other_cause_of_death)",    'dt' => 1, 'field' => "COALESCE(c_o_d.disease_name, other_cause_of_death)"),
                array( 'db' => 'first_name',    'dt' => 2, 'field' => 'first_name'),
                array( 'db' => 'middle_name',    'dt' => 3, 'field' => 'middle_name'),
                array( 'db' => 'last_name',    'dt' => 4, 'field' => 'last_name'),
                array( 'db' => 'barangay_name',    'dt' => 5, 'field' => 'barangay_name'),
                array( 'db' => 'gender',    'dt' => 6, 'field' => 'gender'),
                array( 'db' => 'age',    'dt' => 7, 'field' => 'age'),
                array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
                array( 'db' => 'date_of_death',    'dt' => 9, 'field' => 'date_of_death'),
                array( 'db' => 'case_status',    'dt' => 10, 'field' => 'case_status'),
                array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
            );
        }
    }
    else  if($filter_status === "Inactive (All)")
    {
        $joinQuery = ", COALESCE(DATE_FORMAT(date_of_recovery,'%M %d, %Y'), DATE_FORMAT(date_of_death,'%M %d, %Y')) AS date FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
        ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
        $where = "";

        $columns = array(
            array( 'db' => 'occurrence_number',    'dt' => 0, 'field' => 'occurrence_number'),
            array( 'db' => 'disease_name',    'dt' => 1, 'field' => 'disease_name'),
            array( 'db' => 'first_name',    'dt' => 2, 'field' => 'first_name'),
            array( 'db' => 'middle_name',    'dt' => 3, 'field' => 'middle_name'),
            array( 'db' => 'last_name',    'dt' => 4, 'field' => 'last_name'),
            array( 'db' => 'barangay_name',    'dt' => 5, 'field' => 'barangay_name'),
            array( 'db' => 'gender',    'dt' => 6, 'field' => 'gender'),
            array( 'db' => 'age',    'dt' => 7, 'field' => 'age'),
            array( 'db' => 'contact',    'dt' => 8, 'field' => 'contact'),
            array( 'db' => 'date',    'dt' => 9, 'field' => 'date'),
            array( 'db' => 'case_status',    'dt' => 10, 'field' => 'case_status'),
            array( 'db' => 'hp_id',    'dt' => 11, 'field' => 'hp_id'),
        );
    }

    $conditions = array();

    if($min_age != "NaN")
    {
        $conditions[] = "`age` >= '$min_age'";
    }

    if($max_age != "NaN")
    {
        $conditions[] = "`age` <= '$max_age'";
    }

    if($filter_status === "Inactive (Recovered)")
    {
        $conditions[] = "`recovery` IS NOT NULL";

        if($date_range_from != "")
        {
            $conditions[] = "`date_of_recovery` >= '$date_range_from'";
        }
        if($date_range_to != "")
        {
            $conditions[] = "`date_of_recovery` <= '$date_range_to'";
        }
    }
    else  if($filter_status === "Inactive (Dead)")
    {
        $conditions[] = "(`cause_of_death` IS NOT NULL OR `other_cause_of_death` IS NOT NULL)";

        if($cause_of_death != "")
        {
            if($cause_of_death != "Other")
            {
                $conditions[] = "`cause_of_death` = '$cause_of_death'";
            }
            else
            {
                if($other_cause != "")
                {
                    $conditions[] = "`other_cause_of_death` = '$other_cause'";
                }
                else
                {
                    $conditions[] = "`other_cause_of_death` IS NOT NULL";
                }
            }    
        }

        if($date_range_from != "")
        {
            $conditions[] = "`date_of_death` >= '$date_range_from'";
        }

        if($date_range_to != "")
        {
            $conditions[] = "`date_of_death` <= '$date_range_to'";
        }

    }
    else  if($filter_status === "Inactive (All)")
    {
        $conditions[] = "`case_status` = '(Inactive)'";

        if($date_range_from != "")
        {
            $conditions[] = "(`date_of_recovery` >= '$date_range_from' OR `date_of_death` >= '$date_range_from')";
        }

        if($date_range_to != "")
        {
            $conditions[] = "(`date_of_recovery` <= '$date_range_to' OR `date_of_death` <= '$date_range_to')";
        }
    }
    else  if($filter_status === "Active")
    {
        $conditions[] = "`case_status` = '(Active)'";

        if($date_range_from != "")
        {
            $conditions[] = "`date` >= '$date_range_from'";
        }

        if($date_range_to != "")
        {
            $conditions[] = "`date` <= '$date_range_to'";
        }
    }
    else
    {
        $conditions[] = "`case_status` IS NOT NULL";

        if($date_range_from != "")
        {
            $conditions[] = "`date` >= '$date_range_from'";
        }

        if($date_range_to != "")
        {
            $conditions[] = "`date` <= '$date_range_to'";
        }
    }


    if (count($conditions) > 0) {
        if($filter_status ==  "Inactive (Dead)")
        {
            $where = implode(' AND ', $conditions)." GROUP BY hp.resident_id";
        }
        else
        {
            $where = implode(' AND ', $conditions);
        }
    }
  
}
else
{
    $joinQuery = ",  DATE_FORMAT(date,'%M %d, %Y') AS date FROM `{$table}` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    $where = "";
}
 
// Output data as json format 


  echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery,$where ) );

 // print json_encode($where);

?>
