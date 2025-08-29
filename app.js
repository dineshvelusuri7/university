    async function fetchUniversities(country) {
      const container = document.getElementById("universities");
      container.textContent = "Loading...";

      try {
        const response = await fetch(`https://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          container.innerHTML = `<p>No universities found for "${country}".</p>`;
          return;
        }

        container.innerHTML = "";

        data.forEach(university => {
          const card = document.createElement("div");
          card.className = "card";

          card.innerHTML = `
            <h3>${university.name}</h3>
            <p><strong>Country:</strong> ${university.country}</p>
            <p><strong>Code:</strong> ${university.alpha_two_code}</p>
            <a href="${university.web_pages[0]}" target="_blank">Visit Website</a>
          `;

          container.appendChild(card);
        });

      } catch (error) {
        container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
      }
    }

    // Handle search button click
    document.getElementById("search-btn").addEventListener("click", () => {
      const country = document.getElementById("country-input").value.trim();
      if (country) {
        fetchUniversities(country);
      } else {
        document.getElementById("universities").innerHTML = "<p style='color:red;'>Please enter a country name.</p>";
      }
    });

    // Allow pressing Enter in the input
    document.getElementById("country-input").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("search-btn").click();
      }
    });
  

