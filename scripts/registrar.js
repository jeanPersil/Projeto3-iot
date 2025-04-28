import {
  db,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "./firebaseConfig.js";

const menuBurguer = document.getElementById("menuBurguer");
const navegacao = document.querySelector(".navegacao");

async function emailExiste(email) {
  const usuariosRef = collection(db, "usuarios");
  const q = query(usuariosRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formsRegistro");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const aviso = document.querySelector(".emUso");

    const senhaCurta = document.getElementById("senha-curta");
    const senhaLetras = document.getElementById("senha-letras");
    const senhaDiferente = document.getElementById("senha-diferente");

    const emailEmUso = await emailExiste(email);

    if (emailEmUso) {
      aviso.style.display = "block";
      return;
    } else {
      aviso.style.display = "none";
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

document.getElementById("sair").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.replace("../index.html");
});
