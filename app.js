const fileInput = document.getElementById("apkFile");
const openBtn = document.getElementById("openBtn");
const output = document.getElementById("output");

openBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        output.textContent = "اختر ملف APK أولاً";
        return;
    }

    output.textContent = "جاري البحث عن صورة التطبيق...";

    try {
        const zip = await JSZip.loadAsync(file);

        let iconFile = null;

        Object.keys(zip.files).forEach(name => {
            if (
                name.startsWith("res/") &&
                (
                    name.endsWith(".png") ||
                    name.endsWith(".webp") ||
                    name.endsWith(".jpg")
                )
            ) {
                if (
                    name.includes("mipmap") ||
                    name.includes("drawable")
                ) {
                    iconFile = name;
                }
            }
        });

        let result =
`APK Information

اسم الملف:
${file.name}

الحجم:
${(file.size / 1024 / 1024).toFixed(2)} MB

عدد الملفات:
${Object.keys(zip.files).length}

الأيقونة:
${iconFile ? iconFile : "لم يتم العثور عليها"}

الحالة:
تم التحليل ✅
`;

        if (iconFile) {
            const blob = await zip.files[iconFile].async("blob");
            const url = URL.createObjectURL(blob);

            result += `\n\nصورة الأيقونة:\n${url}`;
        }

        output.textContent = result;

    } catch (e) {
        output.textContent = "خطأ:\n" + e.message;
    }
});
