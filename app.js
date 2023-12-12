// Set to store entered inputs
const enteredInputs = new Set()

const handleInput = (e) => {
    let enteredData = document.querySelector('#inputField').value
    console.log(enteredData)

    //for removing whitespace
    enteredData = enteredData.replace(/\s/g, '')
    console.log('n', enteredData)

    //for checking alphanumeric characters
    if (!/^[0-9a-zA-Z]+$/.test(enteredData)) {
        showError('Please enter numbers or alphanumeric characters only.')
        return
    }

    //checking maximum length
    if (enteredData.length > 16) {
        showError('Maximum characters allowed is 16')
        return
    }

    //checking for duplicate entry
    if (enteredInputs.has(enteredData.toLowerCase())) {
        showError('Duplicate entry! This input already exists.')
        return
    }

    // checking for duplicate characters
    // const duplicateNums = [...new Set(enteredData)]
    // if ( duplicateNums.length !== enteredData.length) {
    //     alert('Duplicate Characters are not allowed')
    //     return
    // }

    addToTimeline(enteredData)
}

const showError = (message) => {
    const errorMsg = document.querySelector('.error')
    errorMsg.textContent = message
}

const addToTimeline = (input) => {
    const timeline = document.querySelector('#timeline')
    const postDetails = new Date().toLocaleString()
    const postElement = document.createElement('div')
    postElement.classList.add('postContainer')

    // const containerDiv = document.createElement('div')
    // containerDiv.classList.add('containerDiv')

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>'

    //formatting text input to uppercase
    const uppercaseFormat = input.charAt(0).toUpperCase() + input.slice(1)

    postElement.innerHTML = `<div class='a'>${uppercaseFormat}</div> <div class='b'> ${postDetails} </div>`

    deleteBtn.addEventListener('click', (e) => {
        timeline.removeChild(postElement)
        alert(`${uppercaseFormat} successfully deleted!`)
    })

    // postElement.addEventListener('click', (e) => {
    //     copyToClipboard(uppercaseFormat)
    //     alert(`${uppercaseFormat} Successfully Copied to Clipboard`)
    // })

    postElement.appendChild(deleteBtn)
    timeline.appendChild(postElement)

    document.querySelector('#inputField').value = ''

    // Add input to the set of entered inputs
    enteredInputs.add(input.toLowerCase())

    // Clear the error message
    showError('');
}

const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

//listening for the enter keypres in the inputField
document.querySelector('#inputField').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleInput()
    }
})

