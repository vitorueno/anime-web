const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/index.js']

const doc = {
    tags: [
        {
            "name": "Anime",
            "description": "Anime Endpoints"
        },
        {
            "name": "Studio",
            "description": "Studio Endpoints"
        },
        {
            "name": "Genre",
            "description": "Genre Endpoints"
        },
        {
            "name": "User",
            "description": "User Endpoints"
        }
    ],
    definitions: {
        Anime: {
            title: 'Fullmetal Alchemist Brotherhood',
            synopsis: "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor. The brothers are rescued by their neighbor Pinako Rockbell and her granddaughter Winry.Known as a bio- mechanical engineering prodigy, Winry creates prosthetic limbs for Edward by utilizing \"automail,\" a tough, versatile metal used in robots and combat armor.After years of training, the Elric brothers set off on a quest to restore their bodies by locating the Philosopher's Stone—a powerful gem that allows an alchemist to defy the traditional laws of Equivalent Exchange. As Edward becomes an infamous alchemist and gains the nickname \"Fullmetal,\" the boys' journey embroils them in a growing conspiracy that threatens the fate of the world.",
            studio: 'VALID STUDIO ID',
            genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
            numEpisodes: 64,
            releaseDate: '2009-04-05',
            endDate: '2010-07-04',
            source: 'Manga',
            demographic: 'Shounen'
        },
        Studio: {
            name: 'Bones',
            description: 'Bones (Bones Inc.) is a Japanese animation studio based in Suginami, Tokyo. The studio was founded by previous Sunrise producer Masahiko Minami and animators Hiroshi Ousaka and Toshihiro Kawamoto in 1998. Following Sunrise\'s production model, Bones\' founders divided the company into five smaller studios, Studio A-E. Studio Bones has put out a variety of television and film since its debut project of Hiwou War Chronicles in 2000, including popular anime such as Ouran Koukou Host Club(Ouran High School Host Club), Hagane no Renkinjutsushi: Fullmetal Alchemist(Fullmetal Alchemist: Brotherhood), Boku no Hero Academia(My Hero Academia), and Bungou Stray Dogs',
            foundationDate: '1998-10-01'
        },
        Genre: {
            title: 'Action',
            description: 'fast-paced, adrenaline-fueled action scenes'
        },
        User: {
            name: 'Joãozinho Gamer',
            email: 'joaozinho.gamer@games.com',
            password: 'segredo'
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('criando documentação');
    require('./src/index.js');
})