
<?php include '../connection/connect.php' ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="CoreUI - Open Source Bootstrap Admin Template">
    <meta name="author" content="Łukasz Holeczek">
    <meta name="keyword" content="Bootstrap,Admin,Template,Open,Source,jQuery,CSS,HTML,RWD,Dashboard">
    <title>Adder</title>
    <link rel="apple-touch-icon" sizes="57x57" href="../resourcess/assets/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="../resourcess/assets/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="../resourcess/assets/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="../resourcess/assets/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="../resourcess/assets/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="../resourcess/assets/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="../resourcess/assets/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="../resourcess/assets/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../resourcess/assets/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="../resourcess/assets/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../resourcess/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="../resourcess/assets/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../resourcess/assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="../resourcess/assets/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="../resourcess/assets/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <!-- Vendors styles-->
    <link rel="stylesheet" href="../resourcess/vendors/simplebar/css/simplebar.css">
    <link rel="stylesheet" href="../resourcess/css/vendors/simplebar.css">

    <!--jquery-->
    <script src="../resourcess/js/jquery.min.js"></script>

      <!-- Main styles for this application-->
    <link href="../resourcess/css/style.css" rel="stylesheet">

    <!--usingjquery to create cokkie-->
    <script src="../resourcess/js-cookie/js.cookie.min.js"></script>


    <!--jquery data tables-->
    <link rel="stylesheet" type="text/css" href="../resourcess/DataTables/datatables.min.css"/>
    <script type="text/javascript" src="../resourcess/DataTables/datatables.min.js"></script>


    <!--icons-->
    <script src="../resourcess/fontawesome-free/js/all.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../resourcess/fontawesome-free/css/all.css">


    <!-- Select2 4.1.0 -->
    <script src="../resourcess/selectized/selectize.min.js" ></script>
    <link rel="stylesheet" href="../resourcess/selectized/selectize.bootstrap5.css"  />

          
    <!--alert -->
    <script src="../resourcess/sweetalert2/sweetalert2.all.min.js"></script>
    <link rel='stylesheet' href='../resourcess/sweetalert2/sweetalert2.min.css'>


    <!--datepicker-->
    <link href = "../resourcess/jquery-ui-1.13.2.custom/jquery-ui.css" rel = "stylesheet">
    <script src = "../resourcess/jquery-ui-1.13.2.custom/jquery-ui.js"></script>

    <!--chart-->
    <script src="../resourcess/chartjs/chart.min.js" ></script>

    <!--map-->
    <link href="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.css" rel="stylesheet">
    <script src="https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl.js"></script>

    <!--tooltip-->
    <script src="../resourcess/opentip_tooltips/opentip-jquery-excanvas.js"></script><!-- Change to the adapter you actually use -->
    <link href="../resourcess/opentip_tooltips/opentip.css" rel="stylesheet" type="text/css" />
</head>
<body>

<form method="POST" action="post.php" id = "adder">

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Year</label>
    <select class="form-select" aria-label="Default select example" name="select_year" id="select_year" required>
    <option value="">Select</option>
    <option value="2020-01-01">2020</option>
    <option value="2021-01-01">2021</option>
    <option value="2022-01-01">2022</option>
    <option value="other">other</option>
    </select>
  </div>

  <fieldset id="2020_2021">

    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">barangay</label>
      <select class="form-select" aria-label="Default select example" name="select_brg" id="select_brg" >
          <option value="">Select</option>
      <?php
      $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays` order by barangay_name Asc";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          ?>
        <option value="<?php echo $row['id']; ?>"><?php echo $row['barangay_name']; ?></option>
        <?php 
      }
      ?>
      <?php
        }
      ?>
      </select>

    </div>

  </fieldset>

  <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Disease</label>
      <select class="form-select" aria-label="Default select example" name="select_disease" id="select_disease" required>
      <option value="">Select</option>
      <?php
      $sql = "SELECT * FROM `diseases` ORDER BY disease_name ASC";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          ?>
        <option value="<?php echo $row['id']; ?>"><?php echo $row['disease_name']; ?></option>
        <?php 
      }
      ?>
      <?php
        }
      ?>
      </select>
    </div>

  

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Number of insertion</label>
    <input type="number" class=" form-control" placeholder="number of insertion" required name="insertion" id="insertion">
  </div>


  <button type="submit" name='submit_form' id="submit_form" class="btn btn-primary">Submit</button>
</form>

<button class=" btn btn-warning text-light  mt-3 " id="switch">Switch to recoveries</button>

<form method="POST" action="post.php" id = "recoverer" class=" d-none mt-3">

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Recover Year</label>
    <select class="form-select" aria-label="Default select example" name="select_rec_year" id="select_rec_year" required>
    <option value="">Select</option>
    <option value="BETWEEN '2020-01-01' AND '2021-12-31'">2020-2021</option>
    <option value="BETWEEN '2022-01-01' AND '2022-12-31'">2022</option>
    </select>
  </div>

  <fieldset id="rec_2020_2021">

    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Recoverer from barangay</label>
      <select class="form-select" aria-label="Default select example" name="rec_brg" id="rec_brg" >
          <option value="">Select</option>
      <?php
      $sql = "SELECT `id`, `barangay_name`, `lat`, `long` FROM `barangays` order by barangay_name Asc";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          ?>
        <option value="<?php echo $row['id']; ?>"><?php echo $row['barangay_name']; ?></option>
        <?php 
      }
      ?>
      <?php
        }
      ?>
      </select>

    </div>

    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Recover from Disease</label>
      <select class="form-select" aria-label="Default select example" name="select_rec_disease" id="select_rec_disease" >
      <option value="">Select</option>
      <?php
      $sql = "SELECT * FROM `diseases` ORDER BY disease_name ASC";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          ?>
        <option value="<?php echo $row['id']; ?>"><?php echo $row['disease_name']; ?></option>
        <?php 
      }
      ?>
      <?php
        }
      ?>
      </select>
    </div>

  </fieldset>

  

  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Number of insertion</label>
    <input type="number" class=" form-control" placeholder="number of insertion" required name="rec_insertion" id="rec_insertion">
  </div>


  <button type="submit" name='rec_submit_form' id="rec_submit_form" class="btn btn-primary">Submit</button>
</form>
    
</body>

<script>

  $(document).ready(function()
  {

    $("#select_year").change(function()
    {
      if($(this).val() === "2022-01-01")
      {
        $("#2020_2021").addClass('d-none')
  
      }
      else
      {
        $("#2020_2021").removeClass('d-none')

      }

    })

    $("#switch").click(function()
    {
      if($(this).text() === "Switch to recoveries")
      {
        $(this).text("Switch to hp")
        $("#recoverer").removeClass("d-none")
        $("#adder").addClass("d-none")
      }
      else if($(this).text() === "Switch to hp")
      {
        $(this).text("Switch to recoveries")
        $("#recoverer").addClass("d-none")
        $("#adder").removeClass("d-none")
      }
    

    })

    $("#select_rec_year").change(function()
    {
      if($(this).val() === "BETWEEN '2022-01-01' AND '2022-12-31'")
      {
        $("#rec_2020_2021").addClass('d-none')
        $("#rec_brg").addClass('d-none')
        $("#select_rec_disease").addClass('d-none')
  
      }
      else
      {
        $("#rec_2020_2021").removeClass('d-none')
        $("#rec_brg").removeClass('d-none')
        $("#select_rec_disease").removeClass('d-none')

      }

    })

    select_list() 
    
  })

  // selectize ordinary
function select_list() 
{
  $('select').selectize({
    // maxItems: '1',
    sortField: 'text'
    });
}
// selectize ordinary end

</script>
</html>