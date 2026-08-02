const fileInput = document.getElementById("apkFile");
const openBtn = document.getElementById("openBtn");
const output = document.getElementById("output");

openBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        output.textContent = "اختر ملف APK أولاً";
        return;
    }

    output.textContent = "جاري قراءة APK...";

    try {
        const zip = await JSZip.loadAsync(file);

        const files = [];

        zip.forEach((path) => {
            files.push(path);
        });

        files.sort();

        const manifest = files.find(
            name => name === "AndroidManifest.xml"
        );

        output.textContent =
`تم فتح APK بنجاح ✅

اسم الملف:
${file.name}

عدد الملفات:
${files.length}

Manifest:
${manifest ? "تم العثور عليه ✅" : "غير موجود ❌"}

================

أول 100 ملف:

${files.slice(0, 100).join("\n")}
`;

    } catch (error) {
        output.textContent =
        "حدث خطأ:\n" + error.message;
    }
});
