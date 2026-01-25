import { useState } from "react";

function App() {
  const [streak, setStreak] = useState(0)
  const [clicou, setClick] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [paginas, setPaginas] = useState("")
  const [historico, setHistorico] = useState([])
  const [diaAtual, setDiaAtual] = useState("2026-01-23")

  const paginasLidas = historico.map(item => item.paginas)
  const totalPaginas = paginasLidas.reduce((acc, num) => acc + num, 0)
  const mediaPaginas = totalPaginas / paginasLidas.length
  const maiorPaginas = Math.max(...paginasLidas)


  function abrirModal() {
    setModalAberto(true);
  }

  function salvarLeitura() {

    setStreak(streak + 1);
    setClick(true);
    setModalAberto(false);
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
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-6">

        {/* Título */}
        <h1 className="text-gray-100 text-xl font-medium">
          Leitura Diária
        </h1>

        {/* Streak */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl">🔥</span>
          <span className="text-7xl font-bold text-white">
            {streak}
          </span>
          <span className="text-gray-400 text-sm">
            dias seguidos
          </span>
        </div>

        {/* Mensagem */}
        <p className="text-gray-300 max-w-xs">
          {streak === 0
            ? "Comece sua sequência hoje "
            : "Leitura marcada! Volte amanhã "}
        </p>

        {/* Botão principal */}
        {!clicou && (
          <button
            onClick={abrirModal}
            className="
              mt-4
              bg-purple-500
              hover:bg-purple-400
              text-white
              font-semibold
              px-8
              py-3
              rounded-full
              transition
            "
          >
            Li hoje
          </button>

        )}
        {/*<div className="text-gray-300 text-sm">
          Total de páginas lidas: <span className="text-white">{totalPaginas}</span>
        </div>
         <div>
          <ul className="text-gray-400 text-sm mt-4">
            {historico.map((item, index) => (
              <li key={index}>
                 {item.data} —  {item.paginas} páginas
              </li>
            ))}
          </ul>

        </div>*/}

        {/* Estatísticas */}
        <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">

          {/* Card 1 */}
          <div className="bg-neutral-800 rounded-xl p-4 flex flex-col items-center gap-1">
            <span className="text-xl">📖</span>
            <span className="text-2xl font-bold text-white">
              {totalPaginas}
            </span>
            <span className="text-xs text-gray-400">
              Total
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-neutral-800 rounded-xl p-4 flex flex-col items-center gap-1">
            <span className="text-xl">📊</span>
            <span className="text-2xl font-bold text-white">
              {!Number.isNaN(mediaPaginas) ? mediaPaginas : "-"}
            </span>
            <span className="text-xs text-gray-400">
              Média
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-neutral-800 rounded-xl p-4 flex flex-col items-center gap-1">
            <span className="text-xl">⭐</span>
            <span className="text-2xl font-bold text-white">
              {historico.length === 0 ? "-" : maiorPaginas}
            </span>
            <span className="text-xs text-gray-400">
              Melhor dia
            </span>
          </div>

        </div>

        <button
          onClick={avancarDia}
          className="text-xs text-gray-400 underline mt-4"
        >
          ⏭️ Avançar dia (teste)
        </button>

      </div>

      {/* MODAL */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-neutral-800 rounded-xl p-6 w-80 flex flex-col gap-4">

            <h2 className="text-white text-lg font-semibold text-center">
              Quantas páginas você leu hoje?
            </h2>

            <input
              type="text"
              value={paginas}
              onChange={(e) => setPaginas(e.target.value)}
              placeholder="Ex: 15"
              className="
                bg-neutral-700
                text-white
                placeholder-gray-400
                rounded-lg
                px-4
                py-2
                outline-none
                focus:ring-2
                focus:ring-purple-500
              "
            />

            <button
              onClick={fazTudo}
              className="
                bg-purple-500
                hover:bg-purple-400
                text-white
                font-semibold
                py-2
                rounded-lg
                transition
              "
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
