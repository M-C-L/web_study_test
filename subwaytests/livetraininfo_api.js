function train_loc_info(l_Number) {
  const PROXY = (window.location.hostname === '127.0.0.1') || (window.location.hostname === 'localhost') ? 'ndfu06u1e4.execute-api.ap-northeast-2.amazonaws.com' : '/proxy';
  const url = `https://${PROXY}/test/test?number=${l_Number}`;
  // livecongestion_info(l_Number, trainNo);
  if (l_Number == 2 || l_Number == 3) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.status === 500) {
          if(confirm(`현재 ${l_Number}호선은 운행중이 아닙니다. 다시 시도하시겠습니까?`)) train_loc_info(l_Number);
        }
        else {
          console.log(data);
          const stations = data.realtimePositionList;
          const statnNms = stations.map(station => station.statnNm);
          const statUpdns = stations.map(station => station.updnLine);
          let svgElement = document.querySelector("svg");
          
          // 각 station ID에 대해
          for (let i = 0; i < statnNms.length; i++) {
            console.log(`statnNms 내용: ${statnNms[i] }`);
            // 해당 station ID를 가진 circle 요소를 찾음
            const circleElement = document.querySelector(`circle[stationname="${statnNms[i]}"]`);
            const gElement = document.querySelector(`g[stationname="${statnNms[i]}"]`);
            if (circleElement) {
                // circle 요소의 위치를 얻음
                let x = circleElement.getAttribute("cx");
                let y = circleElement.getAttribute("cy");
                  console.log(`x축: ${x}`);
                  console.log(`y축: ${y}`);

                switch (statUpdns[i]) {
                  case '0':
                    const upimageUrl = './subway_icon_up.svg';
                    console.log("상행/내선");
                    addImageToSVG(svgElement, x, y, upimageUrl, stations[i]);
                    break;
                  case '1':
                    const dnimageUrl = './subway_icon_down.svg';
                    console.log("하행/외선");
                    addImageToSVG(svgElement, x, y, dnimageUrl, stations[i]);
                    break;
                  default:
                    updnText = '알 수 없음';
                }
  
                // SVG 이미지 URL
                //const imageUrl = './subway_icon.svg';
  
                // SVG에 이미지를 추가
                // addImageToSVG(svgElement, x, y, imageUrl);
  
            } else if (gElement) {
              // circle 요소의 위치를 얻음
              let x = gElement.getAttribute("cx");
              let y = gElement.getAttribute("cy");
                console.log(`x축: ${x}`);
                console.log(`y축: ${y}`);
              
                switch (statUpdns[i]) {
                  case '0':
                    const upimageUrl = './subway_icon_up.svg';
                    console.log("상행/내선");
                    addImageToSVG(svgElement, x, y, upimageUrl, stations[i]);
                    break;
                  case '1':
                    const dnimageUrl = './subway_icon_down.svg';
                    console.log("하행/외선");
                    addImageToSVG(svgElement, x, y, dnimageUrl, stations[i]);
                    break;
                  default:
                    updnText = '알 수 없음';
                }
  
                // SVG 이미지 URL
                //const imageUrl = './subway_icon.svg';
  
                // SVG에 이미지를 추가
                // addImageToSVG(svgElement, x, y, imageUrl);
                
          }
          else {
            console.log("오답이다 연금술사!");
          }
        }
          /*// 각 station ID에 대해
          for (let i = 0; i < statnNms.length; i++) {
            // 해당 station ID를 가진 circle 요소를 찾음
            let circleElement = document.querySelector(`circle[stationname="${statnNms[i].textContent}"]`);
            if (circleElement) {
                // circle 요소의 위치를 얻음
                let x = circleElement.getAttribute("cx");
                let y = circleElement.getAttribute("cy");
        
                // SVG 이미지 URL
                let imageUrl = './subway_icon.svg';
        
                // SVG에 이미지를 추가
                addImageToSVG(svgElement, x, y, imageUrl);
                console.log('x축: ${x}','y축: ${y}');
            }
        }*/
          for (let i = 0; i < stations.length; i++) {
            const station = stations[i];
            const recptnDt = station.recptnDt;
            const trainNo = station.trainNo;
            const statnNm = station.statnNm;
            const statnTnm = station.statnTnm;
            const updnLine = station.updnLine;
            let updnText = '';
            switch (updnLine) {
              case '0':
                updnText = '상행/내선';
                break;
              case '1':
                updnText = '하행/외선';
                break;
              default:
                updnText = '알 수 없음';
            }
            const trainSttus = station.trainSttus;
            let statusText = '';
            switch (trainSttus) {
              case '0':
                statusText = '진입중';
                break;
              case '1':
                statusText = '도착';
                break;
              case '2':
                statusText = '출발';
                break;
              case '3':
                statusText = '전역출발';
                break;
              default:
                statusText = '알 수 없음';
            }
            console.log(`최종 정보 수신 시간: ${recptnDt}`);
            console.log(`지하철 정보: ${updnText} / ${trainNo} - ${statnNm} / ${statusText}`);
            console.log(`지하철 종착역: ${statnTnm}`);
          }
        }
 
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.status === 500) {
          if(confirm(`현재 ${l_Number}호선은 운행중이 아닙니다. 다시 시도하시겠습니까?`)) train_loc_info(l_Number);
        } else {
          const stations = data.realtimePositionList;
          // <statnTid> 태그를 모두 찾음
          const statnNms = stations.map(station => station.statnNm);
          const statUpdns = stations.map(station => station.updnLine);
          let svgElement = document.querySelector("svg");
  
          // 각 station ID에 대해
          for (let i = 0; i < statnNms.length; i++) {
            console.log(`statnNms 내용: ${statnNms[i] }`);
            // 해당 station ID를 가진 circle 요소를 찾음
            const circleElement = document.querySelector(`circle[stationname="${statnNms[i]}"]`);
            const gElement = document.querySelector(`g[stationname="${statnNms[i]}"]`);
            if (circleElement) {
                // circle 요소의 위치를 얻음
                let x = circleElement.getAttribute("cx");
                let y = circleElement.getAttribute("cy");
                  console.log(`x축: ${x}`);
                  console.log(`y축: ${y}`);
  
                switch (statUpdns[i]) {
                  case '0':
                    const upimageUrl = './subway_icon_up.svg';
                    console.log("상행/내선");
                    addImageToSVG(svgElement, x, y, upimageUrl, stations[i]);
                    break;
                  case '1':
                    const dnimageUrl = './subway_icon_down.svg';
                    console.log("하행/외선");
                    addImageToSVG(svgElement, x, y, dnimageUrl, stations[i]);
                    break;
                  default:
                    updnText = '알 수 없음';
                }
  
                // SVG 이미지 URL
                //const imageUrl = './subway_icon.svg';
  
                // SVG에 이미지를 추가
                // addImageToSVG(svgElement, x, y, imageUrl);
  
            } else if (gElement) {
              // circle 요소의 위치를 얻음
              let x = gElement.getAttribute("cx");
              let y = gElement.getAttribute("cy");
                console.log(`x축: ${x}`);
                console.log(`y축: ${y}`);
              
                switch (statUpdns[i]) {
                  case '0':
                    const upimageUrl = './subway_icon_up.svg';
                    console.log("상행/내선");
                    addImageToSVG(svgElement, x, y, upimageUrl, stations[i]);
                    break;
                  case '1':
                    const dnimageUrl = './subway_icon_down.svg';
                    console.log("하행/외선");
                    addImageToSVG(svgElement, x, y, dnimageUrl, stations[i]);
                    break;
                  default:
                    updnText = '알 수 없음';
                }
  
                // SVG 이미지 URL
                //const imageUrl = './subway_icon.svg';
  
                // SVG에 이미지를 추가
                // addImageToSVG(svgElement, x, y, imageUrl);
                
          }
          else {
            console.log("오답이다 연금술사!");
          }
        }
          /*// 각 station ID에 대해
          for (let i = 0; i < statnNms.length; i++) {
              // 해당 station ID를 가진 circle 요소를 찾음
              let circleElement = document.querySelector(`circle[stationname="${statnNms[i].textContent}"]`);
              if (circleElement) {
                  // circle 요소의 위치를 얻음
                  let x = circleElement.getAttribute("cx");
                  let y = circleElement.getAttribute("cy");
          
                  // SVG 이미지 URL
                  let imageUrl = './subway_icon.svg';
          
                  // SVG에 이미지를 추가
                  addImageToSVG(svgElement, x, y, imageUrl);
                  console.log('x축: ${x}','y축: ${y}');
              }
          }*/
  
          for (let i = 0; i < stations.length; i++) {
            const station = stations[i];
            const recptnDt = station.recptnDt;
            const trainNo = station.trainNo;
            const statnNm = station.statnNm;
            const statnTnm = station.statnTnm;
            const updnLine = station.updnLine;
            let updnText = '';
            switch (updnLine) {
              case '0':
                updnText = '상행/내선';
                break;
              case '1':
                updnText = '하행/외선';
                break;
              default:
                updnText = '알 수 없음';
            }
            const trainSttus = station.trainSttus;
            let statusText = '';
            switch (trainSttus) {
              case '0':
                statusText = '진입중';
                break;
              case '1':
                statusText = '도착';
                break;
              case '2':
                statusText = '출발';
                break;
              case '3':
                statusText = '전역출발';
                break;
              default:
                statusText = '알 수 없음';
            }
            console.log(`최종 정보 수신 시간: ${recptnDt}`);
            console.log(`지하철 정보: ${updnText} / ${trainNo} - ${statnNm} / ${statusText}`);
            console.log(`지하철 종착역: ${statnTnm}`);
            //livecongestion_info(l_Number, trainNo);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

function addImageToSVG(svgElement, x, y, imageUrl, stations) {
  const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttributeNS(null, 'height', '20');
  image.setAttributeNS(null, 'width', '20');
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageUrl);
  image.setAttributeNS(null, 'x', x);
  image.setAttributeNS(null, 'y', y);
  image.setAttributeNS(null, 'trainNo', stations.trainNo);
  image.setAttributeNS(null, 'class', "subway_ico");
  svgElement.appendChild(image);
}
/*function addImageToSVG(svgElement, x, y, imageUrl) {
  let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
  image.setAttributeNS(null, 'height', '50');
  image.setAttributeNS(null, 'width', '50');
  image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imageUrl);
  image.setAttributeNS(null, 'x', x);
  image.setAttributeNS(null, 'y', y);
  svgElement.appendChild(image);
}*/