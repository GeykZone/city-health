
<?php   include('../../../route.php'); ?> 
    <?php

    $query_btn = $_GET['query_btn'];


    $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays`";
    $brg_name = "";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

                $brg_name = $row['barangay_name'];
                $rowcount = 0;
                $total_residents = $rowcount;

                if($query_btn == "clicked")
                {
                    $gender = $_GET['gender'];
                    $min_age = $_GET['min_age'];
                    $max_age = $_GET['max_age'];
                    $date_range_from = $_GET['date_range_from'];
                    $date_range_to = $_GET['date_range_to'];

                $query2 = "SELECT * FROM `residents` LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id`";

                $conditions2 = array();

                if($min_age != "NaN")
                {
                    $conditions2[] = "`age` >= '$min_age'";
                }
            
                if($max_age != "NaN")
                {
                    $conditions2[] = "`age` <= '$max_age'";
                }
            
                if($gender != "")
                {
                    $conditions2[] = "`gender` = '$gender'";
                }
            
                if($date_range_from != "")
                {
                    $conditions2[] = "`birthdate` >= '$date_range_from'";
                }
            
                if($date_range_to != "")
                {
                    $conditions2[] = "`birthdate` <= '$date_range_to'";
                }


                $new_sql = $query2;
                if (count($conditions2) > 0) {
                $new_sql .= " WHERE " . implode(' AND ', $conditions2) . " && `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC ";
                }
                else
                {
                $new_sql .= "WHERE `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
                }
                
                }
                else
                {
                $new_sql = "SELECT * FROM `residents` LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id` WHERE `barangay_name` = '$brg_name' ORDER BY `barangay_name` ASC";
                }


                $new_result = $conn->query($new_sql);
                if($new_result->num_rows > 0)
                {
                    $new_result = mysqli_query($conn,$new_sql);
                    $rowcount=mysqli_num_rows($new_result);
                    $total_residents =  $rowcount;
                }
                
                $total_residents_number[] = $total_residents;
                $brgy[] = $row['barangay_name'];
    }

    if(isset($_GET['barangay_name']))
    {
        print json_encode($brgy);
    }
    elseif(isset($_GET['total_residents_number']))
    {
        print json_encode($total_residents_number);
    }
    }
    
    ?>



