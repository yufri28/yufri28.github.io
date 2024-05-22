var bahasa1 = document.getElementById("bahasa1");
var bahasa2 = document.getElementById("bahasa2");
var terjemahan = document.getElementById("terjemahan");
// bahasa1.innerHTML = "Rote Delha";
// bahasa2.innerHTML = "Indonesia";
var selectedValue = "1";
if (typeof (Storage) !== "undefined") {
  selectedValue = localStorage.setItem("bahasa", "1");
  bahasa1.innerHTML = "Rote Delha";
  bahasa2.innerHTML = "Indonesia";
} else {
  console.log("Maaf ada kesalahan")
}

document.getElementById('pilih-bahasa').addEventListener('change', function () {
  // selectedValue = document.getElementById('pilih-bahasa').value;
  // console.log(selectedValue);
  localStorage.setItem("bahasa", document.getElementById('pilih-bahasa').value);
  selectedValue = localStorage.getItem("bahasa");
  if (selectedValue === "1") {
    bahasa1.innerHTML = "Rote Delha";
    bahasa2.innerHTML = "Indonesia";
  } else if (selectedValue == "2") {
    bahasa1.innerHTML = "Indonesia";
    bahasa2.innerHTML = "Rote Delha";
  }
});

function search() {
  terjemahan.hidden = true;
  var input = document.getElementById("search").value.toLowerCase().split(" "); // Split input menjadi array kata-kata

  var getLang = localStorage.getItem("bahasa");
  // Load the database file
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./kamus-bahasa-rote/kamus.txt", false);
  xhr.send(null);

  var lines = xhr.responseText.split("\n");

  // Search for each word in the input keyword in the database
  var result = "";
  for (var j = 0; j < input.length; j++) { // Loop through each word in the input
    var wordFound = false; // Flag to check if the word is found in the database
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(",");
      if (line.length < 2) {
        continue; // Skip lines that do not have at least two parts
      }
      var keyword = line[0].toLowerCase().trim();
      var meaning = line[1].toLowerCase().trim();

      if (getLang === "1") {
        if (keyword === input[j]) { // Check if the keyword matches the current word in input
          result += meaning.charAt(0).toUpperCase() + meaning.slice(1) + " "; // Add the meaning to the result
          wordFound = true; // Set flag to true as word is found
          break; // Exit loop as word is found
        }
      } else if (getLang === "2") {
        if (meaning === input[j]) { // Check if the meaning matches the current word in input
          result += keyword.charAt(0).toUpperCase() + keyword.slice(1) + " "; // Add the keyword to the result
          wordFound = true; // Set flag to true as word is found
          break; // Exit loop as word is found
        }
      }
    }
    if (!wordFound) { // If the word is not found in the database
      result += input[j] + " "; // Add the original word to the result
    }
  }

  // Display the search result
  var output = document.getElementById("result");
  output.innerHTML = result.trim(); // Trim any extra whitespace
}

// function search() {
//   terjemahan.hidden = true;
//   var input = document.getElementById("search").value.toLowerCase().split(" "); // Split input menjadi array kata-kata

//   var getLang = localStorage.getItem("bahasa");
//   // Load the database file
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "./kamus-bahasa-rote/kamus.txt", false);
//   xhr.send(null);

//   var lines = xhr.responseText.split("\n");

//   // Search for each word in the input keyword in the database
//   var result = "";
//   for (var j = 0; j < input.length; j++) { // Loop through each word in the input
//     var wordFound = false; // Flag to check if the word is found in the database
//     for (var i = 0; i < lines.length; i++) {
//       var line = lines[i].split(",");
//       var keyword = line[0].toLowerCase().trim();
//       var meaning = line[1].toLowerCase().trim();

//       if (getLang === "1") {
//         if (keyword === input[j]) { // Check if the keyword matches the current word in input
//           result += meaning.charAt(0).toUpperCase() + meaning.slice(1) + " "; // Add the meaning to the result
//           wordFound = true; // Set flag to true as word is found
//           break; // Exit loop as word is found
//         }
//       } else if (getLang === "2") {
//         if (meaning === input[j]) { // Check if the meaning matches the current word in input
//           result += keyword.charAt(0).toUpperCase() + keyword.slice(1) + " "; // Add the keyword to the result
//           wordFound = true; // Set flag to true as word is found
//           break; // Exit loop as word is found
//         }
//       }
//     }
//     if (!wordFound) { // If the word is not found in the database
//       result += "Tidak diketahui "; // Add "Tidak diketahui" to the result
//     }
//   }

//   // Display the search result
//   var output = document.getElementById("result");
//   output.innerHTML = result.trim(); // Trim any extra whitespace
// }

// function search() {
//   terjemahan.hidden = true;
//   var input = document.getElementById("search").value.toLowerCase();

//   var getLang = localStorage.getItem("bahasa");
//   // Load the database file
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "./kamus-bahasa-rote/kamus.txt", false);
//   xhr.send(null);

//   var lines = xhr.responseText.split("\n");

//   // Search for the input keyword in the database
//   var result = "";
//   for (var i = 0; i < lines.length; i++) {
//     var line = lines[i].split(",");
//     var keyword = line[0].toLowerCase();
//     var meaning = line[1].toLowerCase();

//     if (getLang === "1") {
//       if (keyword.trim() === input.trim()) {
//         result = meaning.charAt(0).toUpperCase() + meaning.slice(1);
//         console.log(meaning.slice(1));
//         break;
//       } else if (input === "") {
//         result = "Tidak diketahui";
//       } else {
//         result = "Tidak diketahui";
//       }
//     } else if (getLang === "2") {
//       if (meaning.trim() === input.trim()) {
//         result = keyword.charAt(0).toUpperCase() + keyword.slice(1);
//         console.log(result);
//         break;
//       } else if (input === "") {
//         result = "Tidak diketahui";
//       } else {
//         result = "Tidak diketahui";
//       }
//     }
//   }


//   // Display the search result
//   var output = document.getElementById("result");
//   output.innerHTML = result;
//   console.log(result)
// }

