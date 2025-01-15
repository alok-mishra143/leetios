document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const rankValue = document.getElementById("rank-value");
    const totalSolvedValue = document.getElementById("total-solved-value");
    const acceptanceRateValue = document.getElementById("acceptance-rate-value");

    const validUsername = (username) => /^[a-zA-Z0-9_-]+$/.test(username);

    const updateProgress = (solved, total, label, circle) => {
        const progress = (solved / total) * 100;
        label.textContent = `${solved}/${total}`;
        circle.style.setProperty("--progress-degree", `${progress}%`);
    };

    const displayUserData = (userData) => {
        const { easySolved, totalEasy, mediumSolved, totalMedium, hardSolved, totalHard, ranking, acceptanceRate, totalSolved } = userData;

        updateProgress(easySolved, totalEasy, easyLabel, easyProgressCircle);
        updateProgress(mediumSolved, totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(hardSolved, totalHard, hardLabel, hardProgressCircle);

        rankValue.textContent = ranking || "--";
        totalSolvedValue.textContent = totalSolved || "--";
        acceptanceRateValue.textContent = `${acceptanceRate || "--"}%`;

        statsContainer.style.display = "flex";
    };

    searchButton.addEventListener("click", async () => {
        const username = usernameInput.value.trim();
        if (!validUsername(username)) {
            alert("Please enter a valid username!");
            return;
        }

        searchButton.textContent = "Searching...";
        searchButton.disabled = true;

        try {
            const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
            if (!response.ok) throw new Error("User not found");
            const userData = await response.json();
            displayUserData(userData);
        } catch (error) {
            alert(error.message);
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    });
});
