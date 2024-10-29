import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import formatCreationDate from '../utils/formatData';
;

const PdfUploader = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = [...files, ...selectedFiles];
    const newFileNames = newFiles.map((file) => file.name);
    setFiles(newFiles);
    setFileNames(newFileNames);
    setValue('files', newFiles);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newFileNames = newFiles.map((file) => file.name);
    setFiles(newFiles);
    setFileNames(newFileNames);
    setValue('files', newFiles);
  };

  const enviarArquivo = async (data) => {
    const formData = new FormData();
    if (data.files && data.files.length > 0) {
      for (let i = 0; i < data.files.length; i++) {
        formData.append('file', data.files[i]);
      }
    }
    formData.append('texto', data.text);
    setLoading(true);
    setErrorMessage('');
    setResponseData(null);
    
    try {
      const response = await axios.post('https://pdf-extrator-e3tm.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponseData(response.data);
    } catch (error) {
      setErrorMessage('Erro ao enviar o arquivo. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      padding: '20px',
      boxSizing: 'border-box',
      backgroundColor: '#f0f0f0',
    }}>
      <h2>Envie PDFs para Análise de Texto</h2>
      <form onSubmit={handleSubmit(enviarArquivo)} style={{ width: '100%', maxWidth: '600px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="text">Texto a ser pesquisado:</label>
          <input
            type="text"
            id="text"
            {...register('text', { required: true })}
            placeholder="Digite o texto"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="file">Escolha os PDFs:</label>
          <input
            type="file"
            id="files"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px', height: '2rem' }}
          />
          {fileNames.length > 0 && (
            <ul style={{
              marginTop: '10px',
              padding: '0',
              listStyleType: 'none',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}>
              {fileNames.map((fileName, index) => (
                <li
                  key={index}
                  style={{
                    padding: '5px 10px',
                    borderBottom: index !== fileNames.length - 1 ? '1px solid #ddd' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#333'
                  }}
                >
                  {fileName}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'red',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>

      {loading && <p>Processando, por favor aguarde...</p>}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {responseData && (
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
          <h3 style={{ color: 'red', width: '100%' }}>Resultado da Análise:</h3>
          {responseData.map((item, index) => (
            <button
              key={index}
              style={{
                backgroundColor: '#3d3c3c',
                border: '1px solid #413b3b',
                borderRadius: '5px',
                padding: '2px',
                color: '#eeee',
                cursor: 'pointer',
                textDecoration: 'underline',
                width: 'calc(33% - 10px)', // Ajusta para ter 3 colunas
                maxWidth: '200px', // Limita a largura máxima
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize:'15px'
              }}
              onClick={() => openModal(item)}
            >
              {item.arquivo}
            </button>
          ))}
        </div>
      )}

      {isModalOpen && modalData && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <button onClick={closeModal} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'red',
              color: '#161515ed',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              zIndex: 1001,
            }}>
              Fechar
            </button>
          <div style={{
            backgroundColor: '#f8f8f8',
            padding: '20px',
            borderRadius: '5px',
            width: '600px',
            maxHeight: '80%',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <p><strong>Detalhes do Arquivo:</strong>  {modalData.arquivo}</p>
            <p><strong>Páginas:</strong> {modalData.paginas}</p>
            <p><strong>Autor:</strong> {modalData.info.Author || 'N/A'}</p>
            <p><strong>Data de Criação:</strong> {formatCreationDate(String(modalData.info.ModDate))|| 'N/A'}</p>
            {/* <p><strong>Texto:</strong> {modalData.texto || 'N/A'}</p> */}
            <h4 style={{fontSize:'15px', color:'#171616ed'} }>Palavras Encontradas:</h4>
            {modalData.palavras && modalData.palavras.length > 0 ? (
              <ul>
                {modalData.palavras.map((palavra, index) => (
                  <li key={index} style={{fontSize:'12px', color:'#171616ed'}}>
                    <strong style={{fontSize:'8px', color:'#171616ed'}}>Linha {palavra.lineNumber}:</strong> {palavra.lineContent}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma palavra encontrada.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUploader;
