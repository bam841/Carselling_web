import re

path = r"C:\Users\Osias\car-selling-website\scratch\site.html"
with open(path, "r", encoding="utf-8") as f:
    html = f.read()

for match in re.finditer(r'/assets/[a-f0-9\-]+(?:\?[^\s"\'>]+)?', html):
    url = match.group(0)
    start = max(0, match.start() - 250)
    end = min(len(html), match.end() + 250)
    context = html[start:end]
    print(f"=== ASSET: {url} ===")
    print(re.sub(r'\s+', ' ', context))
    print()
