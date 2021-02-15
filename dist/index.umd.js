!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).Matercolor=n()}(this,function(){var e=[50,100,200,300,400,500,600,700,800,900,"A100","A200","A400","A700"],n={threshold:128,light:200,main:500,dark:700,showContrastText:!1};function t(e){var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:{}}function w(e){return{red:e.r/255,green:e.g/255,blue:e.b/255,alpha:1}}function a(e){var n=e.toString(16);return 1===n.length?"0"+n:n}function r(e,n,t){return"#"+a(e)+a(n)+a(t)}function o(e,n){var w,a,r=t(e),o=r.r/255,i=r.g/255,h=r.b/255,s=Math.max(o,i,h),u=Math.min(o,i,h),F=(s+u)/2;if(s===u)w=0,a=0;else{var l=s-u;a=F>.5?l/(2-s-u):l/(s+u),s===o&&i>=h?w=1.0472*(i-h)/l:s===o&&i<h?w=1.0472*(i-h)/l+6.2832:s===i?w=1.0472*(h-o)/l+2.0944:s===h&&(w=1.0472*(o-i)/l+4.1888)}if(w=w/6.2832*360+0,(w+=n)>360&&(w-=360),w/=360,0===a)o=F,i=F,h=F;else{var M=function(e,n,t){var w=t;return w<0&&(w+=1),w>1&&(w-=1),w<1/6?e+6*(n-e)*w:w<.5?n:w<2/3?e+(n-e)*(2/3-w)*6:e},c=F<.5?F*(1+a):F+a-F*a,f=2*F-c;o=M(f,c,w+1/3),i=M(f,c,w),h=M(f,c,w-1/3)}return o=Math.round(255*o),i=Math.round(255*i),"#"+((h=Math.round(255*h))|i<<8|o<<16|16777216).toString(16).substring(1)}function i(e,n,t){if(Number.isNaN(e)||e<0||e>n)throw new RangeError(e+" for "+t+" is not between 0 and "+n)}function h(e){return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function s(e){var n=1/(3*Math.pow(6/29,2));return e>Math.pow(6/29,3)?Math.pow(e,1/3):n*e+4/29}function u(e,n,t){return Math.min(Math.max(e,n),t)}function F(e){return e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055}function l(e){var n=3*Math.pow(6/29,2);return e>6/29?Math.pow(e,3):n*(e-4/29)}function M(e,n){if(Math.abs(e)<1e-4&&Math.abs(n)<1e-4)return 0;var t=180*Math.atan2(e,n)/Math.PI;return t>=0?t:t+360}var c=function(e,n,t,w){var a=void 0===w?1:w;this.red=e,this.green=n,this.blue=t,this.alpha=a,i(e,1,"red"),i(n,1,"green"),i(t,1,"blue"),i(a,1,"alpha")},f=function(e,n,t,w){var a=void 0===w?1:w;this.g=e,this.T=n,this.hue=t,this.alpha=a,i(e,Number.MAX_VALUE,"lightness"),i(n,Number.MAX_VALUE,"chroma"),i(t,360,"hue"),i(a,1,"alpha")};function p(e){return new f(e.g,Math.sqrt(Math.pow(e.A,2)+Math.pow(e.B,2)),(180*Math.atan2(e.B,e.A)/Math.PI+360)%360,e.alpha)}var d=function(e,n,t,w){var a=void 0===w?1:w;this.g=e,this.A=n,this.B=t,this.alpha=a,i(e,Number.MAX_VALUE,"lightness"),i(a,1,"alpha")};function g(e){var n=h(e.red),t=h(e.green),w=h(e.blue),a=.2126729*n+.7151522*t+.072175*w;return new d(116*s(a)-16,500*(s((.4124564*n+.3575761*t+.1804375*w)/.95047)-s(a)),200*(s(a)-s((.0193339*n+.119192*t+.9503041*w)/1.08883)),e.alpha)}var A=[[new d(94.67497003305085,7.266715066863771,1.000743882272359),new d(86.7897416761699,18.370736761658012,4.23637133971424),new d(72.0939162832561,31.7948058298117,13.2972443996896),new d(61.79353370051851,44.129498163764545,20.721477326799608),new d(57.194195398949574,59.6450006197361,34.999830012940194),new d(55.603951071861374,66.01287384845483,47.67169313982772),new d(51.66348502954747,64.7487785020625,43.244876694855286),new d(47.09455666350969,62.29836039074277,40.67775424698388),new d(43.77122063388739,60.28633509183384,40.31444686692952),new d(39.555187078007386,58.703681355389975,41.66495027798629)],[new d(92.68053776327665,9.515385232804263,-.8994072969754852),new d(81.86756643628922,25.05688089723257,-1.9475235115390621),new d(70.90987389545768,42.21705257720526,-1.095154624057959),new d(61.08140805216186,58.871233307587204,2.1008764804626434),new d(54.97970219986448,68.56530938366889,7.327430728560569),new d(50.872250340749176,74.60459195925529,15.353576256896073),new d(47.27738650144558,70.77855776427805,11.70434273264508),new d(42.58424189486517,65.5411953138309,7.595596439803797),new d(37.977492407254836,60.74362621842075,2.9847124951453474),new d(29.699290034849604,51.90485023721311,-4.830186634107636)],[new d(92.4362655169016,7.542927467702299,-6.039842848605881),new d(81.07399776904751,19.563870217805036,-15.719625491986044),new d(68.71394717711831,33.79992812490556,-26.49539972339321),new d(56.596161226236305,47.5856631835152,-36.480816605410915),new d(48.002791217624434,57.30866443934879,-43.2561127152548),new d(40.66211534692161,64.01910773818436,-48.05930162591041),new d(37.690702208992185,61.13762767732481,-49.384803274243026),new d(33.56291870731981,57.637381239254104,-51.39557249855828),new d(29.865391314234515,54.29737439901333,-52.6601973712463),new d(23.16724235420436,48.51764437280498,-55.16267949015293)],[new d(92.49103426017201,4.712320025752947,-6.532868071709763),new d(81.24668319505597,11.50642734909485,-16.666600637245367),new d(68.61488216554629,20.395329051982824,-28.522018851715416),new d(55.60369793053023,30.933537768905005,-41.16439122358484),new d(45.834566190969426,39.28806272235674,-50.523322052772635),new d(36.608620229358664,47.29686002828143,-59.111766586186846),new d(34.189791237562616,46.60426065139123,-59.53961627676729),new d(30.52713367338361,46.01498224754519,-60.19975052509064),new d(27.44585524877222,44.96180431854785,-60.46395810756433),new d(21.98627670328218,44.29296076245473,-60.93653655172098)],[new d(92.86314411983918,1.5318147061061937,-6.025243528950552),new d(81.8348073705298,4.460934955458907,-15.873561009736136),new d(69.7796913795672,7.9043652558912765,-26.3170846346932),new d(57.48786519938736,12.681019504822533,-37.23202012914528),new d(47.74592578811101,18.520799302452374,-46.47540679000397),new d(38.334403614455404,25.57700668170812,-55.28224153299287),new d(35.15116453901552,26.231812080381168,-54.53700978785404),new d(31.080429988007957,27.07394930110124,-53.97505274579958),new d(27.026672080454922,28.165266427558983,-53.28987325482218),new d(19.751201587921678,30.60784576895101,-52.13866519297474)],[new d(94.70682457348717,-2.835484735987326,-6.978044694792707),new d(86.8839842970016,-5.16908728759552,-17.88561192754956),new d(79.0451532401558,-6.817753527015746,-28.968537490432176),new d(71.15083697242613,-5.994763756850707,-39.72549451158927),new d(65.48106058907833,-2.735745792537936,-48.15471238926561),new d(60.43009440850862,2.079928897321559,-55.10935847069616),new d(55.62267676922188,4.998684384486918,-55.02164729429915),new d(49.27006645904875,8.470398370314381,-54.494796838457546),new d(43.16828856394358,11.968483076143844,-53.972567377977974),new d(32.17757793894193,18.96054990229354,-53.45146365049088)],[new d(95.35713467762652,-4.797149155388203,-6.550002550504308),new d(88.27942649540043,-10.836006614583892,-16.359361821940375),new d(81.10009044900976,-15.323054522981716,-26.419121191320947),new d(74.44713958259777,-16.664432625362547,-35.19702686900037),new d(69.87836465637318,-14.291515332054693,-41.827430329755174),new d(65.68851259178913,-9.612635721963692,-47.34091616039191),new d(60.88357994308973,-7.252819027184943,-46.67753731595634),new d(54.26166495426166,-3.8141836897908066,-45.97939475762498),new d(48.10661895072673,-1.378998784464347,-44.34466750206778),new d(36.34401147057282,5.067812404713545,-43.11786257561915)],[new d(95.69295154599753,-6.898716127301141,-3.994284229654421),new d(89.52842524059004,-16.412398289601725,-9.260466069266693),new d(83.32031214655748,-24.83036840728098,-14.568673583304603),new d(77.35338313752958,-30.201708572215104,-18.92358284721101),new d(73.45322093857781,-31.88590390189383,-21.130459992513686),new d(69.97638465064783,-30.679850324547953,-23.186685661136707),new d(64.44491716553777,-29.08337434584457,-21.154935769156214),new d(56.99816432961103,-27.31081477279451,-17.86988815767443),new d(49.75464182255671,-25.335383503694242,-15.024722591662787),new d(36.52725894264432,-22.129641744194515,-9.176159146894303)],[new d(94.18453941589918,-6.08351703428972,-1.5488916051161983),new d(85.68177077414457,-15.333179440298606,-2.8519825761476048),new d(76.85067847190405,-24.844059173189713,-3.8750785132192656),new d(68.02762242570138,-32.566861154120716,-4.015231084407134),new d(61.667257304525464,-36.06752603289354,-3.4734046401753815),new d(55.67310397390196,-36.66069960626328,-2.125617915169653),new d(51.059149495197715,-34.65019160301408,-1.3910484300432513),new d(45.269081019218405,-32.13244775422941,-.4526371852697775),new d(39.36899076059384,-29.25264468583161,-.03562564673170732),new d(28.58363043701477,-24.585465516136413,1.8037402162492389)],[new d(95.30530183565223,-6.430415645739263,4.292950594459599),new d(88.49014579152143,-15.23147744952702,10.848261177683138),new d(81.22616870575376,-24.993886168551583,18.144696803330884),new d(74.30361721558802,-35.56088696067356,26.781515251907727),new d(69.0430995277442,-42.61556126595995,33.17109563126665),new d(63.977421814072926,-48.54292673319982,39.73241526342939),new d(58.777960853461366,-46.1153692478013,37.838910745225576),new d(52.41108688974904,-43.21761792485762,35.62250659009424),new d(46.2813873076426,-40.25816227675361,33.32343229338761),new d(34.685655305814514,-34.75343878510312,28.866739034359767)],[new d(96.70518169355954,-4.929987845095463,6.397084523168894),new d(91.66416061199438,-12.057032041945693,16.054604579275143),new d(86.2244395865449,-19.613646834080622,26.384906423454236),new d(80.83404879636919,-27.080171840756893,37.378493742021334),new d(76.79543725108964,-32.76659719736752,45.912190572444445),new d(72.90025297028019,-37.549139223927384,53.51959496103027),new d(67.21532310272079,-36.56304870773486,50.49629051268894),new d(59.91051142210195,-35.77011466063357,46.56465847976187),new d(52.51015841084511,-34.47903440699235,42.20723868724268),new d(39.41191983353878,-32.80460974352642,35.255490585630014)],[new d(97.99506057883428,-4.059632482741494,9.355797602381521),new d(94.80926235976536,-9.237091467352855,23.230650064824985),new d(91.85205843526167,-15.053917327011114,38.86115182206598),new d(88.75812142080242,-19.542900400164097,53.71785675783709),new d(86.27404180729515,-22.173992891121596,63.978639065232514),new d(84.20566835376492,-24.270643520989342,72.79624067033038),new d(78.27915100603997,-21.181850056402496,68.82763412297965),new d(70.82385811892824,-17.788148932525672,64.00327817988128),new d(62.936867012868035,-13.697412111684903,58.513000509287835),new d(49.498610881452535,-6.485230564384715,49.67432722833751)],[new d(98.93885129752759,-3.0098470288543178,10.765736833790008),new d(97.22689784824074,-6.174599368734491,26.22932417355146),new d(95.58092947828766,-8.907132848473886,43.56297291446567),new d(94.09009515702486,-10.509628942710735,60.20019514231188),new d(93.06546746683087,-11.008558476013008,71.76500826005477),new d(92.12975017760128,-10.830023094868302,80.9090559640089),new d(87.12188349168609,-2.3764300099239355,78.14868195373407),new d(80.96200442419905,8.849333792729064,75.05050700092679),new d(75.00342770718086,20.340173566879283,72.24841925958934),new d(65.48207757431567,39.647064970476094,68.34872841768654)],[new d(97.5642392074337,-1.445525639405032,11.881254316297674),new d(93.67057953749456,-1.8693096862072434,30.02888670415651),new d(89.94571492804107,-1.0224503814769692,49.649542361642276),new d(86.71009164153801,1.0496066396428194,68.77377342409739),new d(83.78773993319211,5.248231820098425,78.92920457852716),new d(81.52191382080228,9.403655370707199,82.69257112982746),new d(78.17240973804697,16.628512886531887,81.09358318806208),new d(73.80899654381052,26.53614315250874,78.21754052181723),new d(70.1134511665764,35.3007623359744,75.87510992138593),new d(63.86460405565717,50.94648214505959,72.17815682124423)],[new d(96.30459517801387,.923151172282477,10.598439446083074),new d(90.68320082865087,4.103774964681062,26.485793721916128),new d(85.00055287186233,9.047181758866651,44.51407622580792),new d(79.42428495742953,16.452610724439875,62.08721739074201),new d(75.47792699289774,23.395742928451867,72.64347611236501),new d(72.04246561548388,30.681921012382098,77.08579298904603),new d(68.94724338946975,35.22014778433863,74.88425044595111),new d(64.83017495535229,40.91200730099703,71.9596053545428),new d(60.8534207471871,46.41483590510681,69.18061963415211),new d(54.77571742962287,55.282751019360035,65.10193403547922)],[new d(93.69219844671957,5.763979334358293,3.1700162796469034),new d(86.04629434276428,15.750843803958192,14.828476927090994),new d(77.54010042938336,27.90113842540043,25.99645229289065),new d(69.74095456707857,41.14487377552256,39.443320178900024),new d(64.37085344539341,51.890379620443575,50.81312471046415),new d(60.06780837277435,61.65258736118817,61.54771829165221),new d(57.28707915232363,60.3250664308812,60.07341536376447),new d(53.810052616293845,58.36760943780162,58.19586806694884),new d(50.301352405105874,56.40104898089937,55.924141992404344),new d(43.86477994548343,52.970887703910726,52.30067989225532)],[new d(93.29864888069987,.9915456090475727,1.442353076378411),new d(82.80884359004081,3.116221903342209,3.3523059451463055),new d(70.95493047668185,5.469742193344784,5.449009494553492),new d(58.712934619103066,7.990991075363385,8.352488495367627),new d(49.150208552875895,10.570984981000397,10.831440151197924),new d(39.63200151837749,13.138881961627241,13.531574711511885),new d(35.600996682015754,12.40352847757295,12.10432183902449),new d(30.084271265759952,11.317148149878081,10.547484304296217),new d(24.555014696416578,10.816613316782464,8.506555306791984),new d(18.35055226514404,10.225725550338765,7.058582769882571)],[new d(98.27202740980219,-16418393644634932e-21,6567357457853973e-21),new d(96.53749336548567,-1616917905122861e-20,6467671598286984e-21),new d(94.0978378987781,-1581865383126768e-20,6327461532507073e-21),new d(89.17728373493613,-1511167768697419e-20,6044671074789676e-21),new d(76.61119902231323,-1330620591488696e-20,5322482343750323e-21),new d(65.11424774127516,-11654345155598378e-21,4661738062239351e-21),new d(49.238989620828065,-9373417431124409e-21,37493669724497636e-22),new d(41.14266843804848,-8210152946386273e-21,32840611896567395e-22),new d(27.974857206003705,-6318226192236764e-21,25272904768947058e-22),new d(12.740011331302725,-4129311698131133e-21,16517246792524531e-22)],[new d(94.27665212516236,-.637571046109342,-1.313515378996688),new d(85.77788001492097,-2.2777811084512822,-3.0177758416151557),new d(76.12296325015231,-3.401502988883809,-5.16867892977908),new d(66.16340108908365,-4.819627183079045,-7.520697631614404),new d(58.35752478513645,-5.7195089100892105,-9.165988916613488),new d(50.70748082202715,-6.837992965799455,-10.956055112409357),new d(44.85917867647632,-6.411990559239578,-9.74511982878765),new d(36.92458930566504,-5.319878610845596,-8.341943474561553),new d(29.115334784637618,-4.168907828645069,-6.8629962199973304),new d(19.958338450799914,-3.3116721453186617,-5.4486142104736786)]],m=[[new g(w(t("#FF8A80"))),new g(w(t("#FF5252"))),new g(w(t("#FF1744"))),new g(w(t("#D50000")))],[new g(w(t("#FF80AB"))),new g(w(t("#FF4081"))),new g(w(t("#F50057"))),new g(w(t("#C51162")))],[new g(w(t("#EA80FC"))),new g(w(t("#E040FB"))),new g(w(t("#D500F9"))),new g(w(t("#AA00FF")))],[new g(w(t("#B388FF"))),new g(w(t("#7C4DFF"))),new g(w(t("#651FFF"))),new g(w(t("#6200EA")))],[new g(w(t("#8C9EFF"))),new g(w(t("#536DFE"))),new g(w(t("#3D5AFE"))),new g(w(t("#304FFE")))],[new g(w(t("#82B1FF"))),new g(w(t("#448AFF"))),new g(w(t("#2979FF"))),new g(w(t("#2962FF")))],[new g(w(t("#80D8FF"))),new g(w(t("#40C4FF"))),new g(w(t("#00B0FF"))),new g(w(t("#0091EA")))],[new g(w(t("#84FFFF"))),new g(w(t("#18FFFF"))),new g(w(t("#00E5FF"))),new g(w(t("#00B8D4")))],[new g(w(t("#A7FFEB"))),new g(w(t("#64FFDA"))),new g(w(t("#1DE9B6"))),new g(w(t("#00BFA5")))],[new g(w(t("#B9F6CA"))),new g(w(t("#69F0AE"))),new g(w(t("#00E676"))),new g(w(t("#00C853")))],[new g(w(t("#CCFF90"))),new g(w(t("#B2FF59"))),new g(w(t("#76FF03"))),new g(w(t("#64DD17")))],[new g(w(t("#F4FF81"))),new g(w(t("#EEFF41"))),new g(w(t("#C6FF00"))),new g(w(t("#AEEA00")))],[new g(w(t("#FFFF8D"))),new g(w(t("#FFFF00"))),new g(w(t("#FFEA00"))),new g(w(t("#FFD600")))],[new g(w(t("#FFE57F"))),new g(w(t("#FFD740"))),new g(w(t("#FFC400"))),new g(w(t("#FFAB00")))],[new g(w(t("#FFD180"))),new g(w(t("#FFAB40"))),new g(w(t("#FF9100"))),new g(w(t("#FF6D00")))],[new g(w(t("#FF9E80"))),new g(w(t("#FF6E40"))),new g(w(t("#FF3D00"))),new g(w(t("#DD2C00")))]],v=[2.048875457,5.124792061,8.751659557,12.07628774,13.91449542,15.92738893,15.46585818,15.09779227,15.13738673,15.09818372],b=[1.762442714,4.213532634,7.395827458,11.07174158,13.89634504,16.37591477,16.27071136,16.54160806,17.35916727,19.88410864];function E(e,n){var t,w=n?2:5;t=void 0===t?n?m:A:t;var a=g(e),r=function(e,n,t){var w=void 0===n?t?m:A:n,a=w[0],r=-1;if(!w.length||!w[0].length)throw Error("Invalid golden palettes");for(var o=Infinity,i=0;i<w.length;i+=1)for(var h=0;h<w[i].length&&o>0;h+=1){var s=w[i][h],u=(s.g+e.g)/2,F=Math.sqrt(Math.pow(s.A,2)+Math.pow(s.B,2)),l=Math.sqrt(Math.pow(e.A,2)+Math.pow(e.B,2)),c=(F+l)/2;c=.5*(1-Math.sqrt(Math.pow(c,7)/(Math.pow(c,7)+Math.pow(25,7))));var f=s.A*(1+c),p=e.A*(1+c),d=Math.sqrt(Math.pow(f,2)+Math.pow(s.B,2)),g=Math.sqrt(Math.pow(p,2)+Math.pow(e.B,2));c=g-d;var v=(d+g)/2;f=M(s.B,f),p=M(e.B,p),d=2*Math.sqrt(d*g)*Math.sin((Math.abs(F)<1e-4||Math.abs(l)<1e-4?0:Math.abs(p-f)<=180?p-f:p<=f?p-f+360:p-f-360)/2*Math.PI/180),F=Math.abs(F)<1e-4||Math.abs(l)<1e-4?0:Math.abs(p-f)<=180?(f+p)/2:f+p<360?(f+p+360)/2:(f+p-360)/2,l=1+.045*v,g=1+.015*v*(1-.17*Math.cos((F-30)*Math.PI/180)+.24*Math.cos(2*F*Math.PI/180)+.32*Math.cos((3*F+6)*Math.PI/180)-.2*Math.cos((4*F-63)*Math.PI/180)),(s=Math.sqrt(Math.pow((e.g-s.g)/(1+.015*Math.pow(u-50,2)/Math.sqrt(20+Math.pow(u-50,2))),2)+Math.pow(c/(1*l),2)+Math.pow(d/(1*g),2)+c/(1*l)*Math.sqrt(Math.pow(v,7)/(Math.pow(v,7)+Math.pow(25,7)))*Math.sin(60*Math.exp(-Math.pow((F-275)/25,2))*Math.PI/180)*-2*(d/(1*g))))<o&&(o=s,a=w[i],r=h)}return{fd:a,ed:r}}(a,t,n),o=(t=r.fd)[r=r.ed],i=p(o),h=p(a),s=p(t[w]).T<30,E=i.g-h.g,B=i.T-h.T,T=i.hue-h.hue,P=v[r],D=b[r],y=100;return t.map(function(n,t){var w=n,a=t;if(w===o)return y=Math.max(h.g-1.7,0),e;var r=(w=p(w)).g-v[a]/P*E;r=Math.min(r,y),a=new f(u(r,0,100),Math.max(0,s?w.T-B:w.T-B*Math.min(b[a]/D,1.25)),(w.hue-T+360)%360),y=Math.max(a.g-1.7,0),w=a.hue*Math.PI/180;var i=((a=new d(a.g,a.T*Math.cos(w),a.T*Math.sin(w),a.alpha)).g+16)/116;return w=.95047*l(i+a.A/500),r=1*l(i),i=1.08883*l(i-a.B/200),new c(u(F(3.2404542*w+-1.5371385*r+-.4985314*i),0,1),u(F(-.969266*w+1.8760108*r+.041556*i),0,1),u(F(.0556434*w+-.2040259*r+1.0572252*i),0,1),a.alpha)})}return function(){function a(e,t){var w=this;this.palette={},this.color=e,this.options=t?Object.assign(n,t):n,this.complementary=function(){return o(w.color,180)},this.firstAnalogous=function(){return o(w.color,-30)},this.secondAnalogous=function(){return o(w.color,30)},this.firstTriadic=function(){return o(w.color,60)},this.secondTriadic=function(){return o(w.color,120)},this.palette.primary=this.makePalette("primary"),this.palette.complementary=this.makePalette("complementary"),this.palette.analogous={},this.palette.analogous.first=this.makePalette("firstAnalogous"),this.palette.analogous.second=this.makePalette("secondAnalogous"),this.palette.triadic={},this.palette.triadic.first=this.makePalette("firstTriadic"),this.palette.triadic.second=this.makePalette("secondTriadic")}return a.prototype.makePalette=function(n){var a,o={};if("primary"===n)a=t(this.color);else if("complementary"===n)a=t(this.complementary());else if("firstAnalogous"===n)a=t(this.firstAnalogous());else if("secondAnalogous"===n)a=t(this.secondAnalogous());else{if("analogous"===n){var i={};return i.first=this.makePalette("firstAnalogous"),i.second=this.makePalette("secondAnalogous"),i}if("firstTriadic"===n)a=t(this.firstTriadic());else if("secondTriadic"===n)a=t(this.secondTriadic());else if("triadic"===n){var h={};return h.first=this.makePalette("firstTriadic"),h.second=this.makePalette("secondTriadic"),h}}var s,u,F,l,M=E(w(a)).map(function(e){return r(Math.round(255*e.red),Math.round(255*e.green),Math.round(255*e.blue))}),c=E(w(a),!0).map(function(e){return r(Math.round(255*e.red),Math.round(255*e.green),Math.round(255*e.blue))});M.push.apply(M,c);for(var f=0;f<e.length;f+=1){var p={};if(this.options.showContrastText){p.hex=M[f];var d=t(M[f]);p.contrastText=(u=this.options.threshold,F=(s=d).g,l=s.b,(Math.round(299*s.r)+Math.round(587*F)+Math.round(114*l))/1e3>=u?"black":"white")}else p=M[f];o[e[f]]=p}return o},a}()});
//# sourceMappingURL=index.umd.js.map
