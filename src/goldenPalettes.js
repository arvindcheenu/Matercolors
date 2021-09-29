/* eslint-disable no-nested-ternary */
import {
  ConstrainRGBA,
  minOfMax,
  ValidateBounds,
  ConvertToLAB,
  ConstrainHCLA,
  computeLABterms,
  linear2sRGB,
  reverseTransformer,
  getHueDegrees
} from './goldenPalettes.utils.js'
import {
  hexToRgba,
  normalizeRGB,
} from './color.utils.js'
// Local Constants
const KdA = [
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF8A80'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF5252'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF1744'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#D50000')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF80AB'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF4081'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#F50057'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#C51162')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#EA80FC'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#E040FB'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#D500F9'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#AA00FF')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#B388FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#7C4DFF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#651FFF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#6200EA')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#8C9EFF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#536DFE'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#3D5AFE'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#304FFE')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#82B1FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#448AFF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#2979FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#2962FF')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#80D8FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#40C4FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#00B0FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#0091EA')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#84FFFF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#18FFFF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#00E5FF'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#00B8D4')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#A7FFEB'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#64FFDA'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#1DE9B6'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#00BFA5')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#B9F6CA'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#69F0AE'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#00E676'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#00C853')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#CCFF90'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#B2FF59'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#76FF03'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#64DD17')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#F4FF81'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#EEFF41'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#C6FF00'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#AEEA00')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFFF8D'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFFF00'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFEA00'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFD600')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFE57F'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFD740'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFC400'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFAB00')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFD180'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FFAB40'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF9100'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF6D00')))
  ],
  [
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF9E80'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF6E40'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#FF3D00'))),
    new ConvertToLAB(normalizeRGB(hexToRgba('#DD2C00')))
  ]
]
const Kd = [
  [
    new ValidateBounds(
      94.67497003305085,
      7.266715066863771,
      1.000743882272359
    ),
    new ValidateBounds(86.7897416761699, 18.370736761658012, 4.23637133971424),
    new ValidateBounds(72.0939162832561, 31.7948058298117, 13.2972443996896),
    new ValidateBounds(
      61.79353370051851,
      44.129498163764545,
      20.721477326799608
    ),
    new ValidateBounds(
      57.194195398949574,
      59.6450006197361,
      34.999830012940194
    ),
    new ValidateBounds(
      55.603951071861374,
      66.01287384845483,
      47.67169313982772
    ),
    new ValidateBounds(
      51.66348502954747,
      64.7487785020625,
      43.244876694855286
    ),
    new ValidateBounds(
      47.09455666350969,
      62.29836039074277,
      40.67775424698388
    ),
    new ValidateBounds(
      43.77122063388739,
      60.28633509183384,
      40.31444686692952
    ),
    new ValidateBounds(
      39.555187078007386,
      58.703681355389975,
      41.66495027798629
    )
  ],
  [
    new ValidateBounds(
      92.68053776327665,
      9.515385232804263,
      -0.8994072969754852
    ),
    new ValidateBounds(
      81.86756643628922,
      25.05688089723257,
      -1.9475235115390621
    ),
    new ValidateBounds(
      70.90987389545768,
      42.21705257720526,
      -1.095154624057959
    ),
    new ValidateBounds(
      61.08140805216186,
      58.871233307587204,
      2.1008764804626434
    ),
    new ValidateBounds(
      54.97970219986448,
      68.56530938366889,
      7.327430728560569
    ),
    new ValidateBounds(
      50.872250340749176,
      74.60459195925529,
      15.353576256896073
    ),
    new ValidateBounds(
      47.27738650144558,
      70.77855776427805,
      11.70434273264508
    ),
    new ValidateBounds(42.58424189486517, 65.5411953138309, 7.595596439803797),
    new ValidateBounds(
      37.977492407254836,
      60.74362621842075,
      2.9847124951453474
    ),
    new ValidateBounds(
      29.699290034849604,
      51.90485023721311,
      -4.830186634107636
    )
  ],
  [
    new ValidateBounds(
      92.4362655169016,
      7.542927467702299,
      -6.039842848605881
    ),
    new ValidateBounds(
      81.07399776904751,
      19.563870217805036,
      -15.719625491986044
    ),
    new ValidateBounds(
      68.71394717711831,
      33.79992812490556,
      -26.49539972339321
    ),
    new ValidateBounds(
      56.596161226236305,
      47.5856631835152,
      -36.480816605410915
    ),
    new ValidateBounds(
      48.002791217624434,
      57.30866443934879,
      -43.2561127152548
    ),
    new ValidateBounds(
      40.66211534692161,
      64.01910773818436,
      -48.05930162591041
    ),
    new ValidateBounds(
      37.690702208992185,
      61.13762767732481,
      -49.384803274243026
    ),
    new ValidateBounds(
      33.56291870731981,
      57.637381239254104,
      -51.39557249855828
    ),
    new ValidateBounds(
      29.865391314234515,
      54.29737439901333,
      -52.6601973712463
    ),
    new ValidateBounds(
      23.16724235420436,
      48.51764437280498,
      -55.16267949015293
    )
  ],
  [
    new ValidateBounds(
      92.49103426017201,
      4.712320025752947,
      -6.532868071709763
    ),
    new ValidateBounds(
      81.24668319505597,
      11.50642734909485,
      -16.666600637245367
    ),
    new ValidateBounds(
      68.61488216554629,
      20.395329051982824,
      -28.522018851715416
    ),
    new ValidateBounds(
      55.60369793053023,
      30.933537768905005,
      -41.16439122358484
    ),
    new ValidateBounds(
      45.834566190969426,
      39.28806272235674,
      -50.523322052772635
    ),
    new ValidateBounds(
      36.608620229358664,
      47.29686002828143,
      -59.111766586186846
    ),
    new ValidateBounds(
      34.189791237562616,
      46.60426065139123,
      -59.53961627676729
    ),
    new ValidateBounds(
      30.52713367338361,
      46.01498224754519,
      -60.19975052509064
    ),
    new ValidateBounds(
      27.44585524877222,
      44.96180431854785,
      -60.46395810756433
    ),
    new ValidateBounds(
      21.98627670328218,
      44.29296076245473,
      -60.93653655172098
    )
  ],
  [
    new ValidateBounds(
      92.86314411983918,
      1.5318147061061937,
      -6.025243528950552
    ),
    new ValidateBounds(
      81.8348073705298,
      4.460934955458907,
      -15.873561009736136
    ),
    new ValidateBounds(
      69.7796913795672,
      7.9043652558912765,
      -26.3170846346932
    ),
    new ValidateBounds(
      57.48786519938736,
      12.681019504822533,
      -37.23202012914528
    ),
    new ValidateBounds(
      47.74592578811101,
      18.520799302452374,
      -46.47540679000397
    ),
    new ValidateBounds(
      38.334403614455404,
      25.57700668170812,
      -55.28224153299287
    ),
    new ValidateBounds(
      35.15116453901552,
      26.231812080381168,
      -54.53700978785404
    ),
    new ValidateBounds(
      31.080429988007957,
      27.07394930110124,
      -53.97505274579958
    ),
    new ValidateBounds(
      27.026672080454922,
      28.165266427558983,
      -53.28987325482218
    ),
    new ValidateBounds(
      19.751201587921678,
      30.60784576895101,
      -52.13866519297474
    )
  ],
  [
    new ValidateBounds(
      94.70682457348717,
      -2.835484735987326,
      -6.978044694792707
    ),
    new ValidateBounds(
      86.8839842970016,
      -5.16908728759552,
      -17.88561192754956
    ),
    new ValidateBounds(
      79.0451532401558,
      -6.817753527015746,
      -28.968537490432176
    ),
    new ValidateBounds(
      71.15083697242613,
      -5.994763756850707,
      -39.72549451158927
    ),
    new ValidateBounds(
      65.48106058907833,
      -2.735745792537936,
      -48.15471238926561
    ),
    new ValidateBounds(
      60.43009440850862,
      2.079928897321559,
      -55.10935847069616
    ),
    new ValidateBounds(
      55.62267676922188,
      4.998684384486918,
      -55.02164729429915
    ),
    new ValidateBounds(
      49.27006645904875,
      8.470398370314381,
      -54.494796838457546
    ),
    new ValidateBounds(
      43.16828856394358,
      11.968483076143844,
      -53.972567377977974
    ),
    new ValidateBounds(
      32.17757793894193,
      18.96054990229354,
      -53.45146365049088
    )
  ],
  [
    new ValidateBounds(
      95.35713467762652,
      -4.797149155388203,
      -6.550002550504308
    ),
    new ValidateBounds(
      88.27942649540043,
      -10.836006614583892,
      -16.359361821940375
    ),
    new ValidateBounds(
      81.10009044900976,
      -15.323054522981716,
      -26.419121191320947
    ),
    new ValidateBounds(
      74.44713958259777,
      -16.664432625362547,
      -35.19702686900037
    ),
    new ValidateBounds(
      69.87836465637318,
      -14.291515332054693,
      -41.827430329755174
    ),
    new ValidateBounds(
      65.68851259178913,
      -9.612635721963692,
      -47.34091616039191
    ),
    new ValidateBounds(
      60.88357994308973,
      -7.252819027184943,
      -46.67753731595634
    ),
    new ValidateBounds(
      54.26166495426166,
      -3.8141836897908066,
      -45.97939475762498
    ),
    new ValidateBounds(
      48.10661895072673,
      -1.378998784464347,
      -44.34466750206778
    ),
    new ValidateBounds(
      36.34401147057282,
      5.067812404713545,
      -43.11786257561915
    )
  ],
  [
    new ValidateBounds(
      95.69295154599753,
      -6.898716127301141,
      -3.994284229654421
    ),
    new ValidateBounds(
      89.52842524059004,
      -16.412398289601725,
      -9.260466069266693
    ),
    new ValidateBounds(
      83.32031214655748,
      -24.83036840728098,
      -14.568673583304603
    ),
    new ValidateBounds(
      77.35338313752958,
      -30.201708572215104,
      -18.92358284721101
    ),
    new ValidateBounds(
      73.45322093857781,
      -31.88590390189383,
      -21.130459992513686
    ),
    new ValidateBounds(
      69.97638465064783,
      -30.679850324547953,
      -23.186685661136707
    ),
    new ValidateBounds(
      64.44491716553777,
      -29.08337434584457,
      -21.154935769156214
    ),
    new ValidateBounds(
      56.99816432961103,
      -27.31081477279451,
      -17.86988815767443
    ),
    new ValidateBounds(
      49.75464182255671,
      -25.335383503694242,
      -15.024722591662787
    ),
    new ValidateBounds(
      36.52725894264432,
      -22.129641744194515,
      -9.176159146894303
    )
  ],
  [
    new ValidateBounds(
      94.18453941589918,
      -6.08351703428972,
      -1.5488916051161983
    ),
    new ValidateBounds(
      85.68177077414457,
      -15.333179440298606,
      -2.8519825761476048
    ),
    new ValidateBounds(
      76.85067847190405,
      -24.844059173189713,
      -3.8750785132192656
    ),
    new ValidateBounds(
      68.02762242570138,
      -32.566861154120716,
      -4.015231084407134
    ),
    new ValidateBounds(
      61.667257304525464,
      -36.06752603289354,
      -3.4734046401753815
    ),
    new ValidateBounds(
      55.67310397390196,
      -36.66069960626328,
      -2.125617915169653
    ),
    new ValidateBounds(
      51.059149495197715,
      -34.65019160301408,
      -1.3910484300432513
    ),
    new ValidateBounds(
      45.269081019218405,
      -32.13244775422941,
      -0.4526371852697775
    ),
    new ValidateBounds(
      39.36899076059384,
      -29.25264468583161,
      -0.03562564673170732
    ),
    new ValidateBounds(
      28.58363043701477,
      -24.585465516136413,
      1.8037402162492389
    )
  ],
  [
    new ValidateBounds(
      95.30530183565223,
      -6.430415645739263,
      4.292950594459599
    ),
    new ValidateBounds(
      88.49014579152143,
      -15.23147744952702,
      10.848261177683138
    ),
    new ValidateBounds(
      81.22616870575376,
      -24.993886168551583,
      18.144696803330884
    ),
    new ValidateBounds(
      74.30361721558802,
      -35.56088696067356,
      26.781515251907727
    ),
    new ValidateBounds(
      69.0430995277442,
      -42.61556126595995,
      33.17109563126665
    ),
    new ValidateBounds(
      63.977421814072926,
      -48.54292673319982,
      39.73241526342939
    ),
    new ValidateBounds(
      58.777960853461366,
      -46.1153692478013,
      37.838910745225576
    ),
    new ValidateBounds(
      52.41108688974904,
      -43.21761792485762,
      35.62250659009424
    ),
    new ValidateBounds(
      46.2813873076426,
      -40.25816227675361,
      33.32343229338761
    ),
    new ValidateBounds(
      34.685655305814514,
      -34.75343878510312,
      28.866739034359767
    )
  ],
  [
    new ValidateBounds(
      96.70518169355954,
      -4.929987845095463,
      6.397084523168894
    ),
    new ValidateBounds(
      91.66416061199438,
      -12.057032041945693,
      16.054604579275143
    ),
    new ValidateBounds(
      86.2244395865449,
      -19.613646834080622,
      26.384906423454236
    ),
    new ValidateBounds(
      80.83404879636919,
      -27.080171840756893,
      37.378493742021334
    ),
    new ValidateBounds(
      76.79543725108964,
      -32.76659719736752,
      45.912190572444445
    ),
    new ValidateBounds(
      72.90025297028019,
      -37.549139223927384,
      53.51959496103027
    ),
    new ValidateBounds(
      67.21532310272079,
      -36.56304870773486,
      50.49629051268894
    ),
    new ValidateBounds(
      59.91051142210195,
      -35.77011466063357,
      46.56465847976187
    ),
    new ValidateBounds(
      52.51015841084511,
      -34.47903440699235,
      42.20723868724268
    ),
    new ValidateBounds(
      39.41191983353878,
      -32.80460974352642,
      35.255490585630014
    )
  ],
  [
    new ValidateBounds(
      97.99506057883428,
      -4.059632482741494,
      9.355797602381521
    ),
    new ValidateBounds(
      94.80926235976536,
      -9.237091467352855,
      23.230650064824985
    ),
    new ValidateBounds(
      91.85205843526167,
      -15.053917327011114,
      38.86115182206598
    ),
    new ValidateBounds(
      88.75812142080242,
      -19.542900400164097,
      53.71785675783709
    ),
    new ValidateBounds(
      86.27404180729515,
      -22.173992891121596,
      63.978639065232514
    ),
    new ValidateBounds(
      84.20566835376492,
      -24.270643520989342,
      72.79624067033038
    ),
    new ValidateBounds(
      78.27915100603997,
      -21.181850056402496,
      68.82763412297965
    ),
    new ValidateBounds(
      70.82385811892824,
      -17.788148932525672,
      64.00327817988128
    ),
    new ValidateBounds(
      62.936867012868035,
      -13.697412111684903,
      58.513000509287835
    ),
    new ValidateBounds(
      49.498610881452535,
      -6.485230564384715,
      49.67432722833751
    )
  ],
  [
    new ValidateBounds(
      98.93885129752759,
      -3.0098470288543178,
      10.765736833790008
    ),
    new ValidateBounds(
      97.22689784824074,
      -6.174599368734491,
      26.22932417355146
    ),
    new ValidateBounds(
      95.58092947828766,
      -8.907132848473886,
      43.56297291446567
    ),
    new ValidateBounds(
      94.09009515702486,
      -10.509628942710735,
      60.20019514231188
    ),
    new ValidateBounds(
      93.06546746683087,
      -11.008558476013008,
      71.76500826005477
    ),
    new ValidateBounds(
      92.12975017760128,
      -10.830023094868302,
      80.9090559640089
    ),
    new ValidateBounds(
      87.12188349168609,
      -2.3764300099239355,
      78.14868195373407
    ),
    new ValidateBounds(
      80.96200442419905,
      8.849333792729064,
      75.05050700092679
    ),
    new ValidateBounds(
      75.00342770718086,
      20.340173566879283,
      72.24841925958934
    ),
    new ValidateBounds(
      65.48207757431567,
      39.647064970476094,
      68.34872841768654
    )
  ],
  [
    new ValidateBounds(
      97.5642392074337,
      -1.445525639405032,
      11.881254316297674
    ),
    new ValidateBounds(
      93.67057953749456,
      -1.8693096862072434,
      30.02888670415651
    ),
    new ValidateBounds(
      89.94571492804107,
      -1.0224503814769692,
      49.649542361642276
    ),
    new ValidateBounds(
      86.71009164153801,
      1.0496066396428194,
      68.77377342409739
    ),
    new ValidateBounds(
      83.78773993319211,
      5.248231820098425,
      78.92920457852716
    ),
    new ValidateBounds(
      81.52191382080228,
      9.403655370707199,
      82.69257112982746
    ),
    new ValidateBounds(
      78.17240973804697,
      16.628512886531887,
      81.09358318806208
    ),
    new ValidateBounds(
      73.80899654381052,
      26.53614315250874,
      78.21754052181723
    ),
    new ValidateBounds(70.1134511665764, 35.3007623359744, 75.87510992138593),
    new ValidateBounds(
      63.86460405565717,
      50.94648214505959,
      72.17815682124423
    )
  ],
  [
    new ValidateBounds(
      96.30459517801387,
      0.923151172282477,
      10.598439446083074
    ),
    new ValidateBounds(
      90.68320082865087,
      4.103774964681062,
      26.485793721916128
    ),
    new ValidateBounds(
      85.00055287186233,
      9.047181758866651,
      44.51407622580792
    ),
    new ValidateBounds(
      79.42428495742953,
      16.452610724439875,
      62.08721739074201
    ),
    new ValidateBounds(
      75.47792699289774,
      23.395742928451867,
      72.64347611236501
    ),
    new ValidateBounds(
      72.04246561548388,
      30.681921012382098,
      77.08579298904603
    ),
    new ValidateBounds(
      68.94724338946975,
      35.22014778433863,
      74.88425044595111
    ),
    new ValidateBounds(64.83017495535229, 40.91200730099703, 71.9596053545428),
    new ValidateBounds(60.8534207471871, 46.41483590510681, 69.18061963415211),
    new ValidateBounds(
      54.77571742962287,
      55.282751019360035,
      65.10193403547922
    )
  ],
  [
    new ValidateBounds(
      93.69219844671957,
      5.763979334358293,
      3.1700162796469034
    ),
    new ValidateBounds(
      86.04629434276428,
      15.750843803958192,
      14.828476927090994
    ),
    new ValidateBounds(
      77.54010042938336,
      27.90113842540043,
      25.99645229289065
    ),
    new ValidateBounds(
      69.74095456707857,
      41.14487377552256,
      39.443320178900024
    ),
    new ValidateBounds(
      64.37085344539341,
      51.890379620443575,
      50.81312471046415
    ),
    new ValidateBounds(
      60.06780837277435,
      61.65258736118817,
      61.54771829165221
    ),
    new ValidateBounds(57.28707915232363, 60.3250664308812, 60.07341536376447),
    new ValidateBounds(
      53.810052616293845,
      58.36760943780162,
      58.19586806694884
    ),
    new ValidateBounds(
      50.301352405105874,
      56.40104898089937,
      55.924141992404344
    ),
    new ValidateBounds(
      43.86477994548343,
      52.970887703910726,
      52.30067989225532
    )
  ],
  [
    new ValidateBounds(
      93.29864888069987,
      0.9915456090475727,
      1.442353076378411
    ),
    new ValidateBounds(
      82.80884359004081,
      3.116221903342209,
      3.3523059451463055
    ),
    new ValidateBounds(
      70.95493047668185,
      5.469742193344784,
      5.449009494553492
    ),
    new ValidateBounds(
      58.712934619103066,
      7.990991075363385,
      8.352488495367627
    ),
    new ValidateBounds(
      49.150208552875895,
      10.570984981000397,
      10.831440151197924
    ),
    new ValidateBounds(
      39.63200151837749,
      13.138881961627241,
      13.531574711511885
    ),
    new ValidateBounds(
      35.600996682015754,
      12.40352847757295,
      12.10432183902449
    ),
    new ValidateBounds(
      30.084271265759952,
      11.317148149878081,
      10.547484304296217
    ),
    new ValidateBounds(
      24.555014696416578,
      10.816613316782464,
      8.506555306791984
    ),
    new ValidateBounds(
      18.35055226514404,
      10.225725550338765,
      7.058582769882571
    )
  ],
  [
    new ValidateBounds(
      98.27202740980219,
      -1.6418393644634932e-5,
      6.567357457853973e-6
    ),
    new ValidateBounds(
      96.53749336548567,
      -1.616917905122861e-5,
      6.467671598286984e-6
    ),
    new ValidateBounds(
      94.0978378987781,
      -1.581865383126768e-5,
      6.327461532507073e-6
    ),
    new ValidateBounds(
      89.17728373493613,
      -1.511167768697419e-5,
      6.044671074789676e-6
    ),
    new ValidateBounds(
      76.61119902231323,
      -1.330620591488696e-5,
      5.322482343750323e-6
    ),
    new ValidateBounds(
      65.11424774127516,
      -1.1654345155598378e-5,
      4.661738062239351e-6
    ),
    new ValidateBounds(
      49.238989620828065,
      -9.373417431124409e-6,
      3.7493669724497636e-6
    ),
    new ValidateBounds(
      41.14266843804848,
      -8.210152946386273e-6,
      3.2840611896567395e-6
    ),
    new ValidateBounds(
      27.974857206003705,
      -6.318226192236764e-6,
      2.5272904768947058e-6
    ),
    new ValidateBounds(
      12.740011331302725,
      -4.129311698131133e-6,
      1.6517246792524531e-6
    )
  ],
  [
    new ValidateBounds(
      94.27665212516236,
      -0.637571046109342,
      -1.313515378996688
    ),
    new ValidateBounds(
      85.77788001492097,
      -2.2777811084512822,
      -3.0177758416151557
    ),
    new ValidateBounds(
      76.12296325015231,
      -3.401502988883809,
      -5.16867892977908
    ),
    new ValidateBounds(
      66.16340108908365,
      -4.819627183079045,
      -7.520697631614404
    ),
    new ValidateBounds(
      58.35752478513645,
      -5.7195089100892105,
      -9.165988916613488
    ),
    new ValidateBounds(
      50.70748082202715,
      -6.837992965799455,
      -10.956055112409357
    ),
    new ValidateBounds(
      44.85917867647632,
      -6.411990559239578,
      -9.74511982878765
    ),
    new ValidateBounds(
      36.92458930566504,
      -5.319878610845596,
      -8.341943474561553
    ),
    new ValidateBounds(
      29.115334784637618,
      -4.168907828645069,
      -6.8629962199973304
    ),
    new ValidateBounds(
      19.958338450799914,
      -3.3116721453186617,
      -5.4486142104736786
    )
  ]
]
export const Ld = [
  2.048875457,
  5.124792061,
  8.751659557,
  12.07628774,
  13.91449542,
  15.92738893,
  15.46585818,
  15.09779227,
  15.13738673,
  15.09818372
]
export const Md = [
  1.762442714,
  4.213532634,
  7.395827458,
  11.07174158,
  13.89634504,
  16.37591477,
  16.27071136,
  16.54160806,
  17.35916727,
  19.88410864
]
// Local Functions
function paletteGenerator (a, B, accent) {
  const refPalletes = accent ? KdA : Kd
  const b = B === undefined ? refPalletes : B
  let d = b[0]
  let e = -1
  if (!b.length || !b[0].length) throw Error('Invalid golden palettes')
  for (let c = Infinity, l = 0; l < b.length; l += 1) {
    for (let h = 0; h < b[l].length && c > 0; h += 1) {
      let g = b[l][h]
      const f = (g.g + a.g) / 2
      let m = Math.sqrt(g.A ** 2 + g.B ** 2)
      let n = Math.sqrt(a.A ** 2 + a.B ** 2)
      let u = (m + n) / 2
      u = 0.5 * (1 - Math.sqrt(u ** 7 / (u ** 7 + 25 ** 7)))
      let q = g.A * (1 + u)
      let p = a.A * (1 + u)
      let r = Math.sqrt(q ** 2 + g.B ** 2)
      let t = Math.sqrt(p ** 2 + a.B ** 2)
      u = t - r
      const v = (r + t) / 2
      q = getHueDegrees(g.B, q)
      p = getHueDegrees(a.B, p)
      r =
        2 *
        Math.sqrt(r * t) *
        Math.sin(
          (Math.abs(m) < 1e-4 || Math.abs(n) < 1e-4
            ? 0
            : Math.abs(p - q) <= 180
              ? p - q
              : p <= q ? p - q + 360 : p - q - 360) /
            2 *
            Math.PI /
            180
        )
      m = Math.abs(m) < 1e-4 || Math.abs(n) < 1e-4
        ? 0
        : Math.abs(p - q) <= 180
          ? (q + p) / 2
          : q + p < 360 ? (q + p + 360) / 2 : (q + p - 360) / 2
      n = 1 + 0.045 * v
      t =
        1 +
        0.015 *
          v *
          (1 -
            0.17 * Math.cos((m - 30) * Math.PI / 180) +
            0.24 * Math.cos(2 * m * Math.PI / 180) +
            0.32 * Math.cos((3 * m + 6) * Math.PI / 180) -
            0.2 * Math.cos((4 * m - 63) * Math.PI / 180))
      g = Math.sqrt(
        ((a.g - g.g) /
          (1 + 0.015 * (f - 50) ** 2 / Math.sqrt(20 + (f - 50) ** 2))) **
          2 +
          (u / (1 * n)) ** 2 +
          (r / (1 * t)) ** 2 +
          u /
            (1 * n) *
            Math.sqrt(v ** 7 / (v ** 7 + 25 ** 7)) *
            Math.sin(
              60 * Math.exp(-(((m - 275) / 25) ** 2)) * Math.PI / 180
            ) *
            -2 *
            (r / (1 * t))
      )
      // eslint-disable-next-line
      g < c && ((c = g), (d = b[l]), (e = h));
    }
  }
  return {
    fd: d,
    ed: e
  }
}
export function buildPalette (a) {
  let b
  b = b === undefined ? Kd : b
  const c = ConvertToLAB(a)
  let d = paletteGenerator(c, b)
  b = d.fd
  d = d.ed
  const e = b[d]
  const l = computeLABterms(e)
  const h = computeLABterms(c)
  const g = computeLABterms(b[5]).T < 30
  const f = l.g - h.g
  const m = l.T - h.T
  const n = l.hue - h.hue
  const u = Ld[d]
  const q = Md[d]
  let p = 100
  return b.map((R, T) => {
    let r = R
    let t = T
    // eslint-disable-next-line
    if (r === e) return (p = Math.max (h.g - 1.7, 0)), a;
    r = computeLABterms(r)
    let v = r.g - Ld[t] / u * f
    v = Math.min(v, p)
    t = new ConstrainHCLA(
      minOfMax(v, 0, 100),
      Math.max(0, g ? r.T - m : r.T - m * Math.min(Md[t] / q, 1.25)),
      (r.hue - n + 360) % 360
    )
    p = Math.max(t.g - 1.7, 0)
    r = t.hue * Math.PI / 180
    t = new ValidateBounds(
      t.g,
      t.T * Math.cos(r),
      t.T * Math.sin(r),
      t.alpha
    )
    let z = (t.g + 16) / 116
    r = 0.95047 * reverseTransformer(z + t.A / 500)
    v = 1 * reverseTransformer(z)
    z = 1.08883 * reverseTransformer(z - t.B / 200)
    return new ConstrainRGBA(
      minOfMax(
        linear2sRGB(3.2404542 * r + -1.5371385 * v + -0.4985314 * z),
        0,
        1
      ),
      minOfMax(
        linear2sRGB(-0.969266 * r + 1.8760108 * v + 0.041556 * z),
        0,
        1
      ),
      minOfMax(
        linear2sRGB(0.0556434 * r + -0.2040259 * v + 1.0572252 * z),
        0,
        1
      ),
      t.alpha
    )
  })
}
export function buildAccent (a) {
  let b
  b = b === undefined ? KdA : b
  const c = ConvertToLAB(a)
  let d = paletteGenerator(c, b)
  b = d.fd
  d = d.ed
  const e = b[d]
  const l = computeLABterms(e)
  const h = computeLABterms(c)
  const g = computeLABterms(b[2]).T < 30
  const f = l.g - h.g
  const m = l.T - h.T
  const n = l.hue - h.hue
  const u = Ld[d]
  const q = Md[d]
  let p = 100
  return b.map((R, T) => {
    let r = R
    let t = T
    // eslint-disable-next-line
    if (r === e) return (p = Math.max (h.g - 1.7, 0)), a;
    r = computeLABterms(r)
    let v = r.g - Ld[t] / u * f
    v = Math.min(v, p)
    t = new ConstrainHCLA(
      minOfMax(v, 0, 100),
      Math.max(0, g ? r.T - m : r.T - m * Math.min(Md[t] / q, 1.25)),
      (r.hue - n + 360) % 360
    )
    p = Math.max(t.g - 1.7, 0)
    r = t.hue * Math.PI / 180
    t = new ValidateBounds(
      t.g,
      t.T * Math.cos(r),
      t.T * Math.sin(r),
      t.alpha
    )
    let z = (t.g + 16) / 116
    r = 0.95047 * reverseTransformer(z + t.A / 500)
    v = 1 * reverseTransformer(z)
    z = 1.08883 * reverseTransformer(z - t.B / 200)
    return new ConstrainRGBA(
      minOfMax(
        linear2sRGB(3.2404542 * r + -1.5371385 * v + -0.4985314 * z),
        0,
        1
      ),
      minOfMax(
        linear2sRGB(-0.969266 * r + 1.8760108 * v + 0.041556 * z),
        0,
        1
      ),
      minOfMax(
        linear2sRGB(0.0556434 * r + -0.2040259 * v + 1.0572252 * z),
        0,
        1
      ),
      t.alpha
    )
  })
}
