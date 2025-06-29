const formRegister = document.querySelector('#formulario-register');

formRegister.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(formRegister);
    const body = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    }

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    const data= await response.json();
    if(response.ok){
        console.log(data);
        window.location.href = './login.html';
    }
});