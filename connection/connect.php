<?php
session_start();

$hostname = "127.0.0.1";
$database = "hpcs_data";
$username = "root";
$password = "";


$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
  die("Connection failed: " . $conn->connect_error);
}
 ?>

