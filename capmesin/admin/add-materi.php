<?php
if(isset($_POST['upload'])){
    // Pastikan judul materi tidak mengandung karakter yang tidak valid untuk nama file atau direktori
    $judul_materi = 'Pertemuan_3';

    // Path Folder untuk menyimpan gambar jpg hasil konversi pdf ke gambar
    $folder = '../Materi/';

    // Check if file was uploaded without errors
    if(isset($_FILES["file"]) && $_FILES["file"]["error"] == 0){
        $file_name = $_FILES["file"]["name"];
        $temp_name = $_FILES["file"]["tmp_name"];
        
        // Specify the destination directory and file name
        $destination_folder = $folder . $judul_materi . '/';
        $destination_pdf = $destination_folder . $file_name;
        
        // Create the directory if it doesn't exist
        if (!is_dir($destination_folder)) {
            mkdir($destination_folder, 0755, true); // Tambahkan mode 0755 untuk memberikan izin yang sesuai
        }

        // Move the uploaded file to the destination directory
if(move_uploaded_file($temp_name, $destination_pdf)){
    // Tambahkan delay selama 3 detik (misalnya)
    sleep(3);

    // Cek apakah file PDF dapat dibaca
    if(file_exists($destination_pdf)) {
        // Convert PDF to JPG
        $imagick = new Imagick();
        $imagick->setResolution(300, 300); // Atur resolusi untuk kualitas gambar yang lebih baik
        $imagick->readImage($destination_pdf . '[0]'); // Hanya konversi halaman pertama
        $imagick->setImageFormat('jpg');
        $page_name = 'page_1.jpg'; // Nama file untuk halaman pertama
        $imagick->writeImage($destination_folder . $page_name);
        $imagick->clear();

        echo "File uploaded and converted successfully.";
    } else {
        echo "Error: File PDF tidak ditemukan.";
    }
} else {
    echo "Error uploading file.";
}

    } else {
        echo "Error: No file uploaded.";
    }
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <form action="" method="post" enctype="multipart/form-data">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">File</label>
            <input type="file" name="file" class="form-control" id="exampleFormControlInput1"
                placeholder="name@example.com">
        </div>
        <button class="btn btn-primary" type="submit" name="upload">
            Simpan
        </button>
    </form>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>
</body>

</html>