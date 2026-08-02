const fileInput = document.getElementById("apkFile");
const openBtn = document.getElementById("openBtn");
const output = document.getElementById("output");

openBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        output.textContent = "Please choose an APK file.";
        return;
    }

    output.textContent = "Opening APK...";

    try {
        const zip = await JSZip.loadAsync(file);

        let result = "";
        let count = 0;

        zip.forEach((path, entry) => {
            count++;
            result += path + "\n";
        });

        output.textContent =
`APK opened successfully!

File: ${file.name}
Files: ${count}

========================

${result}`;

    } catch (e) {
        output.textContent = "Failed to open APK.\n\n" + e.message;
    }
});
