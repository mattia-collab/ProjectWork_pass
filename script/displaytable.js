function tableRow(id, password, domain) {
  let tr = `<tr id="${id}">`
  tr += '<td class="px-3 py-2">'
  tr += '<div class="flex gap-1 lg:gap-2">'
  tr += ` <div onclick="tableCopy('${id}')" class="flex gap-1 p-1 sm:pr-1.5 rounded-md bg-blue-400 hover:bg-blue-300 border border-blue-500 cursor-pointer">`
  tr += '  <img class="min-w-4 h-4 w-4" src="icon/copy.svg" alt="Copy"/>'
  tr += '  <span class="hidden sm:inline-flex font-medium text-xs text-white">Copy</span>'
  tr += ' </div>'
  tr += ` <div id="${id}s" onclick="tableShow('${id}')" class="flex gap-1 p-1 sm:pr-1.5 rounded-md bg-blue-400 hover:bg-blue-300 border border-blue-500 cursor-pointer">`
  tr += '  <img class="min-w-4 h-4 w-4" src="icon/eye.svg" alt="Show"/>'
  tr += '  <img class="hidden min-w-4 h-4 w-4" src="icon/eye-slash.svg" alt="Hide"/>'
  tr += '  <span class="hidden sm:inline-flex font-medium text-xs text-white">Show</span>'
  tr += ' </div>'
  tr += ' <div class="w-full ml-1 lg:ml-2 text-gray-900">'
  tr += `  <input id="${id}p" type="password" name="password" value="${password}" class="w-full" disabled/>`
  tr += ' </div>'
  tr += '</div>'
  tr += '</td>'
  tr += '<td class="px-3 py-2">'
  tr += '<div class="flex items-center gap-1 lg:gap-2">'
  tr += ` <img class="hidden lg:block sm:block lg:h-8 lg:w-8 sm:h-6 sm:w-6 rounded-full" src="https://${domain}/favicon.ico" alt="Favicon"/>`
  tr += ` <div id="${id}d" class="text-gray-500">https://${domain}</div>`
  tr += '</div>'
  tr += '</td>'
  tr += '<td class="px-3 py-2">'
  tr += '<div class="flex justify-end">'
  tr += ` <div onclick="tableRemove('${id}')" class="flex gap-1 p-1 sm:pl-1.5 rounded-md bg-red-400 hover:bg-red-300 border border-red-500 cursor-pointer">`
  tr += '  <span class="hidden sm:inline-flex font-medium text-xs text-white">Remove</span>'
  tr += '  <img class="min-w-4 h-4 w-4" src="icon/trash.svg" alt="Remove"/>'
  tr += ' </div>'
  tr += '</div>'
  tr += '</td>'
  tr += '</tr>'
  return tr
}

function tableID() {
  do {
    id = 'tr_'.concat(randInt(1000, 9999))
  } while (document.getElementById(id) != null)
  return id
}

function tableIncludes(domain) {
  const passwordTable = document.getElementById('passwordTable')
  domain = 'https://' + domain

  for (child of passwordTable.children) {
    d = document.getElementById(child.id + 'd').innerText
    if (domain == d) {
      return true
    }
  }
  return false
}

function tableAdd(password, domain) {
  const passwordTable = document.getElementById('passwordTable')
  passwordTable.innerHTML += tableRow(tableID(), password, domain)
}

function tableRemove(id) {
  document.getElementById(id).outerHTML = ''
}
function tableCopy(id) {
  copyToClipboard(document.getElementById(id + 'p').value)
}
function tableShow(id) {
  const show = document.getElementById(id + 's').children
  const pass = document.getElementById(id + 'p')

  if (show[0].classList.contains('hidden')) {
    show[0].classList.remove('hidden') // Show icon
    show[1].classList.add('hidden') // Hide icon
    show[2].innerHTML = 'Show'
    pass.type = 'password'
  } else {
    show[0].classList.add('hidden') // Show icon
    show[1].classList.remove('hidden') // Hide icon
    show[2].innerHTML = 'Hide'
    pass.type = 'text'
  }
}
