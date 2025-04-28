import { db, collection, query, where, getDocs } from "./firebaseConfig.js";

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  try {
    const usuariosRef = collection(db, "Login");
    const q = query(usuariosRef, where("login", "==", user));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("Login incorreto!");
      return;
    }

    const usuarioDoc = querySnapshot.docs[0];
    const usuarioData = usuarioDoc.data();

    if (usuarioData.senha !== senha) {
      alert("Senha incorreta!");
      return;
    }

    window.location.href = "../registrar.html";
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Ocorreu um erro durante o login. Tente novamente.");
  }
});
