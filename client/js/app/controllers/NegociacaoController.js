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
				, 'adiciona', 'limpar', 'ordena', 'reverteOrdenacao'
			);

		this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
		this._campoOrdenado = '';
	}

	adiciona(event){
		event.preventDefault();
		
		this._negociacoes.adiciona(this._criaNegociacao());	
		this._mensagem.texto = 'Negociação adicionada com sucesso';
		this._limparFormulario();

	}

	importar(){
		let negociacaoService = new NegociacaoService();
		negociacaoService.obterNegociacoes()
		.then(res => {
			res
	          .forEach(negociacao => this._negociacoes.adiciona(negociacao));
	        this._mensagem.texto = 'Negociações importadas com sucesso';
		})
		.catch(res => {
			this._mensagem.texto = res;
		});
	}

	apaga(){
		this._negociacoes.limpar();
		this._mensagem.texto = "Negociações apagadas com sucesso";
	}

	ordena(campo){
		if(this._campoOrdenado == campo) {
			this._negociacoes.reverteOrdenacao();
		} else {
			this._negociacoes.ordena((a, b) => a[campo] - b[campo]);
		}		

		this._campoOrdenado = campo;
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