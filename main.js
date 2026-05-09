import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "XXX",
  projectId: "XXX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadData() {
  const snapshot = await getDocs(collection(db, "users"));

  const data = snapshot.docs.map(doc => doc.data());
  console.log(data);
}

loadData();








let responseData = null;

fetch("https://api.eskimo.travel/api/data-wallet/search/v2", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJVU0VSX0RUT19DTEFJTV9LRVkiOiJ7XCJVc2VySWRcIjpcIjRmYmZiZmVjLWZiNTQtNGEzZS05Mjg1LWRkNDhlMDRkMWYxZlwiLFwiUGFydG5lcklkXCI6bnVsbCxcIkVtYWlsXCI6XCJlc2ltbG9naW5ways2OTk1NTU4MzFAZ21haWwuY29tXCIsXCJGaXJzdE5hbWVcIjpcInNpbVwiLFwiTGFzdE5hbWVcIjpcInNpbVwiLFwiVG9rZW5cIjpudWxsLFwiVXNlclR5cGVcIjpudWxsLFwiVXNlclBlcm1pc3Npb25cIjpudWxsLFwiVXNlclJvbGVzXCI6bnVsbCxcIlJvbGVcIjoxLFwiRnVsbE5hbWVcIjpcInNpbSBzaW1cIn0iLCJleHAiOjIwOTM5NTE2MzYsImlzcyI6ImVza2ltb3Byb2RkIiwiYXVkIjoiZXNraW1vcHJvZGQifQ.lUUKGH10oOqmmQUZucQU3bzyNqA2kQd1-yhZ5XHrV7k"
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
    console.log(`MB: ${totalMB.toFixed(2)} MB`);
    console.log(`GB: ${totalGB.toFixed(2)} GB`);

})
.catch(err => {
    console.error("API Error:", err);
});