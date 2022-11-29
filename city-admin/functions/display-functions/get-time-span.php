<?php   include('../../../route.php'); ?>

<?php 

$query_click = $_GET['query_click'];

$barangay_name = $_GET['barangay_name'];
$disease_type = $_GET['disease_type'];
$date_range_from = $_GET['date_range_from'];
$date_range_to = $_GET['date_range_to'];
$case_status = $_GET['active_inactive'];
$gender = $_GET['gender'];

$current_year_from = $_GET['current_year_from'];
$current_year_to = $_GET['current_year_to'];

$all_dates = $_GET['all_dates'];

if($query_click == "clicked")
{
    $query = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";

    $conditions = array();
    
    if($barangay_name != "default")
    {
        $conditions[] = "`b`.`id`='$barangay_name'";
    }
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

    $sql = $query;
    if (count($conditions) > 0) {
        $sql .= " WHERE  `date` = '$all_dates' && " . implode(' AND ', $conditions) . " ORDER BY `date` ASC ";
    }
    else
    {
        $sql .= " WHERE  `date` = '$all_dates' ORDER BY `date` ASC ";
    }
}
else
{
    $sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
    ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` = '$all_dates' ORDER BY `disease_name` ASC";
}

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        $_barangay_namme =  $row['barangay_name'];
        $_diseases_name =  $row['disease_name'];

        if($query_click == "clicked")
        {
            $query2 = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`)";
        
            $conditions2 = array();
            
            if($barangay_name != "default")
            {
                $conditions2[] = "`b`.`id`='$barangay_name'";
            }
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
        
            $new_sql = $query2;
            if (count($conditions2) > 0) {
                $new_sql .= " WHERE  `date` = '$all_dates' && " . implode(' AND ', $conditions2) . " && `barangay_name`= '$_barangay_namme' && `disease_name`= '$_diseases_name' ORDER BY `date` ASC ";
            }
            else
            {
                $new_sql .= " WHERE  `date` = '$all_dates' && `barangay_name`= '$_barangay_namme' && `disease_name`= '$_diseases_name' ORDER BY `date` ASC ";
            }
        }
        else
        {
            $new_sql = "SELECT * FROM `health_profiles` AS `hp` LEFT JOIN `residents` AS `r` ON (`hp`.`resident_id` = `r`.`resident_id`) LEFT JOIN `diseases` AS `d` 
            ON (`hp`.`disease_id` = `d`.`id`) LEFT JOIN `barangays` AS `b` ON (`r`.`barangay_id` = `b`.`id`) WHERE  `date` = '$all_dates' && `barangay_name`= '$_barangay_namme' && `disease_name`= '$_diseases_name' ORDER BY `disease_name` ASC";
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
            $get_disease_names[] = $total_hp." ".$row['disease_name']." health case in ".$row['barangay_name'].".";
        }
        else{

            $get_disease_names[] = $total_hp." ".$row['disease_name']." health cases in ".$row['barangay_name'].".";
        }

       
    }

    
    $get_disease_names = array_unique($get_disease_names);

    if(isset($_GET['all_dates']))
    {
        print json_encode($get_disease_names);
    }
}

?>