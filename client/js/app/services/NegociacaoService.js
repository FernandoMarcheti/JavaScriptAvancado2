class NegociacaoService {

	constructor(){
		this._httpService = new HttpService();
	}

	obterNegociacoesSemana(){
		return this._httpService.get('/negociacoes/semana')
		.then( res => {
			return res.map(obj => 
					new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
		})
		.catch( res => {
			throw new Error('Não foi possivel carregar as negociações da semana');
		});
	}

	obterNegociacoesDaSemanaAnterior(){
		return this._httpService.get('/negociacoes/anterior')
		.then( res => {
			return res.map(obj => 
					new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
		})
		.catch( res => {
			throw new Error('Não foi possivel carregar as negociações da semana passada');
		});
	}	

	obterNegociacoesDaSemanaRetrasada(){
		return this._httpService.get('/negociacoes/retrasada')
		.then( res => {
			return res.map(obj => 
					new Negociacao(new Date(obj.data), obj.quantidade, obj.valor));
		})
		.catch( res => {
			throw new Error('Não foi possivel carregar as negociações da semana retrasada');
		});
	}

	obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;

        }).catch(erro => {
            throw new Error(erro);
        });

    } 
}