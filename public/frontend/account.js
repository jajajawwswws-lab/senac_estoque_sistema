// ===== CONFIGURAÇÃO DA API =====

const API_URL = '/api/account';
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 Página carregada");

  if (!localStorage.getItem("itens")) {
    localStorage.setItem("itens", JSON.stringify([]));
  }

  carregarTabelaItens();
  carregarGrafico();
  carregarAtividadeRecente(); // 🆕 Nova função

  // Botão adicionar item
  document.getElementById("btnAdicionarItem")?.addEventListener("click", () => {
    adicionarItem();
  });
});

// ===== FUNÇÃO PRINCIPAL: ADICIONAR ITEM (AGORA COM API) =====
async function adicionarItem() {
  const nome = prompt("Nome do item:");
  if (!nome) return;

  const categoria = prompt("Categoria:");
  if (!categoria) return;

  const localizacao = prompt("Localização:");
  if (!localizacao) return;

  const responsavel = prompt("Responsável:");
  if (!responsavel) return;

  const patrimonio = prompt("Número de Patrimônio (opcional):");

  const novoItem = {
    id: Date.now(),
    nome,
    categoria,
    localizacao,
    responsavel,
    patrimonio: patrimonio || `PAT-${String(Date.now()).slice(-3)}`,
    status: "em_uso",
    data_criacao: new Date().toISOString() // 🆕 Data para API
  };

  // 1. Salvar no localStorage (cache local)
  const itens = JSON.parse(localStorage.getItem("itens"));
  itens.push(novoItem);
  localStorage.setItem("itens", JSON.stringify(itens));

  // 2. Atualizar UI imediatamente
  carregarTabelaItens();
  carregarGrafico();

  // 3. Enviar para o backend TypeScript (NOVO!)
  await enviarParaAPI(novoItem, 'adicionar');
}

// ===== 🆕 ENVIAR DADOS PARA O BACKEND =====
async function enviarParaAPI(item, acao) {
  try {
    // Preparar dados no formato que o backend espera
    const dadosAPI = {
      distribuicao: await gerarResumoDistribuicao(),
      atividade: `${acao.toUpperCase()}: ${item.nome} (${item.categoria})`,
      atividade_data: new Date().toISOString(),
      tabela: gerarResumoTabela(),
      adicionar_item: JSON.stringify(item)
    };

    console.log("📤 Enviando para API:", dadosAPI);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosAPI)
    });

    const result = await response.json();
    
    if (result.success) {
      console.log("✅ Backend processou com sucesso:", result);
      
      // Se o backend retornou análise de IA, mostrar na UI
      if (result.data?.ai_analysis) {
        atualizarAtividadeRecente(`🤖 IA: ${result.data.ai_analysis}`);
      }
    } else {
      console.error("❌ Erro do backend:", result.error);
    }
    
  } catch (error) {
    console.error("🚨 Erro ao conectar com backend:", error);
    // Não quebra a UI se o backend falhar (modo offline)
  }
}

// ===== 🆕 GERAR RESUMO DE DISTRIBUIÇÃO =====
async function gerarResumoDistribuicao() {
  const itens = JSON.parse(localStorage.getItem("itens") || "[]");
  const emUso = itens.filter(i => i.status === "em_uso").length;
  const defeito = itens.filter(i => i.status === "defeito").length;
  const manutencao = itens.filter(i => i.status === "manutencao").length;
  
  return `Em Uso: ${emUso}, Defeito: ${defeito}, Manutenção: ${manutencao}`;
}

// ===== 🆕 GERAR RESUMO DA TABELA =====
function gerarResumoTabela() {
  const itens = JSON.parse(localStorage.getItem("itens") || "[]");
  const ultimos = itens.slice(-3).map(i => 
    `${i.patrimonio}: ${i.nome} (${i.status})`
  ).join(' | ');
  
  return `Últimos itens: ${ultimos || 'Nenhum item'}`;
}

// ===== 🆕 CARREGAR ATIVIDADE RECENTE NA UI =====
function carregarAtividadeRecente() {
  const container = document.querySelector('.bg-white.rounded-xl.shadow-sm.p-6 p');
  if (container) {
    container.innerHTML = 'Carregando atividades...';
  }
}

// ===== 🆕 ATUALIZAR ATIVIDADE RECENTE =====
function atualizarAtividadeRecente(mensagem) {
  const container = document.querySelector('.bg-white.rounded-xl.shadow-sm.p-6 p');
  if (container) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    container.innerHTML = `
      <div class="space-y-2">
        <div class="flex items-start gap-2">
          <span class="text-xs text-gray-400">${timestamp}</span>
          <span class="text-sm">${mensagem}</span>
        </div>
        ${container.innerHTML !== 'Carregando atividades...' ? container.innerHTML : ''}
      </div>
    `;
  }
}

// ===== ATUALIZAR: CARREGAR TABELA (COM SINCRONIZAÇÃO) =====
function carregarTabelaItens() {
  const tbody = document.getElementById("tabelaItens");
  if (!tbody) return;

  const itens = JSON.parse(localStorage.getItem("itens") || "[]");
  tbody.innerHTML = "";

  itens.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-6 py-4 text-sm font-medium text-gray-900">${item.patrimonio}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${item.nome}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${item.categoria}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${item.localizacao}</td>
      <td class="px-6 py-4 text-sm text-gray-500">${item.responsavel}</td>
      <td class="px-6 py-4 text-sm text-gray-500">
        <button class="status-em-uso px-2 py-1 rounded mr-1">Em Uso</button>
        <button class="status-defeito px-2 py-1 rounded mr-1">Defeito</button>
        <button class="status-manutencao px-2 py-1 rounded">Manutenção</button>
        <button class="remover px-2 py-1 rounded ml-2">Remover</button>
      </td>
    `;
    tbody.appendChild(tr);

    atualizarBotoesStatus(tr, item.status);

    // Adicionar eventos
    tr.querySelector(".status-em-uso").addEventListener("click", () => atualizarStatus(item.id, "em_uso"));
    tr.querySelector(".status-defeito").addEventListener("click", () => atualizarStatus(item.id, "defeito"));
    tr.querySelector(".status-manutencao").addEventListener("click", () => atualizarStatus(item.id, "manutencao"));
    tr.querySelector(".remover").addEventListener("click", () => removerItem(item.id));
  });
}

// ===== ATUALIZAR: MUDAR STATUS (COM API) =====
async function atualizarStatus(id, status) {
  const itens = JSON.parse(localStorage.getItem("itens") || "[]");
  const index = itens.findIndex((i) => i.id === id);
  
  if (index !== -1) {
    const statusAnterior = itens[index].status;
    itens[index].status = status;
    localStorage.setItem("itens", JSON.stringify(itens));
    
    carregarTabelaItens();
    carregarGrafico();
    
    // 🆕 Enviar mudança de status para o backend
    await enviarParaAPI(itens[index], `status_alterado_${statusAnterior}_para_${status}`);
  }
}

// ===== ATUALIZAR: REMOVER ITEM (COM API) =====
async function removerItem(id) {
  if (!confirm("Deseja realmente remover este item?")) return;

  let itens = JSON.parse(localStorage.getItem("itens") || "[]");
  const itemRemovido = itens.find(i => i.id === id);
  itens = itens.filter((i) => i.id !== id);
  localStorage.setItem("itens", JSON.stringify(itens));

  carregarTabelaItens();
  carregarGrafico();
  
  // 🆕 Notificar backend sobre remoção
  if (itemRemovido) {
    await enviarParaAPI(itemRemovido, 'removido');
  }
}

// ===== MANTIDO IGUAL: ATUALIZAR BOTÕES =====
function atualizarBotoesStatus(tr, status) {
  const btnEmUso = tr.querySelector(".status-em-uso");
  const btnDefeito = tr.querySelector(".status-defeito");
  const btnManutencao = tr.querySelector(".status-manutencao");

  btnEmUso.className = `status-em-uso px-2 py-1 rounded mr-1 ${status === "em_uso" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"}`;
  btnDefeito.className = `status-defeito px-2 py-1 rounded mr-1 ${status === "defeito" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-500"}`;
  btnManutencao.className = `status-manutencao px-2 py-1 rounded ${status === "manutencao" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-500"}`;
}

// ===== MANTIDO IGUAL: CARREGAR GRÁFICO =====
function carregarGrafico() {
  const ctx = document.getElementById("statusChart")?.getContext("2d");
  if (!ctx) return;

  const itens = JSON.parse(localStorage.getItem("itens") || "[]");
  const emUso = itens.filter((i) => i.status === "em_uso").length;
  const defeito = itens.filter((i) => i.status === "defeito").length;
  const manutencao = itens.filter((i) => i.status === "manutencao").length;

  if (window.meuGrafico) window.meuGrafico.destroy();

  window.meuGrafico = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Em Uso", "Com Defeito", "Em Manutenção"],
      datasets: [{
        data: [emUso, defeito, manutencao],
        backgroundColor: ["#10B981", "#EF4444", "#F97316"],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom" } },
      cutout: "70%",
    },
  });
}
