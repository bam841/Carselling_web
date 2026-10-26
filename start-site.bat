@echo off
title MJCK Motors Web Server
echo ========================================================
echo            MJCK MOTORS - LOCAL DEV SERVER
echo ========================================================
echo.
echo Opening MJCK Motors in your default browser...
start http://localhost:3000
echo.
echo Server is running on http://localhost:3000
echo Keep this window open while viewing the website.
echo Press Ctrl + C in this window when you want to stop the server.
echo.
python -m http.server 3000 --bind 127.0.0.1
pause
