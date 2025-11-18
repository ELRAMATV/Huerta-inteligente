const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    databaseURL: "TU_DB_URL",
    projectId: "TU_ID",
    storageBucket: "TU_BUCKET",
    messagingSenderId: "TU_SENDER",
    appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.getElementById("btnCargar").addEventListener("click", () => {
    const id = document.getElementById("idAlumno").value;

    if (!id) {
        alert("Debes ingresar un ID de estudiante");
        return;
    }

    const ref = db.ref("sensores/" + id);

    ref.on("value", snapshot => {
        const data = snapshot.val();

        if (!data) {
            alert("No existen datos para este estudiante");
            return;
        }

        actualizarBarra(
            "barraTemperatura",
            data.temperatura,
            50              
        );

        actualizarBarra(
            "barraHumedad",
            data.humedad,
            100             
        );
    });
});


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
