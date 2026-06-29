import os
import sys
import json
import subprocess
import datetime
import requests

# Target Config
TARGET_DATES = ["2026-07-10", "2026-07-11", "2026-07-12", "2026-07-13", "2026-07-14", "2026-07-15", "2026-07-16"]
WANTED_TRAILS = ["atalaia", "morro", "pontinha"] # Preferred trails: Atalaia, Morro São José, Pontinha Caieiras
EXCLUDED_TRAILS = ["abreu", "capim"]            # Explicitly not wanted
MIN_SLOTS = 2                                   # Needs at least 2 vacancies

API_URL = "https://prod-backoffice-cloud-gmwlps2jdq-uc.a.run.app/trails/availabilities/public"
LOG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "noronha_monitor.log")

def log(message):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] {message}"
    print(log_line)
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_line + "\n")
    except Exception as e:
        print("Failed to write to log file:", e)

def trigger_notification(title, message):
    # Escape quotes for PowerShell
    title_esc = title.replace('"', '`"')
    message_esc = message.replace('"', '`"')
    ps_code = f"""
    [void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")
    $objNotification = New-Object System.Windows.Forms.NotifyIcon
    $objNotification.Icon = [System.Drawing.SystemIcons]::Information
    $objNotification.BalloonTipIcon = "Info"
    $objNotification.BalloonTipTitle = "{title_esc}"
    $objNotification.BalloonTipText = "{message_esc}"
    $objNotification.Visible = $True
    $objNotification.ShowBalloonTip(15000)
    """
    subprocess.run(["powershell", "-Command", ps_code], capture_output=True)

def check_availabilities():
    log("Checking trail availabilities...")
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = requests.get(API_URL, headers=headers, timeout=15)
        if r.status_code != 200:
            log(f"HTTP Error: {r.status_code}")
            return
            
        data = r.json()
        found_vacancies = []
        
        for item in data.get("data", []):
            trail_name = item.get("trail_name", "")
            trail_name_lower = trail_name.lower()
            
            # Check if trail is in exclusions
            if any(exc in trail_name_lower for exc in EXCLUDED_TRAILS):
                continue
                
            # Check if trail is in wanted list
            if not any(want in trail_name_lower for want in WANTED_TRAILS):
                continue
                
            availabilities = item.get("availabilities", [])
            for av in availabilities:
                av_date = av.get("date", "")
                slots = av.get("available_slots", 0)
                time_start = av.get("time_start", "")
                
                # Check target dates and min slots
                if av_date in TARGET_DATES and slots >= MIN_SLOTS:
                    found_vacancies.append({
                        "trail": trail_name,
                        "date": av_date,
                        "time": time_start,
                        "slots": slots
                    })
                    
        if found_vacancies:
            log(f"FOUND {len(found_vacancies)} VACANCIES!")
            alert_lines = []
            for v in found_vacancies:
                line = f"- {v['trail']} em {v['date']} às {v['time']} ({v['slots']} vagas)"
                log(line)
                alert_lines.append(line)
                
            alert_message = "\n".join(alert_lines)
            trigger_notification(
                f"VAGAS EM NORONHA! 🌴 ({len(found_vacancies)} atrativo(s))",
                f"Novas vagas disponíveis:\n{alert_message}"
            )
        else:
            log("No matching vacancies found.")
            
    except Exception as e:
        log(f"Error checking vacancies: {e}")

def register_task():
    script_path = os.path.abspath(__file__)
    # Find pythonw.exe to run silently
    pythonw_path = sys.executable.replace("python.exe", "pythonw.exe")
    if not os.path.exists(pythonw_path):
        pythonw_path = sys.executable # fallback to python.exe
        
    task_name = "NoronhaTrailMonitor"
    cmd = f'schtasks /create /tn "{task_name}" /tr "\\"{pythonw_path}\\" \\"{script_path}\\"" /sc hourly /mo 3 /f'
    
    log(f"Registering scheduled task '{task_name}'...")
    log(f"Command: {cmd}")
    
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode == 0:
        log("Scheduled task successfully registered to run every 3 hours!")
        trigger_notification("Agendador Noronha ⏰", "Monitoramento de vagas ativado! Checagem a cada 3 horas.")
    else:
        log(f"Failed to register task. Error:\n{res.stderr}")
        print(f"Stdout:\n{res.stdout}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--register":
        register_task()
    else:
        check_availabilities()
