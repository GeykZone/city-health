<?php
session_start();

$hostname = "sql6.freesqldatabase.com";
$database = "sql6518544";
$username = "sql6518544";
$password = "YlWC7MT72R";


$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error)
{
  die("Connection failed: " . $conn->connect_error);
}
 ?>

