import React, {useEffect, useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis,
  Radar, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area, CartesianGrid
} from 'recharts';
import {
  Crown, Home, Gauge, LineChart as LineIcon, Route, GraduationCap, Star, Users, BookOpen, Settings,
  Trophy, Brain, MapPin, FileText, ShieldCheck, Sparkles, Download, Search, Bell, ChevronDown, QrCode,
  HeartHandshake, Laptop, Leaf, Award, Target, CalendarCheck, Handshake, Library, SlidersHorizontal,
  CheckCircle2, Activity, BadgeCheck, MessageCircle, MapPinned, Medal, Flame, Layers, TrendingUp,
  ClipboardCheck, RefreshCcw, Building2, Globe2, LockKeyhole, UserRoundCheck, PlayCircle, Printer
} from 'lucide-react';
import './styles.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const FALLBACK = {
  kpis:[
    {key:'overall',label:'المؤشر الكلي للأسرة',value:87.6,status:'ممتاز',change:12.4,icon:'crown'},
    {key:'cohesion',label:'التماسك الأسري',value:91.2,status:'ممتاز',change:8.7,icon:'heart'},
    {key:'values',label:'التأصيل القيمي',value:78.3,status:'جيد جداً',change:5.1,icon:'shield'},
    {key:'community',label:'الأثر المجتمعي',value:79.5,status:'جيد جداً',change:7.3,icon:'users'},
    {key:'digital',label:'العالم الرقمي',value:73.8,status:'جيد',change:11.5,icon:'laptop'},
    {key:'development',label:'المشاركة والتطوير',value:82.1,status:'جيد جداً',change:9.2,icon:'trend'}
  ],
  national:{families:154892,activeFamilies:98542,average:76.8,initiatives:245,partners:57,reports:18},
  regions:[
    {id:'riyadh',name:'الرياض',score:91.3,families:42000,trend:12,cities:[{name:'الرياض',score:91.3},{name:'الخرج',score:83.2},{name:'الدرعية',score:89.4},{name:'المجمعة',score:78.9}]},
    {id:'makkah',name:'مكة المكرمة',score:88.7,families:38200,trend:9,cities:[{name:'جدة',score:86.2},{name:'مكة',score:88.7},{name:'الطائف',score:82.4},{name:'رابغ',score:76.5}]},
    {id:'eastern',name:'المنطقة الشرقية',score:85.1,families:26600,trend:7,cities:[{name:'الدمام',score:85.1},{name:'الأحساء',score:81.5},{name:'الخبر',score:86.9},{name:'الجبيل',score:84.7}]},
    {id:'madinah',name:'المدينة المنورة',score:82.6,families:15120,trend:6,cities:[{name:'المدينة',score:82.6},{name:'ينبع',score:79.2},{name:'العلا',score:77.8}]},
    {id:'asir',name:'عسير',score:79.3,families:11980,trend:5,cities:[{name:'أبها',score:79.3},{name:'خميس مشيط',score:77.1},{name:'النماص',score:75.9}]},
    {id:'qassim',name:'القصيم',score:81.4,families:10240,trend:5,cities:[{name:'بريدة',score:81.4},{name:'عنيزة',score:80.2}]},
    {id:'tabuk',name:'تبوك',score:77.6,families:9120,trend:4,cities:[{name:'تبوك',score:77.6},{name:'ضباء',score:74.1}]}
  ],
  journey:[
    {stage:'قياس',done:true,note:'تم التقييم بنجاح',icon:'gauge'},
    {stage:'تشخيص',done:true,note:'تم تحليل النتائج',icon:'brain'},
    {stage:'خطة تطوير',done:true,note:'تم إنشاء الخطة',icon:'target'},
    {stage:'تنفيذ',done:true,note:'قيد التنفيذ',icon:'play'},
    {stage:'متابعة',done:false,note:'72% مكتمل',icon:'activity'},
    {stage:'إعادة قياس',done:false,note:'بعد 30 يوماً',icon:'refresh'},
    {stage:'اعتماد',done:false,note:'قيد المراجعة',icon:'badge'},
    {stage:'أسرة ملهمة',done:false,note:'الهدف القادم',icon:'crown'}
  ],
  academy:[
    {id:1,title:'برنامج الحوار الأسري الذكي',dimension:'التماسك الأسري',progress:60,hours:8,level:'متوسط'},
    {id:2,title:'التربية الرقمية الآمنة',dimension:'العالم الرقمي',progress:75,hours:6,level:'أساسي'},
    {id:3,title:'التطوع الأسري وصناعة الأثر',dimension:'الأثر المجتمعي',progress:40,hours:5,level:'تطبيقي'},
    {id:4,title:'القيم اليومية بالقدوة',dimension:'التأصيل القيمي',progress:90,hours:4,level:'مكثف'}
  ],
  initiatives:[
    {title:'تحدي الأسرة المتحاورة',progress:60,days:15,icon:'users'},
    {title:'مبادرة القراءة العائلية',progress:75,days:5,icon:'book'},
    {title:'مشروع التطوع الأسري',progress:40,days:25,icon:'leaf'},
    {title:'برنامج الاقتصاد المنزلي',progress:90,days:0,icon:'trend'}
  ],
  publications:[
    {title:'دليل بناء الأسرة القدوة',type:'دليل منهجي',year:2026,status:'منشور'},
    {title:'الخصائص السيكومترية لمقياس الأسرة القدوة',type:'ورقة علمية',year:2026,status:'قيد التحكيم'},
    {title:'تقرير المرصد الأسري الوطني - نسخة تجريبية',type:'تقرير سنوي',year:2026,status:'مسودة'},
    {title:'بروتوكول الاعتماد الأسري',type:'إطار تشغيلي',year:2026,status:'جاهز'}
  ],
  badges:['أسرة قدوة','أسرة رقمية واعية','أسرة متطوعة','المجلس الأسري','القدوة في القيم'],
};

const months=['يونيو 23','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر','يناير','فبراير','مارس','أبريل','مايو 24'];
const trend=months.map((m,i)=>({m,overall:45+i*4+(i>6?6:0),cohesion:55+i*4.5,values:32+i*4,community:54+i*4.3,digital:19+i*3.8,benchmark:51+i*3.2}));
const COLORS=['#35f4a5','#f2c14e','#38bdf8','#a855f7','#f97316','#14f1d9'];

function useDashboard(){
  const [data,setData]=useState(FALLBACK);
  useEffect(()=>{fetch(`${API}/api/dashboard`).then(r=>r.json()).then(d=>setData({...FALLBACK,...d})).catch(()=>{});},[]);
  return data;
}
function Card({children,className='',onClick}){return <div className={'glass '+className} onClick={onClick}>{children}</div>}
function IconFor({name,size=22}){
  const map={crown:Crown,heart:HeartHandshake,shield:ShieldCheck,users:Users,laptop:Laptop,trend:TrendingUp,gauge:Gauge,brain:Brain,target:Target,play:PlayCircle,activity:Activity,refresh:RefreshCcw,badge:BadgeCheck,book:BookOpen,leaf:Leaf};
  const I=map[name]||Sparkles;return <I size={size}/>;
}
function Kpi({k,i}){return <Card className={`kpi tone${i}`}><div className="kpiTop"><div className="kpiIcon"><IconFor name={k.icon}/></div><span className="muted">{k.label}</span></div><b>{k.value}</b><strong>{k.status}</strong><small>↑ {k.change}%</small><svg viewBox="0 0 120 30" className="spark">{[8,9,7,10,12,11,15,13,18,16,22].map((y,idx)=><circle key={idx} cx={idx*11+5} cy={28-y} r="1.8"/>)}<polyline points="5,20 16,19 27,21 38,18 49,16 60,17 71,13 82,15 93,10 104,12 115,6"/></svg></Card>}
function Sidebar({tab,setTab}){let items=[['home','الرئيسية',Home],['assessment','القياس والتقييم',Gauge],['insights','النتائج والتحليل',LineIcon],['advisor','التوصيات الذكية',Brain],['journey','رحلة التطوير الأسري',Route],['academy','الأكاديمية والتدريب',GraduationCap],['initiatives','المبادرات والتحديات',Star],['partners','الشراكات والبرامج',Users],['observatory','المرصد الأسري',MapPin],['research','المكتبة البحثية',BookOpen],['reports','التقارير',FileText],['settings','الإعدادات',Settings]];return <aside><div className="brand"><Crown/><h2>منصة الأسرة القدوة</h2><p>Family Role Model Platform</p></div>{items.map(([id,label,Icon])=><button key={id} onClick={()=>setTab(id)} className={tab===id?'active':''}><Icon size={18}/>{label}</button>)}<Card className="level"><span>المستوى الحالي</span><h2>أسرة ملهمة</h2><div className="stars">★★★★★</div><Trophy size={60}/><button onClick={()=>setTab('reports')}>عرض الجواز الرقمي</button></Card></aside>}
function HeroStats({data}){const n=data.national||FALLBACK.national;const stats=[['إجمالي الأسر',n.families,Users],['الأسر النشطة',n.activeFamilies,Activity],['متوسط المؤشر الوطني',n.average,LineIcon],['عدد المبادرات',n.initiatives,Star],['عدد الشراكات',n.partners,Handshake]];return <div className="heroStats">{stats.map(([l,v,I])=><Card key={l} className="stat"><I/><span>{l}</span><b>{typeof v==='number'?v.toLocaleString():v}</b><small>↑ نمو تجريبي</small></Card>)}</div>}
function SaudiMap({regions,onSelect,selected,compact=false}){const pts=[['riyadh',58,48],['makkah',36,62],['eastern',78,54],['madinah',35,42],['asir',45,77],['qassim',48,39],['tabuk',28,25]];return <div className="mapBox"><svg viewBox="0 0 100 100"><defs><radialGradient id="saudiGrad"><stop offset="0" stopColor="#32f29d" stopOpacity=".45"/><stop offset="1" stopColor="#0e5b4b" stopOpacity=".18"/></radialGradient></defs><polygon points="21,45 31,22 52,18 68,26 88,42 78,62 58,73 44,68 28,58" className="saudi"/><path d="M32 22 L44 68 M52 18 L58 73 M68 26 L28 58 M21 45 L78 62" className="mapLine"/>{pts.map(([id,x,y])=>{let r=regions.find(a=>a.id===id)||{};let cls=(r.score||0)>88?'hot high':(r.score||0)>82?'hot mid':'hot low';return <g key={id} onClick={()=>onSelect(r)} className="hotspot"><circle cx={x} cy={y} r={selected?.id===id?12:8} className={cls}/><circle cx={x} cy={y} r="3"/><text x={x+4} y={y-5}>{Math.round(r.score||0)}</text></g>})}</svg>{!compact&&<div className="regionList">{regions.map((r,i)=><div key={r.id} onClick={()=>onSelect(r)} className={selected?.id===r.id?'sel':''}><b>{r.score}</b><span>{r.name}</span><em>{r.families.toLocaleString()} أسرة</em></div>)}</div>}</div>}
function CityHeat({region}){return <div className="cityHeat"><h4>مخرجات المدن والمحافظات</h4>{(region?.cities||[]).map(c=><div key={c.name} className="cityRow"><span>{c.name}</span><i><em style={{width:c.score+'%'}}/></i><b>{c.score}</b></div>)}</div>}
function AdvisorCompact({setTab}){return <Card className="aiCompact"><div className="aiHead"><Brain/><h3>واعي للأسرة</h3><span>AI</span></div><ul><li>أولوية عالية: تنظيم الاستخدام الرقمي.</li><li>أولوية متوسطة: رفع التطوع الأسري.</li><li>فرصة متميزة: اعتماد الأسرة الملهمة.</li></ul><button onClick={()=>setTab('advisor')}>فتح المستشار الذكي</button></Card>}
function Achievements({badges,setTab}){return <Card className="achievements"><h3><Trophy/> الإنجازات والشارات</h3><div className="badgeGrid">{badges.map((b,i)=><div key={b} className="badge"><Medal/><span>{b}</span></div>)}</div><button onClick={()=>setTab('reports')}>عرض جميع الشارات</button></Card>}
function JourneyStrip({data,setTab}){return <Card className="journeyStrip"><h3><Route/> رحلة التطوير الأسري</h3><div className="journeyLine">{data.journey.map((j,i)=><div key={j.stage} className={j.done?'jDone jItem':'jItem'}><b><IconFor name={j.icon} size={18}/></b><span>{j.stage}</span><small>{j.note}</small></div>)}</div><button onClick={()=>setTab('journey')}>تفاصيل الرحلة</button></Card>}
function AcademyPreview({data,setTab}){return <Card className="academyPreview"><h3><GraduationCap/> الأكاديمية والبرامج المقترحة</h3>{data.academy.slice(0,3).map(c=><div className="course" key={c.id}><div><b>{c.title}</b><span>{c.dimension} • {c.hours} ساعات</span></div><em>{c.progress}%</em></div>)}<button onClick={()=>setTab('academy')}>فتح الأكاديمية</button></Card>}
function InitiativePreview({data,setTab}){return <Card className="initiativePreview"><h3><Star/> المبادرات والتحديات</h3><div className="miniCards">{data.initiatives.slice(0,4).map(x=><div key={x.title}><IconFor name={x.icon}/><b>{x.progress}%</b><span>{x.title}</span></div>)}</div><button onClick={()=>setTab('initiatives')}>إدارة المبادرات</button></Card>}
function ResearchPreview({data,setTab}){return <Card className="researchPreview"><h3><Library/> المكتبة البحثية</h3>{data.publications.slice(0,3).map(p=><div key={p.title} className="pub"><span>{p.type}</span><b>{p.title}</b><em>{p.status}</em></div>)}<button onClick={()=>setTab('research')}>فتح المركز البحثي</button></Card>}
function Dashboard({data,setTab}){const [selected,setSelected]=useState(data.regions[0]);useEffect(()=>{if(!selected&&data.regions?.length)setSelected(data.regions[0])},[data]);const radar=data.kpis.slice(1,6).map(k=>({subject:k.label.replace('ال',''),A:k.value,B:76}));const pie=data.kpis.slice(1,6).map(k=>({name:k.label,value:k.value}));return <main><header><div><h1>لوحة المؤشرات التفاعلية</h1><p>نظرة شاملة على أداء الأسرة عبر الزمن، من القياس إلى التمكين والاعتماد</p></div><div className="topActions"><button><Search size={16}/> بحث</button><button><Bell size={16}/></button><button className="user">د. لؤي أحمد <b>LA</b><ChevronDown size={16}/></button></div></header><div className="filters"><button><CalendarCheck size={16}/> 3 أشهر</button><button>فترة مايو 2024</button><button>جميع أفراد الأسرة</button><button onClick={()=>setTab('reports')}><Printer size={16}/> تقرير تنفيذي</button></div><HeroStats data={data}/><section className="kpis">{data.kpis.map((k,i)=><Kpi k={k} i={i} key={k.key}/>)}</section><section className="grid luxuryHome"><Card className="wide trendCard"><h3><TrendingUp/> التطور عبر الزمن - قياس طولي</h3><ResponsiveContainer height={310}><LineChart data={trend}><CartesianGrid stroke="rgba(255,255,255,.08)"/><XAxis dataKey="m"/><YAxis/><Tooltip contentStyle={{background:'#06231f',border:'1px solid rgba(53,244,165,.2)',borderRadius:14}}/><Line dataKey="overall" name="المؤشر الكلي" stroke="#35f4a5" strokeWidth={4}/><Line dataKey="cohesion" name="التماسك" stroke="#f2c14e" strokeWidth={3}/><Line dataKey="values" name="القيم" stroke="#38bdf8" strokeWidth={2}/><Line dataKey="community" name="الأثر" stroke="#a855f7" strokeWidth={2}/><Line dataKey="digital" name="الرقمي" stroke="#14f1d9" strokeWidth={2}/></LineChart></ResponsiveContainer></Card><Card><h3><Activity/> الرادار التحليلي</h3><ResponsiveContainer height={300}><RadarChart data={radar}><PolarGrid/><PolarAngleAxis dataKey="subject"/><Radar dataKey="A" name="أسرتك" stroke="#35f4a5" fill="#35f4a5" fillOpacity={0.36}/><Radar dataKey="B" name="المتوسط الوطني" stroke="#f2c14e" fill="#f2c14e" fillOpacity={0.16}/><Tooltip/></RadarChart></ResponsiveContainer><div className="legend"><i/> أسرتك <em/> المتوسط الوطني</div></Card><Card className="mapPanel"><h3><MapPinned/> خريطة المرصد الأسري الوطني</h3><SaudiMap regions={data.regions} selected={selected} onSelect={setSelected}/><CityHeat region={selected}/></Card><Card><h3><Layers/> توزيع الدرجات</h3><ResponsiveContainer height={230}><PieChart><Pie data={pie} dataKey="value" innerRadius={58} outerRadius={90} paddingAngle={3}>{pie.map((_,i)=><Cell fill={COLORS[i]} key={i}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer><div className="donutCenter">6<br/><span>أبعاد</span></div></Card><Card><h3><Target/> التقدم نحو الأهداف</h3><div className="goal"><b>72%</b><span>مكتمل</span></div><ul className="clean"><li>3/4 أهداف مكتملة</li><li>8 أنشطة منجزة</li><li>12 نشاط متبقي</li></ul><button onClick={()=>setTab('journey')}>عرض الخطة التفصيلية</button></Card><AdvisorCompact setTab={setTab}/><Achievements badges={data.badges} setTab={setTab}/><JourneyStrip data={data} setTab={setTab}/><AcademyPreview data={data} setTab={setTab}/><InitiativePreview data={data} setTab={setTab}/><ResearchPreview data={data} setTab={setTab}/><Card className="passport"><h3><QrCode/> Family Digital Passport</h3><div className="qr">FRMP<br/>2026</div><b>عائلة العتيبي</b><p>درجة الاعتماد: 87.6 — أسرة ملهمة</p><button onClick={()=>setTab('reports')}>فتح الجواز</button></Card></section></main>}
function Advisor(){const [q,setQ]=useState('كيف أرفع مؤشر العالم الرقمي؟'); const [a,setA]=useState(''); const ask=()=>fetch(`${API}/api/ai/advice?q=${encodeURIComponent(q)}`).then(r=>r.json()).then(d=>setA(d.answer+'\n\nخطة 90 يوم:\n- '+d.plan90.join('\n- '))).catch(()=>setA('ابدأوا بميثاق رقمي منزلي، جلسة حوار أسبوعية، وتحدي تطوعي شهري.'));return <main><Card className="advisor"><h2><Brain/> واعي للأسرة - AI Advisor</h2><p>مستشار ذكي تجريبي يقرأ نتائج الأسرة ويحوّلها إلى خطة عملية قصيرة.</p><textarea value={q} onChange={e=>setQ(e.target.value)}/><button onClick={ask}>اسأل واعي</button><pre>{a||'اكتب سؤالاً عن نتائج الأسرة أو خطة التحسين.'}</pre></Card></main>}
function Journey({data}){return <main><h1>Family Journey Engine</h1><p>تحويل نتيجة الأسرة إلى رحلة تطوير واعتماد قابلة للمتابعة.</p><div className="timeline">{data.journey.map((j,i)=><Card key={j.stage} className={j.done?'done step':'step'}><b><IconFor name={j.icon}/></b><h3>{j.stage}</h3><p>{j.note}</p></Card>)}</div><JourneyStrip data={data} setTab={()=>{}}/></main>}
function Academy({data}){return <main><h1>Academy Engine</h1><p>ربط نتائج القياس ببرامج تدريبية ومحتوى تمكيني موجه.</p><div className="cards4">{data.academy.map((c,i)=><Card key={c.title}><GraduationCap/><h3>{c.title}</h3><p>{c.dimension} • {c.level}</p><div className="bar"><i style={{width:c.progress+'%'}}/></div><small>{c.progress}% • {c.hours} ساعات</small><button>تسجيل الأسرة</button></Card>)}</div></main>}
function Research({data}){return <main><h1>Research & Publications Hub</h1><p>مركز الدراسات والتحكيم العلمي والتقارير المعرفية للمنصة.</p><div className="cards4">{data.publications.map(p=><Card key={p.title}><BookOpen/><h3>{p.title}</h3><p>{p.type} • {p.year}</p><small>{p.status}</small><button>عرض الملف</button></Card>)}</div></main>}
function Reports(){const print=()=>window.print();return <main><h1>Reporting Engine</h1><p>توليد تقارير تنفيذية وأسرية وبحثية قابلة للطباعة والمشاركة.</p><div className="cards4"><Card><FileText/><h3>تقرير الأسرة التنفيذي</h3><button onClick={print}><Download/> طباعة / PDF</button></Card><Card><QrCode/><h3>Family Digital Passport</h3><p>FRMP-2026-0001</p><button>عرض الجواز الرقمي</button></Card><Card><Trophy/><h3>شهادة أسرة ملهمة</h3><button>توليد الشهادة</button></Card><Card><Globe2/><h3>تقرير المرصد الوطني</h3><button>تصدير Excel</button></Card></div></main>}
function Observatory({data,setTab}){const [selected,setSelected]=useState(data.regions[0]);return <main><h1>National Benchmark + Saudi Heat Map</h1><p>قياس مخرجات الأسر للمناطق والمدن وربطها بالمؤشر الوطني.</p><div className="obsGrid"><Card><h3>الخارطة الحرارية الوطنية</h3><SaudiMap regions={data.regions} selected={selected} onSelect={setSelected}/></Card><Card><h3>تفاصيل المنطقة</h3><p className="big">{selected?.name}</p><CityHeat region={selected}/><button onClick={()=>setTab('reports')}>تقرير المنطقة</button></Card><Card className="wide"><h3>مقارنة المناطق</h3><ResponsiveContainer height={300}><BarChart data={data.regions}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="score" fill="#35f4a5" radius={[10,10,0,0]}/></BarChart></ResponsiveContainer></Card></div></main>}
function Generic({title,icon:Icon=Sparkles}){return <main><h1>{title}</h1><div className="cards4">{['نموذج تجريبي نشط','مؤشرات قابلة للتوسع','إعدادات وربط مستقبلي','بيانات للعرض'].map((t,i)=><Card key={t}><Icon/><h3>{t}</h3><p>هذه واجهة نشطة تجريبية ضمن V4.1، جاهزة للربط بقاعدة البيانات والمحركات.</p><button>فتح</button></Card>)}</div></main>}
function App(){const data=useDashboard();const [tab,setTab]=useState('home');const page={home:<Dashboard data={data} setTab={setTab}/>,journey:<Journey data={data}/>,academy:<Academy data={data}/>,advisor:<Advisor/>,research:<Research data={data}/>,reports:<Reports/>,observatory:<Observatory data={data} setTab={setTab}/>,insights:<Generic title="Family Intelligence Engine" icon={LineIcon}/>,assessment:<Generic title="القياس والتقييم" icon={Gauge}/>,initiatives:<Generic title="المبادرات والتحديات" icon={Star}/>,partners:<Generic title="الشراكات والبرامج" icon={Users}/>,settings:<Generic title="الإعدادات" icon={Settings}/>}[tab];return <div dir="rtl" className="app"><Sidebar tab={tab} setTab={setTab}/>{page}</div>}

createRoot(document.getElementById('root')).render(<App/>);
