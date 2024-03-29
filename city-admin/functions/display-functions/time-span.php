<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

    $barangay_name = $_GET['barangay_name'];
    $disease_type = $_GET['disease_type'];
    $date_range_from = $_GET['date_range_from'];
    $date_range_to = $_GET['date_range_to'];
    $gender = $_GET['gender'];
    $min_age = $_GET['min_age'];
    $max_age = $_GET['max_age'];

    $current_year_from = $_GET['current_year_from'];
    $current_year_to = $_GET['current_year_to'];

    if($query_click == "clicked")
    {
        $query = "SELECT d.disease_name, b.barangay_name, `date`, COUNT(*) as num_rows FROM health_profiles hp 
        LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
        LEFT JOIN diseases d ON (hp.disease_id = d.id) 
        LEFT JOIN barangays b ON (r.barangay_id = b.id)";

        $conditions = array();
        
        if($barangay_name != "")
        {
            $conditions[] = "`b`.`id`='$barangay_name'";
        }
        if($disease_type != "")
        {
            $conditions[] = "`disease_id` ='$disease_type'";
        }
        if($gender != "")
        {
            $conditions[] = "`gender`='$gender'";
        }
        if($min_age != "NaN")
        {
            $conditions[] = "`age` >= '$min_age'";
        }
        if($max_age != "NaN")
        {
            $conditions[] = "`age` <= '$max_age'";
        }
        if($date_range_from != "")
        {
          $conditions[] = "`date` >= '$date_range_from'";
        }

        if($date_range_to != "")
        {
            $conditions[] = "`date` <= '$date_range_to'";
        }

        $sql = $query;
        if (count($conditions) > 0) {
          $sql .= " WHERE " . implode(' AND ', $conditions) . " GROUP BY `date` ORDER BY `date` ASC ";
        }
        else
        {
            $sql .= " WHERE `date` BETWEEN '$current_year_from' AND '$current_year_to' GROUP BY `date` ORDER BY `date` ASC ";
        }

    }
    else
    {
        $sql = "SELECT d.disease_name, b.barangay_name, `date`, COUNT(*) as num_rows FROM health_profiles hp 
        LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
        LEFT JOIN diseases d ON (hp.disease_id = d.id) 
        LEFT JOIN barangays b ON (r.barangay_id = b.id)
        WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' GROUP BY `date` ORDER BY `date` ASC ";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
            
            $total_hp =  $row['num_rows'];
            $date_name = str_replace(' ', '_', $row['date']);
            $total_hp_number[] = $date_name." ".$total_hp;

    }
}
else
{
    $date_name = "Invalid_date Invalid";
    $total_hp_number[] = $date_name;
}
   
if(isset($_GET['total_hp']))
{   
    $total_hp_number = array_unique($total_hp_number);
    print json_encode($total_hp_number);
}

    



?>
