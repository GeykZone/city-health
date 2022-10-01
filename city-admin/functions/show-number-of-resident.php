
<?php   include('../../route.php'); ?> 
    <?php
    $old_sql = "SELECT * FROM `residents` LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id`";
    $old_rowcount = 0;
    if ($old_result = mysqli_query($conn,$old_sql))
    {
        $old_rowcount=mysqli_num_rows($old_result);
    }


    $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays`";
    $brg_name = "";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

                $brg_name = $row['barangay_name'];
                $rowcount = 0;
                $total_residents = $rowcount;
                $new_sql = "SELECT * FROM `residents` LEFT JOIN `barangays` ON `residents`.`barangay_id` = `barangays`.`id` WHERE `barangay_name` = '$brg_name'";
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



