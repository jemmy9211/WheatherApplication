var xValues=[];
var yValues=[];
var xValues1=[];
var yValues1=[];
var xValues2=[];
var yValues2=[];
var xValues3=[];
var yValues3=[];
var locvationname='臺南市';
var lacationnum=6;
var flag=0;
var rnum=0;
var glbalres;
mainstream(lacationnum);
document.getElementById('list').onchange = function() {
    if(this.value=='臺中市'){
        lacationnum=20;
    }else if(this.value=='臺北市'){
        lacationnum=9;
    }else if(this.value=='高雄市'){
        lacationnum=7;
    }else if(this.value=='臺南市'){
        lacationnum=6;
    }else if(this.value=='宜蘭縣'){
        lacationnum=4;
    }else if(this.value=='新北市'){
        lacationnum=3;
    }else if(this.value=='新竹市'){
        lacationnum=21;
    }else if(this.value=='金門縣'){
        lacationnum=1;
    }else if(this.value=='新竹縣'){
        lacationnum=0;
    }
    //console.log(lacationnum);
    mainstream(lacationnum);
}
function mainstream(lacationnum){
    nowweather(lacationnum);
    $.ajax({
    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875&format=JSON&locationName=&elementName=&sort=time',
    method: "GET",
    datatype:"json",
    success: function(res){
        
        //console.log(res);
        data = res.records.locations[0].location[lacationnum].weatherElement;
        data1 = res.records.locations[0].location;
        //console.log(res.records.locations[0].location[lacationnum].locationName);
        //console.log(data);
        rnum=getRandomInt(0,6);
        updateweather();
        charting();
        flag++;
    }
    });
};
function nowweather(lacationnum){
    $.ajax({
    url:'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-373C6328-6BF2-41B3-BB3B-147802B82875',
    method: "GET",
    datatype:"json",
    success: function(res){
        var sitenumber=101;
        if(lacationnum==6){
            sitenumber=111;
        }else if(lacationnum==20){
            sitenumber=31;
        }else if(lacationnum==9){
            sitenumber=14;
        }else if(lacationnum==7){
            sitenumber=24;
        }else if(lacationnum==4){
            sitenumber=105;
        }else if(lacationnum==3){
            sitenumber=45;
        }else if(lacationnum==21){
            sitenumber=35;
        }else if(lacationnum==1){
            sitenumber=116;
        }else if(lacationnum==21){
            sitenumber=35;
        }else if(lacationnum==0){
            sitenumber=35;
        }
        //console.log(res);
        nowdata=res.records.location[sitenumber];
        const element = document.getElementById("tableinner");
        element.remove();
        var outertable=document.getElementById("outert");
        outertable.innerHTML+="<tbody id='tableinner'>";
        var table=document.querySelector('#tableinner');
        table.innerHTML+="<tr><td>觀測站地點</td><td>"+nowdata.locationName+"</td></tr>";
        table.innerHTML+="<tr><td>觀測時間</td><td>"+nowdata.time.obsTime+"</td></tr>";
        table.innerHTML+="<tr><td>目前氣溫</td><td>"+nowdata.weatherElement[3].elementValue+"</td></tr>";
        table.innerHTML+="<tr><td>目前天氣描述</td><td>"+nowdata.weatherElement[20].elementValue+"</td></tr>";
        table.innerHTML+="<tr><td>目前風速(公尺/秒)</td><td>"+nowdata.weatherElement[2].elementValue+"</td></tr>";
        table.innerHTML+="<tr><td>相對溼度</td><td>"+nowdata.weatherElement[4].elementValue+"</td></tr>";
        outertable.innerHTML+="</tbody>";
    }
    });
};
function updateweather(){
    var inner=document.querySelector('#ele');
    xValues=[];
    yValues=[];
    xValues1=[];
    yValues1=[];
    xValues2=[];
    yValues2=[];
    xValues3=[];
    yValues3=[];
    xValues4=[];
    yValues4=[];
    const element = document.getElementById("ele");
    element.remove();
    var outer=document.querySelector('.dcontainer');
    outer.innerHTML+="<div id='ele'>";
    innerb=document.querySelector('#ele');
    for(var i=0;i<=data[1].time.length-1;i++){
        var weatherdata=data[1].time[i];
        console.log(data[1].time.length);
        var weatherdescription=data[10].time[i];
        var weatherimg="";
        if(weatherdescription.elementValue[0].value.indexOf("晴時多雲")!=-1){
            weatherimg="cloudy.png";
        }else if(weatherdescription.elementValue[0].value.indexOf("多雲")!=-1){
            weatherimg="cloud.png";
        }else if(weatherdescription.elementValue[0].value.indexOf("晴天")!=-1){
            weatherimg="sun.png";
        }else if(weatherdescription.elementValue[0].value.indexOf("多雲時晴")!=-1){
            weatherimg="cloudy(1).png";
        }else{
            weatherimg="raining.png";
        }
        
        yValues.push(weatherdata.elementValue[0].value);
        xValues.push(weatherdata.startTime.substr(8, 5)+" to "+weatherdata.endTime.substr(8, 5));
        innerb.innerHTML+="<b>日期:"+weatherdata.startTime+" to "+weatherdata.endTime+" 氣溫:"+weatherdata.elementValue[0].value+"</b><br><br><b>簡短描述:</b> "+ weatherdescription.elementValue[0].value+"<img src='./image/"+ weatherimg+"' width='35' height='35'><br>==========================><br><br>";
    }
    outer.innerHTML+="</div>";
    for(var i=0;i<=data[9].time.length-1;i++){
        xValues3.push(data[9].time[i].startTime.substr(8, 5)+" to "+weatherdata.endTime.substr(8, 5));
        yValues3.push(data[9].time[i].elementValue[0].value);
    }
    console.log(yValues3);
    for(var i=0;i<=data[12].time.length-1;i++){
        xValues1.push(data[12].time[i].startTime.substr(8, 5)+" to "+weatherdata.endTime.substr(8, 5));
        yValues1.push(data[12].time[i].elementValue[0].value);
    }
    for(var i=0;i<=data[8].time.length-1;i++){
        xValues2.push(data[8].time[i].startTime.substr(8, 5)+" to "+weatherdata.endTime.substr(8, 5));
        yValues2.push(data[8].time[i].elementValue[0].value);
    }
    rarray1=[6,20,21,9,3,7,4,1,0];
    rarray2=['台南市','台中市','新竹市','台北市','新北市','高雄市','宜蘭縣','金門縣','新竹縣'];
    var k= rnum;
    for(var i=0;i<9;i++){
        if(k==9){
            k=k%9;
        }
        xValues4.push(data1[rarray1[k]].weatherElement[0].time[0].elementValue[0].value);
        yValues4.push(rarray2[k]);
        k++;
        
    }
};
var myChart;
var myChart3;
var myChart2;
var myChart4;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function charting(){
    if(flag==0){
        myChart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: '平均溫度:',
                fill: false,
                lineTension: 0,
                backgroundColor: "rgba(235, 40, 48, 0.8)",
                borderColor: "rgba(39, 116, 245, 0.91)",
                data: yValues,
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15
            }]
        },
        options: {
            legend: {display: true},
            responsive: true,
            title: {
                display: true,
                text: '平均溫度',
                fontSize:20
            },
            scales: {
            yAxes: [{ticks: {min: 10, max:35}}],
            }
        }
        });
        myChart2 = new Chart("myChart2", {
            type: "line",
            data: {
                labels: xValues1,
                datasets: [{
                    label: '最高溫度:',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(235, 40, 48, 0.8)",
                    borderColor: "rgba(235, 40, 48, 0.8)",
                    data: yValues1,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                },{
                    label: '最低溫度:',
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(39, 116, 245, 0.91)",
                    borderColor: "rgba(39, 116, 245, 0.91)",
                    data: yValues2,
                    pointStyle: 'circle',
                    pointRadius: 10,
                    pointHoverRadius: 15
                }]
            },
            options: {
                legend: {display: true},
                title: {
                    display: true,
                    text: '最高最低溫',
                    fontSize:20
                },
                scales: {
                    xAxes: [{
                        display: true,
                    }],
                    yAxes: [{ticks: {min: 10, max:35}}],
                }
            }
        });
        myChart3 = new Chart("myChart3", {
            type: "bar",
            data: {
                labels: xValues3,
                datasets: [{
                    label: '紫外線指數:',
                    backgroundColor: "rgb(177, 61, 255)",
                    borderColor: "rgb(177, 61, 255)  ",
                    data: yValues3,
                    borderWidth:10
                }]
            },
            options: {
                legend: {display: true},
                title: {
                    display: true,
                    text: '紫外線指數',
                    fontSize:20
                },
                scales: {
                    xAxes: [{
                        display: true,
                    }],
                    yAxes: [{ticks: {min: 0, max:15}}],
                }
            }
        });
        myChart4 = new Chart("myChart4", {
            type: 'pie',
            data: {
                labels: yValues4,
                datasets: [{
                    label: '',
                    data: xValues4,
                    backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(102, 255, 178)',
                    'rgb(255, 178, 102)',
                    'rgb(178, 102, 255)',
                    'rgb(102, 255, 255)',
                    'rgb(160, 160, 160)',
                    'rgb(255, 255, 102)'
                    ],
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true, 
                maintainAspectRatio: true,
                title: {
                    display: true,
                    text: '12小時內降雨機率 各地區比較圓餅圖',
                    fontSize:20
                },
                plugins: {
                    labels: {
                        render: 'percentage',
                        precision: 3
                    }
                }
            }
        });
    }else{
        console.log("change"+flag);
        myChart.data.datasets[0].data=yValues;
        myChart.update();
        myChart2.data.datasets[0].data=yValues1;
        myChart2.update();
        myChart2.data.datasets[1].data=yValues2;
        myChart2.update();
        myChart3.data.datasets[0].data=yValues3;
        myChart3.update();
        myChart4.data.datasets[0].data=xValues4;
        myChart4.update();
        myChart4.data.labels=yValues4;
        myChart4.update();
    }
    
    
};
        