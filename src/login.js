const formLogin = document.querySelector('#formulario-login');

formLogin.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const formData = new FormData(formLogin);
    const body = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    const data= await response.json();
    if(response.ok){
        console.log(data);
        window.location.href ='../bienvenida.html';
    }else{
        window.alert('Error del servidor')
    }
});