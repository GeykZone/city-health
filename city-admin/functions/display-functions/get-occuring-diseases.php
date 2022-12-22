<?php   include('../../../route.php'); ?>

<?php 

$query_click = $_GET['query_click'];

$disease_type = $_GET['disease_type'];
$date_range_from = $_GET['date_range_from'];
$date_range_to = $_GET['date_range_to'];
$case_status = $_GET['active_inactive'];
$gender = $_GET['gender'];
$min_age = $_GET['min_age'];
$max_age = $_GET['max_age'];

$current_year_from = $_GET['current_year_from'];
$current_year_to = $_GET['current_year_to'];

$all_diseases_that_occured = $_GET['all_diseases_that_occured'];

if($query_click == "clicked")
{
    $query = "SELECT *, DATE_FORMAT(date,'%M %d, %Y') AS create_date FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

    $conditions = array();
    
    if($disease_type != "default")
    {
        $conditions[] = "`disease_id`='$disease_type'";
    }
    if($case_status != "default")
    {
        $conditions[] = "`case_status`='$case_status'";
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
      $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions) . " && `barangay_name` = '$all_diseases_that_occured' ORDER BY `date` DESC ";
    }
    else
    {
        $sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' && `barangay_name` = '$all_diseases_that_occured' ORDER BY `date` DESC ";
    }
}
else
{
    $sql = "SELECT *, DATE_FORMAT(date,'%M %d, %Y') AS create_date FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `barangay_name` = '$all_diseases_that_occured' ORDER BY `date` DESC ";
}

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        $_disease_type =  $row['disease_name'];
        $create_date = $row['date'];

        if($query_click == "clicked")
        {
            $query2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
    
            $conditions2 = array();
            
            if($disease_type != "default")
            {
                $conditions2[] = "`disease_id`='$disease_type'";
            }
            if($case_status != "default")
            {
                $conditions2[] = "`case_status`='$case_status'";
            }
            if($gender != "default")
            {
                $conditions2[] = "`gender`='$gender'";
            }
            if($min_age != "default")
            {
                $conditions2[] = "`age` >= '$min_age'";
            }
            if($max_age != "default")
            {
                $conditions2[] = "`age` <= '$max_age'";
            }
    
    
            $new_sql = $query2;
            if (count($conditions2) > 0) {
              $new_sql .= " WHERE `date` = '$create_date' && " . implode(' AND ', $conditions2) . " && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `date` DESC ";
            }
            else
            {
                $new_sql .= " WHERE  `date` = '$create_date' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type'  ORDER BY `date` DESC ";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` = '$create_date' && `barangay_name` = '$all_diseases_that_occured' && `disease_name`= '$_disease_type' ORDER BY `date` DESC";
        }

        $new_result = $conn->query($new_sql);
        if($new_result->num_rows > 0)
        {
            $new_result = mysqli_query($conn,$new_sql);
            $rowcount=mysqli_num_rows($new_result);
            $total_hp =  number_format($rowcount, 0, '', ',');
        }
        else
        {
            $total_hp =  0;
        }

        if($total_hp == 1)
        {
            $get_disease_names[] = $total_hp." documented health case caused by ".$row['disease_name']." on ".$row['create_date']."";
        }
        else{

            $get_disease_names[] =  $total_hp." documented health cases caused by ".$row['disease_name']." on ".$row['create_date']."";
        }

       
    }

    
    $get_disease_names = array_unique($get_disease_names);

    if(isset($_GET['all_diseases_that_occured']))
    {
        print json_encode($get_disease_names);
    }
}

?>