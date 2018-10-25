new Vue({
	el: '#app',
	components: {
		vuejsDatepicker
	},
	data () {
	  return {
		user: [],
		repo: [],
		com: [],
		nomProjet: "github-ynov-vue",
		dateFrom: "",
		dateUntil: moment().add(1, 'day'),
		commitNameToDisplay: [],
		commitDateToDisplay: [],
		commitToDisplay: [],
		etu: [],
		toHide: true,
		readyApi: false,
		apiKey: "",
	  }
	},

	methods: {
		callApi: function () {
			//this.user= [];
			//this.repo= [];
			//this.com= [];
			
			//console.log(compte);
			//if(!this.readyApi) {
			//	console.log("Not ready to call API");
			//} else {
			
			for (let iCpt = 0; iCpt < this.etu.length; iCpt++) {
				axios
					.get('https://api.github.com/repos/' + this.etu[iCpt] + '/' + this.nomProjet + '/commits?access_token='+this.apiKey)
					.then(response => (this.com.push(response.data)))
					
				axios
					.get('https://api.github.com/users/' + this.etu[iCpt] + '?access_token='+this.apiKey)
					.then(response => (this.user.push(response.data)))
				
				axios
					.get('https://api.github.com/repos/' + this.etu[iCpt] + '/' + this.nomProjet + '?access_token='+this.apiKey)
					.then(response => (this.repo.push(response.data)))
			}
			this.compareDate();
			
			//}
			
		},

		compareDate: function () {
			//Retourne une liste de date correspondante à la demande.
			var avoidNext;
			this.commitToDisplay= [];
			this.commitNameToDisplay= [];
			this.commitDateToDisplay= [];

			if(this.dateUntil != "" || this.dateFrom != "") {
				for (let iCpt = 0; iCpt < this.etu.length; iCpt++) {
					if(this.com[iCpt] != null) {
						for (let index = 0; index < this.com[iCpt].length; index++) {
							avoidNext = false;
							this.commitToDisplay.push([]);
							nameOfCommit = this.com[iCpt][index].commit.message;
							dateOfCommit = moment(this.com[iCpt][index].commit.author.date).format('YYYYMMDD');
							
							dateFrom2 = moment(this.dateFrom).format('YYYYMMDD');
							dateUntil2 = moment(this.dateUntil).format('YYYYMMDD')

							//Entre dateFrom et dateUntil
							if(dateFrom2 - dateOfCommit<0 && dateOfCommit - dateUntil2<0) {
								avoidNext = true;
								this.commitToDisplay[iCpt].push([nameOfCommit, moment(this.com[iCpt][index].commit.author.date).format('dddd, Do MMMM YYYY')]);
							}
							//A partir de dateFrom
							if (dateFrom2 - dateOfCommit<0 && !avoidNext && this.dateUntil=="") {
								avoidNext = true;
								this.commitToDisplay[iCpt].push([nameOfCommit, moment(this.com[iCpt][index].commit.author.date).format('dddd, Do MMMM YYYY')]);
							}
							//Avant dateUntil
							if(dateOfCommit - dateUntil2<0 && !avoidNext && this.dateFrom=="") {
								this.commitToDisplay[iCpt].push([nameOfCommit, moment(this.com[iCpt][index].commit.author.date).format('dddd, Do MMMM YYYY')]);
							}
			
						}
					}
				}
				return 0;
			}

		},

		isRepoNotNull: function() {
			if (this.repo == null) {
				return false;
			} else {
				return true;
			}
		},

		isComNotNull: function() {
			if (this.com == null) {
				return false;
			} else {
				return true;
			}
		},

		readyToCallApi: function() {
			this.readyApi= true;
		}

	  }
	
  })