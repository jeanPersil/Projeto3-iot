import {
  db,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "./firebaseConfig.js";

const inputPesquisa = document.getElementById("inputPesquisa");
const menuBurguer = document.getElementById("menuBurguer");
const navegacao = document.querySelector(".navegacao");
const container = document.querySelector(".cards-de-usuario");
const nenhumElemento = document.querySelector("[nenhum]");
const modal = document.getElementById("modalEditar");
const inputNovoNome = document.getElementById("inputNovoNome");
const inputNovaSenha = document.getElementById("inputNovaSenha");
const inputNovoEmail = document.getElementById("inputNovoEmail");
const salvarBtn = document.getElementById("salvarEdicao");
const cancelarBtn = document.getElementById("cancelarEdicao");
const sairBtn = document.getElementById("sair");

let idAtual = null;
let cardAtual = null;

function mascararEmail(email) {
  const [usuario, dominio] = email.split("@");
  const parteVisivel = usuario.substring(0, 3);
  return `${parteVisivel}***@${dominio}`;
}

function criarCard({ nome, email, senha }, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = id;

  card.innerHTML = `
    <div class="dados">
      <h2>Usuário</h2>
      <p class="nome"><strong>Nome:</strong> ${nome}</p>
      <p class="email"><strong>Email:</strong> ${mascararEmail(email)}</p>
    </div>
    <div class="botoes">
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    </div>
  `;

  const btnEditar = card.querySelector(".editar");
  const btnExcluir = card.querySelector(".excluir");

  btnExcluir.addEventListener("click", async () => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  });

  btnEditar.addEventListener("click", () => {
    inputNovoNome.value = nome;
    inputNovaSenha.value = senha;
    inputNovoEmail.value = email;
    idAtual = id;
    cardAtual = card;
    modal.classList.remove("hidden");
  });

  return card;
}

function escutarUsuarios() {
  onSnapshot(collection(db, "usuarios"), (snapshot) => {
    container.innerHTML = "";

    if (snapshot.empty) {
      nenhumElemento.textContent = "Nenhum usuário encontrado.";
      return;
    }

    nenhumElemento.textContent = "";

    snapshot.forEach((docSnap) => {
      const dados = docSnap.data();
      const card = criarCard(dados, docSnap.id);
      container.appendChild(card);
    });
  });
}

async function salvarEdicao() {
  if (!idAtual) return;

  const novoNome = inputNovoNome.value.trim();
  const novaSenha = inputNovaSenha.value.trim();
  const novoEmail = inputNovoEmail.value.trim();

  if (!novoNome || !novaSenha || !novoEmail) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    await updateDoc(doc(db, "usuarios", idAtual), {
      nome: novoNome,
      senha: novaSenha,
      email: novoEmail,
    });

    if (cardAtual) {
      cardAtual.querySelector(".nome").innerHTML = `<strong>Nome:</strong> ${novoNome}`;
      cardAtual.querySelector(".email").innerHTML = `<strong>Email:</strong> ${mascararEmail(novoEmail)}`;
    }

    fecharModal();
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
}

function fecharModal() {
  modal.classList.add("hidden");
  idAtual = null;
  cardAtual = null;
}

document.addEventListener("DOMContentLoaded", escutarUsuarios);

menuBurguer.addEventListener("click", () => {
  navegacao.classList.toggle("mostrar");
});

salvarBtn.addEventListener("click", salvarEdicao);
cancelarBtn.addEventListener("click", fecharModal);

sairBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("../index.html");
});
