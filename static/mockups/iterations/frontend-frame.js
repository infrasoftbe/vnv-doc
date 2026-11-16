(function () {
  var STORAGE = "infrasoft.nextIterationInput";
  var catalog = [
    { name: "Opening time ≤ 90s", token: "REQ2026-014-001", type: "requirement", id: "b11", create: "09/11/2026", update: "09/11/2026" },
    { name: "Manual crank available", token: "REQ2026-014-002", type: "requirement", id: "b12", create: "09/11/2026", update: "09/11/2026" },
    { name: "Door interlock", token: "REQ2026-014-003", type: "requirement", id: "b13", create: "09/11/2026", update: "09/11/2026" },
    { name: "Emergency stop", token: "REQ2026-014-004", type: "requirement", id: "b14", create: "09/11/2026", update: "09/11/2026" },
    { name: "Lighting level", token: "REQ2026-014-005", type: "requirement", id: "b15", create: "09/11/2026", update: "09/11/2026" },
    { name: "SAT opening time", token: "TC2026-014-001", type: "test_case", id: "b33", create: "09/11/2026", update: "09/11/2026", covers: "REQ2026-014-001" },
    { name: "Crank inspection", token: "TC2026-014-002", type: "test_case", id: "b34", create: "09/11/2026", update: "09/11/2026", covers: "REQ2026-014-002" },
    { name: "Door cycle", token: "TC2026-014-003", type: "test_case", id: "b35", create: "09/11/2026", update: "09/11/2026", covers: "REQ2026-014-003" },
    { name: "architecture.pdf", token: "FIL2026-014-014", type: "file", id: "b44", create: "09/11/2026", update: "09/11/2026" },
    { name: "bestek.pdf", token: "FIL2026-014-002", type: "file", id: "b45", create: "09/11/2026", update: "09/11/2026" },
    { name: "lighting.pdf", token: "FIL2026-014-006", type: "file", id: "b46", create: "09/11/2026", update: "09/11/2026" },
    { name: "Dossier", token: "STR2026-014-001", type: "structure", id: "b55", create: "09/11/2026", update: "09/11/2026", links: ["FIL2026-014-014", "FIL2026-014-002"], detail: "1.1 architecture.pdf · 1.2 bestek.pdf" },
    { name: "Evidence", token: "LST2026-014-001", type: "list", id: "b66", create: "09/11/2026", update: "09/11/2026", links: ["FIL2026-014-014", "FIL2026-014-002"], detail: "architecture.pdf · bestek.pdf" }
  ];
  var closedRows = [
    ["Opening time ≤ 90s", "REQ2026-014-001", "requirement", "a11", "02/03/2026", "18/06/2026"],
    ["Manual crank available", "REQ2026-014-002", "requirement", "a22", "02/03/2026", "18/06/2026"],
    ["SAT opening time", "TC2026-014-001", "test_case", "a33", "02/03/2026", "18/06/2026"],
    ["architecture.pdf", "FIL2026-014-014", "file", "a44", "02/03/2026", "18/06/2026"],
    ["bestek.pdf", "FIL2026-014-002", "file", "a45", "02/03/2026", "18/06/2026"],
    ["Dossier", "STR2026-014-001", "structure", "a55", "02/03/2026", "18/06/2026"],
    ["Evidence", "LST2026-014-001", "list", "a66", "02/03/2026", "18/06/2026"]
  ];
  var seed = ["REQ2026-014-001", "REQ2026-014-002", "REQ2026-014-003", "TC2026-014-001", "FIL2026-014-014", "STR2026-014-001", "LST2026-014-001"];
  var groups = [
    { key: "requirement", title: "Requirements" },
    { key: "test_case", title: "Test cases" },
    { key: "file", title: "Files" },
    { key: "structure", title: "Structures" },
    { key: "list", title: "Lists" }
  ];

  function byToken(token) {
    return catalog.filter(function (item) { return item.token === token; })[0];
  }

  function readInput() {
    var raw = sessionStorage.getItem(STORAGE);
    if (!raw) {
      sessionStorage.setItem(STORAGE, JSON.stringify(seed));
      return seed.slice();
    }
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : seed.slice();
    } catch (error) {
      return seed.slice();
    }
  }

  function writeInput(tokens) {
    var seen = {};
    var next = [];
    tokens.forEach(function (token) {
      if (!byToken(token) || seen[token]) return;
      seen[token] = true;
      next.push(token);
    });
    sessionStorage.setItem(STORAGE, JSON.stringify(next));
    return next;
  }

  function coveredBy(requirementToken, tokens) {
    return catalog.filter(function (item) {
      return item.covers === requirementToken && tokens.indexOf(item.token) !== -1;
    });
  }

  function addToInput(tokens) {
    var current = readInput();
    var added = [];
    tokens.forEach(function (token) {
      var item = byToken(token);
      if (!item) return;
      if (current.indexOf(token) === -1) {
        current.push(token);
        added.push(token);
      }
      if (item.covers && current.indexOf(item.covers) === -1) {
        current.push(item.covers);
        added.push(item.covers);
      }
    });
    writeInput(current);
    return added;
  }

  function removeFromInput(token) {
    var current = readInput();
    var item = byToken(token);
    if (item && item.type === "requirement" && coveredBy(token, current).length) return current;
    writeInput(current.filter(function (entry) { return entry !== token; }));
    return readInput();
  }

  function icon(path) {
    return '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="' + path + '"/></svg>';
  }

  function render(options) {
    var here = options.screen || "editor";
    var root = document.getElementById("app");
    root.innerHTML =
      '<div class="storybar"><span class="kicker">Click model</span>' +
        '<a class="chip' + (here === "editor" ? " active" : "") + '" href="editor-iteration.html">Select an iteration</a>' +
        '<a class="chip' + (here === "review" ? " active" : "") + '" href="carry-forward.html">Review what is carried</a>' +
        '<span class="blurb">' + (here === "review"
          ? "The popup lists the set already added in the editor. One tab per item type, paged."
          : "Bulk-select in the Items list, then Add to next iteration. + opens the review.") +
        "</span></div>" +
      '<div class="screen">' +
        '<header class="mast"><div class="brand">INFRASOFT STEPS</div><span>Editor · PR2026-014</span></header>' +
        '<div class="modhead"><div><div class="modname">Editor</div><div class="modproj">PR2026-014</div></div>' +
          '<div class="iter"><label for="iteration">Iteration</label>' +
            '<select class="select" id="iteration" aria-label="Iteration">' +
              '<option value="2">Iteration 2 · open</option>' +
              '<option value="1">Iteration 1 · closed</option>' +
            "</select>" +
            '<a class="btn primary" id="add-iteration" href="' + options.addHref + '" aria-label="Open the next iteration">+</a>' +
          "</div></div>" +
        '<div class="headerbar">' +
          '<button class="iconbtn" type="button" data-side="tree" title="Treeview">' + icon("M2 2h5v5H2zm7 1h5v3H9zM2 9h5v5H2zm7 1h5v4H9z") + "</button>" +
          '<button class="iconbtn" type="button" data-side="filter" title="Filters">' + icon("M2 3h12l-4.5 5.2V13l-3 1.5V8.2z") + "</button>" +
          '<div class="tabs">' +
            ["Structure", "List", "Items", "Linker", "Register", "Test Run"].map(function (tab) {
              return '<button class="tab' + (tab === "Items" ? " active" : "") + '" type="button">' + tab + "</button>";
            }).join("") +
          "</div>" +
          '<button class="btn secondary" type="button">Full screen</button>' +
        "</div>" +
        '<div class="stage">' +
          '<aside class="pfdrawer" id="side-tree" hidden><div class="pfhead"><span>Treeview</span></div><div class="pfbody"><p class="hint">Same tree as the Items tab.</p></div></aside>' +
          '<aside class="pfdrawer" id="side-filter" hidden><div class="pfhead"><span>Filters</span></div><div class="pfbody"><p class="hint">Search the open iteration, then add the selection to the next iteration.</p></div></aside>' +
          '<div class="stage-main">' +
            '<section class="hero">' +
              '<div class="crumbs"><span class="dim">Item</span><span class="sep">/</span><span id="hero-type">requirement</span><span class="sep">/</span><span id="hero-name">Opening time ≤ 90s</span></div>' +
              '<div class="metrics"><span class="metric"><i>Items</i><b id="metric-items">0</b></span><span class="metric"><i>Next iteration</i><b id="kpi-input">0</b></span></div>' +
              '<div class="actions"><button class="btn primary" type="button">Item</button></div>' +
            "</section>" +
            '<div id="banner"></div>' +
            '<div class="workspace" id="grid"></div>' +
          "</div>" +
        "</div>" +
      "</div>";

    var select = document.getElementById("iteration");
    var picked = {};
    select.value = options.iteration || "2";
    select.addEventListener("change", function () { paint(select.value); });
    document.querySelector(".headerbar").addEventListener("click", function (event) {
      var button = event.target.closest("[data-side]");
      if (!button) return;
      var which = button.getAttribute("data-side");
      ["tree", "filter"].forEach(function (name) {
        var side = document.getElementById("side-" + name);
        var iconButton = document.querySelector('[data-side="' + name + '"]');
        var show = name === which && side.hidden;
        side.hidden = !show;
        iconButton.classList.toggle("active", show);
      });
    });
    paint(select.value);

    function paint(iteration) {
      var open = iteration === "2";
      var add = document.getElementById("add-iteration");
      if (open) add.removeAttribute("aria-disabled");
      else add.setAttribute("aria-disabled", "true");
      add.onclick = function (event) { if (!open) event.preventDefault(); };
      var count = open ? catalog.length : closedRows.length;
      document.getElementById("metric-items").textContent = String(count);
      document.getElementById("kpi-input").textContent = String(readInput().length);
      document.getElementById("banner").innerHTML = open
        ? ""
        : '<div class="callout warn">Iteration 1 is closed. View stays available. Save and Add to next iteration are refused.</div>';
      document.getElementById("grid").innerHTML = open ? openTable() : closedTable();
      if (!open) return;
      var grid = document.getElementById("grid");
      grid.onchange = function (event) {
        var box = event.target.closest("[data-token]");
        if (!box) return;
        if (box.checked) picked[box.getAttribute("data-token")] = true;
        else delete picked[box.getAttribute("data-token")];
        var action = document.getElementById("add-to-next");
        var selected = Object.keys(picked);
        action.disabled = selected.length === 0;
        action.textContent = selected.length ? "Add to next iteration (" + selected.length + ")" : "Add to next iteration";
      };
      document.getElementById("add-to-next").onclick = function () {
        var selected = Object.keys(picked);
        var added = addToInput(selected);
        picked = {};
        var brought = added.filter(function (token) { return selected.indexOf(token) === -1; });
        var text = added.length
          ? "Added to the next iteration: " + added.join(", ") + "."
          : "Those items are already in the next iteration.";
        if (brought.length) text += " A requirement was added because its test case covers it.";
        paint(iteration);
        document.getElementById("banner").innerHTML = '<div class="callout ok">' + text + "</div>";
      };
    }

    function openTable() {
      var input = readInput();
      var head = '<th class="check"></th><th>name</th><th>token</th><th>type</th><th>id</th><th>create_dt</th><th>update_dt</th><th></th>';
      var body = catalog.map(function (item) {
        var inInput = input.indexOf(item.token) !== -1;
        return "<tr>" +
          '<td class="check"><input type="checkbox" aria-label="Select ' + item.name + '" data-token="' + item.token + '"' + (picked[item.token] ? " checked" : "") + " /></td>" +
          "<td>" + item.name + (inInput ? ' <span class="badge present">in next iteration</span>' : "") + "</td>" +
          '<td class="token">' + item.token + "</td>" +
          "<td>" + item.type + "</td><td>" + item.id + "</td><td>" + item.create + "</td><td>" + item.update + "</td>" +
          '<td><button class="btn tiny secondary" type="button">View</button> <button class="btn tiny danger" type="button">Delete</button></td></tr>';
      }).join("");
      return '<div class="selectionBar"><button class="btn primary" type="button" id="add-to-next" disabled>Add to next iteration</button><span class="hint">Run sheet LST2026-014-009 is reached by test run 1 and is absent from this list.</span></div>' +
        "<table><thead><tr>" + head + "</tr></thead><tbody>" + body + "</tbody></table>";
    }
  }

  function closedTable() {
    var head = "<th>name</th><th>token</th><th>type</th><th>id</th><th>create_dt</th><th>update_dt</th><th></th>";
    var body = closedRows.map(function (row) {
      return "<tr>" + row.map(function (cell, index) {
        return "<td" + (index === 1 ? ' class="token"' : "") + ">" + cell + "</td>";
      }).join("") +
        '<td><button class="btn tiny secondary" type="button">View</button> <button class="btn tiny danger" type="button" disabled>Delete</button></td></tr>';
    }).join("");
    return "<table><thead><tr>" + head + "</tr></thead><tbody>" + body + "</tbody></table>";
  }

  window.FrontendFrame = {
    render: render,
    catalog: catalog,
    groups: groups,
    byToken: byToken,
    readInput: readInput,
    addToInput: addToInput,
    removeFromInput: removeFromInput,
    coveredBy: coveredBy
  };
})();
