import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCELZUB4BzaezA4rZiYMERuQ6DF40ULL_A",
  authDomain: "ledwoki.firebaseapp.com",
  databaseURL: "https://ledwoki-default-rtdb.firebaseio.com",
  projectId: "ledwoki",
  storageBucket: "ledwoki.firebasestorage.app",
  messagingSenderId: "272504469517",
  appId: "1:272504469517:web:f2091f23bf7c564cbdbd44",
  measurementId: "G-S8GBZ6SDZ1",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const menuBurguer = document.getElementById("menuBurguer");
const navegacao = document.querySelector(".navegacao");

function criarCard(nome, id, senha) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.id = id;

  const modal = document.getElementById("modalEditar");
  const inputNovoNome = document.getElementById("inputNovoNome");
  const inputNovaSenha = document.getElementById("inputNovaSenha");
  const salvarBtn = document.getElementById("salvarEdicao");
  const cancelarBtn = document.getElementById("cancelarEdicao");

  card.innerHTML = `
    <div class="dados">
      <h2>Usuário</h2>
      <p class="nome"><strong>Nome:</strong> ${nome}</p>
      
    </div>
    <div class="botoes">
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    </div>
  `;

  card.querySelector(".excluir").addEventListener("click", async () => {
    await deleteDoc(doc(db, "usuarios", id));
  });

  card.querySelector(".editar").addEventListener("click", async () => {
    inputNovoNome.value = nome;
    inputNovaSenha.value = senha;
    idAtual = id;
    cardAtual = card;
    modal.classList.remove("hidden");
  });

  let idAtual = null;
  let cardAtual = null;

  salvarBtn.addEventListener("click", async () => {
    if (idAtual && inputNovoNome.value && inputNovaSenha.value) {
      await updateDoc(doc(db, "usuarios", idAtual), {
        nome: inputNovoNome.value,
        senha: inputNovaSenha.value,
      });

      cardAtual.querySelector(
        ".nome"
      ).textContent = `Nome: ${inputNovoNome.value}`;
      modal.classList.add("hidden");
    }
  });

  cancelarBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  return card;
}

function escutarUsuarios() {
  const container = document.querySelector(".cards-de-usuario");
  const nenhumElemento = document.querySelector("[nenhum]");

  onSnapshot(collection(db, "usuarios"), (snapshot) => {
    container.innerHTML = "";
    if (snapshot.empty) {
      nenhumElemento.textContent = "nenhum usuario encontrado";
      return;
    }
    nenhumElemento.textContent = "";
    snapshot.forEach((doc) => {
      const dados = doc.data();
      const card = criarCard(dados.nome, doc.id, dados.senha);
      container.appendChild(card);
    });
  });
}

document.addEventListener("DOMContentLoaded", escutarUsuarios);

menuBurguer.addEventListener("click", () => {
  navegacao.classList.toggle("mostrar");
});
