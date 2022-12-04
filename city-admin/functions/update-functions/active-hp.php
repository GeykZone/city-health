<?php   include('../../../route.php'); ?>

<?php
if (isset($_POST['hp_id']))
{
    $active_hp = $_POST['hp_id'];

  $sql =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$active_hp'";
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

        $sql3 =  "SELECT * FROM `health_profiles` WHERE `hp_id` = '$active_hp' ";
        $result3 = $conn->query($sql3);
        if ($result3->num_rows > 0)
        {
          while($row3 = $result3->fetch_assoc())
          {
            if( $total_hp == $row3['occurrence_number'])
            {
              $sql4 = "UPDATE `health_profiles` SET  `date_of_death` = NULL, `cause_of_death` = NULL, `other_cause_of_death`= NULL 
              WHERE `resident_id` = '$resident_id' AND `date_of_death` IS NOT Null ";
              if ($conn->query($sql4) === TRUE)
              {

                $sql5 = "UPDATE `health_profiles` SET `case_status` = '(Active)', `recovery`=NULL, `date_of_recovery`= NULL
                WHERE `hp_id` = '$active_hp'";
                if ($conn->query($sql5) === TRUE)
                {
                    $sql6 = "UPDATE `health_profiles` SET `case_status` = '(Active)',  `recovery`=NULL, `date_of_recovery`= NULL
                    WHERE `resident_id` = '$resident_id' AND  `date_of_recovery` IS Null";
                    if ($conn->query($sql6) === TRUE)
                    {
                      $confirmation = 5;
                      echo $confirmation;
                    }
                    else
                    {
                      $confirmation = 2;
                      echo $confirmation;
                    }
                }
              }
            }
            else
            {
              $confirmation = 10;
              echo $confirmation;
            }

          }
      
        }

      }
    }

  }

}
?>