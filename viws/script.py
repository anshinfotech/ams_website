
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

port = 8000
print(f"Starting server on port {port}...")
print(f"Open http://localhost:{port} in your browser")
HTTPServer(('localhost', port), CORSRequestHandler).serve_forever()
