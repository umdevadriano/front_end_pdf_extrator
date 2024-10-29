
//função para formatar data no formato D:20230529233939+00'00' para  formato 29/05/2023 
const formatCreationDate = (creationDate) => {
      let ano = creationDate.slice(2, 6);
      let mes = creationDate.slice(6, 8);
      let dia = creationDate.slice(8, 10);
      let dataFormatada = `${dia}/${mes}/${ano}`;
      return dataFormatada
  };


export default formatCreationDate