function search() {
  var terjemahan = document.getElementById("terjemahan");
  terjemahan.hidden = true;
  var input = document.getElementById("search").value.toLowerCase();

  // Load the database file
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "kamus.txt", false);
  xhr.send(null);

  var lines = xhr.responseText.split("\n");

  // Search for the input keyword in the database
  var result = "";
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].split(",");
    var keyword = line[0].toLowerCase();
    var meaning = line[1];

    if (keyword === input) {
      result = meaning;
      break;
    } else if (input === "") {
      result = "Tidak diketahui";
      break;
    } else {
      result = "Tidak diketahui";
    }
  }

  // Display the search result
  var output = document.getElementById("result");
  output.innerHTML = result;
}
