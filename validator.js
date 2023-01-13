// grabbing elements for manipulation
const body = document.querySelector('body');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.form input');
const message = document.querySelector('.form-container .message');
const check_mark = document.querySelector('.check-mark');
const owkae = document.querySelector('.owkae');

//to scan if every input tag is valid or not
const valid_input = () => {
    inputs.forEach(input => {
        if (input.checkValidity()) {
            input.parentElement.children[0].style.color = 'rgb(9, 178, 9)';
            input.style.border = '2px solid rgb(9, 178, 9)';
        } else if (input.value !== '' && !input.checkValidity()) {
            input.parentElement.children[0].style.color = 'rgb(216, 8, 8)';
            input.style.border = '2px solid rgb(216, 8, 8)';
        } else {
            input.parentElement.children[0].style.color = '#3359c2a3';
            input.style.border = '2px solid rgb(0 0 0 / 70%)';
        }
    })
}
setInterval(() => { valid_input(); }, 1000);

// to check if web URL is valid and if passwords match
let valid_url = false;
let password_matched = false;

const validate_form = () => {
    // for url
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if (inputs[3].value.match(regex)) {
        valid_url = true;
    } else {
        give_message('Please, input valid URL!', 'rgb(216, 8, 8)');
        valid_url = false;
    }

    // for passwords
    if (valid_url) {
        if (inputs[4].value === inputs[5].value) {
            password_matched = true;
            give_message();
        } else {
            give_message('Passwords do not match!', 'rgb(216, 8, 8)');
            password_matched = false;
        }
    }
}

// reply to the users for wrong actions taken
const give_message = (text = 'Don\'t Hesitate!', color = 'rgb(0 0 0 / 70%)') => {
    message.textContent = text;
    message.style.color = color;
    message.style.border = `2px solid ${color}`;
}

// saving user data
const save_user_data = () => {
    if (valid_url && password_matched) {
        const user = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            website: form.website.value,
            password: inputs[5].value
        }
        console.log(user);

        // give success message
        body.classList.add('perspective');
        form.parentElement.parentElement.classList.add('rotate');
        check_mark.play();
    }
}

// validating and processing form data
const process_form_data = (e) => {
    // to prevent form from refreshing after submitting
    e.preventDefault();

    // validate web URL and matching passwords
    validate_form();

    // save user data
    save_user_data();
}

// EventListener
form.addEventListener('submit', process_form_data);
// to reload form
owkae.addEventListener('click', () => {
    // reset form
    form.reset();
    // flip back over
    body.classList.remove('perspective');
    form.parentElement.parentElement.classList.remove('rotate');
})