var sheetName = 'Sheet1'; // Nama sheet yang sesuai
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup() {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doGet() {
    try {
        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
        var sheet = doc.getSheetByName(sheetName);

        var data = sheet.getDataRange().getValues();
        var headers = data[0]; // Mengambil header dari data
        var rows = [];

        // Mengambil data dalam bentuk array objek
        for (var i = 1; i < data.length; i++) {
            var rowData = {};
            for (var j = 0; j < headers.length; j++) {
                rowData[headers[j]] = data[i][j];
            }
            rows.push(rowData);
        }

        return ContentService
            .createTextOutput(JSON.stringify(rows))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// function doPut(e) {
//    var postData = JSON.parse(e.postData.contents);
//   updatePoin(e);
// }

// function testPost(){
//   var postData = {
//     mod: 'tambah',
//     nama: 'Regu 3',
//     poin: 100,
//     win: 0,
//     id: 1
//   }

//   testDoPos(postData);
// }

// function testDoPos(e){
//    var lock = LockService.getScriptLock();
//     lock.tryLock(10000);
//     // Identifikasi jenis tindakan (tambah/edit)
//     var action = e.mod;

//   if(action === 'add'){

//     try {
//       var scriptProp = PropertiesService.getScriptProperties();
//       var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
//       var sheetName = 'Sheet1'; // Ganti dengan nama sheet yang sesuai
//       var sheet = doc.getSheetByName(sheetName);

//       var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
//       var nextRow = sheet.getLastRow() + 1;

//       // var newRow = headers.map(function(header) {
//       //   return header === 'timestamp' ? new Date() : e.parameter[header];
//       // });
//       var newRow = headers.map(function(header) {
//         switch (header) {
//           case 'timestamp':
//             return new Date();
//           case 'NAMA':
//             return e.nama;
//           case 'POIN':
//             return e.poin;
//           case 'WIN':
//             return e.win;
//           case 'ID':
//             return e.id;
//           default:
//             return ''; // Mengembalikan string kosong untuk header lainnya
//         }
//       });

//       sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

//       return ContentService
//         .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
//         .setMimeType(ContentService.MimeType.JSON);
//     } catch (error) {
//       return ContentService
//         .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
//         .setMimeType(ContentService.MimeType.JSON);
//     } finally {
//       lock.releaseLock();
//     }
//   }else{
//       // Ambil data dari spreadsheet
//       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//       var data = sheet.getDataRange().getValues();

//       // Cari baris yang sesuai dengan ID yang diberikan
//         var rowIndex = data.findIndex(function(row) {
//           return row[1] == e.id; // Kolom ID ada di indeks 1
//         });


//         for (var i = 1; i < data.length; i++) {
//           var id = data[i][1]; // ID berada di kolom kedua (indeks 1)
//           if(id === rowIndex){
//               if(e.mod === 'tambah'){
//                 data[i][3] += e.poin
//               }else{
//                 data[i][3] -= e.poin
//               }
//               sheet.getRange(i + 1, 4).setValue(data[i][3]); // Kolom 2 untuk Nama
//           }
//         }  
//   }
// }

function doPost(e) {

    var lock = LockService.getScriptLock();
    lock.tryLock(10000);
    // Identifikasi jenis tindakan (tambah/edit)
    var action = e.mod;

    if (action == 'add') {
        try {
            var scriptProp = PropertiesService.getScriptProperties();
            var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
            var sheetName = 'Sheet1'; // Ganti dengan nama sheet yang sesuai
            var sheet = doc.getSheetByName(sheetName);

            var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            var nextRow = sheet.getLastRow() + 1;

            // var newRow = headers.map(function(header) {
            //   return header === 'timestamp' ? new Date() : e.parameter[header];
            // });

            var newRow = headers.map(function (header) {
                switch (header) {
                    case 'timestamp':
                        return new Date();
                    case 'NAMA':
                        return e.nama;
                    case 'POIN':
                        return e.poin;
                    case 'WIN':
                        return e.win;
                    case 'ID':
                        return e.id;
                    default:
                        return ''; // Mengembalikan string kosong untuk header lainnya
                }
            });

            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

            return ContentService
                .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
                .setMimeType(ContentService.MimeType.JSON);
        } catch (error) {
            return ContentService
                .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.message }))
                .setMimeType(ContentService.MimeType.JSON);
        } finally {
            lock.releaseLock();
        }
    } else {
        // Ambil data dari spreadsheet
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        var data = sheet.getDataRange().getValues();

        // Cari baris yang sesuai dengan ID yang diberikan
        var rowIndex = data.findIndex(function (row) {
            return row[1] == e.id; // Kolom ID ada di indeks 1
        });

        for (var i = 1; i < data.length; i++) {
            var id = data[i][1]; // ID berada di kolom kedua (indeks 1)
            if (id === rowIndex) {
                if (e.mod === 'tambah') {
                    data[i][3] += e.poin
                } else {
                    data[i][3] -= e.poin
                }
                sheet.getRange(i + 1, 4).setValue(data[i][3]); // Kolom 2 untuk Nama
            }
        }
    }

}


function doDelete(e) {
    try {
        var rowId = e.parameter.rowId; // ID baris yang akan dihapus

        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
        var sheet = doc.getSheetByName(sheetName);

        var data = sheet.getDataRange().getValues();

        // Mencari baris dengan ID yang sesuai dan menghapusnya
        for (var i = 1; i < data.length; i++) {
            if (data[i][0] == rowId) { // Kolom ID ada di kolom pertama
                sheet.deleteRow(i + 1); // Menghapus baris yang sesuai (i + 1 karena indeks dimulai dari 0)
                return ContentService
                    .createTextOutput(JSON.stringify({ 'result': 'success' }))
                    .setMimeType(ContentService.MimeType.JSON);
            }
        }
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Row not found' }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}


function updatePoin(params) {
    console.log('masuk tambah sini')
    // console.log(params)
    // Ambil data dari spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();

    // Cari baris yang sesuai dengan ID yang diberikan
    var rowIndex = data.findIndex(function (row) {
        return row[1] == params.id; // Kolom ID ada di indeks 1
    });

    console.log('masuk tambah sini')
    for (var i = 1; i < data.length; i++) {
        var id = data[i][1]; // ID berada di kolom kedua (indeks 1)
        if (id == rowIndex) {
            if (params.mod === 'tambah') {
                data[i][3] += params.poin
            } else {
                data[i][3] -= params.poin
            }
            sheet.getRange(i + 1, 4).setValue(data[i][3]); // Kolom 2 untuk Nama
        }
    }
}
