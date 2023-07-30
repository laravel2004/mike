function randomInteger(max) {
  return Math.floor(Math.random()*(max + 1));
}

function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(100);
  return [r,g,b];
}

export const selectionColor = () => {
  let [r,g,b] =randomRgbColor();

  let hr = r.toString(16).padStart(2, '0');
  let hg = g.toString(16).padStart(2, '0');
  let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
}