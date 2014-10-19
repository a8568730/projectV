"use strict";angular.module("projectVApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","leaflet-directive","ui.bootstrap","facebook","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/news",{templateUrl:"views/news.html",controller:"NewsCtrl"}).when("/plan",{templateUrl:"views/plan.html"}).when("/demo",{templateUrl:"views/demo.html"}).when("/join",{templateUrl:"views/join.html",controller:"JoinCtrl"}).when("/mission/:county",{templateUrl:"views/mission.html",controller:"MissionCtrl"}).when("/map/:county",{templateUrl:"views/map.html",controller:"MapCtrl"}).otherwise({redirectTo:"/"})}]).config(["FacebookProvider",function(a){var b="696953930392705";a.init(b)}]).filter("percentage",["$filter",function(a){return function(b,c){return a("number")(100*b,c)+"%"}}]),angular.module("projectVApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("JoinCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("MissionsCtrl",["$scope",function(a){a.missions=[{id:"TPE-4",name:"TPE-4",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-1",name:"TPQ-1",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"},{id:"TPQ-6",name:"TPQ-6",description:"童些趣錯事立報式而變受……論技麼康應居孩了定同大李本天心備，方告那下好當放一的科不復多神分發自原事慢費日華國心風出和夜大"}]}]),angular.module("projectVApp").controller("PagesCtrl",["$scope","$location",function(a,b){a.pages=[{id:"",name:"首頁",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-02.svg","class":"nav-major",cssid:"nav1"},{id:"news",name:"戰略消息",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-03.svg","class":"nav-title",cssid:"nav2"},{id:"plan",name:"罷免日計劃",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-05.svg","class":"nav-title",cssid:"nav3"},{id:"demo",name:"自由罷免示範區",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-07.svg","class":"nav-title",cssid:"nav4"},{id:"join",name:"加入公民 v 與物資支援",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-09.svg","class":"nav-title",cssid:"nav5"},{id:"facebook",name:"Facebook",target:"_blank",img:"https://s3-ap-southeast-1.amazonaws.com/1129vday.tw/img/1129-11.svg",href:"https://www.facebook.com/Appendectomy","class":"nav-title",cssid:"nav6"}],a.getActive=function(a){return b.url().substr(1)===a?"active":""},a.getHref=function(a){return a.href?a.href:"#/"+a.id},a.getTarget=function(a){return a.target?a.target:"_self"}}]);var DEFAULT_COUNTY="TPE-4",MAP_DEFAULT_VIEW={"TPE-4":{lat:25.0666313,lng:121.5943403,zoom:13},"TPQ-1":{lat:25.1752044,lng:121.4813232,zoom:12},"TPQ-6":{lat:25.0260396,lng:121.4654445,zoom:14}},MAP_DEFAULT_BOUND={"TPE-4":[{lat:25.1151655,lng:121.6659156},{lat:25.0122295,lng:121.5521896}],"TPQ-1":[{lat:25.301133,lng:121.6195265},{lat:25.0287778,lng:121.2826487}],"TPQ-6":[{lat:25.0398178,lng:121.4895901},{lat:25.0034634,lng:121.4451953}]};angular.module("projectVApp").controller("MapCtrl",["$scope","$route","$routeParams","$http","$q","$filter","$modal","leafletData","voteInfoService",function(a,b,c,d,e,f,g,h,i){function j(b){a.geojson?a.leafletData.getGeoJSON().then(function(a){a.addData(b)}):a.geojson={data:b,style:k,resetStyleOnMouseout:!1}}function k(a){return{opacity:1,weight:2,color:"black",dashArray:"5",fillOpacity:.7,fillColor:a.properties.mycolor,className:"county transparent"}}function l(a){var b=a.feature.properties.mycolor;return{fillColor:b}}function m(){return{weight:2,color:"black",dashArray:"5"}}function n(){return{weight:5,color:"yellow",dashArray:"0"}}function o(a,b){var c=b.target;c!=x&&(c.setStyle(D),c.bringToFront(),x&&x.bringToFront())}function p(a,b){var c=b.target;c!=x&&(c.setStyle(E),c.bringToFront(),x&&x.bringToFront())}function q(a,b,c){var d=c.target.feature.properties.TOWNNAME,e=c.target.feature.properties.VILLAGENAM,f=c.target;r(d,e,f),s(d,e,0)}function r(b,c,d){x&&x.setStyle(m()),d.setStyle(n()),d.bringToFront(),x=d,a.leafletData.getMap().then(function(a){a.fitBounds(d.getBounds())})}function s(b,c,d){a.myscope.showVS={},a.myscope.showVS.townName=b,a.myscope.showVS.villageName=c,a.myscope.showVS.vsArray=[],a.markers={};var e=[],f=0;angular.forEach(a.myscope.voteStatData[b],function(g){var h=g.neighborhood.indexOf(c);-1!=h&&(a.myscope.showVS.vsArray.push({name:g.name,id:g.id}),e.length==d&&(f=g.id),e.push({vsid:g.id,townName:b,villageName:c,vspos:e.length,vscount:C(.5*(a.myscope.vsInfo[g.id].volunteer+a.myscope.vsInfo[g.id].supplement)),vsobj:{lat:g.location.lat,lng:g.location.lng}}))}),u(e),a.myscope.setCurrentMarkerClick(f)}function t(b){a.myscope.currentVsTab.vsId=b,a.myscope.currentVsTab.vsName=function(){for(var c=0;c<a.myscope.showVS.vsArray.length;c++){var d=a.myscope.showVS.vsArray[c];if(d.id==b)return d.name}}()}function u(b){console.log("drawVoteStation");var c={};y=null,angular.forEach(b,function(a){var b=a.vscount;c[a.vsid]={lat:a.vsobj.lat,lng:a.vsobj.lng,icon:A[b].x,myicons:A[b],mycount:b,mypos:a.vspos,myloc:a.townName+"-"+a.villageName,myid:a.vsid}}),angular.extend(a,{markers:c}),a.$on("leafletDirectiveMarker.click",function(b,c){console.log("marker mouse click"),a.myscope.setCurrentMarkerClick(c.markerName)}),a.$on("leafletDirectiveMarker.mouseover",function(b,c){console.log("marker mouse over");var d=a.markers[c.markerName];console.log("thisMarker",d),d.icon=d.myicons.d}),a.$on("leafletDirectiveMarker.mouseout",function(b,c){console.log("marker mouse out");var d=(c.markerName,a.markers[c.markerName]);d.icon=d!=y?d.myicons.x:d.myicons.c})}function v(b){i.resetDynamics(w),b&&i.getStaticVillageData(w).then(function(){console.log("mapLoadingComplete"),$(".myLoading").fadeOut("slow",function(){$(".myLoading").remove()})},function(){},function(b){a.myscope.mapLoadingStatus=b.loadingStatus,b.villageArea.features[0].properties.mycolor=B(b.villageSum),j(b.villageArea)}),e.all([i.getAllVoteStatInfo(w),i.getAllVotestatData(w),i.getAllVillageSum(w)]).then(function(c){a.myscope.vsInfo=c[0],a.myscope.voteStatData=c[1],a.myscope.villageSum=c[2],b?a.myscope.currentTownTab=Object.keys(a.myscope.villageSum)[0]:(a.myscope.showVS&&(console.log("voteStatData Change 2"),s(a.myscope.showVS.townName,a.myscope.showVS.villageName,z)),a.leafletData.getGeoJSON().then(function(b){var c=b.getLayers();angular.forEach(c,function(b){var c=b.feature.properties.TOWNNAME,d=b.feature.properties.VILLAGENAM;b.feature.properties.mycolor=B(a.myscope.villageSum[c][d]),b.setStyle(l(b)),x&&x.setStyle(n())})}))})}a.myscope={},a.myscope.mapLoadingStatus=!1;var w=c.county,x=null,y=null,z=0;a.myscope.voteStatData=null,a.myscope.showVS=null,a.myscope.currentVsTab={},a.myscope.currentTownTab="",a.myscope.vsInfo={},a.leafletData=h,a.taiwan=MAP_DEFAULT_VIEW[w],a.defaults={zoomControlPosition:"bottomright",minZoom:11};var A=function(){var a=[45,50],b=[a[0]/2,a[1]],c=["1","2","3"],d=["x","c","d"],e={};return angular.forEach(c,function(c){e[c]={},angular.forEach(d,function(d){e[c][d]={iconSize:a,iconUrl:"images/map"+d+c+".png",iconAnchor:b}})}),e}();w in MAP_DEFAULT_VIEW||(w=DEFAULT_COUNTY);var B=function(a){return 1==a?"#990000":a>.66?"#992f2f":a>.33?"#995555":a>0?"#aa7f7f":"#aaaaaa"},C=function(a){return a>.66?3:a>.33?2:1};a.myscope.getVoteStatImg=function(){return a.myscope.showVS?C(.5*(a.myscope.vsInfo[a.myscope.currentVsTab.vsId].volunteer+a.myscope.vsInfo[a.myscope.currentVsTab.vsId].supplement)):1};var D={weight:5,color:"white"},E={weight:2,color:"black"};a.myscope.setCurrentAreaClick=function(b,c){a.leafletData.getGeoJSON().then(function(a){var d=a.getLayers();angular.forEach(d,function(a){var d=a.feature.properties.TOWNNAME,e=a.feature.properties.VILLAGENAM;b==d&&c==e&&r(b,c,a)})}),s(b,c,0)},a.myscope.setCurrentMarkerClick=function(b){var c=a.markers[b];z=c.mypos,t(b),y&&(y.icon=y.myicons.x),c.icon=c.myicons.c,y=c},a.myscope.setTownTab=function(b){a.myscope.currentTownTab=b},a.myscope.isCurrentTownTab=function(b){return a.myscope.currentTownTab==b?"bg-primary":""},a.myscope.isCurrentVsTab=function(b){return a.myscope.currentVsTab.vsId==b?"bg-primary":""},a.debug=function(){},a.myscope.back=function(){a.myscope.showVS=null,z=0,a.markers={},x&&(x.setStyle(m()),x=null),a.leafletData.getMap().then(function(a){a.fitBounds(MAP_DEFAULT_BOUND[w])})},a.$on("leafletDirectiveMap.geojsonMouseover",o),a.$on("leafletDirectiveMap.geojsonMouseout",p),a.$on("leafletDirectiveMap.geojsonClick",q),a.myscope.registerDialog=function(b){var c=g.open({templateUrl:"views/register.html",controller:"registerDialogController",size:"md",resolve:{data:function(){return{county:w,type:b,vsId:a.myscope.currentVsTab.vsId,vsName:a.myscope.currentVsTab.vsName}}}});c.result.then(function(a){console.log("send",a),v(!1)})},a.myscope.reload=function(){v(!1)},a.leafletData.getMap().then(function(a){a.fitBounds(MAP_DEFAULT_BOUND[w])}),v(!0)}]);var VOL_COUNT=5,MAP_BUFFER_TIME=10;angular.module("projectVApp").service("voteInfoService",["$q","$http",function(a,b){Parse.initialize("QDCw1Ntq4E9PmPpcuwKbO2H0B1H0y77Vj1ScO9Zx","6jaJvf46pYub6Ej9IjhhIXNtZjTqRY0P4IqAJFhH");var c=Parse.Object.extend("citizen"),d={},e={},f={},g={},h={},i={},j=this;this.supplementItem={chair:"椅子",desk:"桌子",umbrella:"大傘",pen:"筆",board:"連署板",water:"水"},this.getAllVotestatData=function(c){function d(a){e.resolve(h[a])}var e=a.defer();if(h[c])d(c);else{var f="json/votestat/"+c+".json";b.get(f).then(function(a){h[c]=a.data,d(c)})}return e.promise},this.getCitizenData=function(b){function e(a){f.resolve(d[a])}var f=a.defer();if(d[b])e(b);else{var g=new Parse.Query(c);g.limit(1e3),g.find({success:function(a){d[b]=a,e(b)}})}return f.promise},this.getAllVillageSum=function(c){function d(a){f.resolve(e[a])}var f=a.defer();return e[c]?d(c):a.all([j.getAllVotestatData(c),j.getCitizenData(c),b.get("json/villageVotestat/"+c+".json")]).then(function(a){for(var b=a[0],f=a[1],g=a[2].data,h={},i={},j=0;j<f.length;j++){var k=f[j],l=k.get("poll");h[l]=h[l]?h[l]+1:1}for(var m in b)for(var j=0;j<b[m].length;j++)i[b[m][j].id]=b[m][j].power;for(var n in h)h[n]=h[n]>i[n]*VOL_COUNT?1:h[n]/(i[n]*VOL_COUNT);var o={};for(var p in g){o[p]={};for(var q in g[p]){for(var r=g[p][q],s=0,j=0;j<r.length;j++)h[r[j]]&&(s+=h[r[j]]);o[p][q]=s/r.length}}e[c]=o,d(c)}),f.promise},this.getAllVoteStatInfo=function(b){function c(a){d.resolve(f[a])}var d=a.defer();return f[b]?c(b):a.all([j.getCitizenData(b),j.getAllVotestatData(b)]).then(function(a){var d=a[0],e=a[1],g={};for(var h in e)for(var i=0;i<e[h].length;i++){var j=e[h][i];g[j.id]={slist:[["",""],["",""],["",""],["",""],["",""]],vlist:[],supplement:0,volunteer:0,vweight:j.power}}for(var i=0;i<d.length;i++){var k=d[i],l=k.get("poll");k.get("volunteer")&&g[l].vlist.push([k.get("fid"),k.get("name")])}for(var m in g){var n=g[m].vweight*VOL_COUNT;g[m].volunteer=g[m].vlist.length>n?1:g[m].vlist.length/n,g[m].supplement=g[m].slist.length>n?1:g[m].slist.length/n}f[b]=g,c(b)}),d.promise},this.getCountyVillage=function(c){function d(a,b){f.resolve({countyVillage:a,villageSum:b})}var f=a.defer();return g[c]&&e[c]?d(g[c],e[c]):this.getAllVillageSum(c).then(function(a){g[c]?d(g[c],a):b.get("json/twCountyVillage/"+c+".json").then(function(b){g[c]=b.data,d(g[c],a)})}),f.promise},this.getStaticVillageData=function(c){var d=a.defer(),e=0,f=0,g=0;return this.getCountyVillage(c).then(function(a){function h(a,b,c,h){f+=1,setTimeout(function(){if(g+=1,h){var f=0;k[b]&&k[b][c]&&(f=k[b][c]),d.notify({villageArea:l[a],villageSum:f,townName:b,villageName:c,loadingStatus:g/e})}g==e&&(d.resolve({complete:!0,loadingStatus:g/e}),console.log("complete"))},MAP_BUFFER_TIME*f)}var j=a.countyVillage,k=a.villageSum;i[c]=i[c]?i[c]:{};var l=i[c];angular.forEach(j,function(a,d){angular.forEach(a,function(a){e+=1;var f=c+"_"+d+"_"+a;if(l[f])h(f,d,a,!0);else{var g="json/twVillage1982/"+c+"/"+d+"/"+a+".json";b.get(g).success(function(b){l[f]=b,h(f,d,a,!0)}).error(function(){h(f,d,a,!1)})}})})}),d.promise},this.saveCitizen=function(a,b){var d=new c;d.save(a).then(function(){b()})},this.resetDynamics=function(a){d[a]&&delete d[a],e[a]&&delete e[a],f[a]&&delete f[a],g[a]&&delete g[a]}}]),angular.module("projectVApp").controller("MissionCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("projectVApp").controller("registerDialogController",["$scope","$timeout","$modalInstance","Facebook","voteInfoService","data",function(a,b,c,d,e,f){function g(b){a.$apply("connected"==b.status?function(){a.logged=!0,a.me()}:function(){a.logged=!1,a.user={}})}function h(){var b={fid:a.content.userid,volunteer:"volunteer"==a.content.type,poll:f.vsId,name:a.content.name,mobile:a.content.phone,email:a.content.email,county:f.county,resource:[]};e.saveCitizen(b,function(){c.close(a.content)})}function i(){var a="割闌尾V計劃網站測試中\n http://g0v.github.io/projectV/#/";d.api("/me/feed","post",{message:a},function(a){!a||a.error?console.log("error",a.error):console.log("Post ID: "+a.id)})}a.myscope={},a.user={},a.logged=!1,a.facebookReady=!1,a.$watch(function(){return d.isReady()},function(b){b&&(a.facebookReady=!0)});var j=!1;a.intentLogin=function(){j||a.login()},a.login=function(){d.login(function(a){g(a)},{scope:"publish_stream,publish_actions"})},a.me=function(){d.api("/me",function(b){a.$apply(function(){a.user=b})})},a.logout=function(){d.logout(function(){a.$apply(function(){a.user={},a.logged=!1,a.myscope.errors="",j=!1})})},a.$on("Facebook:statusChange",function(a,b){g(b)}),d.getLoginStatus(function(a){g(a),"connected"==a.status&&(j=!0)}),a.myscope.fbshare=!0,a.myscope.type=f.type,a.myscope.errors="",a.myscope.newuser=!0,a.content={type:f.type,votestat:f.vsName,vsid:f.vsId,userid:"",name:"",phone:"0953679220",email:"mark23456@hotmail.com",supplement:{}},a.$watch("user",function(b){b&&(a.content.userid=b.id,a.content.name=b.name)},!0);var k={chair:"椅子",desk:"桌子",umbrella:"大傘",pen:"筆",board:"連署板",water:"水"},l={phone:"手機",email:"E-Mail"},m=function(){var b=a.content.supplement;for(var c in k)if(b[c])return!0;return b.others_select&&b.others&&b.others.length>0?!0:!1};a.send=function(){var b=[];if(a.content.register.$invalid){var c=a.content.register;for(var d in l)c[d].$error.required&&b.push("請填寫您的"+l[d]),c[d].$error.email&&b.push("您的"+l[d]+"格式不符")}"supplement"!=a.content.type||m()||b.push("請勾選您要提供的物資"),0==b.length?(1==a.myscope.fbshare&&i(),h()):a.myscope.errors=b.join("，")},a.cancel=function(){c.dismiss("cancel")}}]),angular.module("projectVApp").factory("FeedService",["$http",function(a){return{parseFeed:function(b){return a.jsonp("//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q="+encodeURIComponent(b))}}}]),angular.module("projectVApp").controller("NewsCtrl",["$scope","FeedService",function(a,b){b.parseFeed("http://appytw.tumblr.com/rss").then(function(b){a.feeds=b.data.responseData.feed.entries})}]);