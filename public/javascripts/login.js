(function(){
	//"use strict"; 
	var inputs = document.getElementsByClassName('validateLogin');
	Array.prototype.forEach.call(inputs, (input) => {
		input.addEventListener('keyup', (element) => {
			try 
			{
				if(!element.target.checkValidity())
					{
						element.target.classList.remove('is-valid')
						element.target.classList.add('is-invalid')
						document.getElementsByClassName("btn-primary")[0].disabled= true
					}
				else
				{
					element.target.classList.remove('is-invalid')
					element.target.classList.add('is-valid')
					document.getElementsByClassName("btn-primary")[0].disabled= false
				}
			} catch (error) {
				document.getElementById(element.target.id+"_feedback").innerHTML = error;
			}
			finally
			{
				document.getElementById(element.target.id+"_feedback").innerHTML = element.target.validationMessage;
			}
		})
	});
})();

(function(){
  var form = document.getElementById('loginForm');
	if(form)
	{
		form.addEventListener('submit', (event) => {
			email = event.target.elements[0].value
			//check users available in the list
			if(!checkEmailExist())
			{ 
				form.append("Email does not exist")
				return false
			}
			if(email)
			{
				localStorage.setItem("loggedIn", true);
				localStorage.setItem("current_user", email)
				newUrl = '/public/dashboard.html'
				location.replace(newUrl) 
				console.log(newUrl)
			}
		})
	}

	function checkEmailExist(email){
		existingUsers = JSON.parse(localStorage.getItem("users"))||[]
		return Array.from(existingUsers).some(user=> user.email==email)
	}
})();