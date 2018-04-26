const DEFAULT_OPTIONS = {
  port: 8126,
  keys: ['alt'],
  window: window,
  preview: true,
}

let hovering = null

export function install(options) {
  const client = new Client({ ...DEFAULT_OPTIONS, ...options })

  client.install()
  client.connect()

  return client
}

export class Client {

  socket = null

  overlay = null

  hovering = null

  constructor(options) {
    this.options = options
  }

  install() {
    for (const eventName of Object.keys(this.windowEvents)) {
      window.addEventListener(eventName, this.windowEvents[eventName])
    }
  }

  uninstall() {
    for (const eventName of Object.keys(this.windowEvents)) {
      window.removeEventListener(eventName, this.windowEvents[eventName])
    }
  }

  connect() {
    // @todo
  }

  disconnect() {
    // @todo
  }

  previewFile(event) {
    const path = this.getFilePath(event)
    if (!path) {
      return this.hideOverlay()
    }
    this.showOverlay(event.target)
    this.socket.send({ type: 'preview', path })
  }

  openFile(event) {
    const path = this.getFilePath(event)
    event.preventDefault()
    this.hideOverlay()
    if (path) {
      this.socket.send({ type: 'open', path })
    }
  }

  getFilePath(event) {
    // @todo
  }

  showOverlay(event) {
    // @todo
  }

  hideOverlay(event) {
    // @todo
  }

  windowEvents = {

    mousemove: event => {
      if (!isActive(event, this.options.keys)) {
        return this.hideOverlay()
      }
      this.previewFile(event)
    },

    mousedown: event => {
      if (!isActive(event, this.options.keys)) {
        return this.hideOverlay()
      }
      this.openFile(event)
    },

    click: event => {
      if (!isActive(event, this.options.keys)) {
        return this.hideOverlay()
      }
      event.preventDefault()
    },

    keydown: event => {
      if (!isActive(event, this.options.keys)) {
        return
      }
      this.previewFile(event)
    },

    keyup: event => {
      if (!isActive(event, this.options.keys)) {
        return this.hideOverlay()
      }
      this.previewFile(event)
    },
  }

  socketEvents = {

    onopen: event => {
      // @todo
    },

    onmessage: event => {
      // @todo
    },

    onerror: event => {
      // @todo
    },

    onclose: event => {
      // @todo
    },
  }
}

export class Overlay {

  margin = document.createElement('div')

  border = document.createElement('div')

  padding = document.createElement('div')

  constructor() {
    this.margin.appendChild(this.border)
    this.border.appendChild(this.padding)

    style(this.margin, MARGIN_STYLE)
    style(this.border, BORDER_STYLE)
    style(this.padding, PADDING_STYLE)

    document.body.appendChild(this.margin)
  }

  update(node) {
    // @todo
  }
}

function isActive(event, keys) {
  return !keys.some(key => !event[`${key}Key`])
}
