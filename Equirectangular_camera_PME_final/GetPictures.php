<?php
$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "360pictures";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
$fullString = "";

$array = [];
$sql = "SELECT * FROM pictures";
$result = mysqli_query($conn, $sql);
$num = 0;


while ($row = mysqli_fetch_assoc($result)) {
$array[$num] = $row['picture'];

$num++;

}

$temp = null;

$i = 0;
foreach ($array as $value) {
$fullString = $fullString . $value . " ";
$temp[$i] = $value;
$i++;
}

echo $fullString;
?>