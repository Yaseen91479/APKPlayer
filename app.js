
const fileInput = document.getElementById("apkFile");
const openBtn = document.getElementById("openBtn");
const output = document.getElementById("output");

openBtn.addEventListener("click", () => {

    const file = fileInput.files[0];

    if (!file) {
        output.textContent = "Please choose an APK file.";
        return;
    }

    output.textContent =
`File Name: ${file.name}
Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
Type: ${file.type || "Unknown"}

APK loaded successfully.`;
});
