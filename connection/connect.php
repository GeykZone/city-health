<?php
session_start();

$hostname = "localhost";
$database = "hpcs_data";
$username = "root";
$password = "";


$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
  die("Connection failed: " . $conn->connect_error);
}
 ?>

