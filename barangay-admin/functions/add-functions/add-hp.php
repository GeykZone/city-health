<?php   include('../../../route.php'); ?>
<?php


if(isset($_POST['new_hp']))
{
  $resident_name_id = $_POST['id_full_naame'];
  $disease_name_id = $_POST['id_disease'];
  $philhealth_id = $_POST['philhealth_number'];
  $created_at = $_POST['created_at'];
  $id;

  $sql =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' AND `disease_id` = '$disease_name_id' AND `case_status` = '(Active)' ";
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    $confirmation = 9;
    echo $confirmation; 
  }
  else
  {

    $sql4 =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' AND `case_status` = '(Inactive)' AND `date_of_death` IS NOT Null";
    $result4 = $conn->query($sql4);
    if ($result4->num_rows > 0)
    {
      $confirmation = 7;
      echo $confirmation; 
    }
    else
    {
        $sql3 =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' AND `disease_id` = '$disease_name_id' AND `case_status` = '(Inactive)' 
        AND `date_of_death` IS Null AND `date_of_recovery` IS NOT Null";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0)
        {

            $confirmation = 6;
            echo $confirmation; 
        }
        else
        {
          $sql2 = "INSERT INTO `health_profiles`(`resident_id`, `disease_id`, `phil_health_number`, `date`) 
          VALUES ('$resident_name_id', '$disease_name_id', '$philhealth_id', '$created_at')";
          if ($conn->query($sql2) === TRUE)
          {
            /////////////////////////////////////////////////////////
            $set2 ="UPDATE `health_profiles` SET  ";
            $where2 = " WHERE `resident_id` = '$resident_name_id'";
            $condition2 = array();
            $condition2[] = "`phil_health_number`='$philhealth_id'";
            $new_sql2 = $set2;
            if (count($condition2) > 0){ $new_sql2 .= implode(', ', $condition2).$where2;}
            if ($conn->query($new_sql2) === TRUE)
            {
              $confirmation = 1;
               echo $confirmation;
            }
            else {
          
              $confirmation = 2;
              echo $new_sql2; 
            }
            /////////////////////////////////////////////////////////////

          }
          else {
        
            $confirmation = 2;
            echo $confirmation; 
        
          }
        }
    }

  }
 
}

if(isset($_POST['occurrence']))
{

  $resident_name_id = $_POST['id_full_naame'];
  $disease_name_id = $_POST['id_disease'];
  $philhealth_id = $_POST['philhealth_number'];
  $created_at = $_POST['created_at'];
  $id;

  $sql5 =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' AND `disease_id` = '$disease_name_id' AND `case_status` = '(Inactive)' 
  AND `date_of_death` IS Null AND `date_of_recovery` = '$created_at'";
  $result5 = $conn->query($sql5);
  if ($result5->num_rows > 0)
  {
    $confirmation = 11;
    echo $confirmation; 
  }
  else
  {

    $sql =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' && `disease_id` = '$disease_name_id' ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0)
    {
      $result = mysqli_query($conn,$sql);
      $rowcount=mysqli_num_rows($result);
      $total_hp =  $rowcount;
  
      $total_hp = $total_hp + 1;
  
      $sql2 = "INSERT INTO `health_profiles`(`resident_id`, `disease_id`, `phil_health_number`, `date`, `occurrence_number`) 
      VALUES ('$resident_name_id', '$disease_name_id', '$philhealth_id', '$created_at', '$total_hp')";
      if ($conn->query($sql2) === TRUE)
      {
            /////////////////////////////////////////////////////////
            $set2 ="UPDATE `health_profiles` SET  ";
            $where2 = " WHERE `resident_id` = '$resident_name_id'";
            $condition2 = array();
            $condition2[] = "`phil_health_number`='$philhealth_id'";
            $new_sql2 = $set2;
            if (count($condition2) > 0){ $new_sql2 .= implode(', ', $condition2).$where2;}
            if ($conn->query($new_sql2) === TRUE)
            {
              $confirmation = 1;
               echo $confirmation;
            }
            else {
          
              $confirmation = 2;
              echo $new_sql2; 
            }
            /////////////////////////////////////////////////////////////
      }
      else {
    
        $confirmation = 2;
        echo $confirmation; 
    
      }
    }

  }
 
}


?>