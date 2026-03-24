@echo off
cd /d "%~dp0"

echo Starting Portfolio Backend...

REM Try to find uvicorn in common venv locations
if exist "..\..\.venv\Scripts\uvicorn.exe" (
    set UVICORN="..\..\.venv\Scripts\uvicorn.exe"
) else if exist ".venv\Scripts\uvicorn.exe" (
    set UVICORN=".venv\Scripts\uvicorn.exe"
) else (
    set UVICORN=uvicorn
)

%UVICORN% app.main:app --reload --host 0.0.0.0 --port 8000
