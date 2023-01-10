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

$all_diseases_that_occured = $_GET['all_diseases_that_occured'];

if($query_click == "clicked")
{
    $query = "SELECT d.disease_name, b.barangay_name, DATE_FORMAT(date,'%M %d, %Y') AS create_date, date, COUNT(*) as num_rows FROM health_profiles hp 
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
      $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' AND " . implode(' AND ', $conditions) . " && `disease_name` = '$all_diseases_that_occured'
      GROUP BY date, barangay_name ORDER BY `date` DESC ";
    }
    else
    {
        $sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' AND `disease_name` = '$all_diseases_that_occured'
        GROUP BY date, barangay_name ORDER BY `date` DESC ";
    }
}
else
{
    $sql = "SELECT d.disease_name, b.barangay_name, DATE_FORMAT(date,'%M %d, %Y') AS create_date, date, COUNT(*) as num_rows FROM health_profiles hp 
    LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
    LEFT JOIN diseases d ON (hp.disease_id = d.id) 
    LEFT JOIN barangays b ON (r.barangay_id = b.id) 
    WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' AND `disease_name` = '$all_diseases_that_occured'
    GROUP BY date, barangay_name ORDER BY `date` DESC ";
}

$result = $conn->query($sql);

if ($result->num_rows > 0)
{
    while($row = $result->fetch_assoc())
    {
        $rowcount= $row['num_rows'];
        $total_hp =  number_format($rowcount, 0, '', ',');

        if($total_hp == 1)
        {
            $get_disease_names[] = $total_hp." documented health case on ".$row['create_date']." in barangay ".$row['barangay_name']."";
        }
        else{

            $get_disease_names[] = $total_hp." documented health cases on ".$row['create_date']." in barangay ".$row['barangay_name']."";
        }

       
    }

    
    $get_disease_names = array_unique($get_disease_names);

    if(isset($_GET['all_diseases_that_occured']))
    {
        print json_encode($get_disease_names);
    }
}

?>