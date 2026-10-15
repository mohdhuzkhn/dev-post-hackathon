from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from PIL import Image
from pypdf import PdfReader
import pypdfium2 as pdfium
import zipfile

folder = Path(__file__).resolve().parent
output = folder / "venturestress-linkedin-carousel.pdf"
pdf = canvas.Canvas(str(output), pagesize=(1080, 1350), pageCompression=1)
pdf.setTitle("VentureStress AI - Clarity before commitment")
for number in range(1, 7):
    source = folder / f"slide-{number:02d}.png"
    with Image.open(source) as image:
        w, h = image.size
    scale = min(1080 / w, 1350 / h)
    pdf.setFillColor(HexColor("#192D35" if number in (1, 5) else "#F6F7F2"))
    pdf.rect(0, 0, 1080, 1350, stroke=0, fill=1)
    pdf.drawImage(ImageReader(str(source)), (1080-w*scale)/2, (1350-h*scale)/2,
                  width=w*scale, height=h*scale, mask="auto")
    if number == 6:
        pdf.linkURL("https://venturestress-ai.netlify.app", (150, 190, 930, 290),
                    relative=0, thickness=0)
    pdf.showPage()
pdf.save()
reader = PdfReader(str(output))
assert len(reader.pages) == 6
assert all(float(p.mediabox.width)==1080 and float(p.mediabox.height)==1350 for p in reader.pages)
previews = folder / "preview"
previews.mkdir(exist_ok=True)
document = pdfium.PdfDocument(str(output))
for index in range(len(document)):
    page = document[index]
    bitmap = page.render(scale=0.55)
    bitmap.to_pil().save(previews / f"page-{index+1:02d}.png")
    bitmap.close()
    page.close()
document.close()
with zipfile.ZipFile(folder / "carousel-images.zip", "w", zipfile.ZIP_DEFLATED) as archive:
    for number in range(1, 7):
        source = folder / f"slide-{number:02d}.png"
        archive.write(source, source.name)
print(f"Verified 6 pages at 1080x1350. PDF: {output.stat().st_size:,} bytes")

