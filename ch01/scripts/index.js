window.onload = initPage;
var httpRequest;

// 找到图像，并绑定事件
function initPage() {
	let thumbs = document
		.getElementById("thumbnailPane")
		.getElementsByTagName("IMG");

	for (let i = 0; i < thumbs.length; i++) {
		image = thumbs[i];
		image.onclick = function() {
			// 点击显示缩略图，并建立 Ajax 请求，获取信息介绍
			detailURL = "images/" + this.title + "-detail.jpg";
			document.getElementById("itemDetail").src = detailURL;
			getDetails(this.title);
		};
	}
}

// 建立 Ajax 请求
function getDetails(itemName) {
	httpRequest = new XMLHttpRequest();
	if (!httpRequest) {
		alert("Giving up :( Cannot create an XMLHTTP instance");
		return false;
	}
	httpRequest.onreadystatechange = displayDetails;
	httpRequest.open("GET", `getDetails.php?ImageID=${itemName}`);
	httpRequest.send();
}

// 处理服务器响应
function displayDetails() {
	try {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				// 显示信息介绍
				let detailDiv = document.getElementById("descripton");
				detailDiv.innerHTML = httpRequest.responseText;
			} else {
				alert("There was a problem with the request.");
			}
		}
	} catch (e) {
		alert("Caught Exception: " + e.description);
	}
}
