new Vue({
	el: '#app',
	data () {
	  return {
		user: null,
		repo: null,
		com: null,
		nomProjet: "",
		toHide: true,
	  }
	},

	methods: {
		callApi: function (event) {
			axios
				.get('https://api.github.com/users/Coblestone?access_token=371a6841ab9ef7405a6a84bd04a33b7c085e62b3')
				.then(response => (this.user = response.data))
			
			axios
				.get('https://api.github.com/repos/Coblestone/'+this.nomProjet+'?access_token=371a6841ab9ef7405a6a84bd04a33b7c085e62b3')
				.then(response => (this.repo = response.data))

			axios
				.get('https://api.github.com/repos/Coblestone/'+this.nomProjet+'/commits?access_token=371a6841ab9ef7405a6a84bd04a33b7c085e62b3')
				.then(response => (this.com = response.data))
		}

	  }
	
  })