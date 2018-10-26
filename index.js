new Vue({
	el: '#app',
	components: {
		vuejsDatepicker
	},
	data () {
	  return {
		com: [],
		dict: {},
		nomProjet: "github-ynov-vue",
		dateFrom: "",
		dateUntil: "",
		commitToDisplay: [],
		etu: [],
		toHide: true,
		readyApi: false,
		apiKey: "",
		displayAnswer: false,
	  }
	},

	methods: {

		callApi: function () {

			for (let iCpt = 0; iCpt < this.etu.length; iCpt++) {
				axios
					.get('https://api.github.com/repos/' + this.etu[iCpt] + '/' + this.nomProjet + '/commits?access_token='+this.apiKey)
					.then(response => (this.dict[this.etu[iCpt]]=response.data))
			}

			this.compareDate();
			this.displayAnswer = true;
		},

		compareDate: function () {
			//Retourne une liste de date correspondante à la demande.
			var avoidNext;
			this.commitToDisplay= [];

			if(this.dateUntil != "" || this.dateFrom != "") {

				for (let iCpt = 0; iCpt < this.etu.length; iCpt++) {//Pour chaque etu

					if(this.dict[this.etu[iCpt]] != null) {

						for (let index = 0; index < this.dict[this.etu[iCpt]].length; index++) {//Pour chaque commit par cet etu

							avoidNext = false;
							this.commitToDisplay.push([]);
							nameOfCommit = this.dict[this.etu[iCpt]][index].commit.message;
							dateOfCommit = moment(this.dict[this.etu[iCpt]][index].commit.author.date).format('YYYYMMDD');
							
							dateFrom2 = moment(this.dateFrom).format('YYYYMMDD');
							dateUntil2 = moment(this.dateUntil).format('YYYYMMDD')

							//Entre dateFrom et dateUntil
							if(dateFrom2 - dateOfCommit<0 && dateOfCommit - dateUntil2<0) {
								avoidNext = true;
								this.commitToDisplay[iCpt].push([nameOfCommit, moment(this.dict[this.etu[iCpt]][index].commit.author.date).format('dddd, Do MMMM YYYY')]);
							}
							//A partir de dateFrom
							if (dateFrom2 - dateOfCommit<0 && !avoidNext && this.dateUntil=="") {
								avoidNext = true;
								this.commitToDisplay[iCpt].push([nameOfCommit, moment(this.dict[this.etu[iCpt]][index].commit.author.date).format('dddd, Do MMMM YYYY')]);
							}
							//Avant dateUntil
							if(dateOfCommit - dateUntil2<0 && !avoidNext && this.dateFrom=="") {
								this.commitToDisplay[iCpt].push([nameOfCommit, moment(this.dict[this.etu[iCpt]][index].commit.author.date).format('dddd, Do MMMM YYYY')]);
							}
						}
					}
				}
				return 0;
			}
		},

		isComNotNull: function() {
			
			if (this.dict == null) {
				return false;
			} else {
				return true;
			}
		},

	  }
	
  })