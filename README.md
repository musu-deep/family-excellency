# Family Role Model Platform V4.1 Luxury Enterprise

نسخة V4.1 تجمع بين فخامة واجهة V2 ومحركات V4 السبعة داخل مشروع Full Stack جاهز للرفع على GitHub.

## المكونات

- Dark Executive Theme
- Glassmorphism + Neon Glow
- Animated Gradients
- Responsive Grid System
- KPI Widgets + Mini Sparklines
- Interactive Charts: Trend / Radar / Donut / Bar
- Saudi Heat Map مع مخرجات المناطق والمدن تجريبياً
- Executive Sidebar نشط
- Achievement Engine
- Family Journey Tracker
- AI Recommendations Panel / WAEE Advisor
- Academy Integration
- Research & Publications Hub
- Reporting Engine + Family Digital Passport
- FastAPI Backend تجريبي جاهز للربط بقاعدة بيانات لاحقاً

## التشغيل المحلي

اضغط مرتين على:

```bat
start_fullstack.bat
```

أو شغّل يدوياً:

```powershell
cd backend
py -3.11 -m venv .venv
.\.venv\Scripts\activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

وفي نافذة ثانية:

```powershell
cd frontend
npm install
npm run dev -- --host 0.0.0.0 --port 5180
```

- Frontend: http://localhost:5180
- API Docs: http://localhost:8000/docs

## الرفع على GitHub

```powershell
git init
git add .
git commit -m "Family Role Model Platform V4.1 Luxury Enterprise"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/family-role-model-platform-v4.git
git push -u origin main
```
