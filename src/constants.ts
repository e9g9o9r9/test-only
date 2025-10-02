import { TimePeriod } from "./types/types";

export const HISTORICAL_PERIODS: TimePeriod[] = [
    {
        id: 1,
        name: "Технологический прорыв",
        startYear: 2015,
        endYear: 2016,
        events: [
            {
                year: 2015,
                description: "Запуск Windows 10 и массовый переход на новую ОС",
                category: "technology"
            },
            {
                year: 2016,
                description: "Выход Pokemon Go и начало бума AR-игр",
                category: "technology"
            },
            {
                year: 2016,
                description: "Запуск Tesla Model 3 - самого доступного электромобиля",
                category: "technology"
            },
            {
                year: 2015,
                description: "Релиз Oculus Rift CV1 - начало эры потребительских VR-шлемов",
                category: "technology"
            }
        ]
    },
    {
        id: 2,
        name: "Научные открытия",
        startYear: 2017,
        endYear: 2018,
        events: [
            {
                year: 2017,
                description: "Первое обнаружение гравитационных волн от слияния нейтронных звезд",
                category: "science"
            },
            {
                year: 2018,
                description: "Запуск космического телескопа TESS для поиска экзопланет",
                category: "science"
            },
            {
                year: 2018,
                description: "Создание первых генетически модифицированных детей в Китае",
                category: "science"
            },
            {
                year: 2017,
                description: "Успешное клонирование макак-крабоедов в Китае",
                category: "science"
            }
        ]
    },
    {
        id: 3,
        name: "Политические изменения",
        startYear: 2019,
        endYear: 2020,
        events: [
            {
                year: 2019,
                description: "Брекзит - выход Великобритании из Европейского союза",
                category: "politics"
            },
            {
                year: 2020,
                description: "Пандемия COVID-19 и глобальные локдауны",
                category: "politics"
            },
            {
                year: 2020,
                description: "Президентские выборы в США",
                category: "politics"
            },
            {
                year: 2019,
                description: "Протесты в Гонконге против закона об экстрадиции",
                category: "politics"
            }
        ]
    },
    {
        id: 4,
        name: "Культурные события",
        startYear: 2021,
        endYear: 2022,
        events: [
            {
                year: 2021,
                description: "Выпуск фильма 'Дюна' Дени Вильнёва",
                category: "culture"
            },
            {
                year: 2022,
                description: "Война России против Украины и культурный бойкот",
                category: "culture"
            },
            {
                year: 2022,
                description: "Мировая премьера сериала 'Игра в кальмара'",
                category: "culture"
            },
            {
                year: 2021,
                description: "Выставка Бэнкси 'Game Changer' в поддержку медработников",
                category: "culture"
            }
        ]
    },
    {
        id: 5,
        name: "Спортивные достижения",
        startYear: 2023,
        endYear: 2024,
        events: [
            {
                year: 2023,
                description: "Чемпионат мира по футболу в Катаре",
                category: "sports"
            },
            {
                year: 2024,
                description: "Летние Олимпийские игры в Париже",
                category: "sports"
            },
            {
                year: 2023,
                description: "Новак Джокович выиграл Открытый чемпионат Австралии",
                category: "sports"
            },
            {
                year: 2024,
                description: "Лионель Месси получает восьмой 'Золотой мяч'",
                category: "sports"
            }
        ]
    },
    {
        id: 6,
        name: "Космические миссии",
        startYear: 2025,
        endYear: 2026,
        events: [
            {
                year: 2025,
                description: "Планируемая миссия Artemis II с облетом Луны",
                category: "science"
            },
            {
                year: 2026,
                description: "Запуск космического телескопа Nancy Grace Roman",
                category: "science"
            },
            {
                year: 2025,
                description: "Миссия Dragonfly к спутнику Сатурна Титану",
                category: "science"
            },
            {
                year: 2026,
                description: "Запуск миссии Europa Clipper для изучения спутника Юпитера",
                category: "science"
            }
        ]
    }
];