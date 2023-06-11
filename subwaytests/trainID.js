// 클릭 이벤트 핸들러 함수
function handleClick(event) {
  // 클릭한 역의 id 속성 값 가져오기
  var id = event.currentTarget.getAttribute("id");

  // id 출력 (여기서는 콘솔에 출력하도록 함)
  console.log(id);
}
$(document).ready(function() {

  $(document).on('click', '.subway_ico', function() {
    if(subwayLineNumber != 2 && subwayLineNumber != 3) return false;
    var trainNo = $(this).attr('trainNo')
    console.log(trainNo);
    
    let jsonData = livecongestion_info(l_Number, trainNo);
    console.log(jsonData);
    $("#station_name").text(trainNo);
    $("#station_status").text("텍스트");
    $('#myModal').css('display', 'block');
 
  });
  
  $('.close').click(function() {
    $('#myModal').css('display', 'none');
  });
  });



// 환승역 요소 선택
var interchange = document.querySelector(".interchange");
// 기존역 요소 선택
var markers = document.querySelectorAll(".marker");

var currents = document.querySelectorAll(".current");

// 클릭 이벤트 핸들러 추가
interchange.addEventListener("click", handleClick);
markers.forEach(function(marker) {
  marker.addEventListener("click", handleClick);
});
currents.forEach(function(current) {
  currents.addEventListener("click", handleClick);
});
