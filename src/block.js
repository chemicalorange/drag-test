function dragElement(e, relativeElement) {
  e.preventDefault()
  const element = e.target

  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e.preventDefault();
    e = e || window.event;

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    element.style.cursor = 'grabbing'
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let top = (element.offsetTop - pos2)
    let left = (element.offsetLeft - pos1)
    let allowableWidth = relativeElement.clientWidth - element.clientWidth
    let allowableHeight = relativeElement.clientHeight - element.clientHeight

    console.log(pos1, pos4)
    element.style.top = (top < 0 ? 0 : top) && (top > allowableHeight ? allowableHeight : top) + "px";
    element.style.left = (left < 0 ? 0 : left) && (left > allowableWidth ? allowableWidth : left) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    element.style.cursor = 'grab'
  }
}

function block() {
  const element = document.createElement('div')
  element.className = 'block'

  const square = document.createElement('div')
  square.draggable = true
  square.className = 'square'
  square.addEventListener("dragstart", (e) => dragElement(e, element))
  element.append(square)

  return element
}

document.body.appendChild(block())
