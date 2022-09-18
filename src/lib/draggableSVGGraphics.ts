type Props = {
  cx: number;
  cy: number;
  step?: number;
};

export function draggableSVGGraphics(
  node: SVGGraphicsElement,
  { cx, cy, step = 1 }: Props
) {
  const svg = node.closest("svg")!;

  node.style.cursor = "move";

  let CTM: DOMMatrix;
  let offsetX: number;
  let offsetY: number;

  function round(value: number) {
    return Math.round(value / step) * step;
  }

  function handleMousedown(event: MouseEvent) {
    CTM = svg.getScreenCTM()!;

    const offset = getMousePosition(event);
    offsetX = offset.x - cx;
    offsetY = offset.y - cy;

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function getMousePosition(event: MouseEvent) {
    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d,
    };
  }

  function handleMousemove(event: MouseEvent) {
    const { x, y } = getMousePosition(event);

    const newCx = round(x - offsetX);
    const newCy = round(y - offsetY);

    if (newCx !== cx || newCy !== cy) {
      node.dispatchEvent(
        new CustomEvent("move", {
          detail: { cx: newCx, cy: newCy },
        })
      );
    }
  }

  function handleMouseup(event: MouseEvent) {
    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    },
    update(props: Props) {
      cx = props.cx;
      cy = props.cy;
      if (props.step !== undefined) {
        step = props.step;
      }
    },
  };
}
