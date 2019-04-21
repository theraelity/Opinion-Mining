window.addEventListener('DOMContentLoaded', init);

function init() {
    console.log('Init() is called.');
    var startButton = document.querySelector("#start");
    startButton.addEventListener('click',doGeneralPage);
}

function doGeneralPage() {
    fetch('http://localhost:1234/show', {
        method: "GET",
        headers: {
            "Content-Type": "application/JSON"
        }
    }).then(res => {
        res.json().then(data => {
            data.forEach((obj) => {
                createHotelRow(obj);
            })

        }).catch(err => console.log('JSON Parse Error.'))
    }).catch(err => console.log('Server Error.', err));
}

function doHotelPage(hotel) {
    fetch('http://localhost:1234/hotel/' + hotel, {
        method: "GET",
        headers: {
            "Content-Type": "application/JSON"
        }
    });
}

function createHotelRow(obj) {
    var thead = document.querySelector("#tableHead");
    var tbody = document.querySelector('#hotelRatingsTable');
    var tr = tbody.insertRow(-1);
    var td1 = tr.insertCell(0);
    var link = document.createElement('a');
    link.innerText = obj.hotel;
    link.setAttribute('href', 'http://localhost:1234/hotel/' + obj.hotel);
    link.setAttribute('style', 'text-decoration:none; color:green;');
    td1.appendChild(link);
    td1.addEventListener('click', function () {
        doHotelPage(obj.hotel);
    });
    var td2 = tr.insertCell(1);
    td2.innerHTML = obj.avgScore;
    var td3 = tr.insertCell(2);
    td3.innerHTML = obj.avgComparative;
}