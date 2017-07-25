class DateHelper {

	constructor(){
		throw new Error("Classe não pode ser instanciada");
	}

	static dataParaTexto(data){
		return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
	}

	static textoParaData(data){
		// if(!/\d{4}-\d{2}-\d{2}/.test(data))
  //   		throw new Error('Deve estar no formato aaaa-mm-dd');

  		if(!/\d{2}\/\d{2}\/\d{4}/.test(data)) 
            throw new Error('Deve estar no formato dd/mm/aaaa');
		// return new Date(
		// 		... data
		// 			.split('-')
		// 			.map((item, indice) => item - indice % 2));
		return new Date(
				... data
					.split('/')
					.reverse()
					.map((item, indice) => item - indice % 2));
	}
}