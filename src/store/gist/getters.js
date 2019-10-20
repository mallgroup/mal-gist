export function count (state) {
  return Object.keys(state.items).length
}

export const findConfigCategoryById = state => categoryId => {
  try {
    return state.config.categories.filter(
      configCategory => configCategory.id === categoryId
    )[0]
  } catch (error) {
    return null
  }
}

export function groupByLanguage (state) {
  let languages = []

  var items = JSON.parse(JSON.stringify(state.items))

  for (let item of items) {
    for (let fileKey in item.files) {
      let file = item.files[fileKey]
      if (typeof languages[file.language] === 'undefined') {
        if (!file.language) {
          file.language = 'uknown'
        }

        languages[file.language] = {
          language: file.language,
          count: 1
        }
      } else {
        languages[file.language] = {
          language: file.language,
          count: languages[file.language].count + 1
        }
      }
    }
  }

  return Object.values(languages).sort((a, b) => (a.count < b.count ? 1 : -1))
}

export const filterGistsByCategory = state => categoryId => {
  if (categoryId) {
    return state.items.filter(item => {
      return state.config.items[item.id].categories.indexOf(categoryId) > -1
    })
  }

  return state.items
}

export function toString (state) {
  return JSON.stringify(state.config)
}
