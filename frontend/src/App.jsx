import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [streak, setStreak] = useState(0)
  const [clicou, setClick] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [paginas, setPaginas] = useState("")
  const [historico, setHistorico] = useState([])
  const [diaAtual, setDiaAtual] = useState("2026-01-23")
  const [carregado, setCarregado] = useState(false);

  const paginasLidas = historico.map(item => item.paginas)
  const totalPaginas = paginasLidas.reduce((acc, num) => acc + num, 0)
  const mediaPaginas = totalPaginas / paginasLidas.length
  const maiorPaginas = Math.max(...paginasLidas)

  const paginasValidas =
    paginas !== "" &&
    /^\d+$/.test(paginas) &&
    parseInt(paginas, 10) > 0

  // carregar
  useEffect(() => {
    const salvo = localStorage.getItem("leitura-diaria");
    const hoje = new Date().toISOString().slice(0, 10);
    if (!salvo) {
      setCarregado(true);
      return;
    }

    const dados = JSON.parse(salvo);

    if (dados.version !== 1) {
      setCarregado(true);
      return;
    }

    setHistorico(dados.registros || []);
    setStreak(dados.streak || 0);
    setDiaAtual(dados.diaAtual || hoje);

    setCarregado(true);
  }, []);

  // salvar
  useEffect(() => {
    if (!carregado) return;

    const appData = {
      version: 1,
      streak,
      registros: historico,
      diaAtual
    };

    localStorage.setItem(
      "leitura-diaria",
      JSON.stringify(appData)
    );
  }, [streak, historico, diaAtual, carregado]);

  function abrirModal() {
    setModalAberto(true);
  }

  function salvarLeitura() {
    setStreak(streak + 1);
    setClick(true);
    setModalAberto(false);
    setPaginas("")
  }

  function listaPaginas() {
    const marcarData = diaAtual
    const novo = {
      data: marcarData,
      paginas: Number(paginas)
    }
    setHistorico([...historico, novo])
  }

  function avancarDia() {
    const data = new Date(diaAtual);
    data.setDate(data.getDate() + 1);
    const novaData = data.toISOString().split("T")[0];

    setDiaAtual(novaData);
    setClick(false);
  }

  function fazTudo() {
    salvarLeitura()
    listaPaginas()
  }

return (
  <div
    className="
      bg-neutral-900
      w-full
      min-h-[100dvh]
      flex
      flex-col
      px-4
      pt-6
      pb-16
      md:items-center
      md:justify-center
    "
  >
    <div className="w-full md:max-w-md flex flex-col gap-8">

      {/* HEADER */}
      <header className="text-center">
        <h1 className="text-gray-100 text-lg font-medium">
          Leitura Diária
        </h1>
      </header>

      {/* AÇÃO PRINCIPAL — MOBILE FIRST */}
      {!clicou && (
        <div className="order-1 md:order-3 flex justify-center">
          <button
            onClick={abrirModal}
            className="
              bg-purple-500
              hover:bg-purple-400
              text-white
              font-semibold
              px-10
              py-4
              rounded-full
              transition
              text-base
            "
          >
            Li hoje
          </button>
        </div>
      )}

      {/* STREAK */}
      <section className="order-2 md:order-1 flex flex-col items-center gap-1">
        <span className="text-3xl">🔥</span>
        <span className="text-6xl font-bold text-white">
          {streak}
        </span>
        <span className="text-gray-400 text-sm">
          dias seguidos
        </span>
      </section>

      {/* MENSAGEM */}
      <p className="order-3 md:order-2 text-gray-300 text-center max-w-xs mx-auto">
        {streak === 0
          ? "Comece sua sequência hoje"
          : "Leitura marcada! Volte amanhã"}
      </p>

      {/* ESTATÍSTICAS */}
      <section
        className="
          order-4
          mt-4
          grid
          grid-cols-2
          gap-4
          md:grid-cols-3
        "
      >
        {/* Card 1 */}
        <div className="bg-neutral-800 rounded-xl p-5 flex flex-col items-center gap-1">
          <span className="text-xl">📖</span>
          <span className="text-2xl font-bold text-white">
            {totalPaginas}
          </span>
          <span className="text-xs text-gray-400">
            Total
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-neutral-800 rounded-xl p-5 flex flex-col items-center gap-1">
          <span className="text-xl">📊</span>
          <span className="text-2xl font-bold text-white">
            {!Number.isNaN(mediaPaginas) ? mediaPaginas : "-"}
          </span>
          <span className="text-xs text-gray-400">
            Média
          </span>
        </div>

        {/* Card 3 */}
        <div className="bg-neutral-800 rounded-xl p-5 flex flex-col items-center gap-1 md:col-auto col-span-2">
          <span className="text-xl">⭐</span>
          <span className="text-2xl font-bold text-white">
            {historico.length === 0 ? "-" : maiorPaginas}
          </span>
          <span className="text-xs text-gray-400">
            Melhor dia
          </span>
        </div>
      </section>

      {/* TESTE */}
      <button
        onClick={avancarDia}
        className="order-5 text-xs text-gray-500 underline text-center mt-2"
      >
        ⏭️ Avançar dia (teste)
      </button>
    </div>

    {/* MODAL*/}
    {modalAberto && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
        <div className="bg-neutral-800 rounded-xl p-6 w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-white text-lg font-semibold text-center">
            Quantas páginas você leu hoje?
          </h2>

          <input
            type="number"
            value={paginas}
            min="1"
            step="1"
            onChange={(e) => setPaginas(e.target.value)}
            placeholder="Ex: 15"
            className="
              bg-neutral-700
              text-white
              placeholder-gray-400
              rounded-lg
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-purple-500
              no-spinner
            "
          />

          <button
            onClick={fazTudo}
            disabled={!paginasValidas}
            className={`
              font-semibold
              py-3
              rounded-lg
              transition
              ${paginasValidas
                ? "bg-purple-500 hover:bg-purple-400 text-white"
                : "bg-neutral-600 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Salvar ✅
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default App;