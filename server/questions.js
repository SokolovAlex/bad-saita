module.exports = [{
        "id": 11,
        "key": "console",
        "text": "What has Bad Saita said in dev tools console?",
        "type": "radio",
        "variants": [
            { "text": "Hello, World!", "id": 1 },
            { "text": "The road will be mastered by the going", "id": 2 },
            { "text": "Attitude is a little thing that makes a big difference.", "id": 3 },
            { "text": "i don't know that", "id": 4 }
        ],
        "points": 12,
        "answer": {
            "ids": [4],
            "description": "press F12 and open console tab to find the answer"
        },
        "action": "say",
        "actionParams": ["i don't know that"]
    },
    {
        "id": 1,
        "key": "framework",
        "text": "What framework is used on this site?",
        "type": "radio",
        "variants": [
            { "text": "No farmework", "id": 1 },
            { "text": "React", "id": 2 },
            { "text": "Angular", "id": 3 },
            { "text": "i don't know that", "id": 4 }
        ],
        "points": 15,
        "answer": {
            "ids": [3],
            "description": "You must look at the root"
        },
        "action": ""
    }, {
        "id": 17,
        "key": "post_requests",
        "text": "How many post requests were sent to the server?",
        "type": "radio",
        "variants": [
            { "text": "two", "id": 1 },
            { "text": "three", "id": 2 },
            { "text": "five", "id": 3 },
            { "text": "no post requests", "id": 4 }
        ],
        "points": 6,
        "answer": {
            "ids": [2],
            "description": "Try to find answer in network tab in dev tool"
        },
        "action": "post",
        "actionParams": [2, 1]
    },
    {
        "id": 18,
        "key": "find_element",
        "text": "Find all elements on page with 'bad_class' class. What are tags of dom elemenets with this class?",
        "type": "check",
        "points": 3,
        "variants": [
            { "text": "div", "id": 1 },
            { "text": "section", "id": 2 },
            { "text": "input", "id": 3 },
            { "text": "button", "id": 4 }
        ],
        "answer": {
            "ids": [1, 4],
            "description": "I use ctrl+f in element tab in dev tool in that case"
        }
    },
    {
        "id": 25,
        "key": "find_events",
        "text": "Find Santa-event handlers on bad saita?",
        "type": "check",
        "variants": [
            { "text": "dance", "id": 1 },
            { "text": "blink", "id": 2 },
            { "text": "picking-his-nose", "id": 3 },
            { "text": "look-back", "id": 4 }
        ],
        "points": 4,
        "answer": {
            "ids": [1, 2],
            "description": "I use ctrl+f in element tab in dev tool in that case"
        },
        "action": "bind",
        "actionParams": [
            ["santa-dance", "santa-blink"]
        ]
    }, {
        "id": 27,
        "key": "use_console",
        "text": "What does the expression equal to - var exp = 5 * 8 + 77 + '35' + (86 + 53) + 'text' + 5 + 1 + ('4' * 1) + 13 + !!true + false + null; - ?",
        "type": "radio",
        "variants": [
            { "text": "242358653text51413truefalsetrue", "id": 1 },
            { "text": "11735139text51413truefalsenull", "id": 2 },
            { "text": "797358653text51413falsefalsenull", "id": 3 },
            { "text": "281text514truefalsenull", "id": 4 }
        ],
        "points": 3,
        "answer": {
            "ids": [2],
            "description": "Sometime it's easier to use calculator or ..."
        },
        "action": ""
    }, {
        "id": 29,
        "key": "change_css",
        "text": "Why does commit button change color to red?",
        "type": "check",
        "variants": [
            { "text": "class critical-btn", "id": 1 },
            { "text": "class very-hard-question", "id": 2 },
            { "text": "class red-btn", "id": 3 },
            { "text": "class shy-btn", "id": 4 }
        ],
        "points": 6,
        "answer": {
            "ids": [2, 3, 4],
            "description": "I use ctrl+f in element tab in dev tool in that case"
        },
        "action": "addClasses",
        "actionParams": [
            ["red-btn", "very-hard-question", "critical-btn", "shy-btn"]
        ]
    },
    {
        "id": 33,
        "key": "emulate_hover",
        "text": "What is the best site in opinion of bad saita? (try to hover mouse on Bad Saita)",
        "type": "radio",
        "variants": [
            { "text": "my.kaspersky.com", "id": 1 },
            { "text": "youtube.com", "id": 2 },
            { "text": "2gis.ru", "id": 3 },
            { "text": "bad.saita.com", "id": 4 }
        ],
        "points": 6,
        "answer": {
            "ids": [2],
            "description": "see a context menu on element tab in dev tools"
        },
        "action": "addSantaSpeech",
        "actionParams": ["youtube.com/watch?v=nSKp2StlS6s"]
    }, {
        "id": 35,
        "key": "headers",
        "text": "What are headers 'book' and 'author' in last post request?",
        "type": "radio",
        "variants": [
            { "text": "book: Arc de Triomphe & author: Remarque", "id": 1 },
            { "text": "book: The Old Man and the Sea & author: Hemingway", "id": 2 },
            { "text": "book: The Great Gatsby & author: Fitzgerald", "id": 3 },
            { "text": "book: War and peace & author: Tolstoy", "id": 4 }
        ],
        "points": 4,
        "answer": {
            "ids": [4],
            "description": ""
        },
        "action": "postWithHeaders",
        "actionParams": [
            [{ "key": "book", "value": "War and peace" }, { "key": "author", "value": "Tolstoy" }]
        ]
    },
    {
        "id": 48,
        "key": "media_query",
        "text": "Find Bad Saita artifact here: @media screen and (max-width: 700px) and (min-width: 650px) and (aspect-ratio: 1/1)?",
        "type": "radio",
        "variants": [
            { "text": "small deer", "id": 1 },
            { "text": "empty bottle", "id": 2 },
            { "text": "black jack", "id": 3 },
            { "text": "it's wrong media query", "id": 4 }
        ],
        "points": 7,
        "answer": {
            "ids": [2]
        }
    },
    {
        "id": 49,
        "key": "local_storage",
        "text": "What has happened with the deer? Read about it the local storage.",
        "type": "radio",
        "variants": [
            { "text": "deer is drunk", "id": 1 },
            { "text": "deer behind Bad Saita", "id": 2 },
            { "text": "deer rest in russia", "id": 3 },
            { "text": "deer hesitate", "id": 4 }
        ],
        "points": 3,
        "answer": {
            "ids": [1],
            "description": "try to set breakpoint on attribute change"
        },
        "action": "setInLocalStorage",
        "actionParams": ['deer', 'rest in russia']
    },
    {
        "id": 50,
        "key": "cookie",
        "text": "Set cookie 'believe me', and Santa will help you with the answer.",
        "type": "radio",
        "variants": [
            { "text": "A", "id": 1 },
            { "text": "B", "id": 2 },
            { "text": "C", "id": 3 },
            { "text": "D", "id": 4 }
        ],
        "points": 4,
        "answer": {
            "ids": [1]
        },
        "action": "readCookie",
        "actionParams": ['believe me']
    },
    {
        "id": 45,
        "key": "who_does_it",
        "text": "Find component which plays with question color.",
        "type": "radio",
        "variants": [
            { "text": "GoodSaita", "id": 1 },
            { "text": "Elf", "id": 2 },
            { "text": "DurkwingDuck", "id": 3 },
            { "text": "icon-gamer", "id": 4 }
        ],
        "points": 5,
        "answer": {
            "ids": [2],
            "description": "try to set breakpoint on attribute change"
        },
        "action": "repeatChange",
        "actionParams": ["question"]
    },
    {
        "id": 56,
        "key": "answer",
        "text": "Bad Santa forgot the question, but remember only identifier - 56. Santa hopes you can make it",
        "type": "radio",
        "variants": [
            { "text": "id = 1", "id": 1 },
            { "text": "id = 2", "id": 2 },
            { "text": "id = 3", "id": 3 },
            { "text": "id = 4", "id": 4 }
        ],
        "points": 7,
        "answer": {
            "ids": [3]
        }
    }
];