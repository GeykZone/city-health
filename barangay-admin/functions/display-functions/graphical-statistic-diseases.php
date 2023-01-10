<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

    $barangay_name = $_GET['barangay_name'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
    $gender = $_GET['gender'];
    $min_age = $_GET['min_age'];
    $max_age = $_GET['max_age'];

    $current_year_from = $_GET['current_year_from'];
    $current_year_to = $_GET['current_year_to'];

    if($query_click == "clicked")
    {
        $query = "SELECT d.disease_name, b.barangay_name, COUNT(*) as num_rows FROM health_profiles hp 
        LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
        LEFT JOIN diseases d ON (hp.disease_id = d.id) 
        LEFT JOIN barangays b ON (r.barangay_id = b.id)";

        $conditions = array();
        
        if($barangay_name != "default")
        {
            $conditions[] = "`b`.`id` = '$barangay_name'";
        }
        if($gender != "default")
        {
            $conditions[] = "`gender`='$gender'";
        }
        if($min_age != "default")
        {
            $conditions[] = "`age` >= '$min_age'";
        }
        if($max_age != "default")
        {
            $conditions[] = "`age` <= '$max_age'";
        }


        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' AND " . implode(' AND ', $conditions) . " GROUP BY d.disease_name ORDER BY d.disease_name ASC ";
        }
        else
        {
            $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' AND `b`.`id` = '$barangay_name' GROUP BY d.disease_name ORDER BY d.disease_name ASC ";
        }
    }
    else
    {
        $sql = "SELECT d.disease_name, b.barangay_name, COUNT(*) as num_rows FROM health_profiles hp 
        LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
        LEFT JOIN diseases d ON (hp.disease_id = d.id) 
        LEFT JOIN barangays b ON (r.barangay_id = b.id)
        WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' AND `b`.`id` = '$barangay_name' GROUP BY d.disease_name ORDER BY d.disease_name ASC ";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
            
            $total_hp =  $row['num_rows'];
            $disease = str_replace(' ', '_', $row['disease_name']);
            $total_hp_number[] = $disease." ".$total_hp;

    }
}
else
{
    $disease = str_replace(' ', '_', 'No Records Found');
    $total_hp_number[] = $disease." ".'N/A';
}
   
if(isset($_GET['total_hp']))
{   
    $total_hp_number = array_unique($total_hp_number);
    print json_encode($total_hp_number);
}

    



?>
