
      let chadaChartInstance = null;

      const icons = {
        survival: {
          crying: `<div class="text-6xl">😭</div>`,
          sad: `<div class="text-6xl">😔</div>`,
          neutral: `<div class="text-6xl">😐</div>`,
          happy: `<div class="text-6xl">😊</div>`,
        },
        leaderMood: {
          angry: `<div class="text-6xl">😡</div>`,
          thinking: `<div class="text-6xl">🤔</div>`,
          happy: `<div class="text-6xl">😄</div>`,
          strong: `<div class="text-6xl">💪</div>`,
          trophy: `<div class="text-6xl">🏆</div>`,
        },
        contribution: {
          tea: `<div class="text-6xl">☕</div>`,
          rock: `<div class="text-6xl">🧱</div>`,
          plane: `<div class="text-6xl">✈️</div>`,
          building: `<div class="text-6xl">🏛️</div>`,
        },
      };

      function formatCurrency(amount) {
        return `৳ ${amount.toLocaleString("bn-BD", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }

      function getLeadersMood(monthlyChada) {
        if (monthlyChada < 2000)
          return { icon: icons.leaderMood.angry, text: "চেয়ারম্যান হতাশ!" };
        if (monthlyChada < 10000)
          return {
            icon: icons.leaderMood.thinking,
            text: "লন্ডন থেকে বার্তা আসবে...",
          };
        if (monthlyChada < 50000)
          return { icon: icons.leaderMood.happy, text: "দেশনেত্রী খুশি হবেন!" };
        if (monthlyChada < 100000)
          return { icon: icons.leaderMood.strong, text: "জিয়ার সৈনিক সফল!" };
        return { icon: icons.leaderMood.trophy, text: "সরাসরি নমিনেশন!" };
      }

      function getContributionUse(monthlyChada) {
        if (monthlyChada < 2000)
          return { icon: icons.contribution.tea, text: "নেতার এক কাপ চা" };
        if (monthlyChada < 10000)
          return {
            icon: icons.contribution.rock,
            text: "হরতালের জন্য ইট-পাটকেল",
          };
        if (monthlyChada < 50000)
          return { icon: icons.contribution.plane, text: "লন্ডন সফরের একাংশ" };
        return {
          icon: icons.contribution.building,
          text: "নমিনেশনের ডাউন পেমেন্ট",
        };
      }

      function getHumorText(profession) {
        switch (profession) {
          case "doctor":
            return "ডাক্তার সাহেব, দেশনেত্রীর চিকিৎসার জন্য আপনার অবদান খুবই জরুরি!";
          case "engineer":
            return "ইঞ্জিনিয়ার সাহেব, নতুন বাংলাদেশ গড়তে আপনার পকেটের অবদানও লাগবে!";
          case "teacher":
            return "শিক্ষক মানুষ, আপনার দোয়াটাই বড় কথা। তবে দোয়ার সাথে 'দান' হলে গণতন্ত্র মুক্তি পাবে।";
          case "govt_job":
            return "সরকারী চাকুরীজীবী? ভয় পাবেন না, সরকার বদলালে আপনিই তো আমাদের লোক!";
          case "businessman":
            return "ব্যবসায়ী ভাই, শহীদ জিয়ার আদর্শ বাস্তবায়নে আপনার বিনিয়োগ আবশ্যক!";
          case "freelancer":
            return "ফ্রিল্যান্সার ভাই, লন্ডনে নেতার কাছে আপনার ডলারের খুব দরকার!";
          case "rickshaw_puller":
            return "রিকশাওয়ালা ভাই, আপনার ভাড়ার টাকা দিয়ে নেতার গাড়ির পেট্রোল! কী চমৎকার ব্যাপার!";
          case "day_laborer":
            return "দিনমজুর ভাই, আপনার হাড়ভাঙা খাটুনির টাকা দিয়ে নেতার বিদেশ সফর! দেশপ্রেমের নমুনা!";
          case "unemployed":
            return "বেকার ভাই, কাজ নেই কিন্তু চাঁদা দিতে হবে! এটাই তো আমাদের পার্টির নিয়ম!";
          case "expatriate_worker":
            return "প্রবাসী ভাই, আপনার রেমিট্যান্সই দেশের মেরুদণ্ড! সেই মেরুদণ্ড নেতার পকেটে!";
          default:
            return "আপনার টাকায় কেনা পেট্রোল গণতন্ত্রের মশাল জ্বালাবে!";
        }
      }

      function getSurvivalAnalysis(remainingSalary) {
        if (remainingSalary < 15000)
          return {
            icon: icons.survival.crying,
            text: "এই টাকায় মাস চলবে? আন্দোলন করার শক্তিও তো থাকবে না!",
          };
        if (remainingSalary < 25000)
          return {
            icon: icons.survival.sad,
            text: "ডাল-ভাত খেয়ে গণতন্ত্র রক্ষা করতে হবে!",
          };
        if (remainingSalary < 50000)
          return {
            icon: icons.survival.neutral,
            text: "আপনি টিকে যাবেন, দলের জন্যও কিছু করতে পারবেন।",
          };
        return {
          icon: icons.survival.happy,
          text: "আপনি তো বেশ ভালোই থাকবেন! দলের জন্য আরও ভাবুন!",
        };
      }

      function calculateChada() {
        const profession = document.getElementById("profession").value;
        const salaryInput = document.getElementById("salary");
        const salary = parseFloat(salaryInput.value);

        const resultContainer = document.getElementById("result-container");
        const genzResultContainer = document.getElementById(
          "genz-result-container"
        );
        const awamiResultContainer = document.getElementById(
          "awami-result-container"
        );
        const errorMessage = document.getElementById("error-message");

        // Hide all containers initially
        resultContainer.classList.add("hidden");
        genzResultContainer.classList.add("hidden");
        awamiResultContainer.classList.add("hidden");
        errorMessage.classList.add("hidden");

        // --- Special Profession Handling ---
        if (profession === "genz") {
          genzResultContainer.classList.remove("hidden");
          genzResultContainer.scrollIntoView({ behavior: "smooth" });
          return;
        }

        if (profession === "retired_awami") {
          awamiResultContainer.classList.remove("hidden");
          awamiResultContainer.scrollIntoView({ behavior: "smooth" });
          return;
        }

        // --- Regular Calculation Validation ---
        if (profession === "default" && (isNaN(salary) || salary <= 0)) {
          errorMessage.innerText =
            "বিপ্লবী, আপনার পেশা এবং আয়ের পরিমাণ ঠিকঠাক দিন!";
          errorMessage.classList.remove("hidden");
          return;
        }

        if (profession === "default") {
          errorMessage.innerText = "বিপ্লবী, আপনার পেশা নির্বাচন করুন!";
          errorMessage.classList.remove("hidden");
          return;
        }

        if (isNaN(salary) || salary <= 0) {
          errorMessage.innerText = "বিপ্লবী, আপনার আয়ের পরিমাণ ঠিকঠাক দিন!";
          errorMessage.classList.remove("hidden");
          return;
        }

        const monthlyChada = salary * 0.1;
        const remainingSalary = salary * 0.9;
        const dailyChada = monthlyChada / 30;
        const weeklyChada = dailyChada * 7;
        const yearlyChada = monthlyChada * 12;

        document.getElementById("humor-text").innerText =
          getHumorText(profession);

        const mood = getLeadersMood(monthlyChada);
        document.getElementById("leader-mood-icon").innerHTML = mood.icon;
        document.getElementById("leader-mood-text").innerText = mood.text;

        const contribution = getContributionUse(monthlyChada);
        document.getElementById("contribution-icon").innerHTML =
          contribution.icon;
        document.getElementById("contribution-text").innerText =
          contribution.text;

        const survival = getSurvivalAnalysis(remainingSalary);
        document.getElementById("survival-icon").innerHTML = survival.icon;
        document.getElementById("survival-text").innerText = survival.text;
        document.getElementById("remaining-salary").innerText =
          formatCurrency(remainingSalary);

        const results = [
          { label: "দৈনিক", value: formatCurrency(dailyChada) },
          { label: "সাপ্তাহিক", value: formatCurrency(weeklyChada) },
          { label: "মাসিক", value: formatCurrency(monthlyChada) },
          { label: "বাৎসরিক", value: formatCurrency(yearlyChada) },
        ];
        const resultDetails = document.getElementById("result-details");
        resultDetails.innerHTML = "";
        results.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.className = `result-item`;
          itemDiv.innerHTML = `<span>${item.label}:</span><span>${item.value}</span>`;
          resultDetails.appendChild(itemDiv);
        });

        if (chadaChartInstance) chadaChartInstance.destroy();

        const chartCtx = document.getElementById("chadaChart").getContext("2d");
        chadaChartInstance = new Chart(chartCtx, {
          type: "bar",
          data: {
            labels: ["দৈনিক", "সাপ্তাহিক", "মাসিক", "বাৎসরিক"],
            datasets: [
              {
                label: "চাঁদার পরিমাণ (টাকায়)",
                data: [dailyChada, weeklyChada, monthlyChada, yearlyChada],
                backgroundColor: [
                  "rgba(59, 130, 246, 0.5)",
                  "rgba(37, 99, 235, 0.5)",
                  "rgba(29, 78, 216, 0.5)",
                  "rgba(30, 58, 138, 0.5)",
                ],
                borderColor: "#1e40af",
                borderWidth: 2,
                borderRadius: 5,
              },
            ],
          },
          options: {
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } },
          },
        });

        resultContainer.classList.remove("hidden");
        resultContainer.scrollIntoView({ behavior: "smooth" });
      }

      function generateReceipt() {
        const professionSelect = document.getElementById("profession");
        const selectedProfession =
          professionSelect.options[professionSelect.selectedIndex].text;
        const salary = parseFloat(document.getElementById("salary").value) || 0;
        const monthlyChada = salary * 0.1;
        const remainingSalary = salary * 0.9;
        const today = new Date();
        const dateString = today.toLocaleDateString("bn-BD", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        document.getElementById("receipt-profession").innerText =
          selectedProfession;
        document.getElementById("receipt-chada").innerText =
          formatCurrency(monthlyChada);
        document.getElementById("receipt-remaining").innerText =
          formatCurrency(remainingSalary);
        document.getElementById("receipt-date").innerText = dateString;

        const receiptElement = document.getElementById("receipt-container");
        const modal = document.getElementById("receipt-modal");
        const previewContainer = document.getElementById("receipt-preview");
        const downloadLink = document.getElementById("download-link");

        previewContainer.innerHTML = "<p>রসিদ তৈরি হচ্ছে...</p>";
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        html2canvas(receiptElement, {
          scale: 1,
          useCORS: true,
          allowTaint: true,
        }).then((canvas) => {
          const imageUrl = canvas.toDataURL("image/png");
          previewContainer.innerHTML = "";
          const img = document.createElement("img");
          img.src = imageUrl;
          img.className = "max-w-full h-auto";
          previewContainer.appendChild(img);
          downloadLink.href = imageUrl;
        });
      }

      function closeModal() {
        document.getElementById("receipt-modal").classList.add("hidden");
      }

      function generateSpecialReceipt() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 600;

        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, "#1f2937");
        gradient.addColorStop(0.5, "#374151");
        gradient.addColorStop(1, "#111827");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 40px 'Tiro Bangla', serif";
        ctx.textAlign = "center";
        ctx.fillText("🏛️ বিশেষ সম্মাননা সনদ 🏛️", canvas.width / 2, 100);

        ctx.fillStyle = "#ffffff";
        ctx.font = "28px 'Tiro Bangla', serif";
        ctx.fillText("অবসরপ্রাপ্ত নেতার জন্য", canvas.width / 2, 150);

        ctx.font = "24px 'Noto Sans Bengali', sans-serif";
        ctx.fillText(
          "এই সনদপত্র প্রমাণ করে যে, আপনি একজন",
          canvas.width / 2,
          240
        );

        ctx.fillStyle = "#fbbf24";
        ctx.font = "bold 32px 'Noto Sans Bengali', sans-serif";
        ctx.fillText("সম্মানিত ও অভিজ্ঞ সহযোদ্ধা", canvas.width / 2, 290);

        ctx.fillStyle = "#ffffff";
        ctx.font = "22px 'Noto Sans Bengali', sans-serif";
        ctx.fillText("এবং বিশেষ সুবিধাসমূহের অধিকারী।", canvas.width / 2, 340);

        ctx.font = "80px Arial";
        ctx.fillText("🤝", canvas.width / 2, 420);

        ctx.fillStyle = "#fbbf24";
        ctx.font = "italic 20px 'Noto Sans Bengali', sans-serif";
        ctx.fillText(
          "নৌকা আর ধানের শীষ দুই সাপের এক এক বিষ",
          canvas.width / 2,
          480
        );

        const date = new Date().toLocaleDateString("bn-BD");
        ctx.fillStyle = "#9ca3af";
        ctx.font = "16px 'Noto Sans Bengali', sans-serif";
        ctx.fillText("তারিখ: " + date, canvas.width / 2, 550);

        canvas.toBlob(
          function (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "বিশেষ_সনদপত্র.jpg";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          },
          "image/jpeg",
          0.95
        );
      }
    