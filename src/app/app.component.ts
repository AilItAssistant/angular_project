import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  ngOnInit(){
    this.prueba();
  }
  
  title: string = 'exam-project';

  exams = [
    {
      id: "12364268",
      name: "Estar o hay",
      question: [
        {
          statement:  "¿Dónde ______ una papelera? Necesito tirar este papel.",
          responses: ["a. Está", "b. Hay", "c. Es"],
          id: "12364268"
        },
        {
          statement: "Disculpe, ¿puede decirme dónde _____ la estación de metro más cercana?",
          responses: ["a. Está", "b. Hay", "c. Es"],
          id: "12364268"
        },
        {
          statement: "En la esquina de la avenida ______ tres bancos.",
          responses: ["a. Está", "b. Hay", "c. Es"],
          id: "12364268"
        },
        {
          statement: "Algunas personas de la clase ______ en el pasillo.",
          responses: ["a. Está", "b. Hay", "c. Son"],
          id: "12364268"
        }
      ],
    },
    {
      id: "12364268",
      name: "Tener o haber",
      question: [
        {
          statement:  "En mi ciudad ______ muchas zonas verdes.",
          responses: ["a. Hay", "b. Están", "c. Tienen"],
          id: "12364268"
        },
        {
          statement: "Mi barrio ______ varias floristerías.",
          responses: ["a. Está", "b. Hay", "c. Tiene"],
          id: "12364268"
        },
        {
          statement: "Al final de la clase ______ un mapa y un perchero.",
          responses: ["a. Está", "b. Tiene", "c. Hay"],
          id: "12364268"
        },
        {
          statement: "La tienda de ropa _______ dos probadores.",
          responses: ["a. Gusta", "b. Encantan", "c. Intereso"],
          id: "12364268"
        }
      ],
    },
    {
      id: "12364268",
      name: "Gustar y similares",
      question: [
        {
          statement:  "A mí me _______ los helados de chocolate.",
          responses: ["a. Gusta", "b. Encantan", "c. Intereso"],
          id: "12364268"
        },
        {
          statement: "¿Te ________ la cultura española?",
          responses: ["a. Importan", "b. Gustas", "c. Interesa"],
          id: "12364268"
        },
        {
          statement: "A mi hermano le _______ hacer senderismo.",
          responses: ["a. Gusta", "b. Prefiere", "c. Preocupo"],
          id: "12364268"
        },
        {
          statement: "Nos _______ el flamenco y el tango.",
          responses: ["a. Encantamos ", "b. Preocupa", "c. Gustan"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Presente irregular",
      question: [
        {
          statement:  "Mientras tú preparas la comida, yo ______ la mesa, ¿vale?",
          responses: ["a. Pono", "b. Pongo", "c. Pone"],
          id: "12364268"
        },
        {
          statement: "Cuando yo _______, siempre escucho música.",
          responses: ["a. Conduzo", "b. Conduco", "c. Conduzco"],
          id: "12364268"
        },
        {
          statement: "¿No _______ que la comida ecuatoriana es deliciosa?",
          responses: ["a. Piensas", "b. Pensas", "c. Pensa"],
          id: "12364268"
        },
        {
          statement: "Estamos buscando trabajo, pero no lo _______.",
          responses: ["a. Encuentramos ", "b. Encontramos"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Descripción física",
      question: [
        {
          statement:  "Mi vecina Malena tiene el pelo ______.",
          responses: ["a. Rubia", "b. Rubio", "c. Larga"],
          id: "12364268"
        },
        {
          statement: "Mi hermana y yo _______ los ojos marrones.",
          responses: ["a. Tenemos", "b. LLevamos", "c. Somos"],
          id: "12364268"
        },
        {
          statement: "Su abuelo no tiene pelo, es _______.",
          responses: ["a. Castaño", "b. Canoso", "c. Calvo"],
          id: "12364268"
        },
        {
          statement: "¿Tú _______ gafas para leer solamente?",
          responses: ["a. Tienes ", "b. Llevas", "c. Eres"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Género y número",
      question: [
        {
          statement:  "Siempre lleva pantalones vaqueros ________, le encantan.",
          responses: ["a. Corto", "b. Azul", "c. Azules"],
          id: "12364268"
        },
        {
          statement: "No me gusta el agua ________, no es bueno para la garganta.",
          responses: ["a. Fría", "b. Frío", "c. Caliento"],
          id: "12364268"
        },
        {
          statement: "En las fotos, las personas están _______.",
          responses: ["a. Feliz", "b. Felices", "c. Felizes"],
          id: "12364268"
        },
        {
          statement: "El planeta de la película es muy ______.",
          responses: ["a. Peligroso ", "b. Segura", "c. Especiales"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Cantidad",
      question: [
        {
          statement:  "En mi país hay ______ gente.",
          responses: ["a. Muchos", "b. Algunas", "c. Poca"],
          id: "12364268"
        },
        {
          statement: "En esta carretera, los domingos hay ________ coches.",
          responses: ["a. Muchos", "b. Muy", "c. Algún"],
          id: "12364268"
        },
        {
          statement: "La calle donde vivo es _______ tranquila.",
          responses: ["a. Mucho", "b. Muy", "c. Poca"],
          id: "12364268"
        },
        {
          statement: "No hay ______ farmacia cerca de mi casa.",
          responses: ["a. Alguna ", "b. Ninguna", "c. Mucha"],
          id: "12364268"
        }
    ]
    },
    {
      id: "12364268",
      name: "Reflexivos",
      question: [
        {
          statement:  "Todos los días _______ temprano, a las siete de la mañana.",
          responses: ["a. Despierto", "b. Me despierto", "c. Desperto"],
          id: "12364268"
        },
        {
          statement: "La niña ya _______ sola, no necesita ayuda.",
          responses: ["a. Se viste", "b. Se veste", "c. Viste"],
          id: "12364268"
        },
        {
          statement: "¿A qué hora _______ vosotros los sábados?",
          responses: ["a. Acostáis", "b. Os acostáis", "c. Acuestáis"],
          id: "12364268"
        },
        {
          statement: "¿Tú _______ los dientes tres veces al día?",
          responses: ["a. Cepillas ", "b. Laves", "c. Te cepillas"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Ropa",
      question: [
        {
          statement:  "Voy a viajar por el norte y llueve mucho, necesito un _______.",
          responses: ["a. Chubasquero", "b. Sombrero", "c. Chándal"],
          id: "12364268"
        },
        {
          statement: "Si no me pongo los _______, tengo las manos heladas.",
          responses: ["a. Calcetines", "b. Vaqueros", "c. Guantes"],
          id: "12364268"
        },
        {
          statement: "Quiero comprarme un _______ para nadar.",
          responses: ["a. Bañador", "b. Traje", "c. Polo"],
          id: "12364268"
        },
        {
          statement: "Carmela prefiere llevar ______ que pantalones.",
          responses: ["a. Corbata ", "b. Chaqueta", "c. Falda"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Tiempo atmosférico",
      question: [
        {
          statement:  "En junio no _______ frío, no necesitas abrigo.",
          responses: ["a. Es", "b. Hace", "c. Está"],
          id: "12364268"
        },
        {
          statement: "Hoy hace un día malo, _______ nublado.",
          responses: ["a. Está", "b. Es", "c. Hace"],
          id: "12364268"
        },
        {
          statement: "En invierno ______ mucho.",
          responses: ["a. Lluvia", "b. Llueve", "c. Llove"],
          id: "12364268"
        },
        {
          statement: "Mi estación favorita es el ______, porque los árboles están amarillos y rojos.",
          responses: ["a. Otoño ", "b. Verano", "c. Primavera"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Pretérito perfecto",
      question: [
        {
          statement:  "Esta mañana mis amigos y yo _____ un vídeo.",
          responses: ["a. Hemos hacido", "b. Hamos hecho", "c. Hemos hecho"],
          id: "12364268"
        },
        {
          statement: "¿Todavía no ______ la película?",
          responses: ["a. Hais visto", "b. Habéis visto", "c. Habéis vida"],
          id: "12364268"
        },
        {
          statement: "El niño ______ el juguete hoy.",
          responses: ["a. Has roto", "b. He rompido", "c. Ha roto"],
          id: "12364268"
        },
        {
          statement: "¿Alguna vez tú ______ un mensaje en español?",
          responses: ["a. Has escrito ", "b. Has escribió", "c. He escrito"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Pronombres OD y OI gustar",
      question: [
        {
          statement:  "La verdura, ¿cómo _____ preparas?",
          responses: ["a. La", "b. Lo", "c. Las"],
          id: "12364268"
        },
        {
          statement: "A Martín _____ encanta este blog de viajes.",
          responses: ["a. Lo", "b. Le", "c. Te"],
          id: "12364268"
        },
        {
          statement: "Los huevos _____ pongo en la nevera.",
          responses: ["a. Los", "b. Les", "c. Me"],
          id: "12364268"
        },
        {
          statement: "A mis primas _______ apasiona la montaña.",
          responses: ["a. Os", "b. Les", "c. Las"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Preposiciones",
      question: [
        {
          statement:  "Este fin de semana nos vamos _____ excursión.",
          responses: ["a. A la", "b. Al", "c. De"],
          id: "12364268"
        },
        {
          statement: "Aquella catarata es la más alta ____ país.",
          responses: ["a. Del", "b. De", "c. En"],
          id: "12364268"
        },
        {
          statement: "¿Echas de menos _______ tu familia?",
          responses: ["a. De", "b. Sin preposición", "c. A"],
          id: "12364268"
        },
        {
          statement: "Elena nunca ha ido _______ exposición.",
          responses: ["a. A un", "b. A una", "c. De"],
          id: "12364268"
        }
      ]
    },
    {
      id: "12364268",
      name: "Vocabulario",
      question: [
        {
          statement:  "¿Me trae, por favor, una ______ para comer la sopa?",
          responses: ["a. Cuchillo", "b. Tenedor", "c. Cuchara"],
          id: "12364268"
        },
        {
          statement: "Voy a ir a la playa y quiero llevarme una camiseta de _______.",
          responses: ["a. Manga larga", "b. Tirantes", "c. Cuadros"],
          id: "12364268"
        },
        {
          statement: "Su tío pone todas las cosas en su lugar. Es muy ________.",
          responses: ["a. Despistado", "b. Organizado", "c. Abierto"],
          id: "12364268"
        },
        {
          statement: "Su barrio tiene mucha vida nocturna, todas las noches hay gente, es muy _______.",
          responses: ["a. Barato", "b. Feo", "c. Ruidosa"],
          id: "12364268"
        }
    ]
    },
    {
      id: "12364268",
      name: "Variadas de gramática",
      question: [
        {
          statement:  "_______ desierto es el más grande del mundo.",
          responses: ["a. Esto", "b. Este", "c. Esta"],
          id: "12364268"
        },
        {
          statement: "¿ ________ son las castañuelas? ¿Un instrumento musical?",
          responses: ["a. Cuál", "b. Cuáles", "c. Qué"],
          id: "12364268"
        },
        {
          statement: "Leandro tiene dos cuñadas. ______ cuñadas son de México.",
          responses: ["a. Su", "b. Sus", "c. Suyas"],
          id: "12364268"
        },
        {
          statement: "La heladería está ________ taller.",
          responses: ["a. A la derecha", "b. Al lado del", "c. Cerca"],
          id: "12364268"
        }
      ]
    },

];

  prueba(){
    //console.log(this.exams);
    //onsole.log(Object.keys(this.exams).length);
    

  };
}