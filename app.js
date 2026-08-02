const fileInput = document.getElementById("apkFile");
const openBtn = document.getElementById("openBtn");
const output = document.getElementById("output");

openBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        output.textContent = "اختر ملف APK أولاً";
        return;
    }

    output.textContent = "جاري تحليل APK...";

    try {
        const zip = await JSZip.loadAsync(file);

        const files = Object.keys(zip.files);

        const manifestExists = files.includes("AndroidManifest.xml");
        const dexExists = files.some(f => f.endsWith(".dex"));
        const resourcesExists = files.includes("resources.arsc");

        output.textContent =
`APK Information

اسم الملف:
${file.name}

الحجم:
${(file.size / 1024 / 1024).toFixed(2)} MB

عدد الملفات:
${files.length}

المكونات:

${manifestExists ? "✅ AndroidManifest.xml" : "❌ AndroidManifest.xml"}

${resourcesExists ? "✅ resources.arsc" : "❌ resources.arsc"}

${dexExists ? "✅ classes.dex" : "❌ classes.dex"}

الحالة:
جاهز للتحليل
`;

    } catch (error) {
        output.textContent = 
        "خطأ في قراءة APK:\n" + error.message;
    }
});
