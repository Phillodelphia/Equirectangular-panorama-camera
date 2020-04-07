<!doctype html>
<html>
<head>
<title>Åva Admin</title>
</head>
<body>
<h1>ERPC admin page</h1>

<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
Add pictures <input type='number' name='num'>
<input type='submit' name='submit'>
</form>

</body>

</html>

<?php
$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "360pictures";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
 
$sql = "SELECT * FROM pictures";

$result = mysqli_query($conn, $sql);

if (isset($_POST['num'])) {
$numb = 1;
$chang = 0;
$num = $_POST['num'];
while ($num >= $numb){
	
	$sqlC = "SELECT * FROM pictures WHERE id=$numb";

	$check = mysqli_query($conn, $sqlC);
	
	if ($check !== true) {
		$insert = "INSERT INTO pictures(id) VALUES ($numb)";
		$chang++;
		mysqli_query($conn, $insert);
		
	}
	$numb++;
}
echo "<p>added " . $chang . " new entries</p>"; 
}

while ($content = mysqli_fetch_assoc($result)) {
	echo "<form action='changes.php' method='post' enctype='multipart/form-data'>";
	
	echo $content['id'] . ".<br>";
	echo "<input type='hidden' name='id' value='" . $content['id'] . "'>";
	echo "Header: <input type='text' name='header' value='" . $content['header'] . "'><br>";
	echo "Picture: <input type='file' name='fileUpload' id='fileUpload'><br>";
	echo "<p> Current picture: " . $content['picture'] . "</p>";
	echo "Description: <input type='text' name='desc' value='" . $content['description'] . "'><br>";
	echo "<p>Changed last " . $content['time'] . "</p><br>";
	echo "<input type='submit' name='submit'>";
	
	echo "</form>";
}

?>