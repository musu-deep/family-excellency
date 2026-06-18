from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from datetime import datetime

app = FastAPI(title="Family Role Model Platform V4.1 API", version="4.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

regions = [
 {"id":"riyadh","name":"الرياض","score":91.3,"families":42000,"trend":12,"cities":[{"name":"الرياض","score":91.3},{"name":"الخرج","score":83.2},{"name":"الدرعية","score":89.4},{"name":"المجمعة","score":78.9}]},
 {"id":"makkah","name":"مكة المكرمة","score":88.7,"families":38200,"trend":9,"cities":[{"name":"جدة","score":86.2},{"name":"مكة","score":88.7},{"name":"الطائف","score":82.4},{"name":"رابغ","score":76.5}]},
 {"id":"eastern","name":"المنطقة الشرقية","score":85.1,"families":26600,"trend":7,"cities":[{"name":"الدمام","score":85.1},{"name":"الأحساء","score":81.5},{"name":"الخبر","score":86.9},{"name":"الجبيل","score":84.7}]},
 {"id":"madinah","name":"المدينة المنورة","score":82.6,"families":15120,"trend":6,"cities":[{"name":"المدينة","score":82.6},{"name":"ينبع","score":79.2},{"name":"العلا","score":77.8}]},
 {"id":"asir","name":"عسير","score":79.3,"families":11980,"trend":5,"cities":[{"name":"أبها","score":79.3},{"name":"خميس مشيط","score":77.1},{"name":"النماص","score":75.9}]},
 {"id":"qassim","name":"القصيم","score":81.4,"families":10240,"trend":5,"cities":[{"name":"بريدة","score":81.4},{"name":"عنيزة","score":80.2}]},
 {"id":"tabuk","name":"تبوك","score":77.6,"families":9120,"trend":4,"cities":[{"name":"تبوك","score":77.6},{"name":"ضباء","score":74.1}]},
]

kpis = [
 {"key":"overall","label":"المؤشر الكلي للأسرة","value":87.6,"status":"ممتاز","change":12.4,"icon":"crown"},
 {"key":"cohesion","label":"التماسك الأسري","value":91.2,"status":"ممتاز","change":8.7,"icon":"heart"},
 {"key":"values","label":"التأصيل القيمي","value":78.3,"status":"جيد جداً","change":5.1,"icon":"shield"},
 {"key":"community","label":"الأثر المجتمعي","value":79.5,"status":"جيد جداً","change":7.3,"icon":"users"},
 {"key":"digital","label":"العالم الرقمي","value":73.8,"status":"جيد","change":11.5,"icon":"laptop"},
 {"key":"development","label":"المشاركة والتطوير","value":82.1,"status":"جيد جداً","change":9.2,"icon":"trend"},
]

journey = [
 {"stage":"قياس","done":True,"note":"تم التقييم بنجاح","icon":"gauge"},
 {"stage":"تشخيص","done":True,"note":"تم تحليل النتائج","icon":"brain"},
 {"stage":"خطة تطوير","done":True,"note":"تم إنشاء الخطة","icon":"target"},
 {"stage":"تنفيذ","done":True,"note":"قيد التنفيذ","icon":"play"},
 {"stage":"متابعة","done":False,"note":"72% مكتمل","icon":"activity"},
 {"stage":"إعادة قياس","done":False,"note":"بعد 30 يوماً","icon":"refresh"},
 {"stage":"اعتماد","done":False,"note":"قيد المراجعة","icon":"badge"},
 {"stage":"أسرة ملهمة","done":False,"note":"الهدف القادم","icon":"crown"},
]

academy = [
 {"id":1,"title":"برنامج الحوار الأسري الذكي","dimension":"التماسك الأسري","progress":60,"hours":8,"level":"متوسط"},
 {"id":2,"title":"التربية الرقمية الآمنة","dimension":"العالم الرقمي","progress":75,"hours":6,"level":"أساسي"},
 {"id":3,"title":"التطوع الأسري وصناعة الأثر","dimension":"الأثر المجتمعي","progress":40,"hours":5,"level":"تطبيقي"},
 {"id":4,"title":"القيم اليومية بالقدوة","dimension":"التأصيل القيمي","progress":90,"hours":4,"level":"مكثف"},
]

initiatives = [
 {"title":"تحدي الأسرة المتحاورة","progress":60,"days":15,"icon":"users"},
 {"title":"مبادرة القراءة العائلية","progress":75,"days":5,"icon":"book"},
 {"title":"مشروع التطوع الأسري","progress":40,"days":25,"icon":"leaf"},
 {"title":"برنامج الاقتصاد المنزلي","progress":90,"days":0,"icon":"trend"},
]

publications = [
 {"title":"دليل بناء الأسرة القدوة","type":"دليل منهجي","year":2026,"status":"منشور"},
 {"title":"الخصائص السيكومترية لمقياس الأسرة القدوة","type":"ورقة علمية","year":2026,"status":"قيد التحكيم"},
 {"title":"تقرير المرصد الأسري الوطني - نسخة تجريبية","type":"تقرير سنوي","year":2026,"status":"مسودة"},
 {"title":"بروتوكول الاعتماد الأسري","type":"إطار تشغيلي","year":2026,"status":"جاهز"},
]

badges = ["أسرة قدوة", "أسرة رقمية واعية", "أسرة متطوعة", "المجلس الأسري", "القدوة في القيم"]

@app.get("/api/health")
def health():
    return {"ok": True, "version":"4.1.0", "time": datetime.utcnow().isoformat()}

@app.get("/api/dashboard")
def dashboard():
    return {
        "kpis": kpis,
        "national": {"families":154892,"activeFamilies":98542,"average":76.8,"initiatives":245,"partners":57,"reports":18},
        "regions": regions,
        "journey": journey,
        "academy": academy,
        "initiatives": initiatives,
        "publications": publications,
        "badges": badges,
    }

@app.get("/api/regions")
def get_regions():
    return regions

@app.get("/api/ai/advice")
def advice(q: str = "كيف أرفع مؤشر الأسرة؟"):
    return {
        "question": q,
        "answer": "توصية واعي: ابدأوا بميثاق أسري أسبوعي، 20 دقيقة حوار بلا أجهزة، ومبادرة تطوعية شهرية. ركّزوا أولاً على العالم الرقمي لأنه أقل الأبعاد أداءً، ثم اربطوا التحسن ببرنامج تدريبي قصير من الأكاديمية.",
        "plan90": ["أسبوع 1: اتفاقية رقمية منزلية", "أسبوع 2-4: جلسة حوار أسبوعية", "شهر 2: برنامج أكاديمي قصير", "شهر 3: إعادة القياس ومقارنة التقدم"]
    }

class Assessment(BaseModel):
    respondent: Dict
    answers: Dict[str, int]

@app.post("/api/assessment/submit")
def submit_assessment(payload: Assessment):
    avg = round(sum(payload.answers.values()) / max(len(payload.answers), 1) * 20, 1)
    return {"score": avg, "level": "أسرة ملهمة" if avg >= 85 else "أسرة واعدة", "certificate_id":"FRMP-2026-0001"}

@app.get("/api/report/family-passport")
def passport():
    return {"family":"عائلة العتيبي", "level":"أسرة ملهمة", "score":87.6, "badges":badges, "qr":"FRMP-2026-0001"}
