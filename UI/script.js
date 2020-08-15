const button = document.querySelector('button');
const spinner = document.querySelector('.spinner');
const result = document.querySelector('.result');

const doStuffs = _ => {
  spinner.classList.remove('hide');
  spinner.classList.add('show');
  setTimeout(showHint, 1000);
}



function showHint() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
      spinner.classList.remove('show');
      spinner.classList.add('hide');
      result.innerHTML = this.responseText
    };
  };

  xmlhttp.onerror = function() {
    alert('Error');
    result.innerHTML = "<div>Failed!!!</div>"
  }

  

  xmlhttp.open("GET", "http://localhost/ap/api/get/", true);
  xmlhttp.send();
};


button.addEventListener('click', doStuffs)