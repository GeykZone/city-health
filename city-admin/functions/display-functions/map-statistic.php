<?php   include('../../../route.php'); ?>
<?php
    
    $query_click = $_GET['query_click'];

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
        $query = "SELECT b.barangay_name, b.long, b.lat, COUNT(*) as num_rows FROM health_profiles hp 
        LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
        LEFT JOIN diseases d ON (hp.disease_id = d.id) 
        LEFT JOIN barangays b ON (r.barangay_id = b.id)";

        $conditions = array();
        
        if($disease_type != "default")
        {
            $conditions[] = "`disease_id`='$disease_type'";
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
          $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions) . " GROUP BY b.barangay_name ORDER BY `barangay_name` ASC ";
        }
        else
        {
            $sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' GROUP BY b.barangay_name ORDER BY `barangay_name` ASC ";
        }
    }
    else
    {
        $sql = "SELECT b.barangay_name, b.long, b.lat, COUNT(*) as num_rows FROM health_profiles hp 
        LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
        LEFT JOIN diseases d ON (hp.disease_id = d.id) 
        LEFT JOIN barangays b ON (r.barangay_id = b.id)
        WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' GROUP BY b.barangay_name ORDER BY `barangay_name` ASC ";
    }


    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

            $brgy = str_replace(' ', '_', $row['barangay_name']);
            $total_hp =  $row['num_rows'];
            $long_lat[] = $total_hp." ".$brgy." ".$row['long']." ".$row['lat'];

    }    
    }
    else
    {
        $long_lat[] = "0"." "."0"." "."0"." "."0";
    }

    $long_lat = array_unique($long_lat);

    if(isset($_GET['long_lat']))
    {
        print json_encode($long_lat);
    }


?>
