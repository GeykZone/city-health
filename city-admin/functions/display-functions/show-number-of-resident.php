
<?php   include('../../../route.php'); ?>
<?php
    
    $query_btn = $_GET['query_btn'];
    
    if($query_btn == "clicked")
    {
        $gender = $_GET['gender'];
        $min_age = $_GET['min_age'];
        $max_age = $_GET['max_age'];
        $date_range_from = $_GET['date_range_from'];
        $date_range_to = $_GET['date_range_to'];

        $query = "SELECT barangays.barangay_name, COUNT(*) as num_rows FROM `residents` 
        LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id`";


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


        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= " WHERE " . implode(' AND ', $conditions) . " GROUP BY barangays.barangay_name ORDER BY barangays.barangay_name ASC ";
        }
        else
        {
            $sql .= " GROUP BY barangays.barangay_name ORDER BY barangays.barangay_name ASC ";
        }
    }
    else
    {
        $sql = "SELECT barangays.barangay_name, COUNT(*) as num_rows FROM `residents` 
        LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id` 
        GROUP BY barangays.barangay_name ORDER BY barangays.barangay_name ASC";
    }
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

        $total_residents_number[] = $row['num_rows'];
        $brgy[] = $row['barangay_name'];

    }
}
else
{
    $total_residents_number[] = '0';
    $brgy[] = 'No Records Found';
}
   

if(isset($_GET['barangay_name']))
{
    print json_encode($brgy);
}
elseif(isset($_GET['total_residents_number']))
{
    print json_encode($total_residents_number);
}

?>





