import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, onValue, off } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCrB4xgCBRmpujDcvOOihSVZ6MIFOPE56M",
    authDomain: "proyectoclase1-2025.firebaseapp.com",
    databaseURL: "https://huertamaxi2025-default-rtdb.firebaseio.com",
    projectId: "proyectoclase1-2025",
    storageBucket: "proyectoclase1-2025.firebasestorage.app",
    messagingSenderId: "822869341917",
    appId: "1:822869341917:web:8d4d76a6493df78963cd34"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let refActiva = null;


function iniciarMonitoreo() {
    if (refActiva) {
        off(refActiva);
    }


    refActiva = ref(db, "/");


    onValue(refActiva, (snapshot) => {
        const data = snapshot.val();


        if (!data) {
            console.error("No existen datos en Firebase");
            return;
        }


        if (data.temperatura !== undefined) {
            actualizarBarra("barraTemperatura", parseFloat(data.temperatura), 50);
        }


        if (data.humedadAire !== undefined) {
            actualizarBarra("barraHumedadAire", parseFloat(data.humedadAire), 100);
        }


        if (data.humedadSuelo !== undefined) {
            actualizarBarra("barraHumedadSuelo", parseInt(data.humedadSuelo), 1024);
        }
    });
}


function actualizarBarra(idBarra, valor, max) {
    const barra = document.getElementById(idBarra);
    const porcentaje = Math.min(Math.round((valor / max) * 100), 100);


    barra.style.width = porcentaje + "%";
    barra.textContent = porcentaje + "%";


    if (porcentaje < 40) {
        barra.className = "barra-interna baja";
    } else if (porcentaje < 70) {
        barra.className = "barra-interna media";
    } else {
        barra.className = "barra-interna alta";
    }
}




iniciarMonitoreo();
