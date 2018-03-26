<?php
	function base64_to_jpeg($base64_string, $output_file) {
		// open the output file for writing
		$ifp = fopen( $output_file, 'wb' ); 
		$data = explode( ',', $base64_string );

		fwrite( $ifp, base64_decode( $data[ 1 ] ) );

		fclose( $ifp ); 

		return $output_file; 
	}

	$userAnswer = $_POST['name'];
	base64_to_jpeg($userAnswer, 'tmp22.jpg')


	// $filename = 'tmp22' . uniqid() . '.jpg'
	// $mainName = 'tmp22-';
	// $extension = 'jpg';
	// $filename = $mainName . uniqid() . '.' . $extension;

	// function base64_to_jpeg($base64_string, $filename) {
	// 	// open the output file for writing
	// 	$ifp = fopen( $filename, 'wb' ); 
	// 	$data = explode( ',', $base64_string );

	// 	fwrite( $ifp, base64_decode( $data[ 1 ] ) );

	// 	fclose( $ifp ); 

	// 	return $filename; 
	// }

	// $userAnswer = $_POST['name'];
	// base64_to_jpeg($userAnswer, $filename);
	// echo $filename;
?>