import is from 'is_js'

// typeToTyp3
// amino type convert
export default type => {
  if (is.boolean(type)) {
    return 0
  }

  if (is.number(type)) {
    if (is.integer(type)) {
      return 0
    } else {
      return 1
    }
  }

  if (is.string(type) || is.array(type) || is.object(type)) {
    return 2
  }
}
