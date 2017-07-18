class ListaNegociacoes {

	constructor(view){
		this._negociacoes = [];
		this._view = view;
	}

	adiciona(negociacao){
		this._negociacoes.push(negociacao);
		this._view(this);
	}

	get negociacoes(){
		return [].concat(this._negociacoes);
	}

	limpar(){
		this._negociacoes = [];
		this._view(this);
	}
}