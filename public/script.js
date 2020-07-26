function getDescription(parent, year, descr) {
    const pY = document.createElement("p");
    const nameY = document.createElement("span");
    const valueY = document.createElement("span");
    const pD = document.createElement("p");
    const nameD = document.createElement("span");
    const valueD = document.createElement("span");

    pY.style.marginBottom = '0';
    nameY.className = "font-weight-bold";
    nameY.innerHTML = "Рік видання:";
    valueY.className = "params";
    valueY.innerHTML = year;
    pD.style.marginBottom = "0";
    nameD.className = "font-weight-bold";
    nameD.innerHTML = "Опис:";
    valueD.className = "params";
    valueD.innerHTML = descr;

    pY.appendChild(nameY);
    pY.appendChild(valueY);
    pD.appendChild(nameD);
    pD.appendChild(valueD);
    parent.appendChild(pY);
    parent.appendChild(pD);
    parent.childNodes[2].style = "display: none";
}

function getDescriptionEng(parent, year, descr) {
    const pY = document.createElement("p");
    const nameY = document.createElement("span");
    const valueY = document.createElement("span");
    const pD = document.createElement("p");
    const nameD = document.createElement("span");
    const valueD = document.createElement("span");

    pY.style.marginBottom = '0';
    nameY.className = "font-weight-bold";
    nameY.innerHTML = "Year of publishing:";
    valueY.className = "params";
    valueY.innerHTML = year;
    pD.style.marginBottom = "0";
    nameD.className = "font-weight-bold";
    nameD.innerHTML = "Description:";
    valueD.className = "params";
    valueD.innerHTML = descr;

    pY.appendChild(nameY);
    pY.appendChild(valueY);
    pD.appendChild(nameD);
    pD.appendChild(valueD);
    parent.appendChild(pY);
    parent.appendChild(pD);
    parent.childNodes[2].style = "display: none";
}

document.getElementById('request').onsubmit = async function () {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const comment = document.getElementById('comment').value;

    if(name !== '' && phone !== '' && comment !== '' && isValid(phone)) {
        let request = {
            name: name,
            phone: phone,
            comment: comment
        };
        let response = await fetch('/request', {
            method: "POST",
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(request)
        });
        let result = await response.json();
        alert("Ваша заявка прийнята");
        return true;
    }
    else
    {
        alert("Заповніть форму коректно будь ласка");
        return false;
    }
};

document.getElementById('phone').onblur = function()
{
  const phone = document.getElementById('phone').value;
  if (!isValid(phone))
  {
      let err = document.getElementById('phoneerr');
      err.className = "phonerr";
      err.className = "text-danger";
  }
};

document.getElementById('phone').onfocus = function()
{
    let err = document.getElementById('phoneerr');
    err.className = "telerr";
};

function isValid(number)
{
    const validator = /^\d[\d\(\)\ -]{4,14}\d$/;
    return validator.test(number);
}

