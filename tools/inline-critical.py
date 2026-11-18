#!/usr/bin/env python3
"""Inline css/critical.css into index.html between the <!--critical:start/end--> markers.
Run after editing critical.css:  python3 tools/inline-critical.py"""
import re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
css = (root / 'css' / 'critical.css').read_text(encoding='utf-8')
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\s*\n\s*', '', css)
css = re.sub(r'\s{2,}', ' ', css)
html = (root / 'index.html').read_text(encoding='utf-8')
html, n = re.subn(r'<!--critical:start-->.*?<!--critical:end-->', lambda m: '<!--critical:start--><style>' + css + '</style><!--critical:end-->', html, flags=re.S)
assert n == 1, 'markers not found'
(root / 'index.html').write_text(html, encoding='utf-8')
print(f'inlined {len(css)} bytes of critical CSS')
