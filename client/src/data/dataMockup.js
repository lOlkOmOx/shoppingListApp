const dataMockup = [
    {
        id: 1,
        name: "Ovoce",
        ownerId: "100",
        usersIds: ["101", "102"],
        archived: false,
        items: [
            {id: 1000, name: "Jablko", required: true},
            {id: 1001, name: "Hruška", required: false},
            {id: 1002, name: "Banán", required: true},
            {id: 1003, name: "Mandarinka", required: true},
            {id: 1586, name: "Kedluben", required: true},
            {id: 1879, name: "Hruška", required: true},
            {id: 1878, name: "Pomeranč", required: true},
            {id: 1877, name: "Ananas", required: false},
            {id: 1876, name: "Jahody", required: false},
            {id: 1875, name: "Borůvky", required: true},
            {id: 1874, name: "Granátové jablko", required: true},
        ]
    },{
        id: 2,
        name: "Zelenina",
        ownerId: "100",
        usersIds: ["101", "102"],
        archived: true,
        items: [
            {id: 1004, name: "Okurka", required: true},
            {id: 1005, name: "Zelí", required: true},
            {id: 1006, name: "Salát", required: true},
            {id: 1007, name: "Brokolice", required: true},
            {id: 1057, name: "Květák", required: true},
            {id: 1047, name: "Kedluben", required: true},
            {id: 1037, name: "Porek", required: true},
            {id: 1027, name: "Ředkvičky", required: true},
        ]
    },{
        id: 3,
        name: "Mléčné výrobky",
        ownerId: "101",
        usersIds: ["102", "100"],
        archived: false,
        items: [
            {id: 1008, name: "Jogurt", required: true},
            {id: 1009, name: "Máslo", required: true},
            {id: 1010, name: "Smetana", required: true},
            {id: 1011, name: "Tvaroh", required: false},
            {id: 1211, name: "pribináček", required: false},
            {id: 1311, name: "Eidam", required: true},
            {id: 1411, name: "Tvrdý tvaroh", required: true},
            {id: 1511, name: "Droždí", required: true},
            {id: 1611, name: "Plátkový sýr", required: false},
            {id: 1711, name: "Kefír", required: false}
        ]
    },{
        id: 4,
        name: "Pečení",
        ownerId: "101",
        usersIds: ["102", "103"],
        archived: false,
        items: [
            {id: 1012, name: "Kypřicí prášek", required: false},
            {id: 1013, name: "Mouka", required: false},
            {id: 1014, name: "Cukr", required: false},
            {id: 2015, name: "Vanilkový cukr", required: true},
            {id: 3015, name: "Marcipán", required: true},
            {id: 4015, name: "Kakao", required: true},
            {id: 5015, name: "Vajíčka", required: true},
            {id: 6015, name: "Citrony", required: true}
        ]
    },{
        id: 5,
        name: "Elektro",
        ownerId: "100",
        usersIds: ["101", "102", "103"],
        archived: false,
        items: [
            {id: 1016, name: "Rádio", required: true},
            {id: 1017, name: "HDMI kabel", required: true},
            {id: 1018, name: "Sluchátka", required: true},
            {id: 1019, name: "Lednice", required: true},
            {id: 1519, name: "Pračka", required: true},
            {id: 1619, name: "Mikrovlnka", required: true},
            {id: 1719, name: "USB-Stick", required: false}
        ]
    },{
        id: 6,
        name: "K tetičce",
        ownerId: "101",
        usersIds: ["102", "103", "100"],
        archived: false,
        items: [
            {id: 1020, name: "Polohrubá mouka", required: true},
            {id: 1021, name: "Kakao", required: true},
            {id: 1022, name: "Sůl", required: true},
            {id: 1023, name: "Čokoláda", required: true},
            {id: 1024, name: "Bonboniéra", required: false},
            {id: 1025, name: "Květiny", required: false},
            {id: 1026, name: "Růže", required: false},
        ]
    },{
        id: 7,
        name: "Grilovačka",
        ownerId: "102",
        usersIds: ["102", "101", "100"],
        archived: false,
        items: [
            {id: 1027, name: "Buřty", required: true},
            {id: 1028, name: "Hořčice", required: true},
            {id: 1029, name: "Chleba", required: true},
            {id: 1030, name: "Kečup", required: true},
            {id: 1031, name: "Rohlíky", required: false},
            {id: 1032, name: "Uhlí", required: false},
            {id: 1033, name: "Pepo", required: false},
        ]
    },{
        id: 8,
        name: "Na dovolenou",
        ownerId: "103",
        usersIds: ["102", "101", "100"],
        archived: false,
        items: [
            {id: 1033, name: "Plavky", required: true},
            {id: 1034, name: "Žabky", required: true},
            {id: 1035, name: "Rukávky", required: true},
            {id: 1036, name: "Opalovák", required: true},
            {id: 1037, name: "Slunečník", required: false}
        ]
    }
]


export default dataMockup