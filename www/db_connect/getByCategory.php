<?php

// Include confi.php
include_once('db_config.php');

$action=isset($_GET['action']) ? mysql_real_escape_string($_GET['action']) :  "";
$category = isset($_GET['category']) ? mysql_real_escape_string($_GET['category']) :  "";
if($action=="getlink"){ 
	$result=mysql_query("select * from `models` where obj_category='$category'"); 
	// $result=mysql_fetch_array($query); 
	$emparray = array();

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	/*    $list=array("name"=>$row["obj_name"],"type"=>$row["obj_type"],"category"=>$row["obj_category"],"path"=>$row["obj_path"],
	    	"width"=>$row["obj_width"],
	    	"length"=>$row["obj_length"],
	    	"height"=>$row["obj_height"],
	    	"material"=>$row["obj_material"],); */
	    $emparray[] = $row["obj_name"];
	}
	echo json_encode($emparray); 
} 
