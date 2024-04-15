//전역변수
let map;
let cities;
let cityCnt = 0;
const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
const params = {
  appid: "4eedfeb184dc7cb08af6c0bd529c48b9",
  units: "metric", //온도 단위를 섭씨를 설정하기 위해서
  lang: "kr",
};

//함수
function mapInit() {
  var options = {
    center: new kakao.maps.LatLng(37.55587, 126.97302),
    level: 13,
    // draggable: false,
    // zoomable: false,
    disableDoubleClick: true,
  };

  map = new kakao.maps.Map($("#map")[0], options);
  axios.get("./json/city.json").then(onGetCity);
}

function onGetCity(res) {
  console.log(res.data);
  cities = res.data.cities; // array로 들어가있음 []
  cities.forEach(function (item, idx) {
    console.log(item.name);
    params.lat = item.lat;
    params.log = item.lon;
    params.id = item.id;
    console.log(params);
    axios.get(weatherApi, { params }).then(onCreateMaker);
  });
}

function onCreateMaker(res) {
  console.log("정보 :" + res.data.id);
  cityCnt++;
  console.log(cityCnt);

  let city = cities.filter(function (v) {
    //v는 cities의 각각 데이터이다.
    return v.id === res.data.id;
  });
  console.log(city);

  let content = `<div class="layer">
  <div><img src="https://openweathermap.org/img/wn/${res.data.weather[0].icon}.png"></div>
  ${city[0].name}
  <div>기온 : ${res.data.main.temp}</div>
  </div>`;

  let position = new kakao.maps.LatLng(res.data.coord.lat, res.data.coord.lon);
  // 커스텀 오버레이를 생성합니다
  var customOverlay = new kakao.maps.CustomOverlay({
    position: position,
    content: content,
  });
  // 커스텀 오버레이를 지도에 표시합니다
  customOverlay.setMap(map);
}

//실행
mapInit();
