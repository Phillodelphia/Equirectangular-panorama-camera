<?php
$dbServername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "360pictures";

$conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

$target_dir = "Img/";
$target_file = $target_dir . basename($_FILES['fileUpload']['name']);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

$newH = $_POST['header'];
$id = $_POST['id'];
$newD = $_POST['desc'];

$sql = "SELECT * FROM pictures";
$amount = mysqli_num_rows(mysqli_query($conn, $sql));
$count = 1;

$f = $target_dir . "" . $_FILES['fileUpload']['name'];
$sql2 = "UPDATE pictures SET picture='$f' WHERE id='$id'"; 
//$timeupdate = "UPDATE pictures SET time='NOW()' WHERE id='$id'";

	if (!empty($_POST['header'])) { //change in header
		$change = "UPDATE pictures SET header='$newH' WHERE id=$id";
		mysqli_query($conn, $change);
		
	}
	if(!empty($_POST['desc'])) { //change in description
		$change = "UPDATE pictures SET description='$newD' WHERE id=$id";
		mysqli_query($conn, $change);
	}
	
 //check if the user wanted to change their profile picture

/*
$check = getimagesize($_FILES['fileUpload']['tmp_name']);
if ($check !== false) {
$f = $target_dir . "" . $_FILES['fileUpload']['name'];
$sql2 = "UPDATE pictures SET picture='$f' WHERE id='$id'"; 

	$uploadOk = 1;
}
else {
	echo "File is not an image";
	$uploadOk = 0;
}



if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) { //check for image types
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
*/
if (file_exists($target_file)) { //check if the file exist 

		$uploadOk = 1;


	if ($uploadOk == 1) { //ok to upload 
			
	if (mysqli_query($conn, $sql2)) {
		echo "Successfully updated picture";
	}
	else {
		echo "Error: " . mysqli_error($conn);
	}
			echo "<img src='" . "Img/".$_FILES['fileUpload']['name'] . "'></img>";
			echo "Changes are complete";
			
		
	}
	else {
echo "Your file could not be accessed."; 
	}		

}
else {
	echo "Error file doesn't exist in webbserver.";
}

?>

<script type='text/javascript' src='import.js'></script>