const markdownData = [
  {
    id: 1,
    category: "Structure",
    title: "Heading 1",
    syntax: "# Heading",
    desc: "Largest heading (HTML h1).",
    example: "# Welcome to Markdown\n\nThis is the biggest heading.",
  },
  {
    id: 2,
    category: "Structure",
    title: "Heading 2",
    syntax: "## Heading",
    desc: "Secondary heading (HTML h2).",
    example: "## Section Title\n\nThis divides major sections.",
  },
  {
    id: 3,
    category: "Structure",
    title: "Heading 3",
    syntax: "### Heading",
    desc: "Tertiary heading (HTML h3).",
    example: "### Subsection\n\nUsed for smaller topics.",
  },
  {
    id: 4,
    category: "Text Styling",
    title: "Bold",
    syntax: "**Text**",
    desc: "Makes text bold for emphasis.",
    example: "This is **really important** information.",
  },
  {
    id: 5,
    category: "Text Styling",
    title: "Italic",
    syntax: "*Text*",
    desc: "Italicizes text for subtle emphasis.",
    example: "I *think* this is correct.",
  },
  {
    id: 6,
    category: "Text Styling",
    title: "Bold & Italic",
    syntax: "***Text***",
    desc: "Applies both bold and italic.",
    example: "This is ***extremely critical***.",
  },
  {
    id: 7,
    category: "Text Styling",
    title: "Strikethrough",
    syntax: "~~Text~~",
    desc: "Crosses out text.",
    example: "That idea is ~~terrible~~ brilliant.",
  },
  {
    id: 8,
    category: "Lists",
    title: "Unordered List",
    syntax: "* Item",
    desc: "Bulleted list (can use +, -, or *).",
    example: "My Groceries:\n* Apples\n* Bananas\n* Milk",
  },
  {
    id: 9,
    category: "Lists",
    title: "Ordered List",
    syntax: "1. Item",
    desc: "Numbered sequential list.",
    example: "Steps:\n1. Wake up\n2. Drink coffee\n3. Write code",
  },
  {
    id: 10,
    category: "Lists",
    title: "Nested List",
    syntax: "    * Item",
    desc: "Indent 4 spaces for a sub-list.",
    example:
      "Main List:\n* Item A\n    * Sub-item 1\n    * Sub-item 2\n* Item B",
  },
  {
    id: 11,
    category: "Lists",
    title: "Task List",
    syntax: "- [x] Task",
    desc: "Interactive checkboxes.",
    example:
      "To-Do:\n- [x] Create SPA\n- [x] Add Tailwind\n- [ ] Deploy to server",
  },
  {
    id: 12,
    category: "Links & Media",
    title: "Internet Link",
    syntax: "[Text](URL)",
    desc: "Creates a hyperlink.",
    example: "Search on [Google](https://google.com) for answers.",
  },
  {
    id: 13,
    category: "Links & Media",
    title: "Image",
    syntax: "![Alt](URL)",
    desc: "Embeds an image.",
    example:
      "![Placeholder Image](https://via.placeholder.com/150)\n\nLook at this picture!",
  },
  {
    id: 14,
    category: "Links & Media",
    title: "Direct URL",
    syntax: "<URL>",
    desc: "Auto-links a raw URL.",
    example: "Visit my site: <https://example.com>",
  },
  {
    id: 15,
    category: "Code",
    title: "Inline Code",
    syntax: "`Code`",
    desc: "Highlights short snippets.",
    example: "Use the `console.log()` function to debug.",
  },
  {
    id: 16,
    category: "Code",
    title: "Multi-line Code",
    syntax: "```Code\nCode\Code```",
    desc: "Highlights short snippets.",
    example:
      "Use the ```console.log()\nconsole.log()\nconsole.log()``` function to debug.",
  },
  {
    id: 17,
    category: "Structure",
    title: "Blockquote",
    syntax: "> Text",
    desc: "Formats text as a quotation.",
    example: '> "Code is poetry."\n> \n> > A nested thought.',
  },
  {
    id: 18,
    category: "Structure",
    title: "Horizontal Line",
    syntax: "---",
    desc: "Draws a divider line.",
    example: "Section One\n\n---\n\nSection Two",
  },
  {
    id: 19,
    category: "Extended",
    title: "Highlighting",
    syntax: "<mark>Text</mark>",
    desc: "HTML fallback for ==highlight==.",
    example: "Please read the <mark>highlighted</mark> text.",
  },
  {
    id: 20,
    category: "Extended",
    title: "Superscript",
    syntax: "<sup>Text</sup>",
    desc: "HTML fallback for ^sup^.",
    example: "E = mc<sup>2</sup>",
  },
  {
    id: 21,
    category: "Tables",
    title: "Basic Table",
    syntax: "| Col | Col |",
    desc: "Creates structured tables.",
    example: "| Name | Age |\n| --- | --- |\n| Alice | 24 |\n| Bob | 30 |",
  },
];

const state = {
  activeCategory: "All",
  categories: ["All", ...new Set(markdownData.map((d) => d.category))],
};

const mdInput = document.getElementById("md-input");
const htmlOutput = document.getElementById("html-output");
const navContainer = document.getElementById("category-nav");
const gridContainer = document.getElementById("syntax-grid");
const countDisplay = document.getElementById("library-count");

const simpleMarkdownParser = (text) => {
  if (!text) return "";

  let html = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  html = html.replace(/&lt;mark&gt;(.*?)&lt;\/mark&gt;/g, "<mark>$1</mark>");
  html = html.replace(/&lt;sup&gt;(.*?)&lt;\/sup&gt;/g, "<sup>$1</sup>");
  html = html.replace(/&lt;sub&gt;(.*?)&lt;\/sub&gt;/g, "<sub>$1</sub>");

  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  html = html.replace(/`(.*?)`/g, "<code>$1</code>");

  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank">$1</a>',
  );
  html = html.replace(
    /&lt;(https?:\/\/.*?)&gt;/g,
    '<a href="$1" target="_blank">$1</a>',
  );

  html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
  html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  html = html.replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>");

  html = html.replace(
    /^- \[x\] (.*$)/gim,
    '<ul style="list-style-type:none; margin-left:0;"><li style="display:flex; align-items:center;"><input type="checkbox" checked disabled style="margin-right:8px;"> $1</li></ul>',
  );
  html = html.replace(
    /^- \[ \] (.*$)/gim,
    '<ul style="list-style-type:none; margin-left:0;"><li style="display:flex; align-items:center;"><input type="checkbox" disabled style="margin-right:8px;"> $1</li></ul>',
  );

  html = html.replace(
    /^(?:\s{4}|\t)[*+-]\s+(.*)$/gim,
    "<ul><ul><li>$1</li></ul></ul>",
  );

  html = html.replace(/^[*+-]\s+(.*)$/gim, "<ul><li>$1</li></ul>");
  html = html.replace(/^\d+\.\s+(.*)$/gim, "<ol><li>$1</li></ol>");

  html = html.replace(/<\/ul>\n<ul>/g, "");
  html = html.replace(/<\/ol>\n<ol>/g, "");

  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");

  html = html.replace(/^---$/gim, '<hr class="my-4 border-stone-300">');

  const tableRegex = /^\|(.+)\|$\n^\|([-: |]+)\|$\n(^\|(.+)\|\s*$\n*)*/gm;
  html = html.replace(tableRegex, (match) => {
    const rows = match.trim().split("\n");
    let tableHtml = "<table>";
    rows.forEach((row, index) => {
      if (index === 1) return;
      const tag = index === 0 ? "th" : "td";
      const cells = row.split("|").filter((c) => c.trim() !== "");
      tableHtml += "<tr>";
      cells.forEach((cell) => {
        tableHtml += `<${tag}>${cell.trim()}</${tag}>`;
      });
      tableHtml += "</tr>";
    });
    tableHtml += "</table>";
    return tableHtml;
  });

  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => {
      if (
        p.startsWith("<h") ||
        p.startsWith("<ul") ||
        p.startsWith("<ol") ||
        p.startsWith("<block") ||
        p.startsWith("<pre") ||
        p.startsWith("<hr") ||
        p.startsWith("<table")
      ) {
        return p;
      } else {
        return p.trim().length > 0 ? `<p>${p.replace(/\n/g, "<br>")}</p>` : "";
      }
    })
    .join("");

  return html;
};

const renderPreview = () => {
  htmlOutput.innerHTML = simpleMarkdownParser(mdInput.value);
};

const loadExample = (exampleText) => {
  mdInput.value = exampleText;
  renderPreview();
};

const renderCards = () => {
  gridContainer.innerHTML = "";
  const filteredData =
    state.activeCategory === "All"
      ? markdownData
      : markdownData.filter((d) => d.category === state.activeCategory);

  countDisplay.textContent = `${filteredData.length} Items`;

  filteredData.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-stone-50 border border-stone-200 rounded-lg p-4 cursor-pointer hover:border-sky-400 hover:shadow-md transition-all duration-200 group flex flex-col justify-between";
    card.onclick = () => {
        loadExample(item.example);
        window.scrollTo({ top: 0, behavior: "smooth" });
        
    };

    card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-stone-800 text-sm">${item.title}</h4>
                            <span class="text-[10px] uppercase font-bold text-stone-400 bg-white px-2 py-0.5 rounded border border-stone-100">${item.category}</span>
                        </div>
                        <code class="block bg-stone-100 text-sky-700 text-xs p-2 rounded border border-stone-200 mb-3 font-mono">${item.syntax.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>
                        <p class="text-xs text-stone-500">${item.desc}</p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-stone-200 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span class="text-xs font-semibold text-sky-600">Try it in Sandbox &rarr;</span>
                    </div>
                `;
    gridContainer.appendChild(card);
  });
};

const renderNav = () => {
  navContainer.innerHTML = "";
  state.categories.forEach((cat) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = `nav-btn w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 border-l-4 border-transparent transition-colors ${state.activeCategory === cat ? "active" : ""}`;
    btn.textContent = cat;

    if (cat === "All") {
      btn.innerHTML = `&#128214; ${cat}`;
    } else if (cat === "Structure") {
      btn.innerHTML = `&#127964; ${cat}`;
    } else if (cat === "Text Styling") {
      btn.innerHTML = `&#10024; ${cat}`;
    } else if (cat === "Lists") {
      btn.innerHTML = `&#128221; ${cat}`;
    } else if (cat === "Links & Media") {
      btn.innerHTML = `&#128279; ${cat}`;
    } else {
      btn.innerHTML = `&#128187; ${cat}`;
    }

    btn.onclick = () => {
      state.activeCategory = cat;
      renderNav();
      renderCards();
    };
    li.appendChild(btn);
    navContainer.appendChild(li);
  });
};

const initChart = () => {
  const ctx = document.getElementById("syntaxChart").getContext("2d");
  const categoryCounts = state.categories
    .filter((c) => c !== "All")
    .map((cat) => {
      return markdownData.filter((d) => d.category === cat).length;
    });

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: state.categories.filter((c) => c !== "All"),
      datasets: [
        {
          data: categoryCounts,
          backgroundColor: [
            "#0ea5e9",
            "#f59e0b",
            "#10b981",
            "#6366f1",
            "#ec4899",
            "#8b5cf6",
          ],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#57534e",
            font: { size: 11, family: "sans-serif" },
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "#1c1917",
          padding: 10,
          callbacks: {
            label: function (context) {
              return " " + context.label + ": " + context.raw + " items";
            },
          },
        },
      },
      cutout: "65%",
    },
  });
};

mdInput.addEventListener("input", renderPreview);

renderNav();
renderCards();
initChart();
loadExample(
  '# Welcome to the Sandbox!\n\nClick any card from the **Syntax Library** below to load an example here. \n\nLeft side is the Markdown source, right side is the live HTML preview. Happy experimenting! 🚀');
