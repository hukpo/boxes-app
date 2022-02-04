export const shadeColor = (col: string, amt: number): string => {
  col = col.replace(/^#/, '');

  if (col.length === 3) {
    col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2];
  }

  let matchResult = col.match(/.{2}/g);

  if (!matchResult) {
    return col;
  }

  const r = Math.max(Math.min(255, parseInt(matchResult[0], 16) + amt), 0).toString(16);
  const g = Math.max(Math.min(255, parseInt(matchResult[1], 16) + amt), 0).toString(16);
  const b = Math.max(Math.min(255, parseInt(matchResult[2], 16) + amt), 0).toString(16);

  const rr = (r.length < 2 ? '0' : '') + r;
  const gg = (g.length < 2 ? '0' : '') + g;
  const bb = (b.length < 2 ? '0' : '') + b;

  return `#${rr}${gg}${bb}`;
};
