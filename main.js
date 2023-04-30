const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("search-input");

function fillInput(input) {
  document.getElementById("search-input").value = `${input}`;
  da;
}

const da = fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    function displayResults(results) {
      resultsContainer.innerHTML = "";
      if (results.length) {
        results.forEach((result) => {
          const resultDiv = document.createElement("div");
          resultDiv.innerHTML = `
        <div class="cyberpunk-border">
        <table cellpadding="5" border="0">
        <tr><td>
        <img src="${result.image}" alt="${result.name[0]}" width="200" height="200"></td><td>
				<h2>${result.name[0]}</h2>
        <p>能力: ${result.ability}</p>
				<p>キーワード: ${result.tag.join(", ")}</p>
				<p>${result.description}</p>
        </td>
        </tr></table>
			`;
          resultsContainer.appendChild(resultDiv);
        });
      } else {
        resultsContainer.innerHTML = `<p style="color: #00ffc8">お探しのキャラが見つかりませんでした。代わりのバナナをおいておきますね。`;
      }
    }

    searchInput.addEventListener("input", () => {
      const searchTerms = searchInput.value.trim().toLowerCase().split(" ");
      const filteredResults = data.filter((result) => {
        return searchTerms.every((term) => {
          return (
            result.name.some((name) => {
              return name.toLowerCase().includes(term);
            }) ||
            result.tag.some((tag) => {
              return tag.toLowerCase().includes(term);
            })
          );
        });
      });
      displayResults(filteredResults);
    });
  })
  .catch((error) => console.error(error));
