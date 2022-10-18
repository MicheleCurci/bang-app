// scripts

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// file paths

const faq_filepath = "/bang-app/files/rules/faq.csv";
const special_rules_filepath = "/bang-app/files/rules/special_rules.csv";
const characters_filepath = "/bang-app/files/rules/characters.csv";

getCSV(faq_filepath, buildFAQ);
getCSV(special_rules_filepath, buildSpecialRules);
getCSV(characters_filepath, buildCharacters);


// function definitions

function getCSV(file_url, func) {
    var file = file_url;
    var rawFile = new XMLHttpRequest();
    var allText;

    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4)
            alert("aooo");
        if (rawFile.status === 200 || rawFile.status == 0) {
            allText = rawFile.responseText;
            alert(allText);
        }
        if (func != undefined && typeof (func) == "function") {
            func(allText);
        }
    };

    rawFile.send();
}


function buildFAQ(contents) {
    alert(contents)
    faq_rules = contents.split('\r\n');
    faq_rules.shift();

    const node = document.createElement("div");
    document.getElementById("main_page").appendChild(node);

    const title_node = document.createElement("p");
    title_node.innerHTML = "FAQ";
    title_node.classList.add("section-title");
    node.appendChild(title_node);


    faq_rules.forEach(faq_rule => {

        // create nodes
        const qa_node = document.createElement("div");

        question_and_answer = faq_rule.split(';');
        const question_node = document.createElement("p");
        const answer_node = document.createElement("p");

        const question_text = document.createTextNode(question_and_answer[0]);
        const answer_text = document.createTextNode(question_and_answer[1]);

        // add icons
        var heart_img = document.createElement('img');
        heart_img.src = 'icons/heart.png';
        heart_img.classList.add("icon-before-text");

        var spades_img = document.createElement('img');
        spades_img.src = 'icons/spades.png';
        spades_img.classList.add("icon-before-text");

        // build nodes
        question_node.appendChild(heart_img);
        answer_node.appendChild(spades_img);
        qa_node.appendChild(question_node);
        qa_node.appendChild(answer_node);
        node.appendChild(qa_node);

        question_node.appendChild(question_text);
        answer_node.appendChild(answer_text);

        // add classes
        qa_node.classList.add("faq-node");
        question_node.classList.add("question");
        answer_node.classList.add("answer");

    });
}

function buildSpecialRules(contents) {
    special_rules = contents.split('\r\n');
    special_rules.shift();

    const node = document.createElement("div");
    document.getElementById("main_page").appendChild(node);

    const title_node = document.createElement("p");
    title_node.innerHTML = "Regole speciali";
    title_node.classList.add("section-title");
    node.appendChild(title_node);

    special_rules.forEach(rule => {

        // create nodes
        const container_node = document.createElement("div");
        const rule_node = document.createElement("p");

        const rule_text = document.createTextNode(rule);

        // add icons
        var clubs_img = document.createElement('img');
        clubs_img.src = 'icons/clubs.png';
        clubs_img.classList.add("icon-before-text");

        // build nodes
        node.appendChild(container_node);
        container_node.appendChild(rule_node);
        rule_node.appendChild(clubs_img);
        rule_node.appendChild(rule_text);

        // add classes
        container_node.classList.add("special-rules-node");
    });

}


function buildCharacters(contents) {
    character_rules = contents.split('\r\n');
    character_rules.shift();

    const node = document.createElement("div");
    document.getElementById("main_page").appendChild(node);

    const title_node = document.createElement("p");
    title_node.innerHTML = "Personaggi";
    title_node.classList.add("section-title");
    node.appendChild(title_node);

    character_rules.forEach(rule => {

        // create nodes
        const container_node = document.createElement("div");

        character_and_desc = rule.split(';');

        const character = character_and_desc[1];
        const description = character_and_desc[2]

        const character_node = document.createElement("p");
        const desc_node = document.createElement("p");

        const character_text = document.createTextNode(character);
        const desc_text = document.createTextNode(description);

        // add icons
        var diamond_img = document.createElement('img');
        diamond_img.src = 'icons/diamond.png';
        diamond_img.classList.add("icon-before-text");

        // build nodes
        node.appendChild(container_node);
        container_node.appendChild(diamond_img);
        container_node.appendChild(character_node);
        container_node.appendChild(desc_node);

        character_node.appendChild(character_text);
        desc_node.appendChild(desc_text);

        // add classes
        container_node.classList.add("characters-node");
        character_node.classList.add("character");
        desc_node.classList.add("character_description");

    });
}

function filterFAQ(string_to_search) {
    const faq_nodes = document.getElementsByClassName("faq-node");
    for (var i = 0; i < faq_nodes.length; i++) {
        var faq_node = faq_nodes[i];
        if (faq_node.getElementsByClassName("question")[0].innerText.toLowerCase().includes(string_to_search) || faq_node.getElementsByClassName("answer")[0].innerText.toLowerCase().includes(string_to_search)) {
            faq_node.classList.remove("display_off");
            faq_node.classList.add("display_on");
        }
        else {
            faq_node.classList.remove("display_on");
            faq_node.classList.add("display_off");
        }
    }
}

function filterSpecialRules(string_to_search) {
    const container_nodes = document.getElementsByClassName("special-rules-node");
    for (var i = 0; i < container_nodes.length; i++) {
        var container_node = container_nodes[i];

        if (container_node.lastChild.innerText.toLowerCase().includes(string_to_search)) {
            container_node.classList.remove("display_off");
            container_node.classList.add("display_on");
        }
        else {
            container_node.classList.remove("display_on");
            container_node.classList.add("display_off");
        }
    }
}

function filterCharacters(string_to_search) {
    const nodes = document.getElementsByClassName("characters-node");
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        if (node.getElementsByClassName("character")[0].innerText.toLowerCase().includes(string_to_search) || node.getElementsByClassName("character_description")[0].innerText.toLowerCase().includes(string_to_search)) {
            node.classList.remove("display_off");
            node.classList.add("display_block_on");
        }
        else {
            node.classList.remove("display_block_on");
            node.classList.add("display_off");
        }
    }
}

function filterRules(string_to_search) {
    const search = string_to_search.toLowerCase()
    filterFAQ(search);
    filterSpecialRules(search);
    filterCharacters(search);
}