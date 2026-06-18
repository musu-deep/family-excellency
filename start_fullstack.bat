@echo off
chcp 65001 >nul
title Family Role Model Platform V4.1 Luxury Enterprise
cd /d %~dp0
if not exist frontend\node_modules call npm --prefix frontend install
start "FRMP V4.1 Backend" cmd /k "cd /d %~dp0backend && if not exist .venv py -3.11 -m venv .venv && call .venv\Scripts\activate && python -m pip install -r requirements.txt && python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"
timeout /t 3 /nobreak >nul
start "FRMP V4.1 Frontend" cmd /k "cd /d %~dp0frontend && npm run dev -- --host 0.0.0.0 --port 5180"
start http://localhost:5180
