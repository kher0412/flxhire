function polarToCartesianCoords(cx, cy, radius, angle) {
  const angleRad = (angle - 90) * Math.PI / 180

  return {
    x: cx + (radius * Math.cos(angleRad)),
    y: cy + (radius * Math.sin(angleRad)),
  }
}

export function plotDArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesianCoords(x, y, radius, endAngle)
  const end = polarToCartesianCoords(x, y, radius, startAngle)

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ')

  return d
}
