<?php   include('../../../route.php'); ?>
<?php

if(isset($_POST['hp_update_id']))
{
  $update_hp_id = $_POST['hp_update_id'];
  $new_hp_philhealth = $_POST['new_hp_philhealth'];
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

        if( $new_hp_philhealth != "")
        {
          $condition[] = "`phil_health_number`='$new_hp_philhealth'";
        }

        if($status === "Active")
        {
          $condition[] = "`case_status`='(Active)'";
          $where = " WHERE `hp_id` = '$update_hp_id' AND `disease_id` = '$disease'";
        }
        else if($status === "Inactive (Recovered)")
        {
          $condition[] = "`case_status`='(Inactive)'";
          $condition[] = "`recovery`='Fully Recovered'";
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


if(isset($_POST['delete']))
{
  $hp_id = $_POST['hp_id'];

    $sql = "DELETE FROM `health_profiles` WHERE  `hp_id` = '$hp_id'";
    $result = $conn->query($sql);
    if ($result === TRUE)
    {
      $confirmation = 8;
      echo $confirmation;
    }
}


?>