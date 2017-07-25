class ListaNegociacoes {

	constructor(){
		this._negociacoes = [];
	}

	adiciona(negociacao){
		this._negociacoes.push(negociacao);
	}

	get negociacoes(){
		return [].concat(this._negociacoes);
	}

	limpar(){
		this._negociacoes = [];
	}

	get volumeTotal(){
		return this._negociacoes.reduce((ant, prox)=> ant + prox.volume, 0);
	}

	ordena(criterio){
		this._negociacoes.sort(criterio);
	}

	reverteOrdenacao(){
		this._negociacoes.reverse();
	}
}