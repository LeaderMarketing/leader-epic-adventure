from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import sys


PROJECT_ROOT = Path(__file__).resolve().parent
ROOT = PROJECT_ROOT / "dist" if (PROJECT_ROOT / "dist" / "index.html").exists() else PROJECT_ROOT
LOG = PROJECT_ROOT / "server.log"
PORT = 5173
HOST = "127.0.0.1"


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        with LOG.open("a", encoding="utf-8") as handle:
            handle.write("%s - %s\n" % (self.address_string(), format % args))


def main():
    sys.stdout = LOG.open("a", encoding="utf-8")
    sys.stderr = sys.stdout
    handler = partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer((HOST, PORT), handler)
    print(f"Serving {ROOT} at http://{HOST}:{PORT}/", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
