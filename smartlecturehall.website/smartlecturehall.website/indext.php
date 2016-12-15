<!DOCTYPE html>
<html lang="en" class="no-js">

<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">


	<head> 
	<center>
<script>
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
</script>
</head>

<body onload="startTime()">



		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title>SLIIT Smart Lecture Hall</title>
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<meta name="author" content="Prabhath Mannapperuma" />
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="css/demo.css" />
		<link rel="stylesheet" type="text/css" href="css/effect1.css" />
		<script src="js/modernizr.custom.js"></script>
	</head>
	<body class="demo-1">
	<center>
		<div id="ip-container" class="ip-container">
			<!-- initial header -->
			<center>
			<header class="ip-header">
				<h1 class="ip-logo">
					<svg class="ip-inner" width="100%" height="100%" viewBox="" preserveAspectRatio="" aria-labelledby="logo_title">
						<title id="logo_title">Smart Lecture Hall</title>
						<g transform="translate(0.000000,220.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M0 1100 l0 -1100 273 1 c212 1 253 3 187 10 -262 26 -288 33 -355
101 -32 34 -34 45 -56 273 -26 268 -37 660 -27 981 10 354 45 714 69 714 4 0
16 9 26 19 67 72 1359 115 2128 71 187 -10 470 -36 523 -46 36 -7 40 -18 48
-139 3 -49 6 -109 8 -133 2 -30 0 -40 -8 -32 -6 6 -129 10 -352 10 -292 0
-343 -2 -354 -15 -17 -20 -19 -170 -2 -169 7 1 21 2 32 3 18 1 20 8 20 61 l0
60 295 0 295 0 0 -190 0 -190 -168 0 -168 0 -29 -30 -29 -30 220 0 c158 0 223
3 232 12 8 8 12 62 13 168 l2 155 9 -130 c5 -71 10 -145 10 -162 1 -18 4 -33
8 -33 12 0 15 -96 14 -420 -1 -309 -10 -473 -40 -697 -17 -134 -17 -134 -56
-163 -26 -19 -56 -25 -197 -40 l-166 -18 268 -1 267 -1 0 1100 0 1100 -1470 0
-1470 0 0 -1100z"/>
<path d="M270 1857 c-42 -15 -80 -68 -80 -112 0 -46 38 -96 95 -127 93 -50
105 -60 105 -95 0 -76 -71 -90 -192 -38 -15 6 -18 2 -18 -24 0 -28 6 -34 43
-51 51 -23 137 -26 177 -5 45 23 70 62 70 110 0 63 -32 103 -118 148 -50 27
-74 45 -78 62 -6 26 12 69 27 60 5 -4 9 -2 9 3 0 9 59 11 75 1 21 -12 58 -4
61 14 3 24 -20 44 -64 57 -46 12 -68 12 -112 -3z"/>
<path d="M1720 1780 c0 -36 -2 -40 -25 -40 -34 0 -37 -47 -2 -52 21 -3 22 -8
27 -118 3 -63 11 -125 18 -137 28 -51 147 -51 140 0 -2 18 -8 21 -31 19 -50
-6 -57 10 -57 124 0 101 1 104 24 110 13 3 32 4 42 2 14 -2 19 3 19 22 0 22
-5 25 -42 28 -43 3 -43 3 -43 43 0 38 -1 39 -35 39 -34 0 -35 -1 -35 -40z"/>
<path d="M667 1740 c-16 -5 -35 -14 -44 -21 -12 -11 -17 -10 -24 4 -6 9 -21
17 -34 17 l-25 0 0 -171 0 -170 31 3 32 3 5 104 c3 84 8 110 24 132 28 38 61
51 85 34 15 -11 19 -32 23 -142 l5 -128 33 -3 32 -3 0 96 c0 113 15 155 63
179 31 15 33 15 55 -10 20 -23 22 -35 22 -145 l0 -120 33 3 32 3 -1 131 c-2
144 -10 171 -66 200 -33 17 -80 8 -126 -24 l-28 -20 -23 24 c-13 13 -29 24
-36 24 -7 0 -19 2 -27 4 -7 2 -26 0 -41 -4z"/>
<path d="M1186 1739 c-44 -10 -76 -34 -76 -56 0 -21 25 -26 57 -10 67 33 133
9 133 -48 0 -23 -4 -25 -42 -25 -101 0 -158 -40 -158 -110 0 -76 85 -119 166
-85 25 10 40 12 42 5 2 -5 14 -10 26 -10 20 0 24 7 30 46 10 72 6 185 -7 223
-21 61 -90 89 -171 70z"/>
<path d="M1460 1570 l0 -170 30 0 30 0 1 83 c1 45 3 89 4 97 1 8 3 20 4 27 3
27 60 73 91 73 28 0 31 3 28 28 -3 24 -8 27 -42 30 -28 3 -44 -2 -61 -18 l-22
-21 -6 20 c-3 15 -13 21 -31 21 l-26 0 0 -170z"/>
<path d="M2076 1584 c-34 -35 -35 -82 -1 -118 51 -55 145 -19 145 57 0 78 -89
115 -144 61z"/>
<path d="M2330 1479 c-77 -82 -77 -82 -110 -70 -94 32 -243 -13 -260 -79 -4
-14 -10 -37 -14 -52 l-6 -28 153 0 154 0 51 63 c28 34 78 89 111 122 61 59 73
89 49 113 -25 25 -52 11 -128 -69z"/>
<path d="M217 1293 c-4 -3 -7 -104 -7 -224 0 -259 -11 -241 142 -237 102 3
103 3 103 28 0 24 -2 25 -82 28 l-83 3 -1 92 c-3 230 -6 293 -13 305 -8 13
-48 17 -59 5z"/>
<path d="M1187 1253 c-4 -3 -7 -24 -7 -45 0 -25 -4 -38 -12 -37 -29 4 -38 -2
-38 -26 0 -20 5 -25 24 -25 24 0 24 -1 27 -121 4 -118 5 -121 32 -145 19 -16
40 -24 66 -24 41 0 61 14 61 43 0 16 -5 18 -29 14 -54 -11 -62 6 -59 123 l3
105 38 3 c38 3 59 25 41 42 -7 7 -38 15 -76 19 -5 1 -8 12 -8 25 0 39 -11 56
-34 56 -13 0 -26 -3 -29 -7z"/>
<path d="M570 1162 c-48 -23 -80 -89 -80 -162 0 -135 98 -200 243 -159 30 8
37 14 37 36 0 24 -2 25 -32 19 -78 -17 -99 -18 -127 -6 -34 14 -60 65 -43 82
6 6 55 13 109 15 54 2 101 7 106 12 11 11 -11 112 -31 134 -43 48 -120 61
-182 29z"/>
<path d="M919 1157 c-48 -32 -69 -79 -69 -155 0 -78 19 -126 62 -152 36 -22
100 -26 145 -9 32 12 43 26 43 57 0 26 -12 28 -43 8 -40 -26 -89 -24 -116 5
-25 27 -31 92 -14 151 11 38 19 49 41 55 35 9 61 5 90 -13 12 -8 27 -12 32 -9
21 13 9 46 -22 65 -45 27 -106 26 -149 -3z"/>
<path d="M1417 1173 c-4 -3 -7 -62 -7 -130 0 -132 9 -167 52 -197 31 -22 97
-20 128 4 32 25 36 25 43 -1 4 -15 12 -20 29 -17 23 3 23 4 26 158 3 170 -4
199 -46 186 -21 -7 -22 -13 -22 -127 l0 -119 -38 -25 c-33 -21 -43 -24 -66
-16 -37 15 -46 47 -46 171 0 89 -3 109 -16 114 -20 8 -29 8 -37 -1z"/>
<path d="M1797 1173 c-4 -3 -7 -80 -7 -169 0 -156 1 -163 21 -169 12 -4 25 -3
30 2 4 4 9 53 10 108 1 55 6 110 12 122 15 34 54 55 86 48 33 -7 43 8 30 43
-11 29 -66 30 -103 1 -20 -16 -26 -17 -26 -6 0 21 -39 35 -53 20z"/>
<path d="M2090 1162 c-48 -23 -80 -89 -80 -162 0 -135 98 -200 243 -159 30 8
37 14 37 36 0 24 -2 25 -37 17 -21 -5 -60 -9 -86 -9 -40 0 -52 5 -68 25 -10
14 -18 36 -17 50 3 25 4 25 108 28 57 1 107 7 111 13 10 17 -9 111 -28 131
-44 49 -120 62 -183 30z"/>
<path d="M1003 763 c-10 -4 -13 -62 -13 -248 l0 -243 24 -4 c14 -3 30 0 35 5
12 12 13 252 2 401 -6 90 -12 101 -48 89z"/>
<path d="M1173 763 c-10 -3 -13 -63 -13 -248 l0 -243 25 -4 c14 -3 28 -1 31 3
3 5 5 116 4 246 0 253 -3 264 -47 246z"/>
<path d="M207 723 c-4 -3 -7 -106 -7 -229 0 -202 2 -223 18 -229 22 -10 55 -6
64 9 4 6 8 50 8 99 0 62 4 87 13 88 6 1 47 3 90 5 l77 3 0 -95 c0 -90 1 -95
24 -106 14 -6 32 -8 41 -4 15 5 16 27 14 193 -2 104 -5 207 -7 231 -4 40 -5
42 -38 42 l-34 0 0 -95 0 -95 -89 0 -88 0 -7 38 c-3 20 -6 56 -6 79 0 23 -3
48 -6 57 -6 16 -54 22 -67 9z"/>
<path d="M725 614 c-47 -12 -75 -27 -81 -46 -10 -34 10 -43 58 -25 24 10 54
17 66 17 29 0 62 -34 62 -65 0 -23 -3 -25 -50 -25 -95 0 -150 -41 -150 -112 0
-48 33 -87 80 -94 19 -3 41 -7 48 -9 6 -2 12 0 12 6 0 6 4 8 8 5 5 -3 20 1 33
8 21 10 27 10 38 -1 7 -8 20 -13 29 -11 15 3 17 21 20 125 3 136 -8 179 -52
208 -27 18 -87 27 -121 19z"/>
</g>
					</svg>
				</h1>
				<div class="ip-loader" align="center">
					<svg class="ip-inner" width="60px" height="60px" viewBox="0 0 80 80">
						<path class="ip-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
						<path id="ip-loader-circle" class="ip-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
					</svg>
				</div>
				</center>
			</header>
			</center>
			<!-- top bar -->
			
			<!-- main content -->
			<div class="ip-main">
			<center>
			<div id="txt"> </div></center>
			
				<section class="related">
					
					<a href="https://smartlecturehall.website/easy2present/speech.html">
						<!--<img src="img/relatedposts/HeaderEffects.png" alt="Header Effects"/> -->
						<h3>Easy2Present (Beta)</h3>
					</a>
						<a href="https://msit.powerbi.com/groups/me/dashboards/2f4bb032-9c47-4bb4-9099-b7a5cefee440">
						<!--<img src="img/relatedposts/HeaderEffects.png" alt="Header Effects"/> -->
						<h3>Dashboard</h3>
					</a>
					<a href="http://tympanus.net/Development/ArticleIntroEffects/">
						<!--<img src="img/relatedposts/HeaderEffects.png" alt="Header Effects"/> -->
						<h3>Analytics</h3>
					</a>
				<br>
			
					
					<a href="https://windowsgeek.lk/dpm/bing/app/cognitive-services/en-us/speech-api.html">
						<!--<img src="img/relatedposts/HeaderEffects.png" alt="Header Effects"/> -->
						<h3>SLIIT RMS</h3>
					</a>
						<a href="http://courseweb.sliit.lk">
						<!--<img src="img/relatedposts/HeaderEffects.png" alt="Header Effects"/> -->
						<h3>Course Web</h3>
					</a>
					<a href="http://tympanus.net/Development/ArticleIntroEffects/">
						<!--<img src="img/relatedposts/HeaderEffects.png" alt="Header Effects"/> -->
						<h3>Support</h3>
					</a>
				</section>
			
			
			
			<center><footer>&copy; SLIIT RMS 2016</footer></center>
			
			
			
			
			
			
			
			
				
				</div>
				<!-- related demos -->
			
			</div>
		</div><!-- /container -->
		<script src="js/classie.js"></script>
		<script src="js/pathLoader.js"></script>
		<script src="js/main.js"></script>
	</body>
	</center>
</html>