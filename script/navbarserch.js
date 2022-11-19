function searchItem(){
    window.location.href = "lodraka.html?" + document.getElementById("boxsearch").value;
    console.log(document.getElementById("boxsearch").value);
}

window.addEventListener('load', (event) => {
    var input = document.getElementById("boxsearch");
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("buttonsearch").click();
        }
    });
});
