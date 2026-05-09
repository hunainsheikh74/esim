import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
// 🔥 Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyBMq4syjLZhr6ApeR3oGc5KClmOUKAW9Pw",
  authDomain: "esim-30df2.firebaseapp.com",
  projectId: "esim-30df2",
  databaseURL: "https://esim-30df2-default-rtdb.firebaseio.com"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🗄️ Realtime Database
const db = getDatabase(app);

async function getValueByKey(key) {
  const snapshot = await get(ref(db, key));

  if (snapshot.exists()) {
    checkdata(snapshot.val());
  } else {
    console.log("Not found");
    overlayLoader.classList.remove("show");
  }
}

const overlayLoader = document.getElementById("overlayLoader");


function checkdata(token) {
let responseData = null;

fetch("https://api.eskimo.travel/api/data-wallet/search/v2", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": token
    }
})
.then(res => res.json())
.then(data => {

    responseData = data;

    const plans = responseData?.data?.data || [];

    let totalBytes = 0;

    // Sum all remaining data in bytes
    plans.forEach(plan => {
        if (plan.remainingDataAmountByBytes) {
            totalBytes += Number(plan.remainingDataAmountByBytes);
        }
    });

    // Convert bytes → MB → GB
    const totalMB = totalBytes / (1024 * 1024);
    const totalGB = totalMB / 1024;

    console.log("===== TOTAL REMAINING DATA =====");
    console.log(`Bytes: ${totalBytes}`);
    console.log(`MB: ${totalMB.toFixed(0)} MB`);
    console.log(`GB: ${totalGB.toFixed(2)} GB`);
    overlayLoader.classList.remove("show");
    mbsValue.innerText = (`${totalMB.toFixed(0)} MB`);

    popup.classList.add("show");

})
.catch(err => {
    console.error("API Error:", err);
});
}

const popup = document.getElementById("popup");
  const mbsValue = document.getElementById("mbsValue");

  // Example MB value
  

  // OPEN POPUP
  document.querySelector(".card button").addEventListener("click", function () {
    const esimValue = document.getElementById("esimInput").value;
    if (esimValue !== "" && /^\d+$/.test(esimValue)) {

  // Valid input
  overlayLoader.classList.add("show");
    getValueByKey(esimValue);

}
    
    // Set MB dynamically
    
  });

  // CLOSE POPUP
  document.querySelector(".popup-box button").addEventListener("click", function () {
    popup.classList.remove("show");
  });
