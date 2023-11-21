const dataMockup = [
    {
        id: 1,
        name: "Ovoce",
        ownerId: "100",
        usersIds: ["101", "104"],
        archived: false,
        items: [
            {id: 1000, name: "Jablko", required: true},
            {id: 1001, name: "Hruška", required: false},
            {id: 1002, name: "Banán", required: true},
            {id: 1003, name: "Mandarinka", required: true}
        ]
    },{
        id: 2,
        name: "Zelenina",
        ownerId: "100",
        usersIds: ["105", "102"],
        archived: true,
        items: [
            {id: 1004, name: "Okurka", required: true},
            {id: 1005, name: "Zelí", required: true},
            {id: 1006, name: "Salát", required: true},
            {id: 1007, name: "Brokolice", required: true},
        ]
    },{
        id: 3,
        name: "Mléčné výrobky",
        ownerId: "101",
        usersIds: ["102", "106", "100"],
        archived: false,
        items: [
            {id: 1008, name: "Jogurt", required: true},
            {id: 1009, name: "Máslo", required: true},
            {id: 1010, name: "Smetana", required: true},
            {id: 1011, name: "Tvaroh", required: true},
        ]
    },{
        id: 4,
        name: "Pečení",
        ownerId: "101",
        usersIds: ["100", "104"],
        archived: false,
        items: [
            {id: 1012, name: "Kypřicí prášek", required: true},
            {id: 1013, name: "Mouka", required: true},
            {id: 1014, name: "Cukr", required: true},
            {id: 1015, name: "Vanilkový cukr", required: true},
        ]
    },{
        id: 5,
        name: "Elektro",
        ownerId: "102",
        usersIds: ["101", "105", "104", "106", "100"],
        archived: false,
        items: [
            {id: 1016, name: "Rádio", required: true},
            {id: 1017, name: "HDMI kabel", required: true},
            {id: 1018, name: "Sluchátka", required: true},
            {id: 1019, name: "Lednice", required: true},
        ]
    },{
        id: 6,
        name: "Na bábovku",
        ownerId: "103",
        usersIds: ["100", "102", "101"],
        archived: false,
        items: [
            {id: 1020, name: "Polohrubá mouka", required: true},
            {id: 1021, name: "Kakao", required: true},
            {id: 1022, name: "Sůl", required: true},
            {id: 1023, name: "Čokoláda", required: true},
        ]
    },{
        id: 7,
        name: "Sladkosti",
        ownerId: "104",
        usersIds: ["100", "102", "106", "105"],
        archived: false,
        items: [
            {id: 1024, name: "Oplatky", required: true},
            {id: 1025, name: "Bonbony", required: true},
            {id: 1026, name: "Lízátka", required: true},
            {id: 1027, name: "Tyčinky", required: true},
        ]
    },{
        id: 8,
        name: "K televizi",
        ownerId: "105",
        usersIds: ["100", "102", "101", "103"],
        archived: false,
        items: [
            {id: 1028, name: "Chipsy", required: true},
            {id: 1029, name: "Křupky", required: true},
            {id: 1030, name: "Tyčinky", required: true},
            {id: 1031, name: "Oříšky", required: true},
        ]
    },{
        id: 9,
        name: "Knihy",
        ownerId: "105",
        usersIds: ["100", "102", "101"],
        archived: true,
        items: [
            {id: 1032, name: "Harry Potter", required: true},
            {id: 1033, name: "Babička", required: true},
            {id: 1034, name: "Honzíkova cesta", required: true},
            {id: 1035, name: "Romeo a Julie", required: true},
        ]
    },{
        id: 10,
        name: "Zimní výbava",
        ownerId: "106",
        usersIds: ["104", "105", "103", "100"],
        archived: false,
        items: [
            {id: 1036, name: "Lyže", required: true},
            {id: 1037, name: "Kombinéza", required: true},
            {id: 1038, name: "Rukavice", required: true},
            {id: 1039, name: "Snowboard", required: true},
        ]
    }
]


export default dataMockup