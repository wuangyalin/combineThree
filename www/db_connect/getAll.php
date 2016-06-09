<?php

// Include confi.php
include_once('db_config.php');

$action=isset($_GET['action']) ? mysql_real_escape_string($_GET['action']) :  "";

$action = "getlink";
if($action=="getlink"){ 
	$result=mysql_query("select * from `users`"); 
	// $result=mysql_fetch_array($query); 
	$emparray = array();

	while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
	    $list=array("username"=>$row["username"],"password"=>$row["password"]); 
	    $emparray[] = $list;
	}
	echo json_encode($emparray); 
}
