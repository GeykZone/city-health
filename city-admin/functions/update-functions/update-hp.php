<?php   include('../../../route.php'); ?>
<?php

if(isset($_POST['change_status']))
{
  $update_hp_id = $_POST['hp_update_id'];
  $status = $_POST['status'];
  $death = $_POST['death'];
  $other_death = $_POST['other_death'];
  $created_at = $_POST['created_at'];

  $sql =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$update_hp_id'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $name = $row['resident_id'];
      $disease = $row['disease_id'];

        $set ="UPDATE `health_profiles` SET  ";
        $where = " WHERE `resident_id` = '$name'";
        $condition = array();

        if($status === "Active")
        {
          $condition[] = "`case_status`='(Active)'";
          $where = " WHERE `hp_id` = '$update_hp_id' AND `disease_id` = '$disease'";
        }
        else if($status === "Inactive (Recovered)")
        {
          $condition[] = "`case_status`='(Inactive)'";
          $condition[] = "`recovery`='Fully recovered'";
          $condition[] = "`date_of_recovery`='$created_at'";
          $where = " WHERE `hp_id` = '$update_hp_id' AND `disease_id` = '$disease'";
        }
        else if($status === "Inactive (Dead)")
        {
          $condition[] = "`case_status`='(Inactive)'";
          if($other_death != "")
          {
            $condition[] = "`other_cause_of_death`='$other_death'";
          }
          else
          {
            $condition[] = "`cause_of_death`='$death'";
          }
          $condition[] = "`date_of_death`='$created_at'";
          $where = " WHERE `resident_id` = '$name' AND `case_status`='(Active)'";
        }

        $sql2 = $set;
        if (count($condition) > 0){ $sql2 .= implode(', ', $condition).$where;}
        if ($conn->query($sql2) === TRUE)
        {
          $confirmation = 3;
          echo $confirmation;
        }
        else {
      
          $confirmation = 2;
          echo $sql2; 
      
        }
    
    }
     
  }
}


if(isset($_POST['change_details']))
{
  $update_hp_id = $_POST['hp_update_id'];
  $new_hp_philhealth = $_POST['new_hp_philhealth'];
  $new_diagnosis = $_POST['new_diagnosis'];


  $sql =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$update_hp_id'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $name = $row['resident_id'];
      $disease = $new_diagnosis;

      $sql_checking =  "SELECT * FROM `health_profiles` WHERE `hp_id` != '$update_hp_id' AND `resident_id` = '$name' AND `disease_id` = '$disease' AND `case_status` = '(Active)' ";
      $result_checking = $conn->query($sql_checking);
      if ($result_checking->num_rows > 0)
      {
        $confirmation = 9;
        echo $confirmation; 
      }
      else
      {
        $sql_new_checking =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$update_hp_id' AND `resident_id` = '$name' AND `disease_id` = '$disease' AND `case_status` = '(Active)' ";
        $result_new_checking = $conn->query($sql_new_checking);
        if ($result_new_checking->num_rows > 0)
        {

          $set ="UPDATE `health_profiles` SET  ";
          $where = " WHERE `resident_id` = '$name'";
          $condition = array();

          if( $new_hp_philhealth != "")
          {
            $condition[] = "`phil_health_number`='$new_hp_philhealth'";
          }
          

          $sql2 = $set;
          if (count($condition) > 0){ $sql2 .= implode(', ', $condition).$where;}
          if ($conn->query($sql2) === TRUE)
          {

            //////////////////////////////////////////////////
                $set2 ="UPDATE `health_profiles` SET  ";
                $where2 = " WHERE `hp_id` = '$update_hp_id'";
                $condition2 = array();

                if( $new_diagnosis != "")
                {
                  $condition2[] = "`disease_id`='$new_diagnosis'";
                }

                $new_sql2 = $set2;
                if (count($condition2) > 0){ $new_sql2 .= implode(', ', $condition2).$where2;}
                if ($conn->query($new_sql2) === TRUE)
                {
                  $confirmation = 3;
                  echo $confirmation;
                }
                else {
              
                  $confirmation = 2;
                  echo $new_sql2; 
              
                }
            ////////////////////////////////////////////////////////////

          }
          else {
        
            $confirmation = 2;
            echo $sql2; 
        
          }

        }
        else
        {

          $sql3 =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$name' AND `disease_id` = '$disease' AND `case_status` = '(Inactive)' 
          AND `date_of_death` IS Null AND `date_of_recovery` IS NOT Null";
          $result3 = $conn->query($sql3);
          if ($result3->num_rows > 0)
          {
              $confirmation = 12;
              echo $confirmation; 
          }
          else
          {
    
            $set ="UPDATE `health_profiles` SET  ";
            $where = " WHERE `resident_id` = '$name'";
            $condition = array();
    
            if( $new_hp_philhealth != "")
            {
              $condition[] = "`phil_health_number`='$new_hp_philhealth'";
            }
            
    
            $sql2 = $set;
            if (count($condition) > 0){ $sql2 .= implode(', ', $condition).$where;}
            if ($conn->query($sql2) === TRUE)
            {
    
              //////////////////////////////////////////////////
                  $set2 ="UPDATE `health_profiles` SET  ";
                  $where2 = " WHERE `hp_id` = '$update_hp_id'";
                  $condition2 = array();
    
                  if( $new_diagnosis != "")
                  {
                    $condition2[] = "`disease_id`='$new_diagnosis'";
                  }

                  $condition2[] = "`occurrence_number`='1'";
    
                  $new_sql2 = $set2;
                  if (count($condition2) > 0){ $new_sql2 .= implode(', ', $condition2).$where2;}
                  if ($conn->query($new_sql2) === TRUE)
                  {
                    $confirmation = 3;
                    echo $confirmation;
                  }
                  else {
                
                    $confirmation = 2;
                    echo $new_sql2; 
                
                  }
              ////////////////////////////////////////////////////////////
    
            }
            else {
          
              $confirmation = 2;
              echo $sql2; 
          
            }
    
          }

        }
      }
    }
     
  }
}

if(isset($_POST['occurrence']))
{
  $created_at =  $_POST['created_at'];
  $hp_update_id =  $_POST['hp_update_id'];
  $new_diagnosis =  $_POST['new_diagnosis'];
  $new_hp_philhealth =  $_POST['new_hp_philhealth'];
  $created_at = $_POST['created_at'];

  $sql =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$hp_update_id'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $resident_name_id = $row['resident_id'];
    }
  }


    $sql5 =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' AND `disease_id` = '$new_diagnosis' AND `case_status` = '(Inactive)' 
    AND `date_of_death` IS Null AND `date_of_recovery` = '$created_at'";
    $result5 = $conn->query($sql5);
    if ($result5->num_rows > 0)
    {
      $confirmation = 11;
      echo $confirmation; 
    }
    else
    {

      $sql =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_name_id' && `disease_id` = '$new_diagnosis' ";
      $result = $conn->query($sql);
      if ($result->num_rows > 0)
      {
        $result = mysqli_query($conn,$sql);
        $rowcount=mysqli_num_rows($result);
        $total_hp =  $rowcount;
    
        $total_hp = $total_hp + 1;
    
        $sql2 = "INSERT INTO `health_profiles`(`resident_id`, `disease_id`, `phil_health_number`, `date`, `occurrence_number`) 
        VALUES ('$resident_name_id', '$new_diagnosis', '$new_hp_philhealth', '$created_at', '$total_hp')";
        if ($conn->query($sql2) === TRUE)
        {
            /////////////////////////////////////////////////////////
            $set2 ="UPDATE `health_profiles` SET  ";
            $where2 = " WHERE `resident_id` = '$resident_name_id'";
            $condition2 = array();
            $condition2[] = "`phil_health_number`='$new_hp_philhealth'";
            $new_sql2 = $set2;
            if (count($condition2) > 0){ $new_sql2 .= implode(', ', $condition2).$where2;}
            if ($conn->query($new_sql2) === TRUE)
            {

              $del_sql1 = "DELETE FROM `health_profiles` WHERE  `hp_id` = '$hp_update_id'";
              $result_del1 = $conn->query($del_sql1);
              if ($result_del1 === TRUE)
              {
                $confirmation = 1;
                echo $confirmation;
              }

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


if(isset($_POST['delete']))
{
  $hp_id = $_POST['hp_id'];


  $sql =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$hp_id'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0)
  {
    while($row = $result->fetch_assoc())
    {
      $resident_id = $row['resident_id'];
      $disease_id = $row['disease_id'];

      $sql2 =  "SELECT * FROM `health_profiles` WHERE `resident_id` = '$resident_id' AND `disease_id` = '$disease_id' ";
      $result2 = $conn->query($sql2);
      if ($result2->num_rows > 0)
      {
        $result2 = mysqli_query($conn,$sql2);
        $rowcount=mysqli_num_rows($result2);
        $total_hp =  $rowcount;

        $sql3 =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$hp_id' ";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0)
        {
          while($row3 = $result3->fetch_assoc())
          {
            if( $total_hp == $row3['occurrence_number'])
            {
              $sql_delete = "DELETE FROM `health_profiles` WHERE  `hp_id` = '$hp_id'";
              $result_delete = $conn->query($sql_delete);
              if ($result_delete === TRUE)
              {
                $confirmation = 8;
                echo $confirmation;
              }
            }
            else
            {
              $confirmation = 13;
              echo $confirmation;
            }

          }
      
        }

      }
    }

  }
}


?>