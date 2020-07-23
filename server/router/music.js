const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
//27017默认的地址，/后面是随便设置的数据库名称
mongoose.connect('mongodb://localhost:27017/express', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (!err) {
    console.log("链接成功")
  } else {
    console.log("链接失败");
  }
});

var musicSchema = new mongoose.Schema({
  title: String,
  lyric: String,
  img: String,
  bg: String,
  music: String,
  id: Number
})
const musicArr = [
  {
    title: "夏天的风（原唱：温岚）",
    lyric: "[00:00.000] 作曲 : 周杰伦\n[00:00.010] 作词 : 天天\n[00:00.30]原唱：温岚\n[00:00.310]编曲 : 陈书伟\n[00:00.360]本作品经过词曲著作权利方授权\n[00:00.610]为什么你不在\n[00:02.540]问山风你会回来\n[00:07.460]夏天的风 我永远记得\n[00:11.540]清清楚楚的说你爱我\n[00:15.600]我看见你酷酷的笑容\n[00:19.310]也有腼腆的时候\n[00:23.390]夏天的风 正暖暖吹过\n[00:27.460]穿过头发穿过耳朵\n[00:31.430]你和我的夏天\n[00:33.940]风轻轻说着\n[00:39.250]七月的风懒懒的\n[00:43.390]连云都变热热的\n[00:47.220]不久后天闷闷的\n[00:50.110]一阵云后雨下过\n[00:56.740]气温 爬升到无法再忍受\n[01:03.249]索性闭上了双眼\n[01:05.879]让想象任意改变\n[01:10.790]场景 两个人一起散着步\n[01:15.278]我的脸也轻轻贴着你胸口\n[01:19.400]听到心跳\n[01:21.599]在乎我 和天气一样温度\n[01:27.409]夏天的风 我永远记得\n[01:31.400]清清楚楚的说你爱我\n[01:35.438]我看见你酷酷的笑容\n[01:39.370]也有腼腆的时候\n[01:43.510]夏天的风 正暖暖吹过\n[01:47.360]穿过头发穿过耳朵\n[01:51.260]你和我的夏天\n[01:53.849]风轻轻说着\n[02:00.858]温柔懒懒的海风\n[02:02.730]吹到高高的山峰\n[02:04.558]温的风 山的锋\n[02:06.528]吹成了山风\n[02:08.489]温柔懒懒的海风\n[02:10.479]吹到高高的山峰\n[02:12.459]温的风 山的锋\n[02:14.329]吹成了山风\n[02:16.519]温柔懒懒的海风\n[02:18.459]吹到高高的山峰\n[02:20.569]温的风 山的锋\n[02:22.429]吹成了山风\n[02:24.509]为什么你不在\n[02:26.500]问山风你会回来\n[02:30.560]场景 两个人一起散着步\n[02:35.299]我的脸也轻轻贴着你胸口\n[02:39.479]听到心跳 Wo\n[02:41.849]在乎我 和天气一样温度\n[02:47.399]夏天的风 我永远记得\n[02:51.319]清清楚楚的说你爱我\n[02:55.369]我看见你酷酷的笑容\n[02:59.379]也有腼腆的时候\n[03:03.329]夏天的风 正暖暖吹过\n[03:07.379]穿过头发穿过耳朵\n[03:11.449]你和我的夏天\n[03:13.739]风轻轻说着\n[03:24.399]\n[03:26.399]制作：红龙制乐\n[03:27.399]统筹：赵越/黄鲲/潘俊/杨黄成\n[03:29.399]企划：小粉\n[03:30.399]宣传：沈峻峻\n[03:31.399]合声：郁采真\n[03:34.399]混音/母带：陈书伟\n[03:36.399]OP:Shen Qi Lu Guan Multimedia Ltd. /JVR Music Int. Ltd.\n[03:38.399]SP:美希亚音乐版权代理（北京）有限公司\n",
    img: "http://p2.music.126.net/rFUKVdOjqxgwAT6Zi6qv7A==/109951164906689206.jpg",
    bg: "https://p3.music.126.net/66ewnuFNHla7YJWt7zT8nw==/109951164922923585.jpg",
    music: "http://renjinhui.gitee.io/wymusic/夏天的风.m4a",
    id: 1
  },
  {
    title: "Believer - Imagine Dragons/Lil Wayne",
    lyric: "[00:07.827] First things first\n[00:09.202] I'ma say all the words inside my head\n[00:12.184] I'm fired up and tired of the way that things have been, oh-ooh\n[00:18.191] The way that things have been, oh-ooh\n[00:22.986] Second thing second\n[00:24.575] Don't you tell me what you think that I could be\n[00:27.493] I'm the one at the sail, I'm the master of my sea, oh-ooh\n[00:33.594] The master of my sea, oh-ooh\n[00:37.642]\n[00:38.329] I was broken from a young age\n[00:40.018] Taking my sulkin' to the masses\n[00:42.001] Writing my poems for the few\n[00:43.788] That look at me, took to me, shook to me, feelin' me\n[00:45.654] Singing from heartache from the pain\n[00:47.660] Taking my message from the veins\n[00:49.612] Speaking my lesson from the brain\n[00:51.452] Seeing the beauty through the...\n[00:54.016]\n[00:54.876] Pain! You made me a, you made me a believer, believer\n[01:02.535] Pain! You break me down and build me up, believer, believer\n[01:09.296] Pain! Oh, let the bullets fly, oh, let them rain\n[01:14.709] My life, my love, my drive, it came from...\n[01:17.948] Pain! You made me a, you made me a believer, believer\n[01:24.308]\n[01:24.743] First things first\n[01:26.066] Can you imagine what's about to happen?\n[01:27.815] It's Weezy the Dragon, I link with the Dragons\n[01:29.828] And we gon' get ratchet, no need for Imaginin'\n[01:31.873] This is what's happenin'\n[01:32.757] Second thing second, I reckon immaculate\n[01:34.763] Sing about accurate\n[01:35.793] I know that strength, it don't come, don't come without strategy\n[01:37.671] I know the sweet, it don't come without cavities\n[01:39.511] I know the passages come with some traffic\n[01:41.296] I start with from the basement, end up in the attic\n[01:43.401] And third thing third\n[01:44.197] Whoever call me out, they simply can't count\n[01:46.010] Let's get mathematic, I'm up in this\n[01:47.994] Is you a believer?\n[01:49.023] I get a unicorn out of a zebra\n[01:51.067] I wear my uniform like a tuxedo\n[01:52.769] This dragon don't hold his breath, don't need no breather\n[01:54.957] Love you Miss Cita, son of a leader\n[01:56.796] I know the bloomin' don't come without rain\n[01:58.656] I know the losin' don't come without shame\n[02:00.540] I know the beauty don't come without hurt\n[02:02.452] Hold up, hold up, last thing last\n[02:04.384] I know that Tunechi don't come without Wayne\n[02:06.395] I know that losin' don't come without game\n[02:08.258] I know that glory don't come without\n[02:10.125] Don't come without...\n[02:11.496]\n[02:11.643] Pain! You made me a, you made me a believer, believer\n[02:19.336] Pain! You break me down and build me up, believer, believer\n[02:26.062] Pain! Oh, let the bullets fly, oh, let them rain\n[02:31.466] My life, my love, my drive, it came from...\n[02:34.592] Pain! You made me a, you made me a believer, believer\n[02:41.410]\n[02:41.465] Last things last\n[02:42.869] By the grace of the fire and the flames\n[02:45.776] You're the face of the future, the blood in my veins, oh-ooh\n[02:51.697] The blood in my veins, oh-ooh\n[02:56.526] But they never did, ever lived, ebbin' and flowin'\n[02:58.722] Inhibited, limited 'til it broke open and rained down\n[03:01.695] It rained down, like...\n[03:04.738]\n[03:05.347] Pain! You made me a, you made me a believer, believer\n[03:13.031] Pain! You break me down and build me up, believer, believer\n[03:19.819] Pain! Oh, let the bullets fly, oh, let them rain\n[03:25.406] My life, my love, my drive, it came from...\n[03:28.358] Pain! You made me a, you made me a believer, believer\n",
    img: "http://p1.music.126.net/0_YzqMGHrDXU9C277IFerA==/109951163783209324.jpg",
    bg: "https://p4.music.126.net/McpIxVZl-U37S-dWxAHvpg==/109951163785028976.jpg",
    music: "http://renjinhui.gitee.io/wymusic/believer.m4a",
    id: 2
  },
  {
    title: "沙漠骆驼 - 展展与罗罗",
    lyric: "[00:00.000] 作曲 : 展展与罗罗\n[00:00.000] 作词 : 展展与罗罗\n[00:00.00]\n[00:25.990]我要穿越这片沙漠\n[00:28.030]找寻真的自我\n[00:30.280]身边只有一匹骆驼陪我\n[00:34.600]这片风儿吹过\n[00:36.750]那片云儿飘过\n[00:38.870]突然之间出现爱的小河\n[00:43.570]我跨上沙漠之舟\n[00:45.540]背上烟斗和沙漏\n[00:47.660]手里还握着一壶烈酒\n[00:52.040]漫长古道悠悠\n[00:54.200]说不尽喜怒哀愁\n[00:56.360]只有那骆驼奔忙依旧\n[01:00.890]什么鬼魅传说\n[01:02.920]什么魑魅魍魉妖魔\n[01:05.060]只有那鹭鹰在幽幽的高歌\n[01:09.519]漫天黄沙掠过\n[01:11.709]走遍每个角落\n[01:13.879]行走在无尽的苍茫星河\n[01:18.439]白天黑夜交错\n[01:20.390]如此妖娆婀娜\n[01:22.530]蹉跎着岁月又蹉跎了自我\n[01:27.010]前方迷途太多\n[01:29.110]坚持才能洒脱\n[01:31.250]走出黑暗就能逍遥又快活\n[01:49.030]我寻找沙漠绿洲\n[01:50.959]出现海市蜃楼\n[01:53.150]我仿佛看到她在那里等候\n[01:57.470]想起了她的温柔\n[01:59.660]滚烫着我的胸口\n[02:01.829]迷失在昨夜的那壶老酒\n[02:06.400]我穿上大头皮鞋\n[02:08.349]跨过凛冽荒野\n[02:10.509]我仿佛穿越到另一个世界\n[02:14.969]阿拉丁神灯要倾斜\n[02:17.110]天堂地狱已然重叠\n[02:19.240]突然之间飞来一只蝴蝶\n[02:23.819]什么鬼魅传说\n[02:25.789]什么魑魅魍魉妖魔\n[02:27.970]只有那鹭鹰在幽幽的高歌\n[02:32.430]漫天黄沙掠过\n[02:34.580]走遍每个角落\n[02:36.729]行走在无尽的苍茫星河\n[02:41.349]白天黑夜交错\n[02:43.220]如此妖娆婀娜\n[02:45.430]蹉跎着岁月又蹉跎了自我\n[02:49.879]前方迷途太多\n[02:51.979]坚持才能洒脱\n[02:54.120]走出黑暗就能逍遥又快活\n[03:46.720]我已坠入在这神奇的国度\n[03:50.960]驼铃相伴走向圣堂之路\n[03:55.280]原谅我曾经恍惚陷入迷途\n[03:59.210]遮住了眼眸\n[04:01.319]湮没了意图\n[04:04.090]怎能被这样征服\n[04:12.840]什么鬼魅传说\n[04:14.900]什么魑魅魍魉妖魔\n[04:17.120]只有那鹭鹰在幽幽的高歌\n[04:21.449]漫天黄沙掠过\n[04:23.639]走遍每个角落\n[04:25.790]行走在无尽的苍茫星河\n[04:30.410]白天黑夜交错\n[04:32.310]如此妖娆婀娜\n[04:34.569]蹉跎着岁月又蹉跎了自我\n[04:38.870]前方迷途太多\n[04:41.089]坚持才能洒脱\n[04:43.250]走出黑暗就能逍遥又快活\n[04:47.449]梦里回到最初\n[04:49.810]浪潮起起伏伏\n[04:52.019]彷徨着未来又彷徨着孤独\n[04:56.279]漫长人生旅途\n[04:58.540]花开花落无数\n[05:00.709]沸腾的时光怎能被荒芜\n[05:05.319]清晨又到日暮\n[05:07.250]天边飞鸟群逐\n[05:09.480]摇曳着苍穹又描摹着黄土\n[05:13.879]东方鱼肚白出\n[05:16.029]烈日绽放吐露\n[05:18.180]放下尘浮我已踏上归途\n[05:24.639]\n",
    img: "http://p2.music.126.net/oov7j64hTKZSm0CEUkRNoQ==/109951163111639178.jpg",
    bg: "https://p3.music.126.net/J42rJTPyjRPp6-mdOSZQHw==/109951163624379798.jpg",
    music: "http://renjinhui.gitee.io/wymusic/沙漠骆驼.m4a",
    id: 3
  },
  {
    title: "背对背拥抱 - 林俊杰",
    lyric: "[00:00.000] 作曲 : 林俊杰\n[00:00.666] 作词 : 林怡凤\n[00:02.000] 编曲 : 吴庆隆\n[00:03.000]\n[00:14.986] 话总说不清楚 该怎么明了\n[00:22.280] 一字一句像 圈套\n[00:29.689] 旧账总翻不完 谁无理取闹\n[00:36.624] 你的双手甩开刚好的微妙\n[00:42.130] 然后战火再燃烧\n[00:48.584] 我们背对背拥抱\n[00:52.291] 滥用沉默在咆哮\n[00:55.966] 爱情来不及变老\n[00:58.919] 葬送在烽火的玩笑\n[01:03.372] 我们背对背拥抱\n[01:07.010] 真话兜着圈子乱乱绕\n[01:10.946] 只是想让我知道\n[01:14.623] 只是想让你知道 爱的警告\n[01:23.229] 话总说不清楚 该怎么明了\n[01:30.618] 一字一句像 圈套\n[01:37.988] 旧账总翻不完 谁无理取闹\n[01:44.869] 你的双手甩开刚好的微妙\n[01:50.429] 然后战火再燃烧\n[01:54.988] 我们背对背拥抱\n[01:58.718] 滥用沉默在咆哮\n[02:02.428] 爱情来不及变老\n[02:05.392] 葬送在烽火的玩笑\n[02:10.025] 我们背对背拥抱\n[02:13.504] 真话兜着圈子乱乱绕\n[02:17.361] 只是想让我知道\n[02:21.066] 只是想让你知道 爱的警告\n[02:29.181] 我不要一直到\n[02:32.578] 形同陌路变成自找\n[02:36.301] 既然可以拥抱\n[02:38.372] 就不要轻易放掉\n[02:44.950] 我们背对背拥抱\n[02:48.573] 滥用沉默在咆哮\n[02:52.233] 爱情来不及变老\n[02:55.167] 葬送在烽火的玩笑\n[02:59.405] 我们背对背拥抱\n[03:03.295] 真话兜着圈子乱乱绕\n[03:07.292] 只是想让我知道\n[03:10.931] 只是想让你知道 这警告\n[03:18.378] 只是想让我知道\n[03:22.026] 只是想让你知道 爱的警告\n[03:31.405]\n",
    img: "https://p1.music.126.net/xDXFDVKPGniFsckE44kZjQ==/109951163076917340.jpg",
    bg: "https://p3.music.126.net/J42rJTPyjRPp6-mdOSZQHw==/109951163624379798.jpg",
    music: "http://m8.music.126.net/20200723162422/ca229378770bbc55a6277f100d1e2244/ymusic/c912/4100/7138/805bf06afea765bd78327bd8078711bc.mp3",
    id: 4
  },
  {
    title: "江南 - 林俊杰",
    lyric: "[00:00.000] 作曲 : 林俊杰\n[00:00.666] 作词 : 林秋离\n[00:02.000] 编曲 : 蔡政勋 / 陈建玮\n[00:03.000]\n[00:37.010] 风到这里就是粘\n[00:40.534] 粘住过客的思念\n[00:44.795] 雨到了这里缠成线\n[00:48.546] 缠着我们流连人世间\n[00:53.038] 你在身边就是缘\n[00:56.569] 缘分写在三生石上面\n[01:01.023] 爱有万分之一甜\n[01:04.546] 宁愿我就葬在这一点\n[01:09.062] 圈圈圆圆圈圈\n[01:10.739] 天天年年天天 的我\n[01:13.546] 深深看你的脸\n[01:16.041] 生气的温柔\n[01:17.994] 埋怨的温柔 的脸\n[01:24.058] 不懂爱恨情愁煎熬的我们\n[01:27.737] 都以为相爱就像风云的善变\n[01:32.017] 相信爱一天 抵过永远\n[01:36.279] 在这一刹那冻结了时间\n[01:40.009] 不懂怎么表现温柔的我们\n[01:43.760] 还以为殉情只是古老的传言\n[01:47.751] 离愁能有多痛 痛有多浓\n[01:52.247] 当梦被埋在江南烟雨中\n[01:55.506] 心碎了才懂\n[01:58.921]\n[02:20.982] 圈圈圆圆圈圈\n[02:22.699] 天天年年天天 的我\n[02:25.470] 深深看你的脸\n[02:27.948] 生气的温柔\n[02:29.933] 埋怨的温柔 的脸\n[02:35.984] 不懂爱恨情愁煎熬的我们\n[02:39.697] 都以为相爱就像风云的善变\n[02:43.951] 相信爱一天 抵过永远\n[02:48.195] 在这一刹那冻结了时间\n[02:51.964] 不懂怎么表现温柔的我们\n[02:55.694] 还以为殉情只是古老的传言\n[02:59.698] 离愁能有多痛 痛有多浓\n[03:04.200] 当梦被埋在江南烟雨中\n[03:07.485] 心碎了才懂\n[03:11.231]\n[03:19.925] 相信爱一天 抵过永远\n[03:24.192] 在这一刹那冻结了时间\n[03:27.952] 不懂怎么表现温柔的我们\n[03:31.717] 还以为殉情只是古老的传言\n[03:35.716] 离愁能有多痛 痛有多浓\n[03:40.186] 当梦被埋在江南烟雨中\n[03:45.494] 心碎了才懂\n[03:49.162]\n",
    img: "https://p1.music.126.net/Idvy0astfIET8_3bsu8TqQ==/106652627911549.jpg",
    bg: "https://p3.music.126.net/J42rJTPyjRPp6-mdOSZQHw==/109951163624379798.jpg",
    music: "http://m701.music.126.net/20200723162839/a930fa62c6d799e89a02b9ccf06f0cc2/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/1669172032/04d1/4235/cc56/bb3320d312700cf60200515b0344f9a0.mp3",
    id: 5
  },
  {
    title: "不为谁而作的歌 - 林俊杰",
    lyric: "[00:00.000] 作曲 : 林俊杰\n[00:01.000] 作词 : 林秋离\n[00:31.320]原谅我这一首\n[00:35.080]不为谁而作的歌\n[00:38.270]感觉上仿佛窗外的夜色\n[00:44.720]曾经有那一刻\n[00:48.000]回头竟然认不得\n[00:51.700]需要从记忆再摸索的人\n[00:58.620]和他们关心的 的地方\n[01:05.230]和那些走过的 请等一等\n[01:14.300]梦为努力浇了水\n[01:17.940]爱在背后往前推\n[01:21.300]当我抬起头儿才发觉\n[01:25.150]我是不是忘了谁\n[01:27.900]累到整夜不能睡\n[01:31.160]夜色哪里都是美\n[01:34.520]一定有个人\n[01:36.390]她躲过避过闪过瞒过\n[01:39.180]她是谁\n[01:45.720]她是谁\n[01:54.420]原谅我这一首\n[01:57.360]不为谁而作的歌\n[02:00.880]感觉上仿佛窗外的夜色\n[02:07.430]曾经有那一刻回头\n[02:11.610]竟然认不得\n[02:14.590]需要从记忆再摸索的人\n[02:21.150]和他们关心的 的地方\n[02:27.860]和那些走过的\n[02:33.990]梦为努力浇了水\n[02:37.280]爱在背后往前推\n[02:40.620]当我抬起头儿才发觉\n[02:44.370]我是不是忘了谁\n[02:47.360]累到整夜不能睡\n[02:50.550]夜色哪里都是美\n[02:54.030]一定有个人她\n[02:56.340]躲过避过闪过瞒过\n[02:58.540]她是谁\n[03:05.060]她是谁\n[03:13.450]也许在真实面对自己才不顾一切\n[03:19.940]去探究当初我害怕面对\n[03:28.590]梦为努力浇了水\n[03:31.950]爱在背后往前推\n[03:35.340]当我抬起头儿才发觉\n[03:39.270]我是不是忘了谁\n[03:41.900]累到整夜不能睡\n[03:45.260]夜色哪里都是美\n[03:48.580]一定有个她\n[03:50.920]躲过避过闪过瞒过\n[03:53.340]她是谁\n[03:59.780]她是谁\n[04:12.860]她是谁\n",
    img: "https://p2.music.126.net/XHGzoVmS6SDep4VuHi5OjA==/18832435162500729.jpg",
    bg: "https://p3.music.126.net/J42rJTPyjRPp6-mdOSZQHw==/109951163624379798.jpg",
    music: "http://m7.music.126.net/20200723163313/9bdf6b8f5cd6318e1bebfeea5c8b09b0/ymusic/7345/85be/af5c/9e408f16b5e23f7a6b062c1decc4bc3d.mp3",
    id: 6
  }
]
// 创建model
var music = mongoose.model('music', musicSchema);
// 创建文档实例
var arr = [];
musicArr.forEach((item) => {
  let musicItem = new music(item);
  arr.push(musicItem)
})
//将数据填充到文档中
//music.deleteMany({}).then(() => callback())
//music.insertMany(arr);
//product.save()
// router.post('/', async function (req, res) {
//   console.log("获取请求参数", req.body);
//   //musicdata.find().where({id:req.id})
//   res.send(await music.find());
// })

module.exports = music;