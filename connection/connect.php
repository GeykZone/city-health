<?php
session_start();

$database = "hpcs_data";
$hostname = "localhost";
$username = "root";
$password = "";


$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
  die("Connection failed: " . $conn->connect_error);
}
 ?>

