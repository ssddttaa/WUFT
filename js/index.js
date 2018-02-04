var settingsAccounts = {
  "async": true,
  "crossDomain": true,
  "url": "https://api-wufthacks.xlabs.one:8243/td/account/V1.0.0/account/account-number/93241094967535",
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "X-Api-Key": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2hudGltYmVyMTU0IiwiZXhwIjoxNTE4NTQ2NjcyfQ.Xl7NAXZWx-s4z0mBg037pHsVI8mBiXnaZoJaihKNV_WMfhWAjw27vjXDC6CavnZcY61ysVa4o7a_sksQQ5mJPw",
    "Authorization": "Bearer 16d281b8-fd1a-355b-b01a-057bfecbb37f"
  }
}

var settingsTransactions = {
  "async": true,
  "crossDomain": true,
  "url": "https://api-wufthacks.xlabs.one:8243/td/transaction/V1.0.0/transaction/account-number/93241094967535?page=1&size=50",
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "X-Api-Key": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2hudGltYmVyMTU0IiwiZXhwIjoxNTE4NTQ2NjcyfQ.Xl7NAXZWx-s4z0mBg037pHsVI8mBiXnaZoJaihKNV_WMfhWAjw27vjXDC6CavnZcY61ysVa4o7a_sksQQ5mJPw",
    "Authorization": "Bearer 16d281b8-fd1a-355b-b01a-057bfecbb37f"
  }
}

var getSadatStuff = {
  "async": true,
  "crossDomain": false,
  "url": "http://54.89.49.5:8000/",
  "method": "GET",
  "headers": {
    "Accept": "application/json",
    "X-Api-Key": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2hudGltYmVyMTU0IiwiZXhwIjoxNTE4NTQ2NjcyfQ.Xl7NAXZWx-s4z0mBg037pHsVI8mBiXnaZoJaihKNV_WMfhWAjw27vjXDC6CavnZcY61ysVa4o7a_sksQQ5mJPw",
    "Authorization": "Bearer 16d281b8-fd1a-355b-b01a-057bfecbb37f"
  }
}

var nameToIdMap = {
  "LiamDugan" : "93241094967535",
  "GianlucaGross" : "27319059775796",
  "SadatShaik" : "62956086387288"
}

// Sample Account Numbers
// - 93241094967535
// - 27319059775796
// - 62956086387288
// - 17665024885544

// function requestDataFromSadat () {
//   $.ajax(cam2webSettings).done(function (data) {
//     sendSadatTheData(data);
//     console.log(data);
//   });
// }

var refreshAll = function(){
	var profile = new Profile();
	var image;
	var previousName = "";

			var currName = "";
			$.ajax(getSadatStuff).done(function(sadatTrans){
				sadatTrans = JSON.parse(JSON.stringify(sadatTrans));
				sadatTrans = JSON.parse(sadatTrans);
				var name = sadatTrans.name.split(".")[0];
				currName = name;
				var correspondingID = nameToIdMap[name];
				settingsAccounts["url"] = "https://api-wufthacks.xlabs.one:8243/td/account/V1.0.0/account/account-number/" + correspondingID;
				$('#profilePic').attr('src', sadatTrans.path);
				settingsTransactions["url"] = "https://api-wufthacks.xlabs.one:8243/td/transaction/V1.0.0/transaction/account-number/"+correspondingID+"?page=1&size=50";
				$.ajax(settingsTransactions).done(function(responseTrans){
					profile.updateTransactions(responseTrans);
					$.ajax(settingsAccounts).done(function (responseAcct) {
							profile.updateData(responseAcct);
							profile.displayData();
							// refreshAll();
					});
				});
			});
}


$(document).ready(function () {
		refreshAll();
});
