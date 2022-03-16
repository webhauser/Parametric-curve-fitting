var k3 = {
	title: "k3",
	bounds: {
		min: [271.0, 515.0],
		max: [1367.0, 1762.0]
	},
	points: [
		[328.0, 1760.0],
		[445.0, 1714.0],
		[569.0, 1611.0],
		[641.0, 1488.0],
		[640.0, 1385.0],
		[615.0, 1285.0],
		[556.0, 1215.0],
		[510.0, 1196.0],
		[456.0, 1224.0],
		[413.0, 1290.0],
		[400.0, 1362.0],
		[413.0, 1438.0],
		[454.0, 1490.0],
		[517.0, 1448.0],
		[530.0, 1367.0],
		[505.0, 1294.0],
		[472.0, 1237.0],
		[429.0, 1195.0],
		[388.0, 1193.0],
		[330.0, 1235.0],
		[286.0, 1363.0],
		[287.0, 1442.0],
		[323.0, 1545.0],
		[434.0, 1696.0],
		[488.0, 1732.0],
		[622.0, 1759.0],
		[739.0, 1744.0],
		[824.0, 1707.0],
		[928.0, 1603.0],
		[959.0, 1534.0],
		[961.0, 1448.0],
		[938.0, 1361.0],
		[902.0, 1297.0],
		[849.0, 1246.0],
		[801.0, 1234.0],
		[779.0, 1263.0],
		[784.0, 1314.0],
		[828.0, 1379.0],
		[887.0, 1434.0],
		[986.0, 1452.0],
		[1079.0, 1440.0],
		[1160.0, 1417.0],
		[1244.0, 1352.0],
		[1305.0, 1277.0],
		[1356.0, 1186.0],
		[1357.0, 1082.0],
		[1351.0, 1000.0],
		[1333.0, 925.0],
		[1273.0, 795.0],
		[1201.0, 704.0],
		[1129.0, 640.0],
		[895.0, 529.0],
		[769.0, 514.0],
		[649.0, 537.0],
		[551.0, 581.0],
		[500.0, 658.0],
		[507.0, 738.0],
		[538.0, 795.0],
		[603.0, 861.0],
		[723.0, 928.0],
		[842.0, 944.0],
		[913.0, 909.0],
		[927.0, 841.0],
		[895.0, 803.0],
		[838.0, 759.0],
		[775.0, 746.0],
		[710.0, 769.0],
		[697.0, 801.0],
		[722.0, 846.0],
		[776.0, 853.0],
		[858.0, 829.0],
		[915.0, 780.0],
		[920.0, 732.0],
		[891.0, 685.0],
		[806.0, 652.0],
		[717.0, 659.0],
		[618.0, 714.0],
		[550.0, 784.0],
		[522.0, 824.0],
		[509.0, 888.0],
		[525.0, 966.0],
		[570.0, 1018.0],
		[667.0, 1060.0],
		[799.0, 1073.0],
		[948.0, 1040.0],
		[1137.0, 927.0],
		[1240.0, 830.0],
		[1303.0, 751.0],
		[1365.0, 657.0]
	]
}; 
var ctx,raf;
var eps = 0.025;
var kk=1,tt=0.0;
var X,Y;

function P(p,l,t,k) { return(
	p[k][l]+ 
	0.5*(p[k+1][l]-p[k-1][l])*t- 
	0.5*(p[k+2][l]-4*p[k+1][l]+5*p[k][l]-2*p[k-1][l])*t*t+ 
	0.5*(p[k+2][l]-3*p[k+1][l]+3*p[k][l]-p[k-1][l])*t*t*t);
}

function fit(data, cxs, cys) {	
	var dxs = data.bounds.max[0]-data.bounds.min[0];
	var dys = data.bounds.max[1]-data.bounds.min[1];
	var sx = dxs/cxs;
	var sy = dys/cys;
	if(dxs < cxs) {
		sx=1.0/sx;
		sy=1.0/sy;
	}	
	for(let i=0; i<data.points.length; i++) {
		data.points[i][0]*=sx;
		data.points[i][1]*=sy;
	}
}

function cls3(data) {
	data.points.push(data.points[0]);
	data.points.push(data.points[1]);
	data.points.push(data.points[2]);
}

function draw() {  
  var canvas = document.getElementById('canvas');
  canvas.width = window.screen.availWidth;
  canvas.height= window.screen.availHeight;
  fit(k3,canvas.width-200,canvas.height-200);
  cls3(k3);
  if (canvas.getContext) {
	ctx = canvas.getContext('2d');
	var p=k3.points;
	
	/* 
	* Display initial points 
	*/
	ctx.fillStyle = 'blue';
	ctx.beginPath();
	//ctx.moveTo(p[0][0], p[0][1]);
	ctx.fillRect(p[0][0],p[0][1],4,4);	
	for(let i=1; i<p.length; i++) {
		console.log("p=%f, %f", p[i][0], p[i][1]);
		ctx.fillRect(p[i][0],p[i][1],4,4);
		
	}
	ctx.stroke();

	ctx.fillStyle = 'red';	
	raf = window.requestAnimationFrame(animcurve);
  }
}

function animcurve() {	
	if(kk<k3.points.length-1) {
		if(tt<=1.0) {
			X=P(k3.points,0,tt,kk);
			Y=P(k3.points,1,tt,kk);
			ctx.fillRect(X,Y,2,2);	
			tt+=eps;		
		}
		else {
			tt=0.0;
			kk++;
		}
		raf = window.requestAnimationFrame(animcurve);
	}
	else window.cancelAnimationFrame(raf);
}