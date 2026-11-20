"""Genera public/cv-nery.pdf con Python estándar, sin dependencias externas.

Datos: perfil de GitHub proporcionado por Nery y Profile.pdf de LinkedIn.
Las fechas son las de la fuente; no se calculan duraciones ni se añaden logros.
Al actualizar el perfil, revisa también estos textos y ejecuta este archivo.
"""

from pathlib import Path
import textwrap

ROOT = Path(__file__).resolve().parents[1]
WIDTH, HEIGHT = 595, 842
pages = []
commands = []
links = []
y = 798


def escape(value):
    return value.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')


def text(value, size=10, bold=False, color='0.14 0.22 0.17'):
    global y, commands, links
    for line in textwrap.wrap(value, width=92 if size <= 10 else 79):
        if y < 44:
            pages.append((commands, links))
            commands, links, y = [], [], 798
        font = 'F2' if bold else 'F1'
        commands.append(f'{color} rg BT /{font} {size} Tf 48 {y} Td ({escape(line)}) Tj ET')
        y -= size + 4


def heading(value):
    global y
    y -= 7
    text(value, 11, True)
    y -= 2


def role(title, dates, description=None):
    global y
    text(title, 10, True)
    text(dates, 9, color='0.30 0.39 0.32')
    if description:
        text(description, 9)
    y -= 4


text('Nery Pozos', 24, True)
text('Ingeniero en Tecnologías de la Información', 12)
text('Desarrollo web · Laravel/PHP · Datos geoespaciales', 10)
text('Tlaxcala / Puebla, México', 9)
text('LinkedIn: linkedin.com/in/nerypm/  |  GitHub: github.com/ItsNery', 9)
links.append((48, y + 2, 345, y + 16, 'https://www.linkedin.com/in/nerypm/'))
links.append((345, y + 2, 547, y + 16, 'https://github.com/ItsNery'))

heading('Perfil')
text('Desarrollador web enfocado en Laravel/PHP y datos geoespaciales. Trabajo en herramientas de gobierno digital y proyectos personales de movilidad urbana. Mi trayectoria incluye pruebas manuales de software y participación en el conocimiento libre.')

heading('Experiencia profesional')
role('Desarrollador web · Gobierno del Estado de Puebla',
     'Septiembre de 2023 - actualidad · Puebla, México',
     'Secretaría de Planeación, Finanzas y Administración. Trabajo en herramientas de gobierno digital y un dashboard de indicadores municipales con datos geográficos.')
role('Orientador de campamento · Camp Tall Timbers',
     'Junio - agosto de 2023 · High View, Virginia Occidental, Estados Unidos',
     'Trabajo con niñas y niños y enseñanza de senderismo, escalada y deportes.')
role('Junior Tester · ITW', 'Septiembre de 2022 - mayo de 2023 · Ciudad de México')
role('Tester Beginner · ITW', 'Agosto de 2021 - noviembre de 2022 · Ciudad de México')
role('Marketing · Imtechmex SAPI de CV', 'Septiembre - diciembre de 2020 · México',
     'Diseño web y marketing.')

heading('Proyectos y contribuciones')
text('RutasWiki: proyecto personal en desarrollo para mapear y documentar transporte público con colaboración comunitaria. Stack planteado: Laravel, Leaflet y PostgreSQL/PostGIS.', 9)
text('Wikimedia: editor de Wikipedia en español y colaborador en Commons y Wikidata. Trabajé para llevar el artículo de los tlaxcaltecas a Artículo Destacado.', 9)

heading('Herramientas y conocimientos')
text('Laravel · PHP · JavaScript · HTML · CSS · SQL · PostgreSQL · Leaflet · Git · MVC.', 9)
text('Otros conocimientos: Python, Java, C, análisis de sistemas y redes WAN/LAN.', 9)
text('Aprendizaje actual: JavaScript y React a profundidad, y PostGIS para análisis geoespacial.', 9)

heading('Formación')
text('Universidad Politécnica de Tlaxcala · Ingeniería en Tecnologías de la Información · 2018 - 2021.', 9)
text('Certificaciones: Inglés · Cloud Computing · SmallTalk English Speaking Level Test.', 9)

heading('Idiomas')
text('Español nativo · Inglés · Portugués básico. Aprendizaje actual: francés y náhuatl.', 9)

pages.append((commands, links))

# Documento PDF con fuentes estándar Helvetica y enlaces públicos de contacto.
objects = [b'', b'', b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
           b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>']
page_ids = []
for page_commands, page_links in pages:
    data = '\n'.join(page_commands).encode('cp1252')
    content_id = len(objects) + 1
    objects.append(b'<< /Length ' + str(len(data)).encode() + b' >>\nstream\n' + data + b'\nendstream')
    annotation_ids = []
    for x1, y1, x2, y2, url in page_links:
        annotation_ids.append(len(objects) + 1)
        objects.append(f'<< /Type /Annot /Subtype /Link /Rect [{x1} {y1} {x2} {y2}] /Border [0 0 0] /A << /S /URI /URI ({escape(url)}) >> >>'.encode())
    page_id = len(objects) + 1
    page_ids.append(page_id)
    refs = ' '.join(f'{i} 0 R' for i in annotation_ids)
    objects.append(f'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {WIDTH} {HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents {content_id} 0 R /Annots [{refs}] >>'.encode())

objects[0] = b'<< /Type /Catalog /Pages 2 0 R >>'
objects[1] = f'<< /Type /Pages /Count {len(page_ids)} /Kids [{" ".join(f"{i} 0 R" for i in page_ids)}] >>'.encode()
result = bytearray(b'%PDF-1.4\n%\xe2\xe3\xcf\xd3\n')
offsets = [0]
for i, obj in enumerate(objects, 1):
    offsets.append(len(result))
    result.extend(f'{i} 0 obj\n'.encode() + obj + b'\nendobj\n')
xref = len(result)
result.extend(f'xref\n0 {len(objects)+1}\n0000000000 65535 f \n'.encode())
for offset in offsets[1:]:
    result.extend(f'{offset:010d} 00000 n \n'.encode())
result.extend(f'trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n'.encode())
output = ROOT / 'public' / 'cv-nery.pdf'
output.parent.mkdir(exist_ok=True)
output.write_bytes(result)
print(f'CV generado: {len(page_ids)} página(s).')
