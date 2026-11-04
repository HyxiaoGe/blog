"""在既有香港 Nginx 中增加博客转发；先校验候选配置，失败恢复备份。"""

from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo
import argparse
import hashlib
import os
import re
import shutil
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("--expected-sha", required=True)
args = parser.parse_args()
if os.geteuid() != 0:
    raise SystemExit("请使用 sudo 运行")

source = Path(__file__).resolve().parent
entry = Path("/etc/nginx/stream.d/fusion-relay.conf")
stream = Path("/etc/nginx/stream.d/blog-relay.conf")
http = Path("/etc/nginx/conf.d/blog-relay.conf")
assert not stream.exists() and not http.exists(), "博客配置已存在，停止覆盖"
original = entry.read_bytes()
assert hashlib.sha256(original).hexdigest() == args.expected_sha, "共享入口已改变，需重新核对"
text = original.decode()
assert "blog.seanfield.org" not in text
pattern = r"(?m)^(\s*default\s+127\.0\.0\.1:9;)"
updated, count = re.subn(pattern, "    blog.seanfield.org  127.0.0.1:19443;\n\\1", text)
assert count == 1, "找不到唯一的既有 SNI 映射位置"

stamp = datetime.now(ZoneInfo("Asia/Shanghai")).strftime("%Y%m%d-%H%M%S")
backup = Path("/etc/nginx/backups") / ("blog-vps-" + stamp)
candidate = backup / "candidate"
(candidate / "stream").mkdir(parents=True)
(backup / "fusion-relay.conf").write_bytes(original)
for path in Path("/etc/nginx/stream.d").glob("*.conf"):
    shutil.copy2(path, candidate / "stream" / path.name)
(candidate / "stream/fusion-relay.conf").write_text(updated)
shutil.copy2(source / "stream.conf", candidate / "stream/blog-relay.conf")
shutil.copy2(source / "http.conf", candidate / "http.conf")
main = Path("/etc/nginx/nginx.conf").read_text()
assert main.count("include /etc/nginx/stream.d/*.conf;") == 1
assert main.count("include /etc/nginx/conf.d/*.conf;") == 1
main = main.replace("include /etc/nginx/stream.d/*.conf;", f"include {candidate}/stream/*.conf;")
main = main.replace("include /etc/nginx/conf.d/*.conf;", f"include /etc/nginx/conf.d/*.conf;\n    include {candidate}/http.conf;")
(candidate / "nginx.conf").write_text(main)
subprocess.run(["nginx", "-t", "-c", str(candidate / "nginx.conf")], check=True)

# 尚未修改任何活动文件时退出，不回写覆盖别的任务。
assert entry.read_bytes() == original, "共享入口出现并发修改"
try:
    shutil.copy2(source / "stream.conf", stream)
    shutil.copy2(source / "http.conf", http)
    entry.write_text(updated)
    subprocess.run(["nginx", "-t"], check=True)
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    result = subprocess.run([
        "curl", "--silent", "--show-error", "--fail", "--retry", "3",
        "--retry-all-errors", "--retry-delay", "1", "--max-time", "15",
        "--noproxy", "*", "--resolve", "blog.seanfield.org:443:127.0.0.1",
        "-o", "/dev/null", "https://blog.seanfield.org/",
    ])
    if result.returncode:
        raise RuntimeError("博客转发 HTTPS 核验失败")
except BaseException:
    entry.write_bytes(original)
    stream.unlink(missing_ok=True)
    http.unlink(missing_ok=True)
    subprocess.run(["nginx", "-t"], check=True)
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    raise

print("博客转发已启用，DNS 尚未切换。备份目录：" + str(backup))
