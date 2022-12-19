<?php   include('../../../route.php'); ?>

<?php 

$query_click = $_GET['query_click'];

$barangay_name = $_GET['barangay_name'];
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
    
    if($barangay_name != "default")
    {
        $conditions[] = "`b`.`id` = '$barangay_name'";
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
        $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' && " . implode(' AND ', $conditions) . " && `disease_name` = '$all_diseases_that_occured' ORDER BY `date` DESC ";
    }
    else
    {
        $sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' && `disease_name` = '$all_diseases_that_occured' ORDER BY `date` DESC ";
    }
}
else
{
    $sql = "SELECT *, DATE_FORMAT(date,'%M %d, %Y') AS create_date FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' && `disease_name` = '$all_diseases_that_occured' ORDER BY `date` DESC";
}

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        $_barangay_namme =  $row['barangay_name'];
        $create_date = $row['date'];

        if($query_click == "clicked")
        {
            $query2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

            $conditions2 = array();
            
            if($barangay_name != "default")
            {
                $conditions2[] = "`b`.`id` = '$barangay_name'";
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
                $new_sql .= " WHERE `date` = '$create_date' && " . implode(' AND ', $conditions) . " && `disease_name` = '$all_diseases_that_occured' && `barangay_name`= '$_barangay_namme' ORDER BY `date` DESC ";
            }
            else
            {
                $new_sql .= " WHERE  `date` = '$create_date' && `disease_name` = '$all_diseases_that_occured' && `barangay_name`= '$_barangay_namme' ORDER BY `date` DESC ";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` = '$create_date' && `disease_name` = '$all_diseases_that_occured' && `barangay_name`= '$_barangay_namme' ORDER BY `date` DESC";
        }

        $new_result = $conn->query($new_sql);
        if($new_result->num_rows > 0)
        {
            $new_result = mysqli_query($conn,$new_sql);
            $rowcount=mysqli_num_rows($new_result);
            $total_hp =  $rowcount;
        }
        else
        {
            $total_hp =  0;
        }

        if($total_hp == 1)
        {
            $get_disease_names[] = $total_hp." documented health case on ".$row['create_date']." in barangay ".$row['barangay_name'].".";
        }
        else{

            $get_disease_names[] = $total_hp." documented health cases on ".$row['create_date']." in barangay ".$row['barangay_name'].".";
        }

       
    }

    
    $get_disease_names = array_unique($get_disease_names);

    if(isset($_GET['all_diseases_that_occured']))
    {
        print json_encode($get_disease_names);
    }
}

?>