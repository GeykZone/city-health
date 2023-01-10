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

$all_dates = $_GET['all_dates'];

if($query_click == "clicked")
{
    $query = "SELECT d.disease_name, b.barangay_name, `date`, COUNT(*) as num_rows FROM health_profiles hp 
    LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
    LEFT JOIN diseases d ON (hp.disease_id = d.id) 
    LEFT JOIN barangays b ON (r.barangay_id = b.id)";

    $conditions = array();
    
    if($barangay_name != "default")
    {
        $conditions[] = "`b`.`id`='$barangay_name'";
    }
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
        $sql .= " WHERE  `date` = '$all_dates' AND " . implode(' AND ', $conditions) . " GROUP BY disease_name, barangay_name ORDER BY `disease_name` ASC ";
    }
    else
    {
        $sql .= " WHERE  `date` = '$all_dates' AND `b`.`id`='$barangay_name' GROUP BY disease_name, barangay_name ORDER BY `disease_name` ASC ";
    }
}
else
{
    $sql = "SELECT d.disease_name, b.barangay_name, `date`, COUNT(*) as num_rows FROM health_profiles hp 
    LEFT JOIN residents r ON (hp.resident_id = r.resident_id) 
    LEFT JOIN diseases d ON (hp.disease_id = d.id) 
    LEFT JOIN barangays b ON (r.barangay_id = b.id)
    WHERE  `date` = '$all_dates' AND `b`.`id`='$barangay_name' GROUP BY disease_name, barangay_name ORDER BY `disease_name` ASC";
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
            $get_disease_names[] = $total_hp." documented health case caused by ".$row['disease_name']." in barangay ".$row['barangay_name']."";
        }
        else{

            $get_disease_names[] = $total_hp." documented health cases caused by ".$row['disease_name']." in barangay ".$row['barangay_name']."";
        }

       
    }

    
    $get_disease_names = array_unique($get_disease_names);
    if(isset($_GET['all_dates']))
    {
        print json_encode($get_disease_names);
    }
}

?>