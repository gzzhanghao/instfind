const DEFAULT_OPTIONS = {
  sourceKey: '__vue_source__',
}

export function create(options) {
  options = { ...DEFAULT_OPTIONS, ...options }

  return {

    preTransformNode(el) {
      if (!el.domProps) {
        el.domProps = {}
      }
      el.domProps[options.sourceKey] = `[$options.__file, ${el.start}, ${el.end}]`
    },
  }
}
