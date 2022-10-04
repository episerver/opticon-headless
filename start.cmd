docker compose up -d
cd src\frontend
CALL npm install
:healthcheck
for /F %%I in ('curl http://localhost:5000/util/Login -s -o /dev/null -w "%%{http_code}"') do set HTTP=%%I
if "%HTTP%" NEQ "200" (
    echo Waiting for backend to become available, sleeping 10 seconds.
    timeout /t 10 /nobreak
    goto healthcheck
)

CALL npm run content-definitions:push
if %errorlevel% NEQ 0 goto eof


:eof
cd ../..
Pause