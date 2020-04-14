
export function onDomLoaded(callBack: () => void): void {
  const readyState = document.readyState
  if (['complete', 'interactive'].includes(readyState)) {
    callBack()
  } else {
    setEventListener('DOMContentLoaded', callBack)
  }
}

export function getElementById<T extends HTMLElement>(id: string): T | HTMLElement | null {
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

export function setEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  element?: HTMLElement | Document,
  options?: boolean | AddEventListenerOptions,
): void
export function setEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  element?: HTMLElement | Document,
  options?: boolean | AddEventListenerOptions,
): void
export function setEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  elements?: HTMLElement[] | HTMLCollection | HTMLFormControlsCollection,
  options?: boolean | AddEventListenerOptions,
): void
export function setEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  elements?: HTMLElement[] | HTMLCollection | HTMLFormControlsCollection,
  options?: boolean | AddEventListenerOptions,
): void
export function setEventListener<K extends keyof DocumentEventMap>(
  type: string | K,
  listener: EventListenerOrEventListenerObject | ((this: Document, ev: DocumentEventMap[K]) => any),
  elementOrElements: HTMLElement[] | HTMLCollection | HTMLFormControlsCollection | HTMLElement | Document = document,
  options?: boolean | AddEventListenerOptions,
): void {
  if (Array.isArray(elementOrElements) ||
    elementOrElements instanceof HTMLCollection ||
    elementOrElements instanceof HTMLFormControlsCollection
  ) {
    for (const elem of elementOrElements) {
      elem.addEventListener(type as string, listener as EventListenerOrEventListenerObject, options)
    }
  } else {
    elementOrElements.addEventListener(type as string, listener as EventListenerOrEventListenerObject, options)
  }
}

export function setValueToElement(elem: HTMLElement, value: string | boolean): void {
  if (elem instanceof HTMLInputElement) {
    if (elem.type == 'checkbox') {
      elem.checked = value as boolean
    } else {
      elem.value = value as string
    }
  } else if (elem instanceof HTMLSelectElement) {
    elem.value = value as string
  } else {
    elem.innerText = value as string
  }
}

export function getValueFromElement(elem: HTMLElement): string | boolean {
  if (elem instanceof HTMLInputElement) {
    if (elem.type == 'checkbox') {
      return elem.checked
    } else {
      return elem.value
    }
  } else if (elem instanceof HTMLSelectElement) {
    return elem.value
  } else {
    return elem.innerText
  }
}
