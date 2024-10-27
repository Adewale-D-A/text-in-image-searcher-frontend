export default function canvasURL(id: string) {
  let canvas = document.getElementById(id) as any;
  return canvas.toDataURL();
}
