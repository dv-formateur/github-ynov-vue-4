new Vue({
	el: '#app',
	data () {
	  return {
		user: null,
		repo: null,
		com: null,
		nomProjet: "",
		etu: "Coblestone",
		toHide: true,
	  }
	},

	methods: {
		callApi: function (event) {
			axios
				.get('https://api.github.com/users/' + this.etu + '?access_token=ef7138e53297bb8674a4f978959c7c8ae8021ea1 ')
				.then(response => (this.user = response.data))
			
			axios
				.get('https://api.github.com/repos/' + this.etu + '/' + this.nomProjet + '?access_token=ef7138e53297bb8674a4f978959c7c8ae8021ea1 ')
				.then(response => (this.repo = response.data))

			axios
				.get('https://api.github.com/repos/' + this.etu + '/' + this.nomProjet + '/commits?access_token=ef7138e53297bb8674a4f978959c7c8ae8021ea1 ')
				.then(response => (this.com = response.data))
		}

	  }
	
  })