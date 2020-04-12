
export function onDomLoaded(callBack: () => void): void {
  const readyState = document.readyState
  if (['complete', 'interactive'].includes(readyState)) {
    callBack()
  } else {
    addEventListener('DOMContentLoaded', callBack)
  }
}

export function getElementById(id: string): HTMLElement | null {
  const elem = document.getElementById(id)
  if (!elem) console.error(`Can't find element by id: ${id}.`)
  return elem
}

export function getElementsByClassName(
  className: string,
  root: HTMLElement | Document = document,
): HTMLCollectionOf<Element> {
  const elements = root.getElementsByClassName(className)
  if (!elements.length) console.error(`Can't find elements by class name: ${className}.`)
  return elements
}

export function removeClassFromElem(elem: HTMLElement, className: string): void {
  elem.classList.remove(className)
}

export function addClassToElem(elem: HTMLElement, className: string): void {
  elem.classList.add(className)
}

export function hideElem(elem: HTMLElement): void {
  elem.style.display = 'none'
}

export function showElem(elem: HTMLElement): void {
  elem.style.display = ''
}

export function addEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  elem?: HTMLElement | Document,
  options?: boolean | AddEventListenerOptions,
): void
export function addEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  elem?: HTMLElement | Document,
  options?: boolean | AddEventListenerOptions,
): void
export function addEventListener<K extends keyof DocumentEventMap>(
  type: string | K,
  listener: EventListenerOrEventListenerObject | ((this: Document, ev: DocumentEventMap[K]) => any),
  elem: HTMLElement | Document = document,
  options?: boolean | AddEventListenerOptions,
): void {
  elem.addEventListener(type as string, listener as EventListenerOrEventListenerObject, options)
}

export function setValueToElement(elem: HTMLElement, value: string): void {
  if (elem instanceof HTMLInputElement || elem instanceof HTMLSelectElement) {
    elem.value = value
  } else {
    elem.innerText = value
  }
}

export function getValueFromElement(elem: HTMLElement): string {
  if (elem instanceof HTMLInputElement || elem instanceof HTMLSelectElement) {
    return elem.value
  } else {
    return elem.innerText
  }
}
