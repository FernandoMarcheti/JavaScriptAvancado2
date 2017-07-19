class NegociacaoController {

	constructor(){
		let self = this;
		let $ = document.querySelector.bind(document);

		this._data = $('#data');
		this._quantidade = $('#quantidade');
		this._valor = $('#valor');		

		this._negociacoes = new Bind(
				new ListaNegociacoes()
				, new NegociacoesView($('#negociacoesView'))
				, 'adiciona', 'limpar'
			);
		
		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

	}

	adiciona(event){
		event.preventDefault();
		
		this._negociacoes.adiciona(this._criaNegociacao());	
		this._mensagem.texto = 'Negociação adicionada com sucesso';
		this._limparFormulario();

	}

	apaga(){
		this._negociacoes.limpar();
		this._mensagem.texto = "Negociações apagadas com sucesso";
	}

	_criaNegociacao(){
		let data = DateHelper.textoParaData(this._data.value);
		return new Negociacao(data, this._quantidade.value, this._valor.value);
	}

	_limparFormulario(){
		this._data.value = '';
		this._quantidade.value = 1;
		this._valor.value = 0.0;
		this._data.focus();
	}
}