var app = new Vue({
	el: '#messanger',
	data: {
		message: {
			title: "",
			senderEmail: "",
			name: "",
			surname: "",
			content: "",
			url: ""
		},

		state: {
			title: 0,
			senderEmail: 0,
			name: 0,
			surname: 0,
			content: 0	
		},

		error: {
			title: "",
			senderEmail: "",
			name: "",
			surname: "",
			content: ""	
		},
		thanksSection: false,
		errors: ["To pole nie może być puste", "Niepoprawny adres email"]			
	},

	methods: {
		titleOnChange: function(){
			if(this.message.title != "")
				this.state.title = 1
			else{
				this.state.title = 0
			}
		},

		senderEmailOnChange: function(){
			if(this.message.senderEmail != ""){
				if(this.message.senderEmail.indexOf('@') > -1){
					this.state.senderEmail = 1
					this.error.senderEmail = ""
				}
				else{
					this.state.senderEmail = 0
					this.error.senderEmail = this.errors[1]
				}
			}
			else
				this.state.senderEmail = 0
		},

		nameOnChange: function(){

			if(this.message.name != "")
				this.state.name = 1
			else
				this.state.name = 0
		},

		surnameOnChange: function(){

			if(this.message.surname != "")
				this.state.surname = 1
			else
				this.state.surname = 0
		},

		contentOnChange: function(){

			if(this.message.content != "")
				this.state.content = 1
			else
				this.state.content = 0
		},

		checkAll: function() {
			let allOk = true

			for(let i in this.state){
				if(this.state[i] == ""){
					allOk = false
				
					if(this.error[i] == "")
						this.error[i] = this.errors[0]	
				}
			}

			return allOk
		},

		clearState: function() {
			for(let i in this.state){
				this.state[i] = 0
			}
		},

		send: function(){
			if(this.checkAll() == false){
				return 
			}

			this.message.url = window.location.href
			axios({
				method: 'post',
				url: '/sendemail',
				data: this.message
			}).
			then(response =>{
				this.thanksSection = true
				this.message = {
					title: "",
					senderEmail: "",
					name: "",
					surname: "",
					content: ""
				}
				this.clearState()
			})

		}
	},

	created: function() {
	}
})