const body = document.body

const create_check_box = (radio, checked) => {
    const check_group = document.createElement('div')
    check_group.classList.add('form-group')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', `radio-${radio.s}`)
    checkbox.id = `radio-${radio.s}`
    checkbox.checked = checked

    const buttons = document.createElement('div')
    const button_up = document.createElement('button')
    button_up.textContent = "⬆"
    const button_down = document.createElement('button')
    button_down.textContent = "⬇"
    buttons.appendChild(button_up)
    buttons.appendChild(button_down)

    if (!checkbox.checked) {
        buttons.classList.add('hidden')
    }

    button_up.addEventListener('click', e => {
        e.preventDefault()
        const index = Array.from(checked_form.children).indexOf(check_group)
        if (index != 0) {
            checked_form.removeChild(check_group)
            checked_form.insertBefore(check_group, checked_form.children[index-1])
        }
    })

    button_down.addEventListener('click', e => {
        e.preventDefault()
        const index = Array.from(checked_form.children).indexOf(check_group)
        if (index != checked_form.children.length - 1) {
            checked_form.removeChild(check_group)
            checked_form.insertBefore(check_group, checked_form.children[index+1])
        }
    })

    checkbox.addEventListener('change', e => {
        if (checkbox.checked) {
            unchecked_form.removeChild(check_group)
            checked_form.appendChild(check_group)
            buttons.classList.remove('hidden')
        } else {
            checked_form.removeChild(check_group)
            unchecked_form.appendChild(check_group)
            buttons.classList.add('hidden')
        }
    })

    const title = document.createElement('p')
    title.textContent = radio.n

    title.addEventListener('click', e => {
        e.preventDefault()
        checkbox.checked = !checkbox.checked
        const event = document.createEvent("HTMLEvents")
        event.initEvent('change',false, true)
        checkbox.dispatchEvent(event)
    })

    check_group.appendChild(checkbox)
    check_group.appendChild(title)
    check_group.appendChild(buttons)
    return check_group
}

const checked_form = document.createElement('form')
checked_form.id = "checked_form"

const unchecked_form = document.createElement('form')
unchecked_form.id = "unchecked_form";

(async () => {

    const radios = await (await fetch("radia.json")).json();
    const radio_weight = JSON.parse(localStorage.getItem('radio_weight'))
    const checked_radios = []
    const unchecked_radios = []
    
    radios.radia
        .map(radio => {
        if (Object.keys(radio_weight).includes(radio.s)) {
            checked_radios.push(radio)
        } else {
            unchecked_radios.push(radio)
        }
    });
    checked_radios.sort((a,b) => radio_weight[b.s] - radio_weight[a.s])
    checked_radios.map(radio => {
        checked_form.appendChild(create_check_box(radio, true))
    })
    unchecked_radios.map(radio => {
            unchecked_form.appendChild(create_check_box(radio, false))
    })
    
    const buttons = document.createElement('div')
    buttons.classList.add('buttons');

    [
        {
            name: "Home",
            href: "/"
        }
    ].map(button => {
        const menu_button = document.createElement('a')
        menu_button.classList.add('menu_button')
        menu_button.setAttribute('href', button.href)
        menu_button.textContent = button.name
        buttons.appendChild(menu_button)
    })

    checked_form.addEventListener('submit', e => {
        e.preventDefault()
        const checkboxes = Array.from(e.target.elements)
            .filter(input => input.getAttribute('type') == "checkbox")
            .reduce(((accumulator, current_value, index, original_array) => {
                accumulator[current_value.id.slice(6)] = original_array.length - index
                return accumulator
            }
            ),{})
        localStorage.setItem('radio_weight', JSON.stringify(checkboxes))
        location.reload()
    })

    const submit_button = document.createElement('button')
    submit_button.classList.add('menu_button')
    submit_button.textContent = "Save"
    submit_button.setAttribute('form',"checked_form")
    buttons.appendChild(submit_button)
    body.appendChild(checked_form)
    body.appendChild(document.createElement('hr'))
    body.appendChild(unchecked_form)
    body.appendChild(buttons)
  }
)();