var k2 = {
	title: "k2",
	bounds: {
		min: [18.0, 0.0],
		max: [2027.0, 963.0]
	},
	points: [
		[16.0, 961.0],
		[121.0, 926.0],
		[174.0, 878.0],
		[229.0, 788.0],
		[233.0, 721.0],
		[212.0, 681.0],
		[174.0, 693.0],
		[147.0, 763.0],
		[155.0, 835.0],
		[175.0, 879.0],
		[216.0, 931.0],
		[282.0, 951.0],
		[357.0, 929.0],
		[431.0, 884.0],
		[460.0, 855.0],
		[549.0, 744.0],
		[591.0, 629.0],
		[590.0, 520.0],
		[558.0, 460.0],
		[526.0, 454.0],
		[481.0, 480.0],
		[452.0, 535.0],
		[453.0, 596.0],
		[487.0, 624.0],
		[526.0, 597.0],
		[519.0, 543.0],
		[482.0, 481.0],
		[438.0, 457.0],
		[386.0, 470.0],
		[357.0, 521.0],
		[349.0, 597.0],
		[413.0, 796.0],
		[458.0, 856.0],
		[508.0, 932.0],
		[553.0, 959.0],
		[636.0, 939.0],
		[730.0, 852.0],
		[774.0, 771.0],
		[774.0, 719.0],
		[770.0, 686.0],
		[733.0, 703.0],
		[709.0, 759.0],
		[723.0, 833.0],
		[791.0, 947.0],
		[819.0, 954.0],
		[870.0, 939.0],
		[1027.0, 783.0],
		[1168.0, 577.0],
		[1230.0, 368.0],
		[1219.0, 191.0],
		[1164.0, 95.0],
		[1109.0, 59.0],
		[1045.0, 67.0],
		[975.0, 121.0],
		[947.0, 188.0],
		[929.0, 277.0],
		[941.0, 350.0],
		[974.0, 378.0],
		[1005.0, 367.0],
		[1032.0, 331.0],
		[1029.0, 282.0],
		[999.0, 262.0],
		[981.0, 293.0],
		[988.0, 345.0],
		[1029.0, 380.0],
		[1081.0, 367.0],
		[1113.0, 321.0],
		[1106.0, 221.0],
		[1086.0, 154.0],
		[1040.0, 100.0],
		[973.0, 60.0],
		[914.0, 59.0],
		[828.0, 137.0],
		[791.0, 269.0],
		[820.0, 441.0],
		[933.0, 654.0],
		[1091.0, 869.0],
		[1172.0, 927.0],
		[1214.0, 941.0],
		[1301.0, 900.0],
		[1336.0, 864.0],
		[1368.0, 790.0],
		[1361.0, 730.0],
		[1331.0, 710.0],
		[1312.0, 740.0],
		[1311.0, 795.0],
		[1368.0, 918.0],
		[1441.0, 946.0],
		[1508.0, 919.0],
		[1575.0, 849.0],
		[1657.0, 698.0],
		[1680.0, 592.0],
		[1671.0, 515.0],
		[1635.0, 474.0],
		[1580.0, 480.0],
		[1549.0, 503.0],
		[1518.0, 560.0],
		[1507.0, 629.0],
		[1539.0, 676.0],
		[1592.0, 650.0],
		[1605.0, 581.0],
		[1579.0, 528.0],
		[1508.0, 477.0],
		[1459.0, 482.0],
		[1437.0, 538.0],
		[1444.0, 633.0],
		[1482.0, 737.0],
		[1623.0, 905.0],
		[1727.0, 942.0],
		[1790.0, 914.0],
		[1836.0, 858.0],
		[1879.0, 780.0],
		[1876.0, 712.0],
		[1847.0, 689.0],
		[1810.0, 715.0],
		[1800.0, 782.0],
		[1852.0, 880.0],
		[1915.0, 918.0],
		[2026.0, 938.0]
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
	if(dxs > cxs) {
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
  fit(k2,canvas.width-200,canvas.height-200);
  cls3(k2);
  if (canvas.getContext) {
	ctx = canvas.getContext('2d');
	var p=k2.points;
	
	/* 
	* Display initial points 
	*/
	ctx.fillStyle = 'blue';
	ctx.beginPath();
	//ctx.moveTo(p[0][0], p[0][1]);
	ctx.fillRect(p[0][0],p[0][1],4,4);	
	for(let i=1; i<p.length; i++) {
		//ctx.lineTo(p[i][0], p[i][1]);
		ctx.fillRect(p[i][0],p[i][1],4,4);
	}
	ctx.stroke();

	ctx.fillStyle = 'red';	
	raf = window.requestAnimationFrame(animcurve);
  }
}

function animcurve() {	
	if(kk<k2.points.length-1) {
		if(tt<=1.0) {
			X=P(k2.points,0,tt,kk);
			Y=P(k2.points,1,tt,kk);
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