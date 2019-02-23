console.clear();
var divs = document.getElementsByTagName('div');
var isDown = false; 
var d1 = getCoords(divs[0]);
var img = document.createElement('img');
img.src = "https://tproger.ru/wp-content/themes/bliss/assets/img/logo.svg"; 
img.style.width = '100px';
img.style.heigth = '100px';
divs[0].appendChild(img);
img.style.position = 'absolute';
img.style.left = d1.right - (d1.right - d1.left)/2 - img.style.width.slice(0,-2)/2 + 'px';
img.style.top = d1.bottom - (d1.bottom - d1.top)/2 - img.style.heigth.slice(0,-2)/2 + 'px';


img.addEventListener('mousedown',function(event){
	isDown = true;
  this.style.position = 'absolute';
  var imgCoords = getCoords(this);
  var shiftX = event.pageX - imgCoords.left;
  var shiftY = event.pageY - imgCoords.top;
  var newPlace = null;
  
  moveAt(event, this, shiftX, shiftY);
  document.body.appendChild(this);
  
  //  перемещать по экрану
  
    document.onmousemove = function(event) {
    if(isDown){
      moveAt(event, img, shiftX, shiftY);}
  }
  
	// отследить окончание переноса
  img.onmouseup = function(event) {
    isDown = false;
    newPlace = getCoords(this)
    // находим координаты центра картинки
    var destination = {
    	top: (newPlace.bottom - (newPlace.bottom - newPlace.top)/2),
    	left: (newPlace.right - (newPlace.right - newPlace.left)/2)
		}
    
    // если центр картинки находится в одном из дивов - аппендим картинку в этот див
    
    for(var div of divs){
      var d = getCoords(div);
      if(destination.top >= d.top && destination.top <= 		d.bottom && destination.left >= d.left && destination.left <= d.right){
        div.appendChild(this);
        this.style.top = d.bottom - (d.bottom - d.top)/2 - (newPlace.bottom - newPlace.top)/2 + 'px';
        this.style.left = d.right - (d.right - d.left)/2 - this.style.width.slice(0,-2)/2 + 'px';
      }
    }       
		//очищаем EventListener 
    document.onmousemove = null;
    img.onmouseup = null;
  }
  
})

// функция мува элемента

function moveAt(e, image, shiftX, shiftY) {
    image.style.left = e.pageX - shiftX + 'px';
    image.style.top = e.pageY - shiftY + 'px';
  }

// функция для определения координат

function getCoords(elem) {
  var coordsOfElem = elem.getBoundingClientRect();
  return {
    top: coordsOfElem.top + pageYOffset,
    left: coordsOfElem.left + pageXOffset,
    bottom: coordsOfElem.bottom,
    right: coordsOfElem.right,
  };
}

// удаление дефолтного ивента браузера
img.ondragstart = function() {
  return false;
}; 
