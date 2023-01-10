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

$all_diseases_that_occured = $_GET['all_diseases_that_occured'];

if($query_click == "clicked")
{
    $query = "SELECT b.barangay_name, b.long, b.lat, d.disease_name, DATE_FORMAT(date,'%M %d, %Y') AS create_date, date, COUNT(*) as num_rows FROM health_profiles hp 
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
      $sql .= " WHERE `date` BETWEEN '$date_range_from' AND '$date_range_to' AND " . implode(' AND ', $conditions) . " && `barangay_name` = '$all_diseases_that_occured'
      GROUP BY date, disease_name ORDER BY `date` DESC ";
    }
    else
    {
        $sql .= " WHERE  `date` BETWEEN '$date_range_from' AND '$date_range_to' AND `barangay_name` = '$all_diseases_that_occured'
        GROUP BY date, disease_name ORDER BY `date` DESC ";
    }
}
else
{
    $sql = "SELECT b.barangay_name, b.long, b.lat, d.disease_name, DATE_FORMAT(date,'%M %d, %Y') AS create_date, date, COUNT(*) as num_rows FROM health_profiles hp 
    LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
    LEFT JOIN diseases d ON (hp.disease_id = d.id) 
    LEFT JOIN barangays b ON (r.barangay_id = b.id) 
    WHERE  `date` BETWEEN '$current_year_from' AND '$current_year_to' AND `barangay_name` = '$all_diseases_that_occured'
    GROUP BY date, disease_name ORDER BY `date` DESC ";
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