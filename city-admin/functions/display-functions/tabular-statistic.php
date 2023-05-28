<?php   include('../../../route.php'); ?>
<?php 
// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username , 
    'pass' => $password, 
    'db'   => $database
); 


if(isset($_GET['tabular_barangay']))
{

    $query_btn = $_GET['query_btn'];
    $age_col = "All Ages";
    $gender_col = "Male and Female";
    $diseases_col = "All Diseases";

    

    // DB table to use 
    $table = 'health_profiles'; 

    // Table's primary key 
    $primaryKey = 'hp_id'; 
    
    // Array of database columns which should be read and sent back to DataTables. 
    // The `db` parameter represents the column name in the database.  
    // The `dt` parameter represents the DataTables column identifier. 

    $columns = array( 
        array( 'db' => 'barangay_name',  'dt' => 0, 'field' => 'barangay_name'),
        array( 'db' => "CONCAT('$diseases_col')", 'dt' => 1, 'field' => "CONCAT('$diseases_col')" ), 
        array( 'db' => "CONCAT('$age_col')", 'dt' => 2, 'field' => "CONCAT('$age_col')" ), 
        array( 'db' => "CONCAT('$gender_col')",  'dt' => 3, 'field' => "CONCAT('$gender_col')" ), 
        array( 'db' => 'COUNT(*)',  'dt' => 4, 'field' => 'COUNT(*)' ), 
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
        $disease_txt = $_GET['disease_txt'];

        if($min_age != "NaN")
        {
            $age_col = "Minimum age of ".$min_age;
        }

        if($max_age != "NaN")
        {
            $age_col = "Maximum age of ".$max_age;
        }

        if($min_age != "NaN" && $max_age != "NaN")
        {
            $age_col = $min_age."-".$max_age." years old";
        }

        if($min_age != "NaN" && $max_age != "NaN" && $min_age == $max_age)
        {
            $age_col = "All ".$max_age." years old";
        }

        if($disease_txt != "")
        {
            $diseases_col = $disease_txt;
        }

        if($gender != "")
        {
            $gender_col = $gender;
        }

        $columns = array( 
            array( 'db' => 'barangay_name',  'dt' => 0, 'field' => 'barangay_name'),
            array( 'db' => "CONCAT('$diseases_col')", 'dt' => 1, 'field' => "CONCAT('$diseases_col')" ), 
            array( 'db' => "CONCAT('$age_col')", 'dt' => 2, 'field' => "CONCAT('$age_col')" ), 
            array( 'db' => "CONCAT('$gender_col')",  'dt' => 3, 'field' => "CONCAT('$gender_col')" ), 
            array( 'db' => 'COUNT(*)',  'dt' => 4, 'field' => 'COUNT(*)' ), 
        ); 

        $joinQuery = ", barangay_name FROM `{$table}` AS `hp` 
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
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

        if($disease_txt != "")
        {
            $conditions[] = "`disease_name`='$disease_txt'";
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
        $group = "barangay_name";


    }
    else
    {
        $joinQuery = "FROM `{$table}` AS `hp` 
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
        $where = "";
        $group = "`b`.`barangay_name`";
    }



    // Output data as json format 
    echo json_encode( 
        SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where, $group  ) 
    );

}

if(isset($_GET['tabular_diseases']))
{

    $query_btn = $_GET['query_btn'];
    $age_col = "All Ages";
    $gender_col = "Male and Female";
    $barangay_col = "All Barangays";

    // DB table to use 
    $table = 'health_profiles'; 

    // Table's primary key 
    $primaryKey = 'hp_id'; 
    
    // Array of database columns which should be read and sent back to DataTables. 
    // The `db` parameter represents the column name in the database.  
    // The `dt` parameter represents the DataTables column identifier. 

    $columns = array( 
        array( 'db' => 'disease_name',  'dt' => 0, 'field' => 'disease_name'),
        array( 'db' => "CONCAT('$barangay_col')", 'dt' => 1, 'field' => "CONCAT('$barangay_col')" ), 
        array( 'db' => "CONCAT('$age_col')", 'dt' => 2, 'field' => "CONCAT('$age_col')" ), 
        array( 'db' => "CONCAT('$gender_col')",  'dt' => 3, 'field' => "CONCAT('$gender_col')" ), 
        array( 'db' => 'COUNT(*)',  'dt' => 4, 'field' => 'COUNT(*)' ), 
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
        $select_brgy = $_GET['select_brgy'];

        if($min_age != "NaN")
        {
            $age_col = "Minimum age of ".$min_age;
        }

        if($max_age != "NaN")
        {
            $age_col = "Maximum age of ".$max_age;
        }

        if($min_age != "NaN" && $max_age != "NaN")
        {
            $age_col = $min_age."-".$max_age." years old";
        }

        if($min_age != "NaN" && $max_age != "NaN" && $min_age == $max_age)
        {
            $age_col = "All ".$max_age." years old";
        }

        if($select_brgy != "")
        {
            $barangay_col = $select_brgy;
        }

        if($gender != "")
        {
            $gender_col = $gender;
        }

        $columns = array( 
            array( 'db' => 'disease_name',  'dt' => 0, 'field' => 'disease_name'),
            array( 'db' => "CONCAT('$barangay_col')", 'dt' => 1, 'field' => "CONCAT('$barangay_col')" ), 
            array( 'db' => "CONCAT('$age_col')", 'dt' => 2, 'field' => "CONCAT('$age_col')" ), 
            array( 'db' => "CONCAT('$gender_col')",  'dt' => 3, 'field' => "CONCAT('$gender_col')" ), 
            array( 'db' => 'COUNT(*)',  'dt' => 4, 'field' => 'COUNT(*)' ), 
        ); 

        $joinQuery = ", disease_name FROM `{$table}` AS `hp` 
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
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

        if($select_brgy != "")
        {
            $conditions[] = "`barangay_name`='$select_brgy'";
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
        $group = "disease_name";

    }
    else
    {
        $joinQuery = ", disease_name FROM `{$table}` AS `hp` 
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
        $where = "";
        $group = "disease_name";
    }



    // Output data as json format 
    echo json_encode( 
        SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where, $group  ) 
    );

}

?>
