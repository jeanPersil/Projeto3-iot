// Importações dos módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuração do Firebase
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

async function emailExiste(email) {
  const usuariosRef = collection(db, "usuarios");
  const q = query(usuariosRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty; // retorna true se o e-mail já existe
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formsRegistro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    const senhaCurta = document.getElementById("senha-curta");
    const senhaLetras = document.getElementById("senha-letras");
    const senhaDiferente = document.getElementById("senha-diferente");

    if (emailExiste(email)) {
      alert("Esse e-mail já está em uso!");
      return;
    }

    if (senha != confirmarSenha) {
      senhaDiferente.classList.add("instruErrada");
      return;
    } else {
      senhaDiferente.classList.remove("instruErrada");
      senhaDiferente.classList.add("instruCerta");
    }

    if (senha.length < 4) {
      senhaCurta.classList.add("instruErrada");
      return;
    } else {
      senhaCurta.classList.remove("instruErrada");
      senhaCurta.classList.add("instruCerta");
    }

    if (/[a-zA-Z]/.test(senha)) {
      senhaLetras.classList.add("instruErrada");
      return;
    } else {
      senhaLetras.classList.remove("instruErrada");
      senhaLetras.classList.add("instruCerta");
    }

    try {
      await addDoc(collection(db, "usuarios"), {
        email: email,
        nome: nome,
        senha: senha,
      });

      alert("Usuário cadastrado com sucesso!");
      senhaDiferente.classList.remove("instruCerta");
      senhaCurta.classList.remove("instruCerta");
      senhaLetras.classList.remove("instruCerta");

      form.reset();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao cadastrar.");
    }
  });
});

menuBurguer.addEventListener("click", () => {
  navegacao.classList.toggle("mostrar");
});
