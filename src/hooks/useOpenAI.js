import { useState } from 'react';
import { gerarGanchoComIA, gerarCorpoComIA, gerarCTAComIA, gerarCopyCompletaComIA } from '../services/openaiService';

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const gerarGancho = async (dados, estrategia) => {
    setLoading(true);
    setError(null);
    try {
      const gancho = await gerarGanchoComIA(dados, estrategia);
      return gancho;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const gerarCorpo = async (dados, estrategia, gancho) => {
    setLoading(true);
    setError(null);
    try {
      const corpo = await gerarCorpoComIA(dados, estrategia, gancho);
      return corpo;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const gerarCTA = async (dados, estrategia) => {
    setLoading(true);
    setError(null);
    try {
      const cta = await gerarCTAComIA(dados, estrategia);
      return cta;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const gerarCopyCompleta = async (dados, estrategia) => {
    setLoading(true);
    setError(null);
    try {
      const copy = await gerarCopyCompletaComIA(dados, estrategia);
      return copy;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    gerarGancho,
    gerarCorpo,
    gerarCTA,
    gerarCopyCompleta
  };
}
