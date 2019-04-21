window.addEventListener('load', init);

function init() {
    console.log('Init() is called.');
}

function doHotelPage(hotel){
    fetch('http://localhost:1234/hotel/'+hotel,{
        method: "GET",
        headers: {
            "Content-Type": "application/JSON"
        }
    }).then(res=>{
        res.json().then(data=>{
            
        }).catch(err=>console.log('JSON Parsing Error: ',err));
    }).catch(err=>console.log('Server Error: ',err));
}

function createHotelRow(obj){
    var tbody = document.querySelector('#hotelRatingsTable');
    var tr = tbody.insertRow(-1);
    var td1 = tr.insertCell(0);
    var link = document.createElement('a');
    link.innerText = obj.hotel;
    link.setAttribute('href','http://localhost:1234/hotel/'+obj.hotel);
    link.setAttribute('class','hotelLinks');
    td1.appendChild(link);
    td1.addEventListener('click',function(){
        doHotelPage(obj.hotel);
    });
    var td2 = tr.insertCell(1);
    td2.innerHTML = obj.avgScore;
    var td3 = tr.insertCell(2);
    td3.innerHTML = obj.avgComparative;
}