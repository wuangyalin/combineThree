<?php

// Include confi.php
include_once('db_config.php');

$action=isset($_GET['action']) ? mysql_real_escape_string($_GET['action']) :  "";
$name = isset($_GET['name']) ? mysql_real_escape_string($_GET['name']) :  "";
if($action=="getlink"){ 
    $query=mysql_query("select * from `models` where obj_name='$name'"); 
    $row=mysql_fetch_array($query); 
    $list=array("name"=>$row["obj_name"],"type"=>$row["obj_type"],"category"=>$row["obj_category"],"path"=>$row["obj_path"],
    	"width"=>$row["obj_width"],
    	"length"=>$row["obj_length"],
    	"height"=>$row["obj_height"],
    	"material"=>$row["obj_material"],); 
    echo json_encode($list); 
} 
