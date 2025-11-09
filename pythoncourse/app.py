import os
from flask import Flask, render_template_string, request

app = Flask(__name__)

# Strip the /pythoncourse prefix from all requests
class PrefixMiddleware(object):
    def __init__(self, app, prefix='/pythoncourse'):
        self.app = app
        self.prefix = prefix

    def __call__(self, environ, start_response):
        if environ['PATH_INFO'].startswith(self.prefix):
            environ['PATH_INFO'] = environ['PATH_INFO'][len(self.prefix):]
            environ['SCRIPT_NAME'] = self.prefix
            return self.app(environ, start_response)
        else:
            return self.app(environ, start_response)

app.wsgi_app = PrefixMiddleware(app.wsgi_app)

# Add request logging
@app.before_request
def log_request_info():
    app.logger.info('Headers: %s', request.headers)
    app.logger.info('Path: %s', request.path)

HTML = """
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"/>
  <title>{{ title }}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 2rem; max-width: 70ch; line-height: 1.4; }
    h1, h2 { margin: 0 0 .5rem 0; }
    .muted { opacity: .8; }
    ul, ol { padding-left: 1.25rem; }
    li { margin: .2rem 0; }
    .optional { font-style: italic; opacity: .8; }
    .section { margin-top: 1.25rem; }
    .badge { display:inline-block; padding:.1rem .4rem; border:1px solid currentColor; border-radius:.5rem; font-size:.8rem; opacity:.75; }
  </style>
</head>
<body>
  <h1>{{ title }}</h1>
  <p class="muted">Instructor: {{ instructor }}</p>

  <div class="section">
    <h2>¿Cuándo?</h2>
    <ul>
      {% for item in schedule %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  </div>

  <div class="section">
    <h2>Descripción</h2>
    <p>{{ overview }}</p>
  </div>

  <div class="section">
    <h2>Temario</h2>
    <ol>
      {% for session in syllabus %}
        <li>
          <strong>{{ session.title }}</strong>
          <ul>
            {% for topic in session.topics %}
              <li>{{ topic }}</li>
            {% endfor %}
          </ul>
        </li>
      {% endfor %}
    </ol>
  </div>
  <div class="section">
  <h2>Contacto:</h2>
    <ul>
      {% for item in contacto %}
        <li>{{ item }}</li>
      {% endfor %}
    </ul>
  </div>
</body>
</html>
"""

@app.get("/")
def home():
    schedule = [
        "Viernes 7 de noviembre 19:00–21:00",
        "Domingo 9 de noviembre 18:00–20:00 (Sesión 1)",
        "Miércoles 12 de noviembre 19:00–21:00",
        "Viernes 21 de noviembre 19:00–21:00",
    ]

    syllabus = [
        {
            "title": "Sesión 1",
            "optional": False,
            "topics": [
                "Variables",
                "Funciones",
                "If / else",
                "Loops",
                "Ejercicios",
            ],
        },
        {
            "title": "Sesión 2",
            "optional": False,
            "topics": [
                "Arreglos",
                "Librerías",
                "Turtle",
                "Programación orientada a objetos",
                "Ejercicios",
            ],
        },
        {
            "title": "Sesión 3",
            "optional": True,
            "topics": [
                "Crear y compartir programas",
                "Flask",
                "Git",
            ],
        },
    ]

    overview = (
        "El curso Desarrollo de programas con Python es una introducción "
        "a los bloques y conceptos básicos de los lenguajes de programación. "
        "De la manera más práctica, fácil y divertida se explicará cómo comunicar instrucciones "
        "a una computadora y cómo abstraer problemas del mundo real en programas. "
        "Es de libre acceso; no se requiere conocimiento previo. En 3 sesiones partiremos "
        "de lo básico y practicaremos distintas estructuras de datos con ejercicios. "
        "Revisaremos conceptos de programación orientada a objetos y, finalmente, "
        "veremos herramientas básicas para crear y compartir aplicaciones."
    )

    contacto = ["ig @aaassssspp", "email: andresfilos94@gmail.com", "wa: 5540609376", "github: aasspaassp"]

    return render_template_string(
        HTML,
        title="Desarrollo de programas con Python",
        instructor="Andrés González Anzures (@aassp)",
        schedule=schedule,
        overview=overview,
        syllabus=syllabus,
        contacto=contacto,
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("FLASK_SERVER_PORT", 5050)), debug=True)
