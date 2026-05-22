import React, { useState } from 'react';
import styles from './Upload.module.css';

interface UploadProps {
  onSuccess: (original_text: string, improved_text: string) => void;
}

const Upload: React.FC<UploadProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [targetJob, setTargetJob] = useState('');
  const [niche, setNiche] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Por favor, selecione um arquivo PDF.');
        setFile(null);
        return;
      }
      setError('');
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !targetJob) {
      setError('Por favor, preencha a Vaga Alvo e selecione um arquivo.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_job', targetJob);
    if (niche) formData.append('niche', niche);

    try {
      const response = await fetch('http://localhost:8000/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao processar currículo');
      }

      const data = await response.json();
      onSuccess(data.original_text, data.improved_text);
    } catch (err: any) {
      setError(err.message || 'Falha na conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.uploadForm} onSubmit={handleSubmit}>
      
      <div className={styles.inputGroup}>
        <label htmlFor="targetJob">Vaga Alvo *</label>
        <input 
          type="text" 
          id="targetJob" 
          value={targetJob} 
          onChange={(e) => setTargetJob(e.target.value)} 
          placeholder="Ex: Desenvolvedor Front-end Senior"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="niche">Nicho/Área (Opcional)</label>
        <input 
          type="text" 
          id="niche" 
          value={niche} 
          onChange={(e) => setNiche(e.target.value)} 
          placeholder="Ex: Fintech, E-commerce, Saúde..."
        />
      </div>

      <div className={styles.fileDropArea}>
        <input 
          type="file" 
          id="file" 
          accept=".pdf" 
          onChange={handleFileChange} 
          className={styles.fileInput}
        />
        <div className={styles.fileMessage}>
          {file ? <p>📄 {file.name}</p> : <p>Clique ou arraste um PDF aqui</p>}
        </div>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <button 
        type="submit" 
        className={styles.submitButton} 
        disabled={isLoading || !file || !targetJob}
      >
        {isLoading ? 'Analisando com IA...' : 'Melhorar Meu Currículo'}
      </button>
    </form>
  );
};

export default Upload;
