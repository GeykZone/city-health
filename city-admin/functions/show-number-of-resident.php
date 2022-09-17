
<?php   include('../../route.php'); ?> 

<br>
<br> 
<style>
    #rs_chart_barangay
    {
        width: 10% !important;
    }
    #rs_chart_total
    {
        width: 100% !important;
    }
      </style>
      <hr class="mt-0">
      <table class="table mb-0" id="number_of_residents_chart">
      <thead class="table-info fw-semibold">
          <tr class="align-middle">
          <th id="rs_chart_barangay">Barangay</th>
          <th id="rs_chart_total" class=" text-center" >Total Number of Residents</th>
          <th ></th>
          </tr>
      </thead>
      <tbody id="number_of_residents_chart_body">
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
              ?>
              <tr class="align-middle">
                      <td>
                      <div><?php echo $row['barangay_name']; ?></div>
                      </td>
                      <td>
                      <div class="progress">
                          <div class=" progress-bar" role="progressbar" style="width:<?php 
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
                              $rowcount = ($rowcount*100);
                              $rowcount = $rowcount /  $old_rowcount;
                              echo  $rowcount;
                          }
                          else
                          {
                              echo  $rowcount;
                          }

                          ?>%;  background-color:#3b7ddd;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" ></div>
                      </div>
                      </td>
                      <td>
                      <div class="clearfix">
                          <div class="float-start">
                          <div class="fw-semibold"><?php   echo $total_residents ?></div>
                          </div>
                      </div>
                      </td>
                  </tr>
              <?php 
              }
              ?>
              <?php
              }
              ?>
      </tbody>
      </table>

<script>
    $(document).ready(function()
    {
        load_data_chart();
    })
</script>