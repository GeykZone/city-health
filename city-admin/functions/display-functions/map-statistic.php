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
        $query1 = "SELECT t1.barangay_id, t1.barangay_name, t1.long, t1.lat, t1.num_rows AS 'count within date range', t2.total AS 'total count'
        FROM (
        SELECT `r`.`barangay_id`, `b`.`barangay_name`, `b`.`long`, `b`.`lat`, COUNT(*) AS num_rows
        FROM `health_profiles` AS `hp` 
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

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
        
        $sql1 = $query1;
        if (count($conditions) > 0) 
        {
          $sql1 .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions) . " GROUP BY `b`.`barangay_name`) t1 ";
        }
        else
        {
            $sql1 .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' GROUP BY `b`.`barangay_name`) t1 ";
        }

        $query2 = "JOIN (
        SELECT `r`.`barangay_id`, `b`.`barangay_name`, `b`.`long`, `b`.`lat`, COUNT(*) AS total
        FROM `health_profiles` AS `hp`
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`)
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

        $sql1.= $query2;
        $sql2 = $sql1;
        
        if (count($conditions) > 0) 
        {
          $sql2 .= " WHERE " . implode(' AND ', $conditions) . " GROUP BY `b`.`barangay_name`) t2
          ";
        }
        else
        {
            $sql2 .= "GROUP BY `b`.`barangay_name`) t2 ";
        }

        $query3 = "ON t1.barangay_id = t2.barangay_id
        ORDER BY t1.num_rows DESC, t2.total DESC, t1.barangay_name DESC;";

        $sql2.= $query3;
        $sql = $sql2;

    }
    else
    {
        $sql = "SELECT t1.barangay_id, t1.barangay_name, t1.long, t1.lat, t1.num_rows AS 'count within date range', t2.total AS 'total count'
        FROM (
        SELECT `r`.`barangay_id`, `b`.`barangay_name`, `b`.`long`, `b`.`lat`, COUNT(*) AS num_rows
        FROM `health_profiles` AS `hp` 
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) 
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' GROUP BY `b`.`barangay_name`) t1
        JOIN (
        SELECT `r`.`barangay_id`, `b`.`barangay_name`, `b`.`long`, `b`.`lat`, COUNT(*) AS total
        FROM `health_profiles` AS `hp`
        LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`)
        LEFT JOIN `diseases` AS `d` ON (`hp`.`disease_id` = `d`.`id`) 
        LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)
        GROUP BY `b`.`barangay_name`) t2
        ON t1.barangay_id = t2.barangay_id
        ORDER BY t1.num_rows DESC, t2.total DESC, t1.barangay_name DESC;";
    }

    
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {

            $brgy = str_replace(' ', '_', $row['barangay_name']);
            $total_hp =  $row['count within date range'];
            $all_time_total = $row['total count'];
            $long_lat[] = $total_hp." ".$brgy." ".$row['long']." ".$row['lat']." ".$all_time_total;

    }    
    }
    else
    {
        $long_lat[] = "0"." "."0"." "."0"." "."0"." "."0";
    }

    $long_lat = array_unique($long_lat);



    if(isset($_GET['long_lat']))
    {
        print json_encode($long_lat);
    }


?>
